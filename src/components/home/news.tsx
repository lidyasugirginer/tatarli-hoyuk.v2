import Image from "next/image";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

import styles from "./news.module.css";

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
        month: "short",
      })
      .replace(".", "")
      .toLocaleUpperCase("tr-TR"),

    year: date.getFullYear().toString(),
  };
}

export default async function News() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("news")
    .select(
      `
        id,
        title_tr,
        summary_tr,
        cover_image_url,
        url,
        published_at
      `
    )
    .order("published_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Haberler alınamadı:", error.message);

    return (
      <div className={styles.news}>
        <div className={styles.headingRow}>
          <div className={styles.headingGroup}>
            <h2>Son Haberler</h2>
            <span className={styles.headingLine} />
          </div>
        </div>

        <p>Haberler şu anda görüntülenemiyor.</p>
      </div>
    );
  }

  const newsItems = (data ?? []) as NewsItem[];

  const featuredNews = newsItems[0];
  const secondaryNews = newsItems.slice(1);

  return (
    <div className={styles.news}>
      <div className={styles.headingRow}>
        <div className={styles.headingGroup}>
          <h2>Son Haberler</h2>
          <span className={styles.headingLine} />
        </div>
      </div>

      {newsItems.length === 0 ? (
        <p>Henüz haber eklenmedi.</p>
      ) : (
        <div className={styles.newsLayout}>
          {featuredNews && (
            <article className={styles.featuredCard}>
              <Link
                href={featuredNews.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.featuredImageWrapper}
                aria-label={featuredNews.title_tr}
              >
                <Image
                  src={featuredNews.cover_image_url}
                  alt={featuredNews.title_tr}
                  fill
                  sizes="(max-width: 760px) 100vw, 420px"
                  className={styles.image}
                />

                <div className={styles.imageOverlay} />

                <div className={styles.dateBox}>
                  <strong>
                    {formatDate(featuredNews.published_at).day}
                  </strong>

                  <span>
                    {formatDate(featuredNews.published_at).month}
                  </span>

                  <small>
                    {formatDate(featuredNews.published_at).year}
                  </small>
                </div>

                <div className={styles.featuredContent}>
                  <h3>{featuredNews.title_tr}</h3>

                  <p>{featuredNews.summary_tr}</p>

                  <span className={styles.readLink}>
                    Haberi oku
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </article>
          )}

          <div className={styles.secondaryList}>
            {secondaryNews.map((item) => {
              const formattedDate = formatDate(item.published_at);

              return (
                <article key={item.id} className={styles.secondaryCard}>
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondaryImageWrapper}
                    aria-label={item.title_tr}
                  >
                    <Image
                      src={item.cover_image_url}
                      alt={item.title_tr}
                      fill
                      sizes="110px"
                      className={styles.image}
                    />
                  </Link>

                  <div className={styles.secondaryDate}>
                    <strong>{formattedDate.day}</strong>

                    <span>
                      {formattedDate.month}
                      <small>{formattedDate.year}</small>
                    </span>
                  </div>

                  <div className={styles.secondaryContent}>
                    <h3>
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.title_tr}
                      </Link>
                    </h3>

                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.secondaryLink}
                    >
                      Devamı
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}

            <Link href="/haberler" className={styles.allNewsLink}>
              Tüm haberler
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}