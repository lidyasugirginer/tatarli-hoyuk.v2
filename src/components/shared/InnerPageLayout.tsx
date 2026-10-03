import Image from "next/image";

import styles from "./inner-page-layout.module.css";
import PageHeader from "./PageHeader";

type SectionImage = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
};

type ContentSection = {
  number: string;
  title: string;
  paragraphs?: readonly string[] | string[];

  // Eski sayfalar bozulmasın diye bunları koruyoruz
  image?: string;
  imageAlt?: string;

  // Yeni çoklu görsel desteği
  images?: SectionImage[];
};

type InnerPageLayoutProps = {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  sections?: readonly ContentSection[] | ContentSection[];
  variant?: "tatarli" | "kizzuwatna";
  language?: "tr" | "en";
  placeholderText?: string;

  // Sadece ihtiyaç olan sayfalarda kullanılır
  sideNavigation?: React.ReactNode;
};

export default function InnerPageLayout({
  breadcrumb,
  eyebrow,
  title,
  sections = [],
  variant = "tatarli",
  language = "tr",
  placeholderText,
  sideNavigation,
}: InnerPageLayoutProps) {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <PageHeader
          breadcrumb={breadcrumb}
          eyebrow={eyebrow}
          title={title}
          variant={variant}
          language={language}
        />

        <div
          className={
            sideNavigation
              ? styles.layoutWithNavigation
              : undefined
          }
        >
          {sideNavigation ? (
            <aside className={styles.sideNavigation}>
              {sideNavigation}
            </aside>
          ) : null}

          <div className={styles.sections}>
            {sections.map((section) => (
              <section
                className={styles.contentSection}
                key={section.number}
              >
                <div className={styles.sectionText}>
                  <p className={styles.sectionNumber}>
                    {section.number}
                  </p>

                  <h2>{section.title}</h2>

                  {section.paragraphs?.map(
                    (paragraph) => (
                      <p key={paragraph}>
                        {paragraph}
                      </p>
                    )
                  )}
                </div>

                <div className={styles.visualArea}>
                  {section.images &&
                  section.images.length > 0 ? (
                    <div className={styles.imageStack}>
                      {section.images.map(
                        (image, index) => (
                          <div
                            key={`${image.src}-${index}`}
                            className={
                              styles.imageFrame
                            }
                          >
                            <Image
                              className={`${
                                styles.contentImage
                              } ${
                                image.fit === "contain"
                                  ? styles.imageContain
                                  : styles.imageCover
                              }`}
                              src={image.src}
                              alt={image.alt}
                              width={1400}
                              height={900}
                              sizes="(max-width: 900px) 100vw, 55vw"
                            />
                          </div>
                        )
                      )}
                    </div>
                  ) : section.image ? (
                    <Image
                      className={styles.contentImage}
                      src={section.image}
                      alt={
                        section.imageAlt ??
                        section.title
                      }
                      width={1400}
                      height={900}
                      sizes="(max-width: 900px) 100vw, 55vw"
                    />
                  ) : (
                    <div
                      className={
                        styles.imagePlaceholder
                      }
                    >
                      <span>
                        {placeholderText ??
                          (language === "en"
                            ? "Content will be added later"
                            : "İçerik daha sonra eklenecek")}
                      </span>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}