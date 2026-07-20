import Image from "next/image";
import Link from "next/link";

import styles from "./news.module.css";

const newsItems = [
  {
    id: 1,
    dateDay: "15",
    dateMonth: "MAY",
    dateYear: "2026",
    title: "2026 Kazı Sezonu Başladı",
    description:
      "Tatarlı Höyük’te 2026 kazı sezonu çalışmalarına 10 Mayıs itibarıyla başlandı.",
    image: "/images/news/news-1.jpg",
    featured: true,
  },
  {
    id: 2,
    dateDay: "30",
    dateMonth: "NİS",
    dateYear: "2026",
    title: "Öğrencilerle Höyük Ziyareti Gerçekleşti",
    description:
      "Kazı alanı ve araştırma süreçleri öğrencilerle yerinde değerlendirildi.",
    image: "/images/news/news-2.jpg",
    featured: false,
  },
  {
    id: 3,
    dateDay: "10",
    dateMonth: "MAR",
    dateYear: "2026",
    title: "Yeni Yayınımız Yayımlandı",
    description:
      "Tatarlı Höyük araştırmalarına ilişkin yeni bilimsel çalışmamız yayımlandı.",
    image: "/images/news/news-3.jpg",
    featured: false,
  },
];

export default function News() {
  const featuredNews = newsItems.find((item) => item.featured);
  const secondaryNews = newsItems.filter((item) => !item.featured);

  return (
    <div className={styles.news}>
      <div className={styles.headingRow}>
        <div className={styles.headingGroup}>
          <h2>Son Haberler</h2>
          <span className={styles.headingLine} />
        </div>
      </div>

      <div className={styles.newsLayout}>
        {featuredNews && (
          <article className={styles.featuredCard}>
            <Link
              href={`/haberler/${featuredNews.id}`}
              className={styles.featuredImageWrapper}
              aria-label={featuredNews.title}
            >
              <Image
                src={featuredNews.image}
                alt={featuredNews.title}
                fill
                sizes="(max-width: 760px) 100vw, 420px"
                className={styles.image}
              />

              <div className={styles.imageOverlay} />

              <div className={styles.dateBox}>
                <strong>{featuredNews.dateDay}</strong>
                <span>{featuredNews.dateMonth}</span>
                <small>{featuredNews.dateYear}</small>
              </div>

              <div className={styles.featuredContent}>
                <h3>{featuredNews.title}</h3>

                <p>{featuredNews.description}</p>

                <span className={styles.readLink}>
                  Haberi oku
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          </article>
        )}

        <div className={styles.secondaryList}>
          {secondaryNews.map((item) => (
            <article key={item.id} className={styles.secondaryCard}>
              <Link
                href={`/haberler/${item.id}`}
                className={styles.secondaryImageWrapper}
                aria-label={item.title}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="110px"
                  className={styles.image}
                />
              </Link>

              <div className={styles.secondaryDate}>
                <strong>{item.dateDay}</strong>

                <span>
                  {item.dateMonth}
                  <small>{item.dateYear}</small>
                </span>
              </div>

              <div className={styles.secondaryContent}>
                <h3>
                  <Link href={`/haberler/${item.id}`}>{item.title}</Link>
                </h3>

                <Link
                  href={`/haberler/${item.id}`}
                  className={styles.secondaryLink}
                >
                  Devamı
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}

          <Link href="/haberler" className={styles.allNewsLink}>
            Tüm haberler
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}