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
  BookOpen,
  ImagePlus,
  LoaderCircle,
  Save,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import type {
  PublicationFormValues,
  PublicationItem,
} from "@/types/publication";

import styles from "./publication-form.module.css";

const STORAGE_BUCKET = "tatarli-hoyuk-storage";

type PublicationFormProps = {
  publication?: PublicationItem;
};

const initialValues: PublicationFormValues = {
  title: "",
  authors: "",
  publication_year: new Date().getFullYear().toString(),
  publication_type: "Makale",
  cover_image_url: "",
  publication_url: "",
};

export default function PublicationForm({
  publication,
}: PublicationFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [values, setValues] = useState<PublicationFormValues>(
    publication
      ? {
          title: publication.title,
          authors: publication.authors,
          publication_year:
            publication.publication_year.toString(),
          publication_type: publication.publication_type,
          cover_image_url: publication.cover_image_url,
          publication_url: publication.publication_url,
        }
      : initialValues
  );

  const [imageFile, setImageFile] = useState<File | null>(
    null
  );

  const [previewUrl, setPreviewUrl] = useState(
    publication?.cover_image_url ?? ""
  );

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(
    field: keyof PublicationFormValues,
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
      setErrorMessage("Lütfen bir görsel dosyası seçin.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage(
        "Kapak görseli en fazla 5 MB olabilir."
      );
      return;
    }

    setErrorMessage("");
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function uploadCoverImage() {
    if (!imageFile) {
      return values.cover_image_url;
    }

    const extension =
      imageFile.name.split(".").pop()?.toLowerCase() ??
      "jpg";

    const fileName = `${crypto.randomUUID()}.${extension}`;
    const filePath = `publications/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(
        `Görsel yüklenemedi: ${uploadError.message}`
      );
    }

    const { data } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage("");

    if (
      !values.title.trim() ||
      !values.authors.trim() ||
      !values.publication_year ||
      !values.publication_type.trim() ||
      !values.publication_url.trim()
    ) {
      setErrorMessage(
        "Lütfen zorunlu alanların tamamını doldurun."
      );
      return;
    }

    if (!imageFile && !values.cover_image_url) {
      setErrorMessage("Lütfen bir kapak görseli seçin.");
      return;
    }

    setIsSaving(true);

    try {
      const coverImageUrl = await uploadCoverImage();

      const payload = {
        title: values.title.trim(),
        authors: values.authors.trim(),
        publication_year: Number(
          values.publication_year
        ),
        publication_type:
          values.publication_type.trim(),
        cover_image_url: coverImageUrl,
        publication_url:
          values.publication_url.trim(),
      };

      if (publication) {
        const { error } = await supabase
          .from("publications")
          .update(payload)
          .eq("id", publication.id);

        if (error) {
          throw error;
        }
      } else {
        const { error } = await supabase
          .from("publications")
          .insert(payload);

        if (error) {
          throw error;
        }
      }

      router.push("/site-yonetimi/yayinlar");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Yayın kaydedilirken bir hata oluştu."
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
              className={styles.spinner}
              size={18}
            />
          ) : (
            <Save size={18} />
          )}

          Yayını kaydet
        </button>
      </div>

      {errorMessage ? (
        <div className={styles.errorMessage}>
          {errorMessage}
        </div>
      ) : null}

      <div className={styles.formGrid}>
        <div className={styles.mainColumn}>
          <section className={styles.formCard}>
            <div className={styles.cardHeading}>
              <p>Akademik yayın</p>
              <h2>Yayın bilgileri</h2>
            </div>

            <div className={styles.field}>
              <label htmlFor="title">
                Yayın başlığı
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
                placeholder="Yayın başlığını yazın"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="authors">
                Yazarlar
                <span>*</span>
              </label>

              <textarea
                id="authors"
                value={values.authors}
                onChange={(event) =>
                  updateField(
                    "authors",
                    event.target.value
                  )
                }
                placeholder="Örn. A. Yazar, B. Yazar"
                rows={4}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="publication_url">
                Yayın bağlantısı
                <span>*</span>
              </label>

              <input
                id="publication_url"
                type="url"
                value={values.publication_url}
                onChange={(event) =>
                  updateField(
                    "publication_url",
                    event.target.value
                  )
                }
                placeholder="https://..."
              />
            </div>
          </section>
        </div>

        <div className={styles.sideColumn}>
          <section className={styles.formCard}>
            <div className={styles.cardHeading}>
              <p>Yayın ayrıntıları</p>
              <h2>Tür ve yıl</h2>
            </div>

            <div className={styles.field}>
              <label htmlFor="publication_type">
                Yayın türü
                <span>*</span>
              </label>

              <select
                id="publication_type"
                value={values.publication_type}
                onChange={(event) =>
                  updateField(
                    "publication_type",
                    event.target.value
                  )
                }
              >
                <option value="Makale">Makale</option>
                <option value="Kitap">Kitap</option>
                <option value="Kitap Bölümü">
                  Kitap Bölümü
                </option>
                <option value="Bildiri">Bildiri</option>
                <option value="Tez">Tez</option>
                <option value="Rapor">Rapor</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="publication_year">
                Yayın yılı
                <span>*</span>
              </label>

              <input
                id="publication_year"
                type="number"
                min="1900"
                max="2100"
                value={values.publication_year}
                onChange={(event) =>
                  updateField(
                    "publication_year",
                    event.target.value
                  )
                }
              />
            </div>
          </section>

          <section className={styles.formCard}>
            <div className={styles.cardHeading}>
              <p>Medya</p>
              <h2>Kapak görseli</h2>
            </div>

            <label
              htmlFor="cover_image"
              className={styles.imageUpload}
            >
              {previewUrl ? (
                <div className={styles.imagePreview}>
                  <Image
                    src={previewUrl}
                    alt="Yayın kapak görseli"
                    fill
                    sizes="360px"
                  />
                </div>
              ) : (
                <div className={styles.imagePlaceholder}>
                  <BookOpen size={29} />
                  <ImagePlus size={20} />
                  <strong>Kapak görseli seçin</strong>
                  <span>
                    JPG, PNG veya WebP — en fazla 5 MB
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
      </div>
    </form>
  );
}