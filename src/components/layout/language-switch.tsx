"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { routePairs } from "@/lib/i18n";

import styles from "./language-switch.module.css";

type LanguageSwitchProps = {
  isHomePage: boolean;
};

export default function LanguageSwitch({
  isHomePage,
}: LanguageSwitchProps) {
  const pathname = usePathname();

  const isEnglish =
    pathname === "/en" ||
    pathname.startsWith("/en/");

  function getTurkishPath() {
    const pair = routePairs.find(
      ({ en }) =>
        pathname === en ||
        (en !== "/en" &&
          pathname.startsWith(`${en}/`))
    );

    if (!pair) {
      return "/";
    }

    if (pathname === pair.en) {
      return pair.tr;
    }

    return `${pair.tr}${pathname.slice(
      pair.en.length
    )}`;
  }

  function getEnglishPath() {
    const pair = routePairs.find(
      ({ tr }) =>
        pathname === tr ||
        (tr !== "/" &&
          pathname.startsWith(`${tr}/`))
    );

    if (!pair) {
      return "/en";
    }

    if (pathname === pair.tr) {
      return pair.en;
    }

    return `${pair.en}${pathname.slice(
      pair.tr.length
    )}`;
  }

  return (
    <div
      className={`${styles.languageSwitch} ${
        isHomePage ? styles.home : styles.inner
      }`}
      aria-label="Dil seçimi"
    >
      {isEnglish ? (
        <Link
          href={getTurkishPath()}
          className={styles.languageLink}
        >
          TR
        </Link>
      ) : (
        <span className={styles.activeLanguage}>
          TR
        </span>
      )}

      <span
        className={styles.separator}
        aria-hidden="true"
      >
        |
      </span>

      {isEnglish ? (
        <span className={styles.activeLanguage}>
          EN
        </span>
      ) : (
        <Link
          href={getEnglishPath()}
          className={styles.languageLink}
        >
          EN
        </Link>
      )}
    </div>
  );
}