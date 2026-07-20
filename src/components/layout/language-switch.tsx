"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";

import styles from "./language-switch.module.css";

type Language = "tr" | "en";

function TurkishFlag() {
  return (
    <svg
      viewBox="0 0 36 36"
      className={styles.flagIcon}
      aria-hidden="true"
    >
      <circle cx="18" cy="18" r="18" fill="#D9534F" />

      <circle cx="14.8" cy="18" r="8" fill="#FFFFFF" />
      <circle cx="17.4" cy="18" r="6.4" fill="#D9534F" />

      <path
        d="M23.1 14.5l1.05 2.42 2.62.22-1.99 1.7.62 2.54-2.3-1.36-2.26 1.36.6-2.54-1.98-1.7 2.61-.22 1.04-2.42z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function EnglishFlag() {
  return (
    <svg
      viewBox="0 0 36 36"
      className={styles.flagIcon}
      aria-hidden="true"
    >
      <defs>
        <clipPath id="englishFlagClip">
          <circle cx="18" cy="18" r="18" />
        </clipPath>
      </defs>

      <g clipPath="url(#englishFlagClip)">
        <rect width="36" height="36" fill="#315A9D" />

        <path
          d="M0 0l36 36M36 0L0 36"
          stroke="#FFFFFF"
          strokeWidth="8"
        />

        <path
          d="M0 0l36 36M36 0L0 36"
          stroke="#CF4545"
          strokeWidth="3.4"
        />

        <path
          d="M18 0v36M0 18h36"
          stroke="#FFFFFF"
          strokeWidth="10"
        />

        <path
          d="M18 0v36M0 18h36"
          stroke="#CF4545"
          strokeWidth="5.4"
        />
      </g>
    </svg>
  );
}

export default function LanguageSwitch() {
  const [language, setLanguage] = useState<Language>("tr");
  const [isOpen, setIsOpen] = useState(false);

  const switchRef = useRef<HTMLDivElement>(null);

  const selectLanguage = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
    setIsOpen(false);

    /*
     * Gerçek dil sistemi eklendiğinde
     * locale veya route değişikliği burada yapılabilir.
     */
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        switchRef.current &&
        !switchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={switchRef} className={styles.languageSwitch}>
      <button
        type="button"
        className={`${styles.trigger} ${
          isOpen ? styles.triggerOpen : ""
        }`}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Dil seçimi"
      >
        <Globe2
          className={styles.globeIcon}
          size={17}
          strokeWidth={1.55}
          aria-hidden="true"
        />

        <span className={styles.currentLanguage}>
          {language.toUpperCase()}
        </span>

        <ChevronDown
          className={`${styles.chevron} ${
            isOpen ? styles.chevronOpen : ""
          }`}
          size={13}
          strokeWidth={1.9}
          aria-hidden="true"
        />
      </button>

      <div
        className={`${styles.dropdown} ${
          isOpen ? styles.dropdownOpen : ""
        }`}
        role="menu"
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          className={`${styles.option} ${
            language === "tr" ? styles.activeOption : ""
          }`}
          onClick={() => selectLanguage("tr")}
          role="menuitemradio"
          aria-checked={language === "tr"}
          tabIndex={isOpen ? 0 : -1}
        >
          <span className={styles.flag} aria-hidden="true">
            <TurkishFlag />
          </span>

          <span className={styles.optionText}>Türkçe</span>

          <span className={styles.optionMark} aria-hidden="true">
            {language === "tr" && (
              <Check
                className={styles.checkIcon}
                size={16}
                strokeWidth={2}
              />
            )}
          </span>
        </button>

        <div className={styles.divider} aria-hidden="true" />

        <button
          type="button"
          className={`${styles.option} ${
            language === "en" ? styles.activeOption : ""
          }`}
          onClick={() => selectLanguage("en")}
          role="menuitemradio"
          aria-checked={language === "en"}
          tabIndex={isOpen ? 0 : -1}
        >
          <span className={styles.flag} aria-hidden="true">
            <EnglishFlag />
          </span>

          <span className={styles.optionText}>English</span>

          <span className={styles.optionMark} aria-hidden="true">
            {language === "en" && (
              <Check
                className={styles.checkIcon}
                size={16}
                strokeWidth={2}
              />
            )}
          </span>
        </button>
      </div>
    </div>
  );
}