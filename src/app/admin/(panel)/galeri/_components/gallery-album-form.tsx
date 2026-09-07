"use client";

import {
    ChangeEvent,
    FormEvent,
    useState,
} from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
    ArrowLeft,
    ImagePlus,
    LoaderCircle,
    Save,
    X,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils/slugify";

import type {
    GalleryAlbum,
    GalleryAlbumFormValues,
} from "@/types/gallery";

import styles from "./gallery-album-form.module.css";

const STORAGE_BUCKET = "tatarli-hoyuk-storage";

type GalleryAlbumFormProps = {
    album?: GalleryAlbum;
};

const initialValues: GalleryAlbumFormValues = {
    title: "",
    description: "",
    cover_image_url: "",
};

export default function GalleryAlbumForm({
    album,
}: GalleryAlbumFormProps) {
    const router = useRouter();
    const supabase = createClient();

    const [values, setValues] =
        useState<GalleryAlbumFormValues>(
            album
                ? {
                    title: album.title,
                    description: album.description ?? "",
                    cover_image_url:
                        album.cover_image_url ?? "",
                }
                : initialValues
        );

    const [imageFile, setImageFile] =
        useState<File | null>(null);

    const [previewUrl, setPreviewUrl] =
        useState(album?.cover_image_url ?? "");

    const [removeExistingCover, setRemoveExistingCover] =
        useState(false);

    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] =
        useState("");

    function updateField(
        field: keyof GalleryAlbumFormValues,
        value: string
    ) {
        setValues((current) => ({
            ...current,
            [field]: value,
        }));
    }

    function handleImageChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            setErrorMessage(
                "Lütfen bir görsel dosyası seçin."
            );
            return;
        }

        if (file.size > 8 * 1024 * 1024) {
            setErrorMessage(
                "Kapak görseli en fazla 8 MB olabilir."
            );
            return;
        }

        if (previewUrl.startsWith("blob:")) {
            URL.revokeObjectURL(previewUrl);
        }

        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setRemoveExistingCover(false);
        setErrorMessage("");
    }

    function handleRemoveImage() {
        if (previewUrl.startsWith("blob:")) {
            URL.revokeObjectURL(previewUrl);
        }

        setImageFile(null);
        setPreviewUrl("");

        if (album?.cover_image_url) {
            setRemoveExistingCover(true);
        }

        setErrorMessage("");
    }

    async function uploadCoverImage() {
        if (!imageFile) {
            return values.cover_image_url;
        }

        const extension =
            imageFile.name
                .split(".")
                .pop()
                ?.toLowerCase() ?? "jpg";

        const fileName =
            `${crypto.randomUUID()}.${extension}`;

        const filePath =
            `gallery/covers/${fileName}`;

        const { error: uploadError } =
            await supabase.storage
                .from(STORAGE_BUCKET)
                .upload(filePath, imageFile, {
                    cacheControl: "3600",
                    upsert: false,
                });

        if (uploadError) {
            throw new Error(
                `Kapak görseli yüklenemedi: ${uploadError.message}`
            );
        }

        const { data } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(filePath);

        return data.publicUrl;
    }

    async function deleteStorageFileFromUrl(
        publicUrl: string
    ) {
        const marker =
            `/storage/v1/object/public/${STORAGE_BUCKET}/`;

        if (!publicUrl.includes(marker)) {
            return;
        }

        const filePath = decodeURIComponent(
            publicUrl.split(marker)[1]
        );

        const { error } = await supabase.storage
            .from(STORAGE_BUCKET)
            .remove([filePath]);

        if (error) {
            throw new Error(
                `Eski kapak görseli silinemedi: ${error.message}`
            );
        }
    }

    async function getNextSortOrder() {
        const { data, error } = await supabase
            .from("gallery_albums")
            .select("sort_order")
            .order("sort_order", {
                ascending: false,
            })
            .limit(1)
            .maybeSingle();

        if (error) {
            throw error;
        }

        return data?.sort_order != null
            ? data.sort_order + 1
            : 0;
    }

    async function handleSubmit(
  event: FormEvent<HTMLFormElement>
) {
  event.preventDefault();

  setErrorMessage("");

  if (!values.title.trim()) {
    setErrorMessage(
      "Lütfen albüm başlığını yazın."
    );
    return;
  }

  if (
    !imageFile &&
    (!values.cover_image_url || removeExistingCover)
  ) {
    setErrorMessage(
      "Lütfen albüm için bir kapak görseli seçin."
    );
    return;
  }

  setIsSaving(true);

  try {
    // =========================
    // DÜZENLEME
    // =========================
    if (album) {
      const oldCoverUrl =
        album.cover_image_url ?? "";

      const hasNewCover =
        imageFile !== null;

      const coverImageUrl =
        await uploadCoverImage();

      const { error } = await supabase
        .from("gallery_albums")
        .update({
          title: values.title.trim(),
          slug: slugify(values.title),
          description:
            values.description.trim() || null,
          cover_image_url: coverImageUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", album.id);

      if (error) {
        if (
          hasNewCover &&
          coverImageUrl &&
          coverImageUrl !== oldCoverUrl
        ) {
          try {
            await deleteStorageFileFromUrl(
              coverImageUrl
            );
          } catch (cleanupError) {
            console.error(
              "Yeni kapak temizlenemedi:",
              cleanupError
            );
          }
        }

        throw error;
      }

      if (
        hasNewCover &&
        oldCoverUrl &&
        coverImageUrl !== oldCoverUrl
      ) {
        try {
          await deleteStorageFileFromUrl(
            oldCoverUrl
          );
        } catch (deleteError) {
          console.error(
            "Eski kapak silinemedi:",
            deleteError
          );
        }
      }

      router.push(
        "/admin/galeri"
      );

      router.refresh();

      return;
    }

    // =========================
    // YENİ ALBÜM
    // =========================

    const coverImageUrl =
      await uploadCoverImage();

    const nextSortOrder =
      await getNextSortOrder();

    const { data, error } = await supabase
      .from("gallery_albums")
      .insert({
        title: values.title.trim(),
        slug: slugify(values.title),
        description:
          values.description.trim() || null,
        cover_image_url: coverImageUrl,
        sort_order: nextSortOrder,
      })
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    router.push(
      `/admin/galeri/${data.id}/fotograflar`
    );

    router.refresh();
  } catch (error) {
    console.error(
      "Albüm kaydetme hatası:",
      error
    );

    setErrorMessage(
      error instanceof Error
        ? error.message
        : JSON.stringify(error)
    );
  } finally {
    setIsSaving(false);
  }
}

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <div className={styles.pageHeader}>
                <button
                    type="button"
                    className={styles.backButton}
                    onClick={() => router.back()}
                >
                    <ArrowLeft size={17} />
                    Geri dön
                </button>

                <button
                    type="submit"
                    className={styles.saveButton}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <LoaderCircle
                            size={18}
                            className={styles.spinner}
                        />
                    ) : (
                        <Save size={18} />
                    )}

                    {album
                        ? "Değişiklikleri kaydet"
                        : "Albümü kaydet"}
                </button>
            </div>

            {errorMessage ? (
                <div className={styles.errorMessage}>
                    {errorMessage}
                </div>
            ) : null}

            <div className={styles.formGrid}>
                <section className={styles.formCard}>
                    <div className={styles.cardHeading}>
                        <p>Albüm bilgileri</p>
                        <h2>Galeri albümü</h2>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="title">
                            Albüm başlığı
                            <span>*</span>
                        </label>

                        <input
                            id="title"
                            value={values.title}
                            onChange={(event) =>
                                updateField(
                                    "title",
                                    event.target.value
                                )
                            }
                            placeholder="Örn. 2007 Kazı Çalışmaları"
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="description">
                            Açıklama
                        </label>

                        <textarea
                            id="description"
                            value={values.description}
                            onChange={(event) =>
                                updateField(
                                    "description",
                                    event.target.value
                                )
                            }
                            placeholder="Albüm hakkında kısa bir açıklama yazabilirsiniz."
                            rows={6}
                        />
                    </div>
                </section>

                <section className={styles.formCard}>
                    <div className={styles.cardHeading}>
                        <p>Medya</p>
                        <h2>Albüm kapağı</h2>
                    </div>

                    <label
                        htmlFor="cover_image"
                        className={styles.imageUpload}
                    >
                        {previewUrl ? (
                            <div className={styles.imagePreview}>
                                <Image
                                    src={previewUrl}
                                    alt="Albüm kapak görseli"
                                    fill
                                    sizes="420px"
                                />

                                <button
                                    type="button"
                                    className={
                                        styles.removeImageButton
                                    }
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        handleRemoveImage();
                                    }}
                                    aria-label="Kapak görselini kaldır"
                                >
                                    <X size={17} />
                                </button>
                            </div>
                        ) : (
                            <div
                                className={
                                    styles.imagePlaceholder
                                }
                            >
                                <ImagePlus size={34} />
                                <strong>
                                    Kapak görseli seçin
                                </strong>
                                <span>
                                    JPG, PNG veya WebP — en fazla 8 MB
                                </span>
                            </div>
                        )}

                        <input
                            id="cover_image"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleImageChange}
                        />
                    </label>
                </section>
            </div>
        </form>
    );
}