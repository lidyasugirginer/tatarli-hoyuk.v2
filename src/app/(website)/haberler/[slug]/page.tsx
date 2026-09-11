import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import styles from "./page.module.css";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(
    new Date(`${dateValue}T00:00:00`)
  );
}

export default async function NewsDetailPage({
  params,
}: NewsDetailPageProps) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("news")
    .select(`
      id,
      cover_image_url,
      published_at,
      status,
      content_type,
      news_translations!inner (
        title,
        summary,
        content,
        slug,
        language
      )
    `)
    .eq("status", "published")
    .eq("news_translations.language", "tr")
    .eq("news_translations.slug", slug)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const translation =
    data.news_translations?.[0];

  if (!translation) {
    notFound();
  }

  const categoryLabel =
    data.content_type === "announcement"
      ? "Duyuru"
      : "Haber";

  const formattedDate =
    formatDate(data.published_at);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <aside className={styles.sideRail}>
          <Link
            href="/haberler"
            className={styles.backLink}
          >
            <span
              className={styles.backArrow}
              aria-hidden="true"
            >
              ←
            </span>

            <span>Tüm haberler</span>
          </Link>
        </aside>

        <article className={styles.article}>
          <header className={styles.articleHeader}>
            <div className={styles.meta}>
              <span className={styles.category}>
                {categoryLabel}
              </span>

              <span className={styles.metaDivider}>
                ·
              </span>

              <time
                className={styles.date}
                dateTime={data.published_at}
              >
                {formattedDate}
              </time>
            </div>

            <h1 className={styles.title}>
              {translation.title}
            </h1>

            {translation.summary ? (
              <p className={styles.lead}>
                {translation.summary}
              </p>
            ) : null}
          </header>

          {data.cover_image_url ? (
            <div className={styles.coverWrapper}>
              <Image
                src={data.cover_image_url}
                alt={translation.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 720px"
                className={styles.coverImage}
              />
            </div>
          ) : null}

          <div className={styles.body}>
            {translation.content ? (
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{
                  __html: translation.content,
                }}
              />
            ) : (
              <p className={styles.emptyContent}>
                Bu içerik için ayrıntılı metin henüz eklenmedi.
              </p>
            )}
          </div>
          <section className={styles.newsGallery}>
  <div className={styles.galleryHeading}>
    <div>
      <p className={styles.galleryEyebrow}>
        Haber galerisi
      </p>

      <h2>
        İlgili Görseller
      </h2>
    </div>

    <Link
      href="/galeri"
      className={styles.galleryLink}
    >
      Tüm galeriyi görüntüle
      <span aria-hidden="true">→</span>
    </Link>
  </div>

  <div className={styles.galleryGrid}>
    <button
      type="button"
      className={styles.galleryItem}
    >
      <Image
        src="/images/hakkinda/hakkinda-0.jpg"
        alt="Tatarlı Höyük kazı çalışmaları"
        fill
        sizes="(max-width: 700px) 50vw, 220px"
      />
    </button>

    <button
      type="button"
      className={styles.galleryItem}
    >
      <Image
        src="/images/hakkinda/hakkinda-1.jpg"
        alt="Tatarlı Höyük kazı çalışmaları"
        fill
        sizes="(max-width: 700px) 50vw, 220px"
      />
    </button>

    <button
      type="button"
      className={styles.galleryItem}
    >
      <Image
        src="/images/hakkinda/hakkinda-2.jpg"
        alt="Tatarlı Höyük kazı çalışmaları"
        fill
        sizes="(max-width: 700px) 50vw, 220px"
      />
    </button>
  </div>
</section>
        </article>
      </div>
    </main>
  );
}