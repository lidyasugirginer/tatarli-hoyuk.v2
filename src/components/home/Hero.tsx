"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import styles from "./Hero.module.css";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  const videoScale = useTransform(
    smoothProgress,
    [0, 1],
    [1.02, 1]
  );

  const contentOpacity = useTransform(
    smoothProgress,
    [0, 0.65, 1],
    [1, 1, 0.82]
  );

  const contentY = useTransform(
    smoothProgress,
    [0, 1],
    [0, -35]
  );

  const arrowOpacity = useTransform(
    smoothProgress,
    [0, 0.15],
    [1, 0]
  );

  const arrowY = useTransform(
    smoothProgress,
    [0, 0.15],
    [0, 12]
  );


  return (
    <section
      ref={heroRef}
      className={styles.hero}
    >
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
          }}
        >
          <source
            src="/video/hero.mp4"
            type="video/mp4"
          />
        </motion.video>

        <div className={styles.overlay} />

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
      </div>
    </section>
  );
}