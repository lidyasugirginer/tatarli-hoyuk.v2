import ImageCollage from "@/components/shared/ImageCollage";
import PageHeader from "@/components/shared/PageHeader";

import KizzuwatnaSubnav from "./KizzuwatnaSubnav";
import styles from "./kizzuwatna-page-layout.module.css";

type Language = "tr" | "en";

type SectionImage = {
  src: string;
  alt: string;
};

type ContentSection = {
  number: string;
  title: string;
  paragraphs?: readonly string[] | string[];
  images?: readonly SectionImage[] | SectionImage[];
};

type KizzuwatnaPageLayoutProps = {
  breadcrumb: string;
  eyebrow?: string;
  title: string;
  sections?: readonly ContentSection[] | ContentSection[];
  textOnly?: boolean;
  language?: Language;
};

export default function KizzuwatnaPageLayout({
  breadcrumb,
  eyebrow,
  title,
  sections = [],
  language = "tr",
}: KizzuwatnaPageLayoutProps) {
  const defaultEyebrow =
    eyebrow ??
    (language === "en"
      ? "Kizzuwatna Research Project"
      : "Kizzuwatna Araştırma Projeleri");

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <PageHeader
          breadcrumb={breadcrumb}
          eyebrow={defaultEyebrow}
          title={title}
          variant="kizzuwatna"
          language={language}
        />

        <div className={styles.pageBody}>
          <aside className={styles.sidebar}>
            <KizzuwatnaSubnav language={language} />
          </aside>

          <div className={styles.content}>
            {sections.length === 0 ? (
              <section className={styles.emptySection}>
                <p>
                  {language === "en"
                    ? "The content of this page is being prepared."
                    : "Bu sayfanın içeriği hazırlanıyor."}
                </p>
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
                          {language === "en"
                            ? "Image will be added later"
                            : "Görsel daha sonra eklenecek"}
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