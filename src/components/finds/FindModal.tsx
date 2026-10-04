"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { FindItem, Language } from "@/types/find";
import styles from "./finds.module.css";

type FindModalProps = {
  find: FindItem | null;
  language: Language;
  onClose: () => void;
};

const labels = {
  tr: {
    close: "Kapat",
    period: "Dönem",
    material: "Malzeme",
    findspot: "Buluntu yeri",
    year: "Buluntu yılı",
    inventoryNo: "Envanter no",
    imagesAlt: "Eser görseli",
  },
  en: {
    close: "Close",
    period: "Period",
    material: "Material",
    findspot: "Findspot",
    year: "Year of excavation",
    inventoryNo: "Inventory no",
    imagesAlt: "Artifact image",
  },
} as const;

export default function FindModal({
  find,
  language,
  onClose,
}: FindModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Eser değiştiğinde ilk görseli aktif yap
  useEffect(() => {
    setActiveImageIndex(0);
  }, [find]);

  // ESC tuşu ve body scroll lock
  useEffect(() => {
    if (!find) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [find, onClose]);

  if (!find) return null;

  const t = labels[language];
  const images = find.images.length > 0 ? find.images : ["/images/hakkinda/cizim0.png"];
  const currentImage = images[activeImageIndex] || images[0];

  return (
    <div
      className={styles.modalOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="find-modal-title"
    >
      <div className={styles.modalContainer}>
        <button
          type="button"
          className={styles.modalCloseButton}
          onClick={onClose}
          aria-label={t.close}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Sol Taraf: Görsel ve Küçük Resimler */}
        <div className={styles.modalVisual}>
          <div className={styles.modalMainImageWrapper}>
            <Image
              src={currentImage}
              alt={`${find.title[language]} - ${t.imagesAlt}`}
              fill
              sizes="(max-width: 860px) 100vw, 600px"
              className={styles.modalMainImage}
              priority
            />
          </div>

          {images.length > 1 && (
            <div className={styles.thumbnailsList} role="tablist">
              {images.map((img, idx) => (
                <button
                  key={img + idx}
                  type="button"
                  className={`${styles.thumbnailBtn} ${
                    idx === activeImageIndex ? styles.thumbnailBtnActive : ""
                  }`}
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`${t.imagesAlt} ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="68px"
                    className={styles.thumbnailImage}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sağ Taraf: Başlık, Metadata, Açıklama */}
        <div className={styles.modalContent}>
          <span className={styles.modalPeriod}>
            {find.period[language]}
          </span>

          <h2 id="find-modal-title" className={styles.modalTitle}>
            {find.title[language]}
          </h2>

          <div className={styles.modalTitleLine} aria-hidden="true" />

          <dl className={styles.metadataGrid}>
            <div className={styles.metadataRow}>
              <dt className={styles.metadataLabel}>{t.period}:</dt>
              <dd className={styles.metadataValue}>{find.period[language]}</dd>
            </div>

            <div className={styles.metadataRow}>
              <dt className={styles.metadataLabel}>{t.material}:</dt>
              <dd className={styles.metadataValue}>{find.material[language]}</dd>
            </div>

            <div className={styles.metadataRow}>
              <dt className={styles.metadataLabel}>{t.findspot}:</dt>
              <dd className={styles.metadataValue}>{find.findspot[language]}</dd>
            </div>

            <div className={styles.metadataRow}>
              <dt className={styles.metadataLabel}>{t.year}:</dt>
              <dd className={styles.metadataValue}>{find.year}</dd>
            </div>

            <div className={styles.metadataRow}>
              <dt className={styles.metadataLabel}>{t.inventoryNo}:</dt>
              <dd className={styles.metadataValue}>{find.inventoryNo}</dd>
            </div>
          </dl>

          <p className={styles.modalDescription}>
            {find.description[language]}
          </p>
        </div>
      </div>
    </div>
  );
}
