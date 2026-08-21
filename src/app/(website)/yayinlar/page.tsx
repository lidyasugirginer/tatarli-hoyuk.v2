import Image from "next/image";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import type { PublicationItem } from "@/types/publication";

import styles from "./page.module.css";
import PageHeader from "@/components/shared/PageHeader";

export default async function YayinlarPage() {
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

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <PageHeader
  breadcrumb="Yayınlar"
  eyebrow="Tatarlı Höyük Kazısı"
  title="Yayınlar"
/>

        {error ? (
          <section className={styles.emptyState}>
            <p>Yayınlar şu anda yüklenemiyor.</p>
          </section>
        ) : publications.length === 0 ? (
          <section className={styles.emptyState}>
            <p>Henüz yayın eklenmedi.</p>
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
                    alt={`${publication.title} kapak görseli`}
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
                      {publication.publication_type}
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