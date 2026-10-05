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
  Link2,
  LoaderCircle,
  Save,
  X,
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

  const [remoteImageUrl, setRemoteImageUrl] = useState("");
  const [isUploadingUrl, setIsUploadingUrl] = useState(false);
  const [urlUploadError, setUrlUploadError] = useState("");

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
    setUrlUploadError("");
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleRemoveImage() {
    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setImageFile(null);
    updateField("cover_image_url", "");
    setPreviewUrl("");
    setErrorMessage("");
    setUrlUploadError("");
  }

  async function handleUploadFromUrl() {
    const trimmedUrl = remoteImageUrl.trim();
    if (!trimmedUrl) {
      setUrlUploadError("Lütfen bir görsel URL'si girin.");
      return;
    }

    if (!trimmedUrl.startsWith("https://")) {
      setUrlUploadError(
        "Yalnızca https:// ile başlayan görsel bağlantıları kabul edilir."
      );
      return;
    }

    setIsUploadingUrl(true);
    setUrlUploadError("");
    setErrorMessage("");

    try {
      const res = await fetch(
        "/api/admin/publications/cover-from-url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl: trimmedUrl }),
        }
      );

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        setUrlUploadError(
          data?.error || "Görsel indirilemedi veya yüklenemedi."
        );
        setIsUploadingUrl(false);
        return;
      }

      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }

      // Supabase Storage'a başarıyla yüklendi:
      // Kalıcı Supabase public URL'ini form alanına ve preview'a ata
      updateField("cover_image_url", data.publicUrl);
      setPreviewUrl(data.publicUrl);
      setImageFile(null);
      setRemoteImageUrl("");
    } catch {
      setUrlUploadError(
        "Görsel yüklenirken bir bağlantı hatası oluştu."
      );
    } finally {
      setIsUploadingUrl(false);
    }
  }

  async function uploadCoverImage() {
    if (!imageFile) {
      return values.cover_image_url;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error(
        "Supabase oturumu bulunamadı. Yönetim panelinden çıkış yapıp tekrar giriş yapın."
      );
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
  const publicationYear = Number(values.publication_year);

  const { data: lastPublication, error: orderError } =
    await supabase
      .from("publications")
      .select("sort_order")
      .eq("publication_year", publicationYear)
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

  if (orderError) {
    throw orderError;
  }

  const nextSortOrder =
    lastPublication?.sort_order != null
      ? lastPublication.sort_order + 1
      : 0;

  const { error } = await supabase
    .from("publications")
    .insert({
      ...payload,
      sort_order: nextSortOrder,
    });

  if (error) {
    throw error;
  }
}

      router.push("/admin/yayinlar");
      router.refresh();
    } catch (error) {
  console.error("Yayın kaydetme hatası:", error);

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
              className={styles.spinner}
              size={18}
            />
          ) : (
            <Save size={18} />
          )}

          {publication ? "Değişiklikleri kaydet" : "Yayını kaydet"}
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

    <button
      type="button"
      className={styles.removeImageButton}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        handleRemoveImage();
      }}
      aria-label="Kapak görselini kaldır"
      title="Görseli kaldır"
    >
      <X size={17} />
    </button>
  </div>
) : (
                <div className={styles.imagePlaceholder}>
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

            <div className={styles.urlUploadSection}>
              <div className={styles.urlDivider}>
                <span>veya kapak URL&apos;si</span>
              </div>

              <div className={styles.urlInputRow}>
                <input
                  type="url"
                  value={remoteImageUrl}
                  onChange={(event) =>
                    setRemoteImageUrl(event.target.value)
                  }
                  placeholder="https://... (Örn. Academia kapak URL'si)"
                  disabled={isUploadingUrl}
                  className={styles.urlInput}
                />

                <button
                  type="button"
                  onClick={handleUploadFromUrl}
                  disabled={
                    isUploadingUrl || !remoteImageUrl.trim()
                  }
                  className={styles.urlUploadButton}
                >
                  {isUploadingUrl ? (
                    <LoaderCircle
                      className={styles.spinner}
                      size={15}
                    />
                  ) : (
                    <Link2 size={15} />
                  )}
                  <span>
                    {isUploadingUrl
                      ? "Yükleniyor..."
                      : "URL'den Yükle"}
                  </span>
                </button>
              </div>

              {urlUploadError ? (
                <p className={styles.urlErrorText}>
                  {urlUploadError}
                </p>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}