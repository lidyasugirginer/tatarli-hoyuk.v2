import News from "./news";
import LatestPublications from "./latest-publications";

import styles from "./news-and-publications.module.css";

type NewsAndPublicationsProps = {
  language?: "tr" | "en";
};

export default function NewsAndPublications({
  language = "tr",
}: NewsAndPublicationsProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <aside
          className={styles.sectionIndex}
          aria-hidden="true"
        >
          <span>07</span>
          <span className={styles.indexLine} />
        </aside>

        <div className={styles.content}>
          <div className={styles.newsColumn}>
            <News language={language} />
          </div>

          <div
            className={styles.verticalDivider}
            aria-hidden="true"
          />

          <div className={styles.publicationsColumn}>
            <LatestPublications
              language={language}
            />
          </div>
        </div>
      </div>
    </section>
  );
}