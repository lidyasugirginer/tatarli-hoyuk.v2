import Image from "next/image";
import Link from "next/link";

import PageHeader from "@/components/shared/PageHeader";
import { createClient } from "@/lib/supabase/server";
import type { PublicationItem } from "@/types/publication";

import styles from "./PublicationsPage.module.css";

type Language = "tr" | "en";

type PublicationsPageProps = {
  language?: Language;
};

const content = {
  tr: {
    breadcrumb: "Yayınlar",
    eyebrow: "Tatarlı Höyük Kazısı",
    title: "Yayınlar",
    error: "Yayınlar şu anda yüklenemiyor.",
    empty: "Henüz yayın eklenmedi.",
    coverAltSuffix: "kapak görseli",
  },
  en: {
    breadcrumb: "Publications",
    eyebrow: "Tatarlı Höyük Excavation",
    title: "Publications",
    error: "Publications are currently unavailable.",
    empty: "No publications have been added yet.",
    coverAltSuffix: "cover image",
  },
} as const;

function getPublicationType(type: string, language: Language) {
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

export default async function PublicationsPage({
  language = "tr",
}: PublicationsPageProps) {
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
    });

  const publications = (data ?? []) as PublicationItem[];
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
        ) : publications.length === 0 ? (
          <section className={styles.emptyState}>
            <p>{t.empty}</p>
          </section>
        ) : (
          <section className={styles.publicationList}>
            {publications.map((publication) => (
              <article
                key={publication.id}
                className={styles.publicationItem}
              >
                <div className={styles.coverWrapper}>
                  <Image
                    src={publication.cover_image_url}
                    alt={`${publication.title} ${t.coverAltSuffix}`}
                    width={240}
                    height={340}
                    className={styles.cover}
                  />
                </div>

                <div className={styles.publicationInfo}>
                  <Link
                    href={publication.publication_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.publicationTitle}
                  >
                    {publication.title}
                  </Link>

                  <p className={styles.authors}>
                    {publication.authors}
                  </p>

                  <div className={styles.meta}>
                    <span>{publication.publication_year}</span>

                    <span className={styles.dot}>•</span>

                    <span>
                      {getPublicationType(
                        publication.publication_type,
                        language
                      )}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

