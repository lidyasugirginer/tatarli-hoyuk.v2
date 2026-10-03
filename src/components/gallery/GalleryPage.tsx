import Image from "next/image";
import Link from "next/link";

import PageHeader from "@/components/shared/PageHeader";
import { createClient } from "@/lib/supabase/server";
import type { GalleryAlbum } from "@/types/gallery";

import styles from "./GalleryPage.module.css";

type Language = "tr" | "en";

type GalleryPageProps = {
  language?: Language;
};

const content = {
  tr: {
    breadcrumb: "Galeri",
    eyebrow: "Tatarlı Höyük Kazısı",
    title: "Galeri",
    error: "Galeri şu anda yüklenemiyor.",
    empty: "Henüz galeri albümü eklenmedi.",
    coverAltSuffix: "albüm kapağı",
    basePath: "/galeri",
  },
  en: {
    breadcrumb: "Gallery",
    eyebrow: "Tatarlı Höyük Excavation",
    title: "Gallery",
    error: "Gallery is currently unavailable.",
    empty: "No gallery albums have been added yet.",
    coverAltSuffix: "album cover",
    basePath: "/en/gallery",
  },
} as const;

export default async function GalleryPage({
  language = "tr",
}: GalleryPageProps) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gallery_albums")
    .select(
      `
        id,
        title,
        slug,
        description,
        cover_image_url,
        sort_order,
        created_at,
        updated_at
      `
    )
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  const albums = (data ?? []) as GalleryAlbum[];
  const t = content[language];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <PageHeader
          breadcrumb={t.breadcrumb}
          eyebrow={t.eyebrow}
          title={t.title}
          language={language}
        />

        {error ? (
          <section className={styles.emptyState}>
            <p>{t.error}</p>
          </section>
        ) : albums.length === 0 ? (
          <section className={styles.emptyState}>
            <p>{t.empty}</p>
          </section>
        ) : (
          <section className={styles.albumGrid}>
            {albums.map((album) => (
              <Link
                key={album.id}
                href={`${t.basePath}/${album.slug}`}
                className={styles.albumCard}
              >
                <div className={styles.coverWrapper}>
                  {album.cover_image_url ? (
                    <Image
                      src={album.cover_image_url}
                      alt={`${album.title} ${t.coverAltSuffix}`}
                      fill
                      sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      className={styles.cover}
                    />
                  ) : (
                    <div className={styles.coverPlaceholder} />
                  )}

                  <div className={styles.overlay} />

                  <div className={styles.albumInfo}>
                    <h2>{album.title}</h2>

                    {album.description ? (
                      <p>{album.description}</p>
                    ) : null}
                  </div>
                </div>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

