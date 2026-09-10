"use client";

import { Menu, X } from "lucide-react";
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
    href: "/haberler",
    label: "Haberler",
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

  const isHomePage = pathname === "/" || pathname === "/en";

  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`${styles.header} ${
        isHomePage ? styles.homeHeader : styles.innerHeader
      }`}
    >
      <div className={styles.container}>
        <Link href="/" className={styles.brand}>
          <Image
            src="/images/tatarli-logo.png"
            alt="Tatarlı Höyük Kazısı logosu"
            width={80}
            height={80}
            className={styles.logo}
            priority
          />

          <div className={styles.brandText}>
            <strong>Tatarlı Höyük</strong>
            <span>Kazısı</span>
          </div>
        </Link>

        <nav className={styles.nav} aria-label="Ana menü">
          {navItems.map((item) => (
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

      <button
        type="button"
        className={`${styles.mobileBackdrop} ${
          mobileMenuOpen ? styles.mobileBackdropOpen : ""
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-label="Menüyü kapat"
      />

      <aside
        className={`${styles.mobileMenu} ${
          mobileMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileMenuHeader}>
          <div className={styles.mobileMenuTitle}>
            <span className={styles.mobileMenuEyebrow}>
              Tatarlı Höyük
            </span>

            <strong>Kazısı</strong>
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

        <nav className={styles.mobileNav} aria-label="Mobil menü">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={
                isActiveLink(item.href)
                  ? styles.mobileActiveLink
                  : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.mobileLanguage}>
          <LanguageSwitch isHomePage={false} />
        </div>
      </aside>
    </header>
  );
}