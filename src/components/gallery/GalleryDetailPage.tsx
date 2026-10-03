import Link from "next/link";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import GalleryLightbox from "./GalleryLightbox";
import styles from "./GalleryDetailPage.module.css";

type Language = "tr" | "en";

type GalleryDetailPageProps = {
  slug: string;
  language?: Language;
};

const content = {
  tr: {
    homeLink: "/",
    homeLabel: "Ana Sayfa",
    galleryLink: "/galeri",
    galleryLabel: "Galeri",
    eyebrow: "Tatarlı Höyük Kazısı",
    error: "Fotoğraflar şu anda yüklenemiyor.",
    empty: "Bu albüme henüz fotoğraf eklenmedi.",
    breadcrumbAria: "Sayfa yolu",
  },
  en: {
    homeLink: "/en",
    homeLabel: "Home",
    galleryLink: "/en/gallery",
    galleryLabel: "Gallery",
    eyebrow: "Tatarlı Höyük Excavation",
    error: "Photos are currently unavailable.",
    empty: "No photos have been added to this album yet.",
    breadcrumbAria: "Breadcrumb",
  },
} as const;

export default async function GalleryDetailPage({
  slug,
  language = "tr",
}: GalleryDetailPageProps) {
  const supabase = await createClient();

  const { data: album, error: albumError } = await supabase
    .from("gallery_albums")
    .select(
      `
        id,
        title,
        slug,
        description,
        cover_image_url
      `
    )
    .eq("slug", slug)
    .single();

  if (albumError || !album) {
    notFound();
  }

  const { data: images, error: imagesError } = await supabase
    .from("gallery_images")
    .select(
      `
        id,
        image_url,
        caption,
        alt_text,
        created_at
      `
    )
    .eq("album_id", album.id)
    .order("created_at", {
      ascending: true,
    });

  const galleryImages = images ?? [];
  const t = content[language];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <nav
            className={styles.breadcrumb}
            aria-label={t.breadcrumbAria}
          >
            <Link href={t.homeLink}>{t.homeLabel}</Link>
            <span aria-hidden="true">/</span>

            <Link href={t.galleryLink}>{t.galleryLabel}</Link>
            <span aria-hidden="true">/</span>

            <span aria-current="page">{album.title}</span>
          </nav>

          <p className={styles.eyebrow}>{t.eyebrow}</p>

          <h1>{album.title}</h1>

          <div
            className={styles.titleLine}
            aria-hidden="true"
          />

          {album.description ? (
            <p className={styles.description}>
              {album.description}
            </p>
          ) : null}
        </header>

        {imagesError ? (
          <div className={styles.emptyState}>{t.error}</div>
        ) : galleryImages.length === 0 ? (
          <div className={styles.emptyState}>{t.empty}</div>
        ) : (
          <GalleryLightbox
            images={galleryImages}
            albumTitle={album.title}
            language={language}
          />
        )}
      </div>
    </main>
  );
}

