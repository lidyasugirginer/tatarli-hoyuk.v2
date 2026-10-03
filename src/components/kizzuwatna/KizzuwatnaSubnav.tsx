"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./kizzuwatna-subnav.module.css";

type Language = "tr" | "en";

type KizzuwatnaSubnavProps = {
  language?: Language;
};

const navigationData = {
  tr: {
    ariaLabel: "Kizzuwatna Araştırmaları",
    brandFirst: "Kizzuwatna",
    brandSecond: "Araştırmaları",
    mainItems: [
      {
        label: "Hakkında",
        href: "/kizzuwatna",
      },
      {
        label: "Bileç Höyük Kurtarma Kazısı",
        href: "/kizzuwatna/bilec-hoyuk-kurtarma-kazisi",
      },
    ],
    groupLabel: "Yüzey Araştırmaları",
    surveyItems: [
      {
        label: "Adana İli",
        href: "/kizzuwatna/yuzey-arastirmalari/adana",
      },
      {
        label: "Kayseri İli",
        href: "/kizzuwatna/yuzey-arastirmalari/kayseri",
      },
    ],
  },
  en: {
    ariaLabel: "Kizzuwatna Research Project",
    brandFirst: "Kizzuwatna",
    brandSecond: "Research Project",
    mainItems: [
      {
        label: "About",
        href: "/en/kizzuwatna",
      },
      {
        label: "Bileç Höyük Rescue Excavation",
        href: "/en/kizzuwatna/bilec-hoyuk-rescue-excavation",
      },
    ],
    groupLabel: "Archaeological Surveys",
    surveyItems: [
      {
        label: "Adana",
        href: "/en/kizzuwatna/surveys/adana",
      },
      {
        label: "Kayseri",
        href: "/en/kizzuwatna/surveys/kayseri",
      },
    ],
  },
} as const;

export default function KizzuwatnaSubnav({
  language,
}: KizzuwatnaSubnavProps = {}) {
  const pathname = usePathname();

  const isEnglish = language
    ? language === "en"
    : pathname === "/en" || pathname.startsWith("/en/");
  const lang: Language = isEnglish ? "en" : "tr";
  const nav = navigationData[lang];

  const isActive = (href: string) => {
    if (href === "/kizzuwatna" || href === "/en/kizzuwatna") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      className={styles.navigation}
      aria-label={nav.ariaLabel}
    >
      <p className={styles.label}>
        {nav.brandFirst}
        <span>{nav.brandSecond}</span>
      </p>

      <div className={styles.links}>
        {nav.mainItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.link} ${
                active ? styles.active : ""
              }`}
            >
              <span>{item.label}</span>

              {active && (
                <span
                  className={styles.activeLine}
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}

        <div className={styles.group}>
          <p className={styles.groupLabel}>
            {nav.groupLabel}
          </p>

          <div className={styles.subLinks}>
            {nav.surveyItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.link} ${styles.subLink} ${
                    active ? styles.active : ""
                  }`}
                >
                  <span>{item.label}</span>

                  {active && (
                    <span
                      className={styles.activeLine}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
