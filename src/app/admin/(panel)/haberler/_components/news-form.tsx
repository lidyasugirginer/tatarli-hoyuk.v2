"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import RichTextEditor from "./rich-text-editor";

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
  NewsContentType,
  NewsFormValues,
  NewsItem,
  NewsLanguage,
  NewsStatus,
} from "@/types/news";

import styles from "./news-form.module.css";

const STORAGE_BUCKET = "tatarli-hoyuk-storage";

type NewsFormProps = {
  news?: NewsItem;
};

function getInitialValues(
  news?: NewsItem
): NewsFormValues {
  const turkish = news?.translations?.find(
    (translation) =>
      translation.language === "tr"
  );

  const english = news?.translations?.find(
    (translation) =>
      translation.language === "en"
  );

  return {
    cover_image_url:
      news?.cover_image_url ?? "",

    published_at:
      news?.published_at ??
      new Date()
        .toISOString()
        .slice(0, 10),

    status:
      news?.status ?? "published",

    content_type:
      news?.content_type ?? "news",

    translations: {
      tr: {
        title:
          turkish?.title ?? "",

        summary:
          turkish?.summary ?? "",

        content:
          turkish?.content ?? "",
      },

      en: {
        title:
          english?.title ?? "",

        summary:
          english?.summary ?? "",

        content:
          english?.content ?? "",
      },
    },
  };
}

export default function NewsForm({
  news,
}: NewsFormProps) {
  const router = useRouter();

  const supabase = createClient();

  const [values, setValues] =
    useState<NewsFormValues>(() =>
      getInitialValues(news)
    );

  const [
    activeLanguage,
    setActiveLanguage,
  ] =
    useState<NewsLanguage>("tr");

  const [
    imageFile,
    setImageFile,
  ] =
    useState<File | null>(null);

  const [
    previewUrl,
    setPreviewUrl,
  ] =
    useState(
      news?.cover_image_url ?? ""
    );

  const [
    isSaving,
    setIsSaving,
  ] =
    useState(false);

  const [
    isDeleting,
    setIsDeleting,
  ] =
    useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState("");

  const activeTranslation =
    values.translations[
    activeLanguage
    ];

  function updateSharedField(
    field:
      | "published_at"
      | "status"
      | "content_type",
    value: string
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateTranslationField(
    field:
      | "title"
      | "summary"
      | "content",
    value: string
  ) {
    setValues((current) => ({
      ...current,

      translations: {
        ...current.translations,

        [activeLanguage]: {
          ...current.translations[
          activeLanguage
          ],

          [field]: value,
        },
      },
    }));
  }

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setErrorMessage(
        "Lütfen bir görsel dosyası seçin."
      );

      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setErrorMessage(
        "Kapak görseli en fazla 5 MB olabilir."
      );

      return;
    }

    setErrorMessage("");

    setImageFile(file);

    setPreviewUrl(
      URL.createObjectURL(file)
    );
  }

  async function uploadCoverImage() {
    const {
      data: { user },
      error: userError,
    } =
      await supabase.auth.getUser();

    if (
      userError ||
      !user
    ) {
      throw new Error(
        "Supabase oturumu bulunamadı. Yönetim panelinden çıkış yapıp tekrar giriş yapın."
      );
    }

    if (!imageFile) {
      return (
        values.cover_image_url
      );
    }

    const extension =
      imageFile.name
        .split(".")
        .pop()
        ?.toLowerCase() ??
      "jpg";

    const fileName =
      `${crypto.randomUUID()}.${extension}`;

    const filePath =
      `news/${fileName}`;

    const {
      error: uploadError,
    } =
      await supabase.storage
        .from(
          STORAGE_BUCKET
        )
        .upload(
          filePath,
          imageFile,
          {
            cacheControl:
              "3600",

            upsert: false,
          }
        );

    if (uploadError) {
      throw new Error(
        `Görsel yüklenemedi: ${uploadError.message}`
      );
    }

    const { data } =
      supabase.storage
        .from(
          STORAGE_BUCKET
        )
        .getPublicUrl(
          filePath
        );

    return data.publicUrl;
  }

  async function saveTranslation(
    newsId: string,
    language: NewsLanguage
  ) {
    const translation =
      values.translations[
      language
      ];

    const isCompletelyEmpty =
      !translation.title.trim() &&
      !translation.summary.trim() &&
      !translation.content.trim();

    /*
      Bu dil hiç doldurulmamışsa
      translation kaydı oluşturmuyoruz.
    */

    if (
      isCompletelyEmpty
    ) {
      return;
    }

    /*
      Dil kullanılacaksa başlık
      zorunlu.
    */

    if (
      !translation.title.trim()
    ) {
      throw new Error(
        language === "tr"
          ? "Türkçe içerik için başlık zorunludur."
          : "İngilizce içerik için başlık zorunludur."
      );
    }

    const slug =
      slugify(
        translation.title
      );

    const payload = {
      news_id: newsId,

      language,

      title:
        translation.title.trim(),

      summary:
        translation.summary.trim() ||
        null,

      content:
        translation.content.trim() ||
        null,

      slug,

      updated_at:
        new Date().toISOString(),
    };

    const {
      error,
    } =
      await supabase
        .from(
          "news_translations"
        )
        .upsert(
          payload,
          {
            onConflict:
              "news_id,language",
          }
        );

    if (error) {
      throw new Error(
        error.message
      );
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      isSaving ||
      isDeleting
    ) {
      return;
    }

    setErrorMessage("");

    const turkish =
      values.translations.tr;

    const english =
      values.translations.en;

    /*
      En az bir dilde başlık
      olmak zorunda.
    */

    if (
      !turkish.title.trim() &&
      !english.title.trim()
    ) {
      setErrorMessage(
        "En az bir dil için haber başlığı girin."
      );

      return;
    }

    if (
      !values.published_at
    ) {
      setErrorMessage(
        "Lütfen yayın tarihini seçin."
      );

      return;
    }

    if (
      !imageFile &&
      !values.cover_image_url
    ) {
      setErrorMessage(
        "Lütfen bir kapak görseli seçin."
      );

      return;
    }

    setIsSaving(true);

    /*
      Yeni haber kaydı oluşturulduktan sonra
      translation aşamasında hata çıkarsa
      bu ID ile yarım kalan kaydı sileceğiz.
    */
    let createdNewsId:
      | string
      | null = null;

    try {
      const coverImageUrl =
        await uploadCoverImage();

      const newsPayload = {
        cover_image_url:
          coverImageUrl,

        published_at:
          values.published_at,

        status:
          values.status,

        content_type:
          values.content_type,

        updated_at:
          new Date()
            .toISOString(),
      };

      let newsId =
        news?.id;

      /*
        VAR OLAN HABERİ
        GÜNCELLE
      */

      if (newsId) {
        const {
          error,
        } =
          await supabase
            .from("news")
            .update(
              newsPayload
            )
            .eq(
              "id",
              newsId
            );

        if (error) {
          throw new Error(
            error.message
          );
        }
      }

      /*
        YENİ HABER
      */

      else {
        const {
          data,
          error,
        } =
          await supabase
            .from("news")
            .insert(
              newsPayload
            )
            .select("id")
            .single();

        if (error) {
          throw new Error(
            error.message
          );
        }

        if (!data?.id) {
          throw new Error(
            "Haber kaydı oluşturulamadı."
          );
        }

        newsId =
          data.id;

        createdNewsId =
          data.id;
      }

      if (!newsId) {
        throw new Error(
          "Haber kaydı oluşturulamadı."
        );
      }

      /*
        TR
      */

      await saveTranslation(
        newsId,
        "tr"
      );

      /*
        EN
      */

      await saveTranslation(
        newsId,
        "en"
      );

      /*
        HER ŞEY BAŞARILI
      */

      router.push(
        "/admin/haberler"
      );

      router.refresh();
    } catch (error) {
      let message =
        "Haber kaydedilirken bir hata oluştu.";

      if (
        error instanceof Error
      ) {
        message =
          error.message;
      } else if (
        typeof error ===
        "object" &&
        error !== null &&
        "message" in error
      ) {
        message =
          String(
            (
              error as {
                message: unknown;
              }
            ).message
          );
      }

      /*
        Sadece YENİ haber eklerken
        oluşturulan ana kayıt varsa
        ve işlem tamamlanmadıysa sil.
      */

      if (
        createdNewsId
      ) {
        const {
          error:
          cleanupError,
        } =
          await supabase
            .from("news")
            .delete()
            .eq(
              "id",
              createdNewsId
            );

        if (
          cleanupError
        ) {
          message +=
            " Yarım kalan haber kaydı otomatik olarak temizlenemedi.";
        }
      }

      setErrorMessage(
        message
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!news) {
      return;
    }

    if (
      isDeleting ||
      isSaving
    ) {
      return;
    }

    const confirmed =
      window.confirm(
        "Bu haberi silmek istediğinizden emin misiniz?"
      );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    setErrorMessage("");

    try {
      const {
        error,
      } =
        await supabase
          .from("news")
          .delete()
          .eq(
            "id",
            news.id
          );

      if (error) {
        throw new Error(
          error.message
        );
      }

      router.push(
        "/admin/haberler"
      );

      router.refresh();
    } catch (error) {
      if (
        error instanceof Error
      ) {
        setErrorMessage(
          error.message
        );
      } else {
        setErrorMessage(
          "Haber silinirken bir hata oluştu."
        );
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <form
      className={
        styles.form
      }
      onSubmit={
        handleSubmit
      }
    >
      <div
        className={
          styles.pageHeader
        }
      >
        <button
          type="button"
          className={
            styles.backButton
          }
          onClick={() =>
            router.back()
          }
        >
          <ArrowLeft
            size={17}
          />

          Geri dön
        </button>

        <div
          className={
            styles.headerActions
          }
        >
          {news ? (
            <button
              type="button"
              className={
                styles.deleteButton
              }
              onClick={
                handleDelete
              }
              disabled={
                isDeleting ||
                isSaving
              }
            >
              {isDeleting ? (
                <LoaderCircle
                  className={
                    styles.spinner
                  }
                  size={17}
                />
              ) : (
                <Trash2
                  size={17}
                />
              )}

              Haberi sil
            </button>
          ) : null}

          <button
            type="submit"
            className={
              styles.saveButton
            }
            disabled={
              isSaving ||
              isDeleting
            }
          >
            {isSaving ? (
              <LoaderCircle
                className={
                  styles.spinner
                }
                size={18}
              />
            ) : (
              <Save
                size={18}
              />
            )}

            {news
              ? "Değişiklikleri kaydet"
              : "Haberi kaydet"}
          </button>
        </div>
      </div>

      {errorMessage ? (
        <div
          className={
            styles.errorMessage
          }
        >
          {errorMessage}
        </div>
      ) : null}

      <div
        className={
          styles.formGrid
        }
      >
        <div
          className={
            styles.mainColumn
          }
        >
          <section
            className={
              styles.formCard
            }
          >
            <div
              className={
                styles.cardHeading
              }
            >
              <p>
                Haber içeriği
              </p>

              <h2>
                {activeLanguage ===
                  "tr"
                  ? "Türkçe içerik"
                  : "English content"}
              </h2>
            </div>

            <div
              className={
                styles.languageTabs
              }
            >
              <button
                type="button"
                className={`${styles.languageTab} ${activeLanguage ===
                    "tr"
                    ? styles.languageTabActive
                    : ""
                  }`}
                onClick={() =>
                  setActiveLanguage(
                    "tr"
                  )
                }
              >
                Türkçe
              </button>

              <button
                type="button"
                className={`${styles.languageTab} ${activeLanguage ===
                    "en"
                    ? styles.languageTabActive
                    : ""
                  }`}
                onClick={() =>
                  setActiveLanguage(
                    "en"
                  )
                }
              >
                English
              </button>
            </div>

            <div
              className={
                styles.field
              }
            >
              <label
                htmlFor="title"
              >
                Başlık
                <span>*</span>
              </label>

              <input
                id="title"
                value={
                  activeTranslation.title
                }
                onChange={(
                  event
                ) =>
                  updateTranslationField(
                    "title",
                    event
                      .target
                      .value
                  )
                }
                placeholder={
                  activeLanguage ===
                    "tr"
                    ? "Haber başlığını yazın"
                    : "Enter the news title"
                }
              />
            </div>

            <div
              className={
                styles.field
              }
            >
              <label
                htmlFor="summary"
              >
                Özet
              </label>

              <textarea
                id="summary"
                value={
                  activeTranslation.summary
                }
                onChange={(
                  event
                ) =>
                  updateTranslationField(
                    "summary",
                    event
                      .target
                      .value
                  )
                }
                placeholder={
                  activeLanguage ===
                    "tr"
                    ? "Haberin kısa özetini yazın"
                    : "Enter a short summary"
                }
                rows={5}
              />
            </div>

            <div
              className={
                styles.field
              }
            >
              <label
                htmlFor="content"
              >
                Haber içeriği
              </label>

              <RichTextEditor
                key={activeLanguage}
                value={activeTranslation.content}
                onChange={(html) =>
                  updateTranslationField(
                    "content",
                    html
                  )
                }
              />
            </div>
          </section>
        </div>

        <div
          className={
            styles.sideColumn
          }
        >
          <section
            className={
              styles.formCard
            }
          >
            <div
              className={
                styles.cardHeading
              }
            >
              <p>
                Yayın bilgileri
              </p>

              <h2>
                Durum ve tarih
              </h2>
            </div>

            <div
              className={
                styles.field
              }
            >
              <label
                htmlFor="content_type"
              >
                İçerik türü
              </label>

              <select
                id="content_type"
                value={
                  values.content_type
                }
                onChange={(
                  event
                ) =>
                  updateSharedField(
                    "content_type",
                    event
                      .target
                      .value as NewsContentType
                  )
                }
              >
                <option value="news">
                  Haber
                </option>

                <option value="announcement">
                  Duyuru
                </option>
              </select>
            </div>

            <div
              className={
                styles.field
              }
            >
              <label
                htmlFor="status"
              >
                Yayın durumu
              </label>

              <select
                id="status"
                value={
                  values.status
                }
                onChange={(
                  event
                ) =>
                  updateSharedField(
                    "status",
                    event
                      .target
                      .value as NewsStatus
                  )
                }
              >
                <option value="published">
                  Yayında
                </option>

                <option value="draft">
                  Taslak
                </option>

                <option value="archived">
                  Arşiv
                </option>
              </select>
            </div>

            <div
              className={
                styles.field
              }
            >
              <label
                htmlFor="published_at"
              >
                Yayın tarihi
                <span>*</span>
              </label>

              <input
                id="published_at"
                type="date"
                value={
                  values.published_at
                }
                onChange={(
                  event
                ) =>
                  updateSharedField(
                    "published_at",
                    event
                      .target
                      .value
                  )
                }
              />
            </div>
          </section>

          <section
            className={
              styles.formCard
            }
          >
            <div
              className={
                styles.cardHeading
              }
            >
              <p>
                Medya
              </p>

              <h2>
                Kapak görseli
              </h2>
            </div>

            <label
              htmlFor="cover_image"
              className={
                styles.imageUpload
              }
            >
              {previewUrl ? (
                <div
                  className={
                    styles.imagePreview
                  }
                >
                  <Image
                    src={
                      previewUrl
                    }
                    alt="Haber kapak görseli"
                    fill
                    sizes="360px"
                  />
                </div>
              ) : (
                <div
                  className={
                    styles.imagePlaceholder
                  }
                >
                  <ImagePlus
                    size={29}
                  />

                  <strong>
                    Görsel seçin
                  </strong>

                  <span>
                    JPG, PNG veya
                    WebP — en fazla
                    5 MB
                  </span>
                </div>
              )}

              <input
                id="cover_image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={
                  handleImageChange
                }
              />
            </label>
          </section>
        </div>
      </div>
    </form>
  );
}