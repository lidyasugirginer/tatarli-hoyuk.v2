import Image from "next/image";
import Link from "next/link";

import styles from "./inner-page-layout.module.css";

type ContentSection = {
  number: string;
  title: string;
  paragraphs?: string[];
  image?: string;
  imageAlt?: string;
};

type InnerPageLayoutProps = {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  sections?: ContentSection[];
};

export default function InnerPageLayout({
  breadcrumb,
  eyebrow,
  title,
  sections = [],
}: InnerPageLayoutProps) {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <div className={styles.headerText}>
            <nav className={styles.breadcrumb} aria-label="Sayfa yolu">
              <Link href="/">Ana Sayfa</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{breadcrumb}</span>
            </nav>

            <p className={styles.eyebrow}>{eyebrow}</p>

            <h1>{title}</h1>

            <div className={styles.titleLine} aria-hidden="true" />
          </div>

          <div className={styles.frieze} aria-hidden="true">
            {[1, 2, 3].map((item) => (
              <Image
                key={item}
                src="/images/hakkinda/cizim0.png"
                alt=""
                width={520}
                height={230}
              />
            ))}
          </div>
        </header>

        {sections.map((section) => (
          <section className={styles.contentSection} key={section.number}>
            <div className={styles.sectionText}>
              <p className={styles.sectionNumber}>{section.number}</p>
              <h2>{section.title}</h2>

              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className={styles.visualArea}>
              {section.image ? (
                <Image
                  className={styles.contentImage}
                  src={section.image}
                  alt={section.imageAlt ?? section.title}
                  width={1400}
                  height={900}
                  sizes="(max-width: 900px) 100vw, 55vw"
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <span>İçerik daha sonra eklenecek</span>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}