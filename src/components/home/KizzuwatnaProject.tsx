import Image from "next/image";
import Link from "next/link";

import styles from "./kizzuwatna-project.module.css";

type KizzuwatnaProjectProps = {
  language?: "tr" | "en";
};

export default function KizzuwatnaProject({
  language = "tr",
}: KizzuwatnaProjectProps) {
  const content =
    language === "en"
      ? {
          logoAlt:
            "Kizzuwatna Research Project logo",

          eyebrow: "Research Framework",

          title:
            "Kizzuwatna Research Project",

          lead:
            "The Tatarlı Höyük Excavation constitutes an important part of the studies carried out within the Kizzuwatna Research Project, which aims to investigate the historical, archaeological, and cultural development of the Kizzuwatna region.",

          description:
            "The project brings together excavations, rescue excavations, and archaeological surveys conducted at Tatarlı Höyük and across Eastern Cilicia and its surrounding regions within a common research framework.",

          bilec: "Bileç Höyük Rescue Excavation",
          adana: "Adana Archaeological Surveys",
          kayseri: "Kayseri Archaeological Surveys",

          explore: "Explore the Project",

          links: {
            bilec:
              "/en/kizzuwatna/bilec-hoyuk-rescue-excavation",
            adana:
              "/en/kizzuwatna/surveys/adana",
            kayseri:
              "/en/kizzuwatna/surveys/kayseri",
            main: "/en/kizzuwatna",
          },
        }
      : {
          logoAlt:
            "Kizzuwatna Araştırmaları Projesi logosu",

          eyebrow: "Araştırma Çerçevesi",

          title:
            "Kizzuwatna Araştırmaları Projesi",

          lead:
            "Tatarlı Höyük Kazısı, Kizzuwatna bölgesinin tarihsel, arkeolojik ve kültürel gelişimini araştırmayı amaçlayan Kizzuwatna Araştırmaları Projesi kapsamında yürütülen çalışmaların önemli bir parçasını oluşturmaktadır.",

          description:
            "Proje; Tatarlı Höyük başta olmak üzere Doğu Kilikya ve çevresinde gerçekleştirilen kazı, kurtarma kazısı ve yüzey araştırmalarını ortak bir araştırma çerçevesinde değerlendirmektedir.",

          bilec:
            "Bileç Höyük Kurtarma Kazısı",
          adana:
            "Adana Yüzey Araştırmaları",
          kayseri:
            "Kayseri Yüzey Araştırmaları",

          explore: "Projeyi Keşfet",

          links: {
            bilec:
              "/kizzuwatna/bilec-hoyuk-kurtarma-kazisi",
            adana:
              "/kizzuwatna/yuzey-arastirmalari/adana",
            kayseri:
              "/kizzuwatna/yuzey-arastirmalari/kayseri",
            main: "/kizzuwatna",
          },
        };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.logoArea}>
          <div className={styles.logoWrapper}>
            <Image
              src="/images/kizzuwatna-logo.png"
              alt={content.logoAlt}
              width={320}
              height={320}
              className={styles.logo}
            />
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>
            {content.eyebrow}
          </p>

          <h2>{content.title}</h2>

          <div className={styles.titleLine} />

          <p className={styles.lead}>
            {content.lead}
          </p>

          <p className={styles.description}>
            {content.description}
          </p>

          <div className={styles.linkRow}>
            <div className={styles.relatedWorks}>
              <Link href={content.links.bilec}>
                {content.bilec}
              </Link>

              <Link href={content.links.adana}>
                {content.adana}
              </Link>

              <Link href={content.links.kayseri}>
                {content.kayseri}
              </Link>
            </div>

            <Link
              href={content.links.main}
              className={styles.mainLink}
            >
              {content.explore}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}