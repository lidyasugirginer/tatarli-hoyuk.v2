"use client";

import {
  ChangeEvent,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  ImagePlus,
  LoaderCircle,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import styles from "./gallery-image-manager.module.css";

const STORAGE_BUCKET = "tatarli-hoyuk-storage";

type Album = {
  id: string;
  title: string;
  slug: string;
};

type GalleryImage = {
  id: string;
  album_id: string;
  image_url: string;
  caption: string | null;
  alt_text: string | null;
  created_at: string;
};

type SelectedImage = {
  id: string;
  file: File;
  preview: string;
};

type Props = {
  album: Album;
  initialImages: GalleryImage[];
  hasLoadError?: boolean;
};

export default function GalleryImageManager({
  album,
  initialImages,
  hasLoadError = false,
}: Props) {
  const router = useRouter();
  const supabase = createClient();

  const inputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] =
    useState<GalleryImage[]>(initialImages);

  const [selectedImages, setSelectedImages] =
    useState<SelectedImage[]>([]);

  const [isUploading, setIsUploading] = useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [errorMessage, setErrorMessage] =
    useState("");

  function handleFiles(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(
      event.target.files ?? []
    );

    if (files.length === 0) {
      return;
    }

    const validFiles = files.filter((file) => {
      return (
        file.type.startsWith("image/") &&
        file.size <= 10 * 1024 * 1024
      );
    });

    if (validFiles.length !== files.length) {
      setErrorMessage(
        "Bazı dosyalar eklenmedi. Yalnızca 10 MB veya daha küçük görseller yüklenebilir."
      );
    } else {
      setErrorMessage("");
    }

    const newImages = validFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedImages((current) => [
      ...current,
      ...newImages,
    ]);

    event.target.value = "";
  }

  function removeSelectedImage(id: string) {
    setSelectedImages((current) => {
      const target = current.find(
        (image) => image.id === id
      );

      if (target) {
        URL.revokeObjectURL(target.preview);
      }

      return current.filter(
        (image) => image.id !== id
      );
    });
  }

  async function handleUpload() {
    if (selectedImages.length === 0) {
      return;
    }

    setIsUploading(true);
    setErrorMessage("");

    try {
      const uploadedRecords = [];

      for (const selected of selectedImages) {
        const extension =
          selected.file.name
            .split(".")
            .pop()
            ?.toLowerCase() ?? "jpg";

        const fileName =
          `${crypto.randomUUID()}.${extension}`;

        const filePath =
          `gallery/${album.id}/${fileName}`;

        const { error: uploadError } =
          await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(
              filePath,
              selected.file,
              {
                cacheControl: "3600",
                upsert: false,
              }
            );

        if (uploadError) {
          throw new Error(
            `Fotoğraf yüklenemedi: ${uploadError.message}`
          );
        }

        const { data: publicUrlData } =
          supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(filePath);

        uploadedRecords.push({
          album_id: album.id,
          image_url: publicUrlData.publicUrl,
          caption: null,
          alt_text: album.title,
        });
      }

      const { data, error } = await supabase
        .from("gallery_images")
        .insert(uploadedRecords)
        .select(
          `
            id,
            album_id,
            image_url,
            caption,
            alt_text,
            created_at
          `
        );

      if (error) {
        throw error;
      }

      selectedImages.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });

      setSelectedImages([]);

      if (data) {
        setImages((current) => [
          ...current,
          ...data,
        ]);
      }

      router.refresh();
    } catch (error) {
      console.error(
        "Galeri fotoğraf yükleme hatası:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Fotoğraflar yüklenirken bir hata oluştu."
      );
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDelete(image: GalleryImage) {
    const confirmed = window.confirm(
      "Bu fotoğrafı albümden silmek istediğinizden emin misiniz?"
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(image.id);
    setErrorMessage("");

    try {
      const marker =
        `/storage/v1/object/public/${STORAGE_BUCKET}/`;

      const storagePath =
        image.image_url.includes(marker)
          ? decodeURIComponent(
              image.image_url.split(marker)[1]
            )
          : null;

      if (storagePath) {
        const { error: storageError } =
          await supabase.storage
            .from(STORAGE_BUCKET)
            .remove([storagePath]);

        if (storageError) {
          throw storageError;
        }
      }

      const { error } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", image.id);

      if (error) {
        throw error;
      }

      setImages((current) =>
        current.filter(
          (item) => item.id !== image.id
        )
      );

      router.refresh();
    } catch (error) {
      console.error(
        "Galeri fotoğraf silme hatası:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Fotoğraf silinirken bir hata oluştu."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <button
            type="button"
            className={styles.backButton}
            onClick={() =>
              router.push(
                "/site-yonetimi/galeri"
              )
            }
          >
            <ArrowLeft size={17} />
            Galeriye dön
          </button>

          <p className={styles.eyebrow}>
            Albüm fotoğrafları
          </p>

          <h1>{album.title}</h1>

          <p className={styles.description}>
            Albümde gösterilecek fotoğrafları
            buradan ekleyebilir veya
            silebilirsiniz.
          </p>
        </div>

        <button
          type="button"
          className={styles.selectButton}
          onClick={() =>
            inputRef.current?.click()
          }
        >
          <ImagePlus size={18} />
          Fotoğraf seç
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          hidden
          onChange={handleFiles}
        />
      </header>

      {hasLoadError ? (
        <div className={styles.errorMessage}>
          Albümdeki mevcut fotoğraflar
          yüklenirken bir hata oluştu.
        </div>
      ) : null}

      {errorMessage ? (
        <div className={styles.errorMessage}>
          {errorMessage}
        </div>
      ) : null}

      {selectedImages.length > 0 ? (
        <section className={styles.uploadPanel}>
          <div className={styles.uploadHeader}>
            <div>
              <h2>
                Yüklenecek fotoğraflar
              </h2>

              <p>
                {selectedImages.length} fotoğraf
                seçildi.
              </p>
            </div>

            <button
              type="button"
              className={styles.uploadButton}
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <LoaderCircle
                  size={17}
                  className={styles.spinner}
                />
              ) : (
                <Upload size={17} />
              )}

              {isUploading
                ? "Yükleniyor..."
                : "Fotoğrafları yükle"}
            </button>
          </div>

          <div className={styles.previewGrid}>
            {selectedImages.map((image) => (
              <div
                key={image.id}
                className={styles.previewItem}
              >
                <Image
                  src={image.preview}
                  alt="Yüklenecek galeri fotoğrafı"
                  fill
                  sizes="180px"
                />

                <button
                  type="button"
                  className={styles.removePreview}
                  onClick={() =>
                    removeSelectedImage(
                      image.id
                    )
                  }
                  aria-label="Seçilen fotoğrafı kaldır"
                >
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.gallerySection}>
        <div className={styles.sectionHeading}>
          <div>
            <p>Albüm içeriği</p>
            <h2>
              Fotoğraflar
              <span>{images.length}</span>
            </h2>
          </div>
        </div>

        {images.length === 0 ? (
          <div className={styles.emptyState}>
            <ImagePlus size={30} />

            <div>
              <h3>
                Henüz fotoğraf eklenmedi
              </h3>

              <p>
                “Fotoğraf seç” butonuyla aynı
                anda birden fazla görsel
                ekleyebilirsiniz.
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.imageGrid}>
            {images.map((image) => (
              <article
                key={image.id}
                className={styles.imageCard}
              >
                <div
                  className={
                    styles.savedImage
                  }
                >
                  <Image
                    src={image.image_url}
                    alt={
                      image.alt_text ??
                      album.title
                    }
                    fill
                    sizes="260px"
                  />
                </div>

                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() =>
                    handleDelete(image)
                  }
                  disabled={
                    deletingId === image.id
                  }
                >
                  {deletingId === image.id ? (
                    <LoaderCircle
                      size={15}
                      className={
                        styles.spinner
                      }
                    />
                  ) : (
                    <Trash2 size={15} />
                  )}

                  Sil
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}