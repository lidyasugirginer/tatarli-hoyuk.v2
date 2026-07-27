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
  Trash2,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils/slugify";

import type {
  NewsFormValues,
  NewsItem,
  NewsStatus,
} from "@/types/news";

import styles from "./news-form.module.css";

const STORAGE_BUCKET = "tatarli-hoyuk-storage";

type NewsFormProps = {
  news?: NewsItem;
};

const initialValues: NewsFormValues = {
  title_tr: "",
  title_en: "",
  summary_tr: "",
  summary_en: "",
  cover_image_url: "",
  url: "",
  published_at: new Date().toISOString().slice(0, 10),
  status: "published",
};

export default function NewsForm({
  news,
}: NewsFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [values, setValues] = useState<NewsFormValues>(
    news
      ? {
          title_tr: news.title_tr,
          title_en: news.title_en,
          summary_tr: news.summary_tr,
          summary_en: news.summary_en,
          cover_image_url: news.cover_image_url,
          url: news.url,
          published_at: news.published_at,
          status: news.status,
        }
      : initialValues
  );

  const [imageFile, setImageFile] = useState<File | null>(
    null
  );

  const [previewUrl, setPreviewUrl] = useState(
    news?.cover_image_url ?? ""
  );

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(
    field: keyof NewsFormValues,
    value: string
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleTurkishTitleChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const value = event.target.value;

    setValues((current) => ({
      ...current,
      title_tr: value,
      url:
        news || current.url
          ? current.url
          : slugify(value),
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
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log("SUPABASE USER:", user);
  console.log("SUPABASE USER ERROR:", userError);

  if (userError || !user) {
    throw new Error(
      "Supabase oturumu bulunamadı. Yönetim panelinden çıkış yapıp tekrar giriş yapın."
    );
  }

  if (!imageFile) {
    return values.cover_image_url;
  }

    const extension =
      imageFile.name.split(".").pop()?.toLowerCase() ??
      "jpg";

    const fileName = `${crypto.randomUUID()}.${extension}`;
    const filePath = `news/${fileName}`;

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
      !values.title_tr.trim() ||
      !values.title_en.trim() ||
      !values.summary_tr.trim() ||
      !values.summary_en.trim() ||
      !values.url.trim() ||
      !values.published_at
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
        title_tr: values.title_tr.trim(),
        title_en: values.title_en.trim(),
        summary_tr: values.summary_tr.trim(),
        summary_en: values.summary_en.trim(),
        cover_image_url: coverImageUrl,
        url: slugify(values.url),
        published_at: values.published_at,
        status: values.status,
      };

      if (news) {
        const { error } = await supabase
          .from("news")
          .update(payload)
          .eq("id", news.id);

        if (error) {
          throw error;
        }
      } else {
        const { error } = await supabase
          .from("news")
          .insert(payload);

        if (error) {
          throw error;
        }
      }

      router.push("/site-yonetimi/haberler");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Haber kaydedilirken bir hata oluştu."
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!news) {
      return;
    }

    const confirmed = window.confirm(
      "Bu haberi silmek istediğinizden emin misiniz?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage("");

    try {
      const { error } = await supabase
        .from("news")
        .delete()
        .eq("id", news.id);

      if (error) {
        throw error;
      }

      router.push("/site-yonetimi/haberler");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Haber silinirken bir hata oluştu."
      );
    } finally {
      setIsDeleting(false);
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

        <div className={styles.headerActions}>
          {news ? (
            <button
              type="button"
              className={styles.deleteButton}
              onClick={handleDelete}
              disabled={isDeleting || isSaving}
            >
              {isDeleting ? (
                <LoaderCircle
                  className={styles.spinner}
                  size={17}
                />
              ) : (
                <Trash2 size={17} />
              )}

              Haberi sil
            </button>
          ) : null}

          <button
            type="submit"
            className={styles.saveButton}
            disabled={isSaving || isDeleting}
          >
            {isSaving ? (
              <LoaderCircle
                className={styles.spinner}
                size={18}
              />
            ) : (
              <Save size={18} />
            )}

            {news ? "Değişiklikleri kaydet" : "Haberi kaydet"}
          </button>
        </div>
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
              <p>Türkçe içerik</p>
              <h2>Haber bilgileri</h2>
            </div>

            <div className={styles.field}>
              <label htmlFor="title_tr">
                Türkçe başlık
                <span>*</span>
              </label>

              <input
                id="title_tr"
                value={values.title_tr}
                onChange={handleTurkishTitleChange}
                placeholder="Haber başlığını yazın"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="summary_tr">
                Türkçe özet
                <span>*</span>
              </label>

              <textarea
                id="summary_tr"
                value={values.summary_tr}
                onChange={(event) =>
                  updateField(
                    "summary_tr",
                    event.target.value
                  )
                }
                placeholder="Haberin Türkçe özetini yazın"
                rows={7}
              />
            </div>
          </section>

          <section className={styles.formCard}>
            <div className={styles.cardHeading}>
              <p>English content</p>
              <h2>İngilizce içerik</h2>
            </div>

            <div className={styles.field}>
              <label htmlFor="title_en">
                İngilizce başlık
                <span>*</span>
              </label>

              <input
                id="title_en"
                value={values.title_en}
                onChange={(event) =>
                  updateField(
                    "title_en",
                    event.target.value
                  )
                }
                placeholder="Enter the news title"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="summary_en">
                İngilizce özet
                <span>*</span>
              </label>

              <textarea
                id="summary_en"
                value={values.summary_en}
                onChange={(event) =>
                  updateField(
                    "summary_en",
                    event.target.value
                  )
                }
                placeholder="Enter the news summary"
                rows={7}
              />
            </div>
          </section>
        </div>

        <div className={styles.sideColumn}>
          <section className={styles.formCard}>
            <div className={styles.cardHeading}>
              <p>Yayın bilgileri</p>
              <h2>Durum ve tarih</h2>
            </div>

            <div className={styles.field}>
              <label htmlFor="status">Yayın durumu</label>

              <select
                id="status"
                value={values.status}
                onChange={(event) =>
                  updateField(
                    "status",
                    event.target.value as NewsStatus
                  )
                }
              >
                <option value="published">Yayında</option>
                <option value="draft">Taslak</option>
                <option value="archived">Arşiv</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="published_at">
                Yayın tarihi
                <span>*</span>
              </label>

              <input
                id="published_at"
                type="date"
                value={values.published_at}
                onChange={(event) =>
                  updateField(
                    "published_at",
                    event.target.value
                  )
                }
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="url">
                Haber adresi
                <span>*</span>
              </label>

              <div className={styles.slugInput}>
                <span>/haberler/</span>

                <input
                  id="url"
                  value={values.url}
                  onChange={(event) =>
                    updateField(
                      "url",
                      slugify(event.target.value)
                    )
                  }
                  placeholder="haber-adresi"
                />
              </div>
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
                    alt="Haber kapak görseli"
                    fill
                    sizes="360px"
                  />
                </div>
              ) : (
                <div className={styles.imagePlaceholder}>
                  <ImagePlus size={29} />
                  <strong>Görsel seçin</strong>
                  <span>JPG, PNG veya WebP — en fazla 5 MB</span>
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