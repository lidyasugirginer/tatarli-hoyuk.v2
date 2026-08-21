"use client";

import { Globe2 } from "lucide-react";

import styles from "./language-switch.module.css";

type LanguageSwitchProps = {
  isHomePage: boolean;
};

export default function LanguageSwitch({
  isHomePage,
}: LanguageSwitchProps) {
  return (
    <div
      className={`${styles.languageSwitch} ${
        isHomePage
          ? styles.home
          : styles.inner
      }`}
      aria-label="Dil seçimi"
    >
      <Globe2
        className={styles.globeIcon}
        size={15}
        strokeWidth={1.7}
        aria-hidden="true"
      />

      <span className={styles.activeLanguage}>
        TR
      </span>

      <span
        className={styles.separator}
        aria-hidden="true"
      >
        |
      </span>

      <span
        className={styles.disabledLanguage}
        title="İngilizce sürüm yakında"
      >
        EN
      </span>
    </div>
  );
}