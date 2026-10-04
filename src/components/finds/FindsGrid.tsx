import type { FindItem, Language } from "@/types/find";
import FindCard from "./FindCard";
import styles from "./finds.module.css";

type FindsGridProps = {
  finds: FindItem[];
  totalCount: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onSelectFind: (find: FindItem) => void;
  language: Language;
};

const labels = {
  tr: {
    findsCountSuffix: "buluntu",
    clearFilters: "Filtreleri Temizle",
    noResults: "Seçilen kriterlere uygun arkeolojik buluntu bulunamadı.",
    showAll: "Tüm Buluntuları Göster",
  },
  en: {
    findsCountSuffix: "finds",
    clearFilters: "Clear Filters",
    noResults: "No archaeological finds match the selected criteria.",
    showAll: "Show All Finds",
  },
} as const;

export default function FindsGrid({
  finds,
  totalCount,
  hasActiveFilters,
  onClearFilters,
  onSelectFind,
  language,
}: FindsGridProps) {
  const t = labels[language];

  return (
    <div>
      {/* Sonuç Sayısı ve Sıralama Olmayan Sade Çubuk */}
      <div className={styles.resultsBar}>
        <div className={styles.resultsLeft}>
          <span className={styles.resultsCount}>
            {finds.length} {t.findsCountSuffix}
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              className={styles.clearAllBtn}
              onClick={onClearFilters}
            >
              {t.clearFilters}
            </button>
          )}
        </div>

        {/* Akademik / Müze Katalogu Görünüm Simgesi */}
        <div className={styles.viewIndicator} aria-hidden="true" title="Arşiv Kataloğu">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </div>
      </div>

      {/* Buluntu Izgarası veya Boş Durum */}
      {finds.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>{t.noResults}</p>
          <button
            type="button"
            className={styles.resetButton}
            onClick={onClearFilters}
          >
            {t.showAll}
          </button>
        </div>
      ) : (
        <div className={styles.findsGrid}>
          {finds.map((find) => (
            <FindCard
              key={find.id}
              find={find}
              language={language}
              onSelect={onSelectFind}
            />
          ))}
        </div>
      )}
    </div>
  );
}
