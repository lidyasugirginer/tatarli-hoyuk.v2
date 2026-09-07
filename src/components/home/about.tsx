import Image from "next/image";
import Link from "next/link";

import styles from "./about.module.css";

type AboutProps = {
  language?: "tr" | "en";
};

export default function About({
  language = "tr",
}: AboutProps) {
  const content =
    language === "en"
      ? {
          eyebrow: "About Tatarlı Höyük",
          title:
            "At the Crossroads of Anatolia and the Eastern Mediterranean",
          description:
            "Tatarlı Höyük is an important settlement located in Eastern Plain Cilicia, with an uninterrupted occupation sequence extending from the Neolithic Period to the Early Roman Period. Situated at the crossroads of trade and cultural interaction networks linking Anatolia, Northern Syria, Cyprus, and the Eastern Mediterranean, the site sheds light on the history of the region through its multi-mound settlement system, eight cultural layers, and rich archaeological finds.",
          linkText: "Learn more",
          linkHref: "/en/about",
          imageAlt: "Aerial view of Tatarlı Höyük",
        }
      : {
          eyebrow: "Tatarlı Höyük Hakkında",
          title:
            "Anadolu ile Doğu Akdeniz'in Kesişim Noktası",
          description:
            "Tatarlı Höyük, Doğu Ovalık Kilikya'da yer alan ve Neolitik Çağ'dan Erken Roma Dönemi'ne kadar kesintisiz iskân gören önemli bir yerleşimdir. Anadolu, Kuzey Suriye, Kıbrıs ve Doğu Akdeniz arasında uzanan ticaret ve kültürel etkileşim ağlarının kavşağında bulunan höyük, çoklu höyük yerleşim sistemi, sekiz kültür tabakası ve zengin arkeolojik buluntularıyla bölgenin tarihine ışık tutmaktadır.",
          linkText: "Daha fazla bilgi",
          linkHref: "/hakkinda",
          imageAlt: "Tatarlı Höyük hava görünümü",
        };

  return (
    <section
      id="about"
      className={styles.about}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            {content.eyebrow}
          </p>

          <h2>
            {content.title}
          </h2>

          <p className={styles.description}>
            {content.description}
          </p>

          <Link
            href={content.linkHref}
            className={styles.moreLink}
          >
            {content.linkText}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src="/images/anasayfa-hakkinda.JPG"
            alt={content.imageAlt}
            fill
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}