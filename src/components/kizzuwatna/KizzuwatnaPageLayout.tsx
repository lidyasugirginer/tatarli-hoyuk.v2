import ImageCollage from "@/components/shared/ImageCollage";
import PageHeader from "@/components/shared/PageHeader";

import KizzuwatnaSubnav from "./KizzuwatnaSubnav";
import styles from "./kizzuwatna-page-layout.module.css";

type ContentSection = {
  number: string;
  title: string;
  paragraphs?: string[];

  images?: {
    src: string;
    alt: string;
  }[];
};

type KizzuwatnaPageLayoutProps = {
  breadcrumb: string;
  eyebrow?: string;
  title: string;
  sections?: ContentSection[];
  textOnly?: boolean;
};

export default function KizzuwatnaPageLayout({
  breadcrumb,
  eyebrow = "Kizzuwatna Araştırma Projeleri",
  title,
  sections = [],
}: KizzuwatnaPageLayoutProps) {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <PageHeader
          breadcrumb={breadcrumb}
          eyebrow={eyebrow}
          title={title}
          variant="kizzuwatna"
        />

        <div className={styles.pageBody}>
          <aside className={styles.sidebar}>
            <KizzuwatnaSubnav />
          </aside>

          <div className={styles.content}>
            {sections.length === 0 ? (
              <section className={styles.emptySection}>
                <p>Bu sayfanın içeriği hazırlanıyor.</p>
              </section>
            ) : (
              sections.map((section) => (
                <section
                  className={styles.contentSection}
                  key={section.number}
                >
                  <div className={styles.sectionText}>
                    <p className={styles.sectionNumber}>
                      {section.number}
                    </p>

                    <h2>{section.title}</h2>

                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div className={styles.visualArea}>
                    {section.images &&
                    section.images.length > 0 ? (
                      <ImageCollage images={section.images} />
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        <span>
                          Görsel daha sonra eklenecek
                        </span>
                      </div>
                    )}
                  </div>
                </section>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}