"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./kizzuwatna-subnav.module.css";

const mainItems = [
  {
    label: "Hakkında",
    href: "/kizzuwatna",
  },
  {
    label: "Bileç Höyük Kurtarma Kazısı",
    href: "/kizzuwatna/bilec-hoyuk-kurtarma-kazisi",
  },
];

const surveyItems = [
  {
    label: "Adana İli",
    href: "/kizzuwatna/yuzey-arastirmalari/adana",
  },
  {
    label: "Kayseri İli",
    href: "/kizzuwatna/yuzey-arastirmalari/kayseri",
  },
];

export default function KizzuwatnaSubnav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/kizzuwatna") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      className={styles.navigation}
      aria-label="Kizzuwatna Araştırmaları"
    >
      <p className={styles.label}>
        Kizzuwatna
        <span>Araştırmaları</span>
      </p>

      <div className={styles.links}>
        {mainItems.map((item) => {
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
            Yüzey Araştırmaları
          </p>

          <div className={styles.subLinks}>
            {surveyItems.map((item) => {
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