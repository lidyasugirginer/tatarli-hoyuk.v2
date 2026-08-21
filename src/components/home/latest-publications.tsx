import Image from "next/image";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import type { PublicationItem } from "@/types/publication";

import styles from "./latest-publications.module.css";

export default async function LatestPublications() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("publications")
    .select(
      `
        id,
        title,
        authors,
        publication_year,
        publication_type,
        cover_image_url,
        publication_url
      `
    )
    .order("publication_year", {
      ascending: false,
    })
    .limit(3);

  if (error) {
    console.error(
      "Anasayfa yayınları alınamadı:",
      error
    );
  }

  const publications =
    (data ?? []) as PublicationItem[];

  return (
    <div className={styles.publications}>
      <div className={styles.headingRow}>
        <div className={styles.headingGroup}>
          <h2>Son Yayınlar</h2>
          <span className={styles.headingLine} />
        </div>
      </div>

      {publications.length > 0 ? (
        <div className={styles.publicationGrid}>
          {publications.map((publication) => (
            <article
              key={publication.id}
              className={styles.publicationCard}
            >
              <Link
                href={publication.publication_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.coverLink}
                aria-label={`${publication.title} yayınını aç`}
              >
                <div className={styles.coverWrapper}>
                  <Image
                    src={publication.cover_image_url}
                    alt={`${publication.title} kapak görseli`}
                    fill
                    sizes="(max-width: 720px) 44vw, 190px"
                    className={styles.coverImage}
                  />

                  <div className={styles.coverOverlay}>
                    <span>İncele</span>
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </Link>

              <div className={styles.publicationInfo}>
                <span className={styles.year}>
                  {publication.publication_year}
                </span>

                <h3>
                  <Link
                    href={publication.publication_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {publication.title}
                  </Link>
                </h3>

                <span className={styles.type}>
                  {publication.publication_type}
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p>Henüz yayın eklenmedi.</p>
      )}

      <Link
        href="/yayinlar"
        className={styles.allPublicationsLink}
      >
        Tüm yayınlar
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}