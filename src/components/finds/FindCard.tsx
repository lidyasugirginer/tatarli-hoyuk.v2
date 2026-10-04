import Image from "next/image";
import type { FindItem, Language } from "@/types/find";
import styles from "./finds.module.css";

type FindCardProps = {
  find: FindItem;
  language: Language;
  onSelect: (find: FindItem) => void;
};

export default function FindCard({
  find,
  language,
  onSelect,
}: FindCardProps) {
  const coverImage = find.images[0] || "/images/hakkinda/cizim0.png";

  return (
    <article
      className={styles.findCard}
      onClick={() => onSelect(find)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(find);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${find.title[language]} (${find.period[language]})`}
    >
      <div className={styles.cardImageWrapper}>
        <Image
          src={coverImage}
          alt={find.title[language]}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw"
          className={styles.cardImage}
        />
      </div>

      <div className={styles.cardContent}>
        <span className={styles.cardPeriod}>
          {find.period[language]}
        </span>

        <h3 className={styles.cardTitle}>
          {find.title[language]}
        </h3>

        <div className={styles.cardFooter}>
          <span className={styles.cardMaterial}>
            {find.material[language]}
          </span>

          <span className={styles.cardFindspot}>
            {find.findspot[language]}
          </span>
        </div>
      </div>
    </article>
  );
}
