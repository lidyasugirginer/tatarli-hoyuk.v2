import Image from "next/image";
import Link from "next/link";

import { createPublicClient } from "@/lib/supabase/public";

import styles from "./news.module.css";

type Language = "tr" | "en";

type NewsProps = {
  language?: Language;
};

type NewsTranslation = {
  title: string;
  summary: string | null;
  slug: string;
  language: Language;
};

type NewsItem = {
  id: string;
  cover_image_url: string;
  published_at: string;
  news_translations: NewsTranslation[];
};

const content = {
  tr: {
    heading: "Son Haberler",
    error: "Haberler şu anda görüntülenemiyor.",
    empty: "Henüz haber eklenmedi.",
    readNews: "Haberi oku",
    continue: "Devamı",
    allNews: "Tüm haberler",
    newsPath: "/haberler",
    locale: "tr-TR",
  },

  en: {
    heading: "Latest News",
    error: "News is currently unavailable.",
    empty: "No news has been added yet.",
    readNews: "Read the news",
    continue: "Read more",
    allNews: "All news",
    newsPath: "/en/news",
    locale: "en-GB",
  },
} as const;

function formatDate(
  dateValue: string,
  language: Language
) {
  const date = new Date(`${dateValue}T00:00:00`);

  const locale = content[language].locale;

  return {
    day: date.toLocaleDateString(locale, {
      day: "2-digit",
    }),

    month: date
      .toLocaleDateString(locale, {
        month: "short",
      })
      .replace(".", "")
      .toLocaleUpperCase(locale),

    year: date.getFullYear().toString(),
  };
}

export default async function News({
  language = "tr",
}: NewsProps) {
  const supabase = await createPublicClient();

  const t = content[language];

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
    .eq(
      "news_translations.language",
      language
    )
    .order("published_at", {
      ascending: false,
    })
    .limit(3);

  if (error) {
    return (
      <div className={styles.news}>
        <div className={styles.headingRow}>
          <div className={styles.headingGroup}>
            <h2>{t.heading}</h2>
            <span className={styles.headingLine} />
          </div>
        </div>

        <p>{t.error}</p>
      </div>
    );
  }

  const newsItems =
    (data ?? []) as NewsItem[];

  const featuredNews = newsItems[0];

  const secondaryNews =
    newsItems.slice(1);

  function getNewsHref(slug: string) {
    return `${t.newsPath}/${slug}`;
  }

  return (
    <div className={styles.news}>
      <div className={styles.headingRow}>
        <div className={styles.headingGroup}>
          <h2>{t.heading}</h2>
          <span className={styles.headingLine} />
        </div>
      </div>

      {newsItems.length === 0 ? (
        <p>{t.empty}</p>
      ) : (
        <div className={styles.newsLayout}>
          {featuredNews &&
            featuredNews.news_translations[0] && (
              <article
                className={styles.featuredCard}
              >
                <Link
                  href={getNewsHref(
                    featuredNews
                      .news_translations[0]
                      .slug
                  )}
                  className={
                    styles.featuredImageWrapper
                  }
                  aria-label={
                    featuredNews
                      .news_translations[0]
                      .title
                  }
                >
                  <Image
                    src={
                      featuredNews.cover_image_url
                    }
                    alt={
                      featuredNews
                        .news_translations[0]
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
                          featuredNews.published_at,
                          language
                        ).day
                      }
                    </strong>

                    <span>
                      {
                        formatDate(
                          featuredNews.published_at,
                          language
                        ).month
                      }
                    </span>

                    <small>
                      {
                        formatDate(
                          featuredNews.published_at,
                          language
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

                    {featuredNews
                      .news_translations[0]
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
                      {t.readNews}

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
                  item.published_at,
                  language
                );

              const newsHref =
                getNewsHref(
                  translation.slug
                );

              return (
                <article
                  key={item.id}
                  className={
                    styles.secondaryCard
                  }
                >
                  <Link
                    href={newsHref}
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
                      <Link href={newsHref}>
                        {translation.title}
                      </Link>
                    </h3>

                    <Link
                      href={newsHref}
                      className={
                        styles.secondaryLink
                      }
                    >
                      {t.continue}

                      <span aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              );
            })}

            <Link
              href={t.newsPath}
              className={styles.allNewsLink}
            >
              {t.allNews}

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