import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import GalleryLightbox from "./gallery-lightbox";

import styles from "./page.module.css";

type GalleryAlbumPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function GalleryAlbumPage({
    params,
}: GalleryAlbumPageProps) {
    const { slug } = await params;

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

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <header className={styles.pageHeader}>
                    <nav className={styles.breadcrumb}>
                        <Link href="/">Ana Sayfa</Link>
                        <span>/</span>

                        <Link href="/galeri">Galeri</Link>
                        <span>/</span>

                        <span>{album.title}</span>
                    </nav>

                    <p className={styles.eyebrow}>
                        Tatarlı Höyük Kazısı
                    </p>

                    <h1>{album.title}</h1>

                    <div className={styles.titleLine} />

                    {album.description ? (
                        <p className={styles.description}>
                            {album.description}
                        </p>
                    ) : null}
                </header>

                {imagesError ? (
                    <div className={styles.emptyState}>
                        Fotoğraflar şu anda yüklenemiyor.
                    </div>
                ) : galleryImages.length === 0 ? (
                    <div className={styles.emptyState}>
                        Bu albüme henüz fotoğraf eklenmedi.
                    </div>
                ) : (
                    <GalleryLightbox
                        images={galleryImages}
                        albumTitle={album.title}
                    />
                )}
            </div>
        </main>
    );
}