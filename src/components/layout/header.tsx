"use client";

import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileKizzuwatnaOpen, setMobileKizzuwatnaOpen] =
    useState(false);

  const isHomePage = pathname === "/" || pathname === "/en";

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileKizzuwatnaOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`${styles.header} ${isHomePage ? styles.homeHeader : styles.innerHeader
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

        {/* MASAÜSTÜ NAVBAR */}
        <nav className={styles.nav} aria-label="Ana menü">
          <Link
            href="/hakkinda"
            className={
              isActiveLink("/hakkinda")
                ? styles.activeLink
                : undefined
            }
          >
            Hakkında
          </Link>

          <div className={styles.dropdown}>
            <Link
              href="/kizzuwatna"
              className={`${styles.dropdownTrigger} ${isActiveLink("/kizzuwatna")
                  ? styles.activeLink
                  : ""
                }`}
            >
              Kizzuwatna Araştırmaları Projesi

              <ChevronDown
                className={styles.dropdownArrow}
                strokeWidth={2.2}
              />
            </Link>

            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownSection}>
                <Link href="/kizzuwatna">
                  Hakkında
                </Link>

                <Link href="/kizzuwatna/bilec-hoyuk-kurtarma-kazisi">
                  Bileç Höyük Kurtarma Kazısı
                </Link>

                <div className={styles.submenu}>
                  <div className={styles.submenuTrigger}>
                    <span>Yüzey Araştırmaları</span>

                    <ChevronRight
                      className={styles.submenuArrow}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

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
                className={
                  isActiveLink(item.href)
                    ? styles.activeLink
                    : undefined
                }
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className={styles.languageArea}>
          <LanguageSwitch isHomePage={isHomePage} />
        </div>

        {/* HAMBURGER */}
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Menüyü aç"
          aria-expanded={mobileMenuOpen}
        >
          <Menu strokeWidth={1.8} />
        </button>
      </div>

      {/* MOBİL ARKA PLAN */}
      <button
        type="button"
        className={`${styles.mobileBackdrop} ${mobileMenuOpen ? styles.mobileBackdropOpen : ""
          }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-label="Menüyü kapat"
      />

      {/* MOBİL YAN MENÜ */}
      <aside
        className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ""
          }`}
      >
        <div className={styles.mobileMenuHeader}>
          <div className={styles.mobileMenuTitle}>
            <span className={styles.mobileMenuEyebrow}>
              Tatarlı Höyük
            </span>

            <strong>
              Kizzuwatna Araştırmaları Projesi
            </strong>
          </div>

          <button
            type="button"
            className={styles.mobileCloseButton}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Menüyü kapat"
          >
            <X strokeWidth={1.7} />
          </button>
        </div>

        <nav
          className={styles.mobileNav}
          aria-label="Mobil menü"
        >
          <Link href="/hakkinda">
            Hakkında
          </Link>

          <div className={styles.mobileKizzuwatna}>
            <button
              type="button"
              className={styles.mobileKizzuwatnaTrigger}
              onClick={() =>
                setMobileKizzuwatnaOpen(
                  (current) => !current
                )
              }
              aria-expanded={mobileKizzuwatnaOpen}
            >
              <span>Kizzuwatna Araştırmaları Projesi</span>

              <ChevronDown
                className={
                  mobileKizzuwatnaOpen
                    ? styles.mobileChevronOpen
                    : undefined
                }
                strokeWidth={1.8}
              />
            </button>

            <div
              className={`${styles.mobileSubmenu} ${mobileKizzuwatnaOpen
                  ? styles.mobileSubmenuOpen
                  : ""
                }`}
            >
              <Link href="/kizzuwatna">
                Hakkında
              </Link>

              <Link href="/kizzuwatna/bilec-hoyuk-kurtarma-kazisi">
                Bileç Höyük Kurtarma Kazısı
              </Link>

              <p className={styles.mobileSubmenuHeading}>
                Yüzey Araştırmaları
              </p>

              <Link href="/kizzuwatna/yuzey-arastirmalari/adana">
                Adana İli Yüzey Araştırmaları
              </Link>

              <Link href="/kizzuwatna/yuzey-arastirmalari/kayseri">
                Kayseri İli Yüzey Araştırmaları
              </Link>
            </div>
          </div>

          <Link href="/buluntular">
            Buluntular
          </Link>

          <Link href="/yayinlar">
            Yayınlar
          </Link>

          <Link href="/galeri">
            Galeri
          </Link>

          <Link href="/iletisim">
            İletişim
          </Link>
        </nav>

        <div className={styles.mobileLanguage}>
          <LanguageSwitch isHomePage={false} />
        </div>
      </aside>
    </header>
  );
}