import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import styles from "./NewsDetailPage.module.css";

type Language = "tr" | "en";

type NewsDetailPageProps = {
    slug: string;
    language: Language;
};

const pageContent = {
    tr: {
        back: "Tüm haberler",
        news: "Haber",
        announcement: "Duyuru",
        empty:
            "Bu içerik için ayrıntılı metin henüz eklenmedi.",
        newsPath: "/haberler",
        locale: "tr-TR",
    },

    en: {
        back: "All news",
        news: "News",
        announcement: "Announcement",
        empty:
            "Detailed content has not yet been added for this item.",
        newsPath: "/en/news",
        locale: "en-GB",
    },
} as const;

function formatDate(
    dateValue: string,
    language: Language
) {
    return new Intl.DateTimeFormat(
        pageContent[language].locale,
        {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }
    ).format(
        new Date(`${dateValue}T00:00:00`)
    );
}

export default async function NewsDetailPage({
    slug,
    language,
}: NewsDetailPageProps) {
    const supabase = await createClient();

    const t = pageContent[language];

    /*
     * 1. URL'deki slug'ın hangi habere ait olduğunu bul.
     *
     * Örneğin kullanıcı Türkçe haber detayındayken EN'ye
     * bastığında URL geçici olarak İngilizce route +
     * Türkçe slug şeklinde gelebilir.
     */
    const { data: slugTranslation } = await supabase
        .from("news_translations")
        .select("news_id")
        .eq("slug", slug)
        .limit(1)
        .maybeSingle();

    if (!slugTranslation) {
        notFound();
    }

    /*
     * 2. Aynı haberin istenen dildeki çevirisini getir.
     */
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
        .eq("id", slugTranslation.news_id)
        .eq("status", "published")
        .eq(
            "news_translations.language",
            language
        )
        .maybeSingle();

    if (error) {
        notFound();
    }

    /*
     * Haber mevcut fakat seçilen dilde çevirisi yoksa
     * 404 göstermek yerine o dilin haberler sayfasına dön.
     */
    if (!data) {
        redirect(t.newsPath);
    }

    const translation =
        data.news_translations?.[0];

    if (!translation) {
        redirect(t.newsPath);
    }

    /*
     * 3. URL'deki slug diğer dile aitse,
     * doğru dildeki slug'a yönlendir.
     *
     * Örneğin:
     *
     * /en/news/turkce-slug
     *
     * otomatik olarak:
     *
     * /en/news/english-slug
     *
     * olur.
     */
    if (translation.slug !== slug) {
        redirect(
            language === "en"
                ? `/en/news/${translation.slug}`
                : `/haberler/${translation.slug}`
        );
    }

    const categoryLabel =
        data.content_type === "announcement"
            ? t.announcement
            : t.news;

    const formattedDate = formatDate(
        data.published_at,
        language
    );

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <aside className={styles.sideRail}>
                    <Link
                        href={t.newsPath}
                        className={styles.backLink}
                    >
                        <span
                            className={styles.backArrow}
                            aria-hidden="true"
                        >
                            ←
                        </span>

                        <span>{t.back}</span>
                    </Link>
                </aside>

                <article className={styles.article}>
                    <header
                        className={styles.articleHeader}
                    >
                        <div className={styles.meta}>
                            <span
                                className={styles.category}
                            >
                                {categoryLabel}
                            </span>

                            <span
                                className={styles.metaDivider}
                            >
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
                        <div
                            className={styles.coverWrapper}
                        >
                            <Image
                                src={data.cover_image_url}
                                alt={translation.title}
                                fill
                                priority
                                sizes="(max-width: 900px) 100vw, 760px"
                                className={styles.coverImage}
                            />
                        </div>
                    ) : null}

                    <div className={styles.body}>
                        {translation.content ? (
                            <div
                                className={styles.content}
                                dangerouslySetInnerHTML={{
                                    __html:
                                        translation.content,
                                }}
                            />
                        ) : (
                            <p
                                className={
                                    styles.emptyContent
                                }
                            >
                                {t.empty}
                            </p>
                        )}
                    </div>

                    {/*
            Haber galerisi daha sonra buraya gelecek.

            Gallery DB ve news ↔ gallery ilişkisini
            kurduğumuzda yalnızca bu habere bağlı
            gerçek görseller burada gösterilecek.
          */}
                </article>
            </div>
        </main>
    );
}