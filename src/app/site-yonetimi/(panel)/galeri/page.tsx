import Image from "next/image";
import Link from "next/link";

import {
  Images,
  Plus,
  Pencil,
  FolderOpen,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import type { GalleryAlbum } from "@/types/gallery";

import GalleryAlbumActions from "./_components/gallery-album-actions";

import styles from "./page.module.css";

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
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Medya yönetimi</p>

          <h1>Galeri</h1>

          <p className={styles.description}>
            Albümleri oluşturabilir, kapak görsellerini düzenleyebilir
            ve albümlere ait fotoğrafları buradan yönetebilirsiniz.
          </p>
        </div>

        <Link
          href="/site-yonetimi/galeri/yeni"
          className={styles.newButton}
        >
          <Plus size={18} />
          Yeni albüm
        </Link>
      </header>

      {error ? (
        <div className={styles.message}>
          Galeri albümleri yüklenirken bir hata oluştu.
        </div>
      ) : albums.length === 0 ? (
        <div className={styles.emptyState}>
          <Images size={30} />

          <div>
            <h2>Henüz albüm oluşturulmadı</h2>
            <p>
              Oluşturduğunuz galeri albümleri burada görüntülenecek.
            </p>
          </div>
        </div>
      ) : (
        <section className={styles.albumGrid}>
          {albums.map((album, index) => (
            <article
              key={album.id}
              className={styles.albumCard}
            >
              <div className={styles.coverWrapper}>
                {album.cover_image_url ? (
                  <Image
                    src={album.cover_image_url}
                    alt={`${album.title} albüm kapağı`}
                    fill
                    sizes="320px"
                    className={styles.cover}
                  />
                ) : (
                  <div className={styles.coverPlaceholder}>
                    <Images size={30} />
                  </div>
                )}

                <div className={styles.coverOverlay} />

                <h2>{album.title}</h2>
              </div>

              <div className={styles.cardActions}>
                <Link
                  href={`/site-yonetimi/galeri/${album.id}/duzenle`}
                  className={styles.actionButton}
                >
                  <Pencil size={15} />
                  Düzenle
                </Link>

                <Link
                  href={`/site-yonetimi/galeri/${album.id}/fotograflar`}
                  className={styles.actionButton}
                >
                  <FolderOpen size={15} />
                  Fotoğraflar
                </Link>

                <GalleryAlbumActions
                  id={album.id}
                  title={album.title}
                  coverImageUrl={album.cover_image_url}
                  sortOrder={album.sort_order}
                  canMoveUp={index > 0}
                  canMoveDown={index < albums.length - 1}
                />
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}