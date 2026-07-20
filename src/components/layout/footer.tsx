import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.container}>
          <div className={styles.brandArea}>
            <div className={styles.brandRow}>
              <Image
                src="/images/tatarli-logo.png"
                alt="Tatarlı Höyük Kazısı logosu"
                width={58}
                height={58}
                className={styles.logo}
              />

              <div>
                <strong>Tatarlı Höyük</strong>
                <span>Kazısı</span>
              </div>
            </div>

            <div className={styles.brandRow}>
              <Image
                src="/images/kizzuwatna-logo.png"
                alt="Kizzuwatna Araştırma Projesi logosu"
                width={58}
                height={58}
                className={styles.logo}
              />

              <div>
                <strong>Kizzuwatna</strong>
                <span>Araştırma Projesi</span>
              </div>
            </div>
          </div>

          <div className={styles.linksGrid}>
            <div>
              <h3>Kazı</h3>
              <Link href="/kazi">Kazı alanları</Link>
              <Link href="/kazi/yontem">Yöntem</Link>
              <Link href="/kazi/arsiv">Arşiv</Link>
            </div>

            <div>
              <h3>Kizzuwatna</h3>
              <Link href="/kizzuwatna">Araştırmalar</Link>
              <Link href="/kizzuwatna/guzergahlar">Güzergâhlar</Link>
              <Link href="/kizzuwatna/haritalar">Haritalar</Link>
            </div>

            <div>
              <h3>Araştırmalar</h3>
              <Link href="/projeler">Projeler</Link>
              <Link href="/raporlar">Raporlar</Link>
              <Link href="/veri-tabani">Veri tabanı</Link>
            </div>

            <div>
              <h3>Yayınlar</h3>
              <Link href="/yayinlar/makaleler">Makaleler</Link>
              <Link href="/yayinlar/kitaplar">Kitaplar</Link>
              <Link href="/yayinlar/raporlar">Raporlar</Link>
            </div>
          </div>

          <div className={styles.socialArea}>
            <h3>Bizi takip edin</h3>

            <div className={styles.socials}>
              <a href="#" aria-label="Instagram">
                IG
              </a>
              <a href="#" aria-label="X">
                X
              </a>
              <a href="#" aria-label="Facebook">
                F
              </a>
              <a href="#" aria-label="YouTube">
                YT
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.bottomContainer}>
          <p>
            © 2026 Tatarlı Höyük Kazısı &amp; Kizzuwatna Araştırma Projesi.
            Tüm hakları saklıdır.
          </p>

          <div className={styles.legalLinks}>
            <Link href="/gizlilik">Gizlilik politikası</Link>
            <span />
            <Link href="/kullanim-sartlari">Kullanım şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}