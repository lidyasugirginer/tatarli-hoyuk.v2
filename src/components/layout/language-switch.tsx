"use client";

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
        isHomePage ? styles.home : styles.inner
      }`}
      aria-label="Dil seçimi"
    >
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