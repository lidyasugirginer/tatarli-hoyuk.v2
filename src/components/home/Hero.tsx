"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import styles from "./Hero.module.css";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1.08, 1]
  );

  const videoOpacity = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [1, 0.72, 0]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.8],
    [1, 1, 0]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.8],
    [0, -260]
  );

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, 0.2]
  );

  const arrowOpacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    [1, 0]
  );

  const arrowY = useTransform(
    scrollYProgress,
    [0, 0.2],
    [0, 30]
  );

  const fadeOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.85],
    [0, 0.35, 1]
  );

  const fadeY = useTransform(
    scrollYProgress,
    [0, 0.85],
    [40, 0]
  );

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.stickyWrapper}>
        <motion.video
          className={styles.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero.jpg"
          style={{
            scale: videoScale,
            opacity: videoOpacity,
          }}
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </motion.video>

        <motion.div
          className={styles.overlay}
          style={{
            opacity: overlayOpacity,
          }}
        />

        <motion.div
          className={styles.contentAnimation}
          style={{
            opacity: contentOpacity,
            y: contentY,
          }}
        >
          <div className={styles.content}>
            <span className={styles.eyebrow}>
              Kizzuwatna Araştırmaları
            </span>

            <h1>Tatarlı Höyük</h1>

            <p>
              Doğu Kilikya’nın binlerce yıllık geçmişini
              <br className={styles.desktopBreak} />
              gün ışığına çıkarıyoruz.
            </p>
          </div>
        </motion.div>

        <motion.a
          href="#about"
          className={styles.scrollArrow}
          aria-label="Hakkında bölümüne kaydır"
          style={{
            opacity: arrowOpacity,
            y: arrowY,
          }}
        >
          <span />
        </motion.a>

        <motion.div
          className={styles.bottomFade}
          style={{
            opacity: fadeOpacity,
            y: fadeY,
          }}
        />
      </div>
    </section>
  );
}