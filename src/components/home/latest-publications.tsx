import Image from "next/image";
import Link from "next/link";

import { createPublicClient } from "@/lib/supabase/public";
import type { PublicationItem } from "@/types/publication";

import styles from "./latest-publications.module.css";

type Language = "tr" | "en";

type LatestPublicationsProps = {
  language?: Language;
};

const content = {
  tr: {
    heading: "Son Yayınlar",
    view: "İncele",
    empty: "Henüz yayın eklenmedi.",
    allPublications: "Tüm yayınlar",
    publicationsPath: "/yayinlar",
    openPublication: "yayınını aç",
    coverImage: "kapak görseli",
  },

  en: {
    heading: "Latest Publications",
    view: "View",
    empty: "No publications have been added yet.",
    allPublications: "All publications",
    publicationsPath: "/en/publications",
    openPublication: "open publication",
    coverImage: "cover image",
  },
} as const;

function getPublicationType(
  type: string,
  language: Language
) {
  if (language === "tr") {
    return type;
  }

  const typeTranslations: Record<string, string> = {
    "Makale": "Article",
    "Kitap": "Book",
    "Kitap Bölümü": "Book Chapter",
    "Bildiri": "Conference Paper",
    "Tez": "Thesis",
  };

  return typeTranslations[type] ?? type;
}

export default async function LatestPublications({
  language = "tr",
}: LatestPublicationsProps) {
  const supabase = await createPublicClient();

  const t = content[language];

  const { data } = await supabase
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

  const publications =
    (data ?? []) as PublicationItem[];

  return (
    <div className={styles.publications}>
      <div className={styles.headingRow}>
        <div className={styles.headingGroup}>
          <h2>{t.heading}</h2>
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
                aria-label={
                  language === "tr"
                    ? `${publication.title} ${t.openPublication}`
                    : `${t.openPublication}: ${publication.title}`
                }
              >
                <div className={styles.coverWrapper}>
                  <Image
                    src={publication.cover_image_url}
                    alt={`${publication.title} ${t.coverImage}`}
                    fill
                    sizes="(max-width: 720px) 44vw, 190px"
                    className={styles.coverImage}
                  />

                  <div className={styles.coverOverlay}>
                    <span>{t.view}</span>
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
                  {getPublicationType(
                    publication.publication_type,
                    language
                  )}
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p>{t.empty}</p>
      )}

      <Link
        href={t.publicationsPath}
        className={`${styles.allPublicationsLink} ${
          language === "en" ? styles.allPublicationsLinkEn : ""
        }`}
      >
        {t.allPublications}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}