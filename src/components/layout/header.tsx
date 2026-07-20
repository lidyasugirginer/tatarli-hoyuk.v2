import Image from "next/image";
import Link from "next/link";

import LanguageSwitch from "./language-switch";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brands}>
          <Link href="/" className={styles.brand}>
            <Image
              src="/images/tatarli-logo.png"
              alt="Tatarlı Höyük Kazısı logosu"
              width={68}
              height={68}
              className={styles.logo}
              priority
            />

            <div className={styles.brandText}>
              <strong>Tatarlı Höyük</strong>
              <span>Kazısı</span>
            </div>
          </Link>

          <div className={styles.divider} />

          <Link href="/kizzuwatna" className={styles.brand}>
            <Image
              src="/images/kizzuwatna-logo.png"
              alt="Kizzuwatna Araştırma Projesi logosu"
              width={68}
              height={68}
              className={styles.logo}
              priority
            />

            <div className={styles.brandText}>
              <strong>Kizzuwatna</strong>
              <span>Araştırma Projesi</span>
            </div>
          </Link>
        </div>

        <nav className={styles.nav} aria-label="Ana menü">
          <Link href="/hakkinda">Hakkında</Link>
          <Link href="/kizzuwatna">
            Kizzuwatna Araştırma Projeleri
          </Link>
          <Link href="/buluntular">Buluntular</Link>
          <Link href="/yayinlar">Yayınlar</Link>
          <Link href="/projeler">Projeler</Link>
          <Link href="/galeri">Galeri</Link>
          <Link href="/iletisim">İletişim</Link>
        </nav>

        <div className={styles.languageArea}>
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}