import Image from "next/image";
import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

import styles from "./news.module.css";

type NewsTranslation = {
  title: string;
  summary: string | null;
  slug: string;
  language: "tr";
};

type NewsItem = {
  id: string;
  cover_image_url: string;
  published_at: string;
  news_translations: NewsTranslation[];
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
        cover_image_url,
        published_at,
        news_translations!inner (
          title,
          summary,
          slug,
          language
        )
      `
    )
    .eq("status", "published")
    .eq("news_translations.language", "tr")
    .order("published_at", {
      ascending: false,
    })
    .limit(3);

  if (error) {
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

  const newsItems =
    (data ?? []) as NewsItem[];

  const featuredNews =
    newsItems[0];

  const secondaryNews =
    newsItems.slice(1);

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
          {featuredNews &&
            featuredNews.news_translations[0] && (
              <article className={styles.featuredCard}>
                <Link
                  href={`/haberler/${featuredNews.news_translations[0].slug}`}
                  className={
                    styles.featuredImageWrapper
                  }
                  aria-label={
                    featuredNews.news_translations[0]
                      .title
                  }
                >
                  <Image
                    src={
                      featuredNews.cover_image_url
                    }
                    alt={
                      featuredNews.news_translations[0]
                        .title
                    }
                    fill
                    sizes="(max-width: 760px) 100vw, 420px"
                    className={styles.image}
                  />

                  <div
                    className={styles.imageOverlay}
                  />

                  <div className={styles.dateBox}>
                    <strong>
                      {
                        formatDate(
                          featuredNews.published_at
                        ).day
                      }
                    </strong>

                    <span>
                      {
                        formatDate(
                          featuredNews.published_at
                        ).month
                      }
                    </span>

                    <small>
                      {
                        formatDate(
                          featuredNews.published_at
                        ).year
                      }
                    </small>
                  </div>

                  <div
                    className={
                      styles.featuredContent
                    }
                  >
                    <h3>
                      {
                        featuredNews
                          .news_translations[0]
                          .title
                      }
                    </h3>

                    {featuredNews.news_translations[0]
                      .summary ? (
                      <p>
                        {
                          featuredNews
                            .news_translations[0]
                            .summary
                        }
                      </p>
                    ) : null}

                    <span
                      className={styles.readLink}
                    >
                      Haberi oku
                      <span aria-hidden="true">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </article>
            )}

          <div className={styles.secondaryList}>
            {secondaryNews.map((item) => {
              const translation =
                item.news_translations[0];

              if (!translation) {
                return null;
              }

              const formattedDate =
                formatDate(
                  item.published_at
                );

              return (
                <article
                  key={item.id}
                  className={
                    styles.secondaryCard
                  }
                >
                  <Link
                    href={`/haberler/${translation.slug}`}
                    className={
                      styles.secondaryImageWrapper
                    }
                    aria-label={
                      translation.title
                    }
                  >
                    <Image
                      src={
                        item.cover_image_url
                      }
                      alt={
                        translation.title
                      }
                      fill
                      sizes="110px"
                      className={styles.image}
                    />
                  </Link>

                  <div
                    className={
                      styles.secondaryDate
                    }
                  >
                    <strong>
                      {formattedDate.day}
                    </strong>

                    <span>
                      {formattedDate.month}

                      <small>
                        {formattedDate.year}
                      </small>
                    </span>
                  </div>

                  <div
                    className={
                      styles.secondaryContent
                    }
                  >
                    <h3>
                      <Link
                        href={`/haberler/${translation.slug}`}
                      >
                        {translation.title}
                      </Link>
                    </h3>

                    <Link
                      href={`/haberler/${translation.slug}`}
                      className={
                        styles.secondaryLink
                      }
                    >
                      Devamı
                      <span aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              );
            })}

            <Link
              href="/haberler"
              className={styles.allNewsLink}
            >
              Tüm haberler
              <span aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}