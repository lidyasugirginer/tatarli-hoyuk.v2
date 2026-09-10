import Image from "next/image";
import Link from "next/link";

import PageHeader from "@/components/shared/PageHeader";
import { createClient } from "@/lib/supabase/server";

import styles from "./page.module.css";

type NewsItem = {
  id: string;
  title_tr: string;
  summary_tr: string;
  cover_image_url: string;
  url: string;
  published_at: string;
};

function formatDate(dateValue: string) {
  const date = new Date(`${dateValue}T00:00:00`);

  return {
    day: date.toLocaleDateString("tr-TR", {
      day: "2-digit",
    }),

    month: date
      .toLocaleDateString("tr-TR", {
        month: "long",
      })
      .toLocaleUpperCase("tr-TR"),

    year: date.getFullYear().toString(),
  };
}

export default async function HaberlerPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("news")
    .select(`
      id,
      title_tr,
      summary_tr,
      cover_image_url,
      url,
      published_at
    `)
    .order("published_at", {
      ascending: false,
    });

  const newsItems = (data ?? []) as NewsItem[];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <PageHeader
          breadcrumb="Haberler"
          eyebrow="Tatarlı Höyük Kazısı"
          title="Haberler ve Duyurular"
        />

        {error ? (
          <section className={styles.emptyState}>
            <p>
              Haberler ve duyurular şu anda görüntülenemiyor.
            </p>
          </section>
        ) : newsItems.length === 0 ? (
          <section className={styles.emptyState}>
            <p>Henüz haber veya duyuru eklenmedi.</p>
          </section>
        ) : (
          <section className={styles.newsArchive}>
            <div className={styles.archiveHeading}>
              <p className={styles.archiveLabel}>
                Güncel
              </p>

              <p className={styles.archiveCount}>
                {newsItems.length} içerik
              </p>
            </div>

            <div className={styles.newsGrid}>
              {newsItems.map((item) => {
                const date = formatDate(item.published_at);

                return (
                  <article
                    key={item.id}
                    className={styles.newsCard}
                  >
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.imageLink}
                      aria-label={item.title_tr}
                    >
                      <div className={styles.imageWrapper}>
                        <Image
                          src={item.cover_image_url}
                          alt={item.title_tr}
                          fill
                          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                          className={styles.image}
                        />

                        <div className={styles.imageOverlay} />

                        <div className={styles.dateBox}>
                          <strong>{date.day}</strong>

                          <span>{date.month}</span>

                          <small>{date.year}</small>
                        </div>
                      </div>
                    </Link>

                    <div className={styles.content}>
                      <p className={styles.category}>
                        Haber
                      </p>

                      <h2>
                        <Link
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.title_tr}
                        </Link>
                      </h2>

                      {item.summary_tr && (
                        <p className={styles.summary}>
                          {item.summary_tr}
                        </p>
                      )}

                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.readMore}
                      >
                        Haberi Oku

                        <span aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}