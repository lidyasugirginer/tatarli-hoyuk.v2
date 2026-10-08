"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { supporters, type Supporter } from "@/data/supporters";
import styles from "./supporters.module.css";

export default function Supporters() {
  const pathname = usePathname();

  // Destekçi listesi boş olduğunda public sayfalarda hiçbir şey gösterme
  if (!supporters || supporters.length === 0) {
    return null;
  }

  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const title = isEnglish ? "Our Supporters" : "Destekçilerimiz";

  return (
    <section className={styles.supportersSection} aria-label={title}>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.titleLine} aria-hidden="true" />
        </div>

        <div className={styles.logoGrid}>
          {supporters.map((supporter: Supporter) => {
            const displayName =
              (isEnglish && supporter.nameEn) || supporter.name;

            const logoElement = (
              <Image
                src={supporter.logo}
                alt={displayName}
                width={supporter.width ?? 280}
                height={supporter.height ?? 140}
                className={styles.logo}
              />
            );

            return supporter.url ? (
              <a
                key={supporter.id}
                href={supporter.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.logoWrapper}
                title={displayName}
              >
                {logoElement}
              </a>
            ) : (
              <div
                key={supporter.id}
                className={styles.logoWrapper}
                title={displayName}
              >
                {logoElement}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

