"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import styles from "./Hero.module.css";

type HeroProps = {
  language?: "tr" | "en";
};

export default function Hero({
  language = "tr",
}: HeroProps) {
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

  const content =
    language === "en"
      ? {
          eyebrow: "Kizzuwatna Research",
          title: "Tatarlı Höyük",
          descriptionLine1:
            "Bringing thousands of years of Eastern Cilicia's past",
          descriptionLine2:
            "to light.",
          arrowLabel:
            "Scroll to the about section",
        }
      : {
          eyebrow: "Kizzuwatna Araştırmaları",
          title: "Tatarlı Höyük",
          descriptionLine1:
            "Doğu Kilikya’nın binlerce yıllık geçmişini",
          descriptionLine2:
            "gün ışığına çıkarıyoruz.",
          arrowLabel:
            "Hakkında bölümüne kaydır",
        };

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
              {content.eyebrow}
            </span>

            <h1>{content.title}</h1>

            <p>
              {content.descriptionLine1}
              <br className={styles.desktopBreak} />
              {content.descriptionLine2}
            </p>
          </div>
        </motion.div>

        <motion.a
          href="#about"
          className={styles.scrollArrow}
          aria-label={content.arrowLabel}
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