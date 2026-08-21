import Image from "next/image";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import type { GalleryAlbum } from "@/types/gallery";

import styles from "./page.module.css";
import PageHeader from "@/components/shared/PageHeader";

export default async function GaleriPage() {
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

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <PageHeader
  breadcrumb="Galeri"
  eyebrow="Tatarlı Höyük Kazısı"
  title="Galeri"
/>

        {error ? (
          <section className={styles.emptyState}>
            <p>Galeri şu anda yüklenemiyor.</p>
          </section>
        ) : albums.length === 0 ? (
          <section className={styles.emptyState}>
            <p>Henüz galeri albümü eklenmedi.</p>
          </section>
        ) : (
          <section className={styles.albumGrid}>
            {albums.map((album) => (
              <Link
                key={album.id}
                href={`/galeri/${album.slug}`}
                className={styles.albumCard}
              >
                <div className={styles.coverWrapper}>
                  {album.cover_image_url ? (
                    <Image
                      src={album.cover_image_url}
                      alt={`${album.title} albüm kapağı`}
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