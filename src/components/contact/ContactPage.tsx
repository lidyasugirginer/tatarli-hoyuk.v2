import { FiMail } from "react-icons/fi";
import { RiInstagramLine } from "react-icons/ri";
import { ArrowUpRight } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";

import styles from "./ContactPage.module.css";

type Language = "tr" | "en";

type ContactPageProps = {
  language?: Language;
};

const content = {
  tr: {
    header: {
      breadcrumb: "İletişim",
      eyebrow: "Tatarlı Höyük Kazısı",
      title: "İletişim",
    },
    sectionNumber: "01",
    heading: "Bizimle İletişime Geçin",
    intro:
      "Tatarlı Höyük Kazısı ve Kizzuwatna Araştırma Projeleri hakkında bilgi almak için e-posta adresimiz veya sosyal medya hesabımız üzerinden bizimle iletişime geçebilirsiniz.",
    email: {
      label: "E-posta",
      address: "ornek@cukurova.edu.tr",
      description:
        "Proje, kazı çalışmaları ve akademik konular için bize ulaşabilirsiniz.",
    },
    instagram: {
      label: "Instagram",
      handle: "@tatarlihoyuk",
      description:
        "Kazı sezonları, buluntular ve güncel çalışmalarımızı takip edin.",
    },
  },
  en: {
    header: {
      breadcrumb: "Contact",
      eyebrow: "Tatarlı Höyük Excavation",
      title: "Contact",
    },
    sectionNumber: "01",
    heading: "Contact Us",
    intro:
      "For inquiries regarding the Tatarlı Höyük Excavation and Kizzuwatna Research Projects, you can contact us via our email address or our social media account.",
    email: {
      label: "Email",
      address: "ornek@cukurova.edu.tr",
      description:
        "You can reach us for project, excavation research, and academic inquiries.",
    },
    instagram: {
      label: "Instagram",
      handle: "@tatarlihoyuk",
      description:
        "Follow our excavation seasons, finds, and current activities.",
    },
  },
} as const;

export default function ContactPage({
  language = "tr",
}: ContactPageProps) {
  const t = content[language];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <PageHeader
          breadcrumb={t.header.breadcrumb}
          eyebrow={t.header.eyebrow}
          title={t.header.title}
          language={language}
        />

        <section className={styles.contactSection}>
          <div className={styles.sectionIntro}>
            <p className={styles.sectionNumber}>{t.sectionNumber}</p>

            <h2>{t.heading}</h2>

            <p>{t.intro}</p>
          </div>

          <div className={styles.contactCards}>
            <a
              href={`mailto:${t.email.address}`}
              className={styles.contactCard}
            >
              <div className={styles.iconArea}>
                <FiMail />
              </div>

              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>{t.email.label}</span>

                <strong>{t.email.address}</strong>

                <p>{t.email.description}</p>
              </div>

              <ArrowUpRight
                className={styles.cardArrow}
                aria-hidden="true"
              />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactCard}
            >
              <div className={styles.iconArea}>
                <RiInstagramLine />
              </div>

              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>{t.instagram.label}</span>

                <strong>{t.instagram.handle}</strong>

                <p>{t.instagram.description}</p>
              </div>

              <ArrowUpRight
                className={styles.cardArrow}
                aria-hidden="true"
              />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

