"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import styles from "./gallery-lightbox.module.css";

type GalleryImage = {
  id: string;
  image_url: string;
  caption: string | null;
  alt_text: string | null;
};

type GalleryLightboxProps = {
  images: GalleryImage[];
  albumTitle: string;
};

export default function GalleryLightbox({
  images,
  albumTitle,
}: GalleryLightboxProps) {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  const isOpen = activeIndex !== null;

  function closeLightbox() {
    setActiveIndex(null);
  }

  function showPrevious() {
    if (activeIndex === null) {
      return;
    }

    setActiveIndex(
      activeIndex === 0
        ? images.length - 1
        : activeIndex - 1
    );
  }

  function showNext() {
    if (activeIndex === null) {
      return;
    }

    setActiveIndex(
      activeIndex === images.length - 1
        ? 0
        : activeIndex + 1
    );
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    }

    document.body.style.overflow = "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, activeIndex]);

  return (
    <>
      <div className={styles.imageGrid}>
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className={styles.imageButton}
            onClick={() => setActiveIndex(index)}
            aria-label="Fotoğrafı büyüt"
          >
            <div className={styles.imageWrapper}>
              <Image
                src={image.image_url}
                alt={
                  image.alt_text ??
                  image.caption ??
                  albumTitle
                }
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                className={styles.image}
              />
            </div>

            {image.caption ? (
              <p className={styles.caption}>
                {image.caption}
              </p>
            ) : null}
          </button>
        ))}
      </div>

      {activeIndex !== null ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${albumTitle} fotoğraf görüntüleyici`}
        >
          <button
            type="button"
            className={styles.backdrop}
            onClick={closeLightbox}
            aria-label="Fotoğraf görüntüleyiciyi kapat"
          />

          <button
            type="button"
            className={styles.closeButton}
            onClick={closeLightbox}
            aria-label="Kapat"
          >
            <X size={24} />
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                className={`${styles.navButton} ${styles.previousButton}`}
                onClick={showPrevious}
                aria-label="Önceki fotoğraf"
              >
                <ChevronLeft size={30} />
              </button>

              <button
                type="button"
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={showNext}
                aria-label="Sonraki fotoğraf"
              >
                <ChevronRight size={30} />
              </button>
            </>
          ) : null}

          <div className={styles.lightboxContent}>
            <div className={styles.largeImageWrapper}>
              <Image
                src={images[activeIndex].image_url}
                alt={
                  images[activeIndex].alt_text ??
                  images[activeIndex].caption ??
                  albumTitle
                }
                fill
                priority
                sizes="95vw"
                className={styles.largeImage}
              />
            </div>

            <div className={styles.lightboxFooter}>
              {images[activeIndex].caption ? (
                <p>
                  {images[activeIndex].caption}
                </p>
              ) : (
                <span />
              )}

              <span className={styles.counter}>
                {activeIndex + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}