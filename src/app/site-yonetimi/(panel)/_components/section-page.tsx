import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import {
  ArrowRight,
  Plus,
} from "lucide-react";

import styles from "./section-page.module.css";

type SectionPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  icon: LucideIcon;
  newItemHref?: string;
  newItemLabel?: string;
};

export default function SectionPage({
  eyebrow,
  title,
  description,
  emptyTitle,
  emptyDescription,
  icon: Icon,
  newItemHref,
  newItemLabel,
}: SectionPageProps) {
  return (
    <div className={styles.page}>
      <section className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        {newItemHref && newItemLabel ? (
          <Link href={newItemHref} className={styles.primaryButton}>
            <Plus size={18} />
            <span>{newItemLabel}</span>
          </Link>
        ) : null}
      </section>

      <section className={styles.contentCard}>
        <div className={styles.tableHeader}>
          <div>
            <p className={styles.cardLabel}>Kayıtlar</p>
            <h3>{title}</h3>
          </div>

          <span className={styles.recordCount}>0 kayıt</span>
        </div>

        <div className={styles.emptyState}>
          <div className={styles.iconBox}>
            <Icon size={28} />
          </div>

          <h3>{emptyTitle}</h3>
          <p>{emptyDescription}</p>

          {newItemHref && newItemLabel ? (
            <Link href={newItemHref} className={styles.emptyLink}>
              {newItemLabel}
              <ArrowRight size={16} />
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}