import Image from "next/image";
import Link from "next/link";

import PageHeader from "@/components/shared/PageHeader";
import { createClient } from "@/lib/supabase/server";

import styles from "../../app/(website)/haberler/page.module.css";

type Language = "tr" | "en";

type NewsArchivePageProps = {
  language: Language;
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
  content_type: "news" | "announcement";
  news_translations: NewsTranslation[];
};

const pageContent = {
  tr: {
    breadcrumb: "Haberler",
    eyebrow: "Tatarlı Höyük Kazısı",
    title: "Haberler ve Duyurular",

    error:
      "Haberler ve duyurular şu anda görüntülenemiyor.",

    empty:
      "Henüz haber veya duyuru eklenmedi.",

    news: "Haber",
    announcement: "Duyuru",

    readNews: "Haberi Oku",
    readAnnouncement: "Duyuruyu Oku",

    basePath: "/haberler",
    locale: "tr-TR",
  },

  en: {
    breadcrumb: "News",
    eyebrow: "Tatarlı Höyük Excavation",
    title: "News and Announcements",

    error:
      "News and announcements are currently unavailable.",

    empty:
      "No news or announcements have been added yet.",

    news: "News",
    announcement: "Announcement",

    readNews: "Read News",
    readAnnouncement: "Read Announcement",

    basePath: "/en/news",
    locale: "en-GB",
  },
} as const;

function formatDate(
  dateValue: string,
  language: Language
) {
  const date = new Date(
    `${dateValue}T00:00:00`
  );

  const locale =
    pageContent[language].locale;

  return {
    day: date.toLocaleDateString(locale, {
      day: "2-digit",
    }),

    month: date
      .toLocaleDateString(locale, {
        month: "long",
      })
      .toLocaleUpperCase(locale),

    year: date.getFullYear().toString(),
  };
}

export default async function NewsArchivePage({
  language,
}: NewsArchivePageProps) {
  const supabase = await createClient();

  const t = pageContent[language];

  const { data, error } = await supabase
    .from("news")
    .select(`
      id,
      cover_image_url,
      published_at,
      content_type,
      news_translations!inner (
        title,
        summary,
        slug,
        language
      )
    `)
    .eq("status", "published")
    .eq(
      "news_translations.language",
      language
    )
    .order("published_at", {
      ascending: false,
    });

  const newsItems =
    (data ?? []) as NewsItem[];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <PageHeader
          breadcrumb={t.breadcrumb}
          eyebrow={t.eyebrow}
          title={t.title}
        />

        {error ? (
          <section
            className={styles.emptyState}
          >
            <p>{t.error}</p>
          </section>
        ) : newsItems.length === 0 ? (
          <section
            className={styles.emptyState}
          >
            <p>{t.empty}</p>
          </section>
        ) : (
          <section
            className={styles.newsArchive}
          >
            <div className={styles.newsGrid}>
              {newsItems.map((item) => {
                const translation =
                  item.news_translations[0];

                if (!translation) {
                  return null;
                }

                const date = formatDate(
                  item.published_at,
                  language
                );

                const href =
                  `${t.basePath}/${translation.slug}`;

                const isAnnouncement =
                  item.content_type ===
                  "announcement";

                const categoryLabel =
                  isAnnouncement
                    ? t.announcement
                    : t.news;

                const readLabel =
                  isAnnouncement
                    ? t.readAnnouncement
                    : t.readNews;

                return (
                  <article
                    key={item.id}
                    className={styles.newsCard}
                  >
                    <Link
                      href={href}
                      className={
                        styles.imageLink
                      }
                      aria-label={
                        translation.title
                      }
                    >
                      <div
                        className={
                          styles.imageWrapper
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
                          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                          className={
                            styles.image
                          }
                        />

                        <div
                          className={
                            styles.imageOverlay
                          }
                        />

                        <div
                          className={
                            styles.dateBox
                          }
                        >
                          <strong>
                            {date.day}
                          </strong>

                          <span>
                            {date.month}
                          </span>

                          <small>
                            {date.year}
                          </small>
                        </div>
                      </div>
                    </Link>

                    <div
                      className={styles.content}
                    >
                      <p
                        className={
                          styles.category
                        }
                      >
                        {categoryLabel}
                      </p>

                      <h2>
                        <Link href={href}>
                          {translation.title}
                        </Link>
                      </h2>

                      {translation.summary ? (
                        <p
                          className={
                            styles.summary
                          }
                        >
                          {
                            translation.summary
                          }
                        </p>
                      ) : null}

                      <Link
                        href={href}
                        className={
                          styles.readMore
                        }
                      >
                        {readLabel}

                        <span
                          aria-hidden="true"
                        >
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