"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import LanguageSwitch from "./language-switch";
import styles from "./header.module.css";

const navItems = [
  {
    href: "/hakkinda",
    label: "Hakkında",
  },
  {
    href: "/buluntular",
    label: "Buluntular",
  },
  {
    href: "/yayinlar",
    label: "Yayınlar",
  },
  {
    href: "/galeri",
    label: "Galeri",
  },
  {
    href: "/iletisim",
    label: "İletişim",
  },
];

export default function Header() {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`${styles.header} ${
        isHomePage ? styles.homeHeader : styles.innerHeader
      }`}
    >
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
              <span>Araştırmaları Projesi</span>
            </div>
          </Link>
        </div>

        <nav className={styles.nav} aria-label="Ana menü">
          <Link
            href="/hakkinda"
            className={isActiveLink("/hakkinda") ? styles.activeLink : undefined}
          >
            Hakkında
          </Link>

          <div className={styles.dropdown}>
            <Link
              href="/kizzuwatna"
              className={`${styles.dropdownTrigger} ${
                isActiveLink("/kizzuwatna") ? styles.activeLink : ""
              }`}
            >
              Kizzuwatna Araştırmaları Projesi

              <ChevronDown className={styles.dropdownArrow} strokeWidth={2.2} />
            </Link>

           <div className={styles.dropdownMenu}>
            <div className={styles.dropdownSection}>
              <Link href="/kizzuwatna" >
                 Hakkında
              </Link>

            <Link href="/kizzuwatna/bilec-hoyuk-kurtarma-kazisi">
               Bileç Höyük Kurtarma Kazısı
            </Link>

          <div className={styles.submenu}>
            <Link
              href="/kizzuwatna/yuzey-arastirmalari"
              className={styles.submenuTrigger}
           >
          <span>Yüzey Araştırmaları</span>

        <ChevronRight
          className={styles.submenuArrow}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </Link>

      <div className={styles.submenuPanel}>
        <Link href="/kizzuwatna/yuzey-arastirmalari/adana">
          Adana İli Yüzey Araştırmaları
        </Link>

        <Link href="/kizzuwatna/yuzey-arastirmalari/kayseri">
          Kayseri İli Yüzey Araştırmaları
        </Link>
      </div>
    </div>
  </div>
</div>
          </div>

          {navItems
            .filter((item) => item.href !== "/hakkinda")
            .map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className={isActiveLink(item.href) ? styles.activeLink : undefined}
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className={styles.languageArea}>
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}