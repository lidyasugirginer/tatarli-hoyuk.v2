import Image from "next/image";
import Link from "next/link";

import styles from "./latest-publications.module.css";

const publications = [
  {
    id: 1,
    title: "Tatarlı Höyük Kazıları",
    year: "2025",
    type: "Kazı Raporu",
    image: "/images/publications/publication-1.jpg",
  },
  {
    id: 2,
    title: "Eastern Mediterranean Archaeological Studies",
    year: "2024",
    type: "Makale",
    image: "/images/publications/publication-2.jpg",
  },
  {
    id: 3,
    title: "Kizzuwatna: Monumental Series I",
    year: "2024",
    type: "Monografi",
    image: "/images/publications/publication-3.jpg",
  },
];

export default function LatestPublications() {
  return (
    <div className={styles.publications}>
      <div className={styles.headingRow}>
        <div className={styles.headingGroup}>
          <h2>Son Yayınlar</h2>
          <span className={styles.headingLine} />
        </div>
      </div>

      <div className={styles.publicationGrid}>
        {publications.map((publication) => (
          <article key={publication.id} className={styles.publicationCard}>
            <Link
              href={`/yayinlar/${publication.id}`}
              className={styles.coverLink}
              aria-label={publication.title}
            >
              <div className={styles.coverWrapper}>
                <Image
                  src={publication.image}
                  alt={publication.title}
                  fill
                  sizes="(max-width: 720px) 44vw, 190px"
                  className={styles.coverImage}
                />

                <div className={styles.coverOverlay}>
                  <span>İncele</span>
                  <span aria-hidden="true">→</span>
                </div>
              </div>
            </Link>

            <div className={styles.publicationInfo}>
              <span className={styles.year}>{publication.year}</span>

              <h3>
                <Link href={`/yayinlar/${publication.id}`}>
                  {publication.title}
                </Link>
              </h3>

              <span className={styles.type}>{publication.type}</span>
            </div>
          </article>
        ))}
      </div>

      <Link href="/yayinlar" className={styles.allPublicationsLink}>
        Tüm yayınlar
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}