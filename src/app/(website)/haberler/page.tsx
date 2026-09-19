export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";

import PageHeader from "@/components/shared/PageHeader";
import { createClient } from "@/lib/supabase/server";

import styles from "./page.module.css";

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
  content_type: "news" | "announcement";
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
    .eq("news_translations.language", "tr")
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
            <p>
              Henüz haber veya duyuru eklenmedi.
            </p>
          </section>
        ) : (
          <section className={styles.newsArchive}>


            <div className={styles.newsGrid}>
              {newsItems.map((item) => {
                const translation =
                  item.news_translations[0];

                if (!translation) {
                  return null;
                }

                const date =
                  formatDate(item.published_at);

                const href =
                  `/haberler/${translation.slug}`;

                const categoryLabel =
                  item.content_type === "announcement"
                    ? "Duyuru"
                    : "Haber";

                return (
                  <article
                    key={item.id}
                    className={styles.newsCard}
                  >
                    <Link
                      href={href}
                      className={styles.imageLink}
                      aria-label={translation.title}
                    >
                      <div className={styles.imageWrapper}>
                        <Image
                          src={item.cover_image_url}
                          alt={translation.title}
                          fill
                          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                          className={styles.image}
                        />

                        <div
                          className={styles.imageOverlay}
                        />

                        <div className={styles.dateBox}>
                          <strong>{date.day}</strong>

                          <span>{date.month}</span>

                          <small>{date.year}</small>
                        </div>
                      </div>
                    </Link>

                    <div className={styles.content}>
                      <p className={styles.category}>
                        {categoryLabel}
                      </p>

                      <h2>
                        <Link href={href}>
                          {translation.title}
                        </Link>
                      </h2>

                      {translation.summary ? (
                        <p className={styles.summary}>
                          {translation.summary}
                        </p>
                      ) : null}

                      <Link
                        href={href}
                        className={styles.readMore}
                      >
                        {item.content_type ===
                          "announcement"
                          ? "Duyuruyu Oku"
                          : "Haberi Oku"}

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