import { FiMail } from "react-icons/fi";
import { RiInstagramLine } from "react-icons/ri";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import styles from "./iletisim.module.css";

export default function IletisimPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <div className={styles.headerText}>
            <nav className={styles.breadcrumb} aria-label="Sayfa yolu">
              <Link href="/">Ana Sayfa</Link>

              <span aria-hidden="true">/</span>

              <span aria-current="page">İletişim</span>
            </nav>

            <p className={styles.eyebrow}>Tatarlı Höyük Kazısı</p>

            <h1>İletişim</h1>

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

        <section className={styles.contactSection}>
          <div className={styles.sectionIntro}>
            <p className={styles.sectionNumber}>01</p>

            <h2>Bizimle İletişime Geçin</h2>

            <p>
              Tatarlı Höyük Kazısı ve Kizzuwatna Araştırma Projeleri hakkında
              bilgi almak için e-posta adresimiz veya sosyal medya hesabımız
              üzerinden bizimle iletişime geçebilirsiniz.
            </p>
          </div>

          <div className={styles.contactCards}>
            <a
              href="mailto:ornek@cukurova.edu.tr"
              className={styles.contactCard}
            >
              <div className={styles.iconArea}>
                <FiMail />
              </div>

              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>E-posta</span>

                <strong>ornek@cukurova.edu.tr</strong>

                <p>
                  Proje, kazı çalışmaları ve akademik konular için bize
                  ulaşabilirsiniz.
                </p>
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
                <span className={styles.cardLabel}>Instagram</span>

                <strong>@tatarlihoyuk</strong>

                <p>
                  Kazı sezonları, buluntular ve güncel çalışmalarımızı takip
                  edin.
                </p>
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