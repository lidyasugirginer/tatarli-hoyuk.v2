"use client";

import type { FilterState, FindTypeKey, MaterialKey, PeriodKey, Language } from "@/types/find";
import {
  PERIOD_FILTERS,
  FIND_TYPE_OPTIONS,
  MATERIAL_OPTIONS,
} from "@/data/finds";
import styles from "./finds.module.css";

type FindsFiltersProps = {
  filters: FilterState;
  onChange: (updater: (prev: FilterState) => FilterState) => void;
  availableFindspots: { key: string; label: { tr: string; en: string } }[];
  availableYears: number[];
  language: Language;
};

const labels = {
  tr: {
    periodLabel: "Dönem",
    findTypeDefault: "Buluntu Türü",
    materialDefault: "Malzeme",
    findspotDefault: "Buluntu Yeri",
    yearDefault: "Yıl",
    allFindspots: "Tüm Buluntu Yerleri",
    allYears: "Tüm Yıllar",
    searchPlaceholder: "Buluntu ara...",
    clearSearch: "Aramayı temizle",
  },
  en: {
    periodLabel: "Period",
    findTypeDefault: "Find Type",
    materialDefault: "Material",
    findspotDefault: "Findspot",
    yearDefault: "Year",
    allFindspots: "All Findspots",
    allYears: "All Years",
    searchPlaceholder: "Search finds...",
    clearSearch: "Clear search",
  },
} as const;

export default function FindsFilters({
  filters,
  onChange,
  availableFindspots,
  availableYears,
  language,
}: FindsFiltersProps) {
  const t = labels[language];

  return (
    <div className={styles.filterSection}>
      {/* 1. Dönem Filtresi (Yatay Tablar) */}
      <div className={styles.periodRow}>
        <span className={styles.periodLabel}>{t.periodLabel}</span>

        <div className={styles.periodTabs} role="tablist" aria-label={t.periodLabel}>
          {PERIOD_FILTERS.map((item) => {
            const isActive = filters.period === item.key;

            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.periodButton} ${
                  isActive ? styles.periodButtonActive : ""
                }`}
                onClick={() =>
                  onChange((prev) => ({
                    ...prev,
                    period: item.key,
                  }))
                }
              >
                {item.label[language]}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.filterDivider} />

      {/* 2. İkinci Filtre Satırı (Dropdownlar ve Arama) */}
      <div className={styles.secondaryFilterRow}>
        <div className={styles.dropdownsGroup}>
          {/* Buluntu Türü */}
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={filters.findType}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  findType: e.target.value as FindTypeKey,
                }))
              }
              aria-label={t.findTypeDefault}
            >
              {FIND_TYPE_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label[language]}
                </option>
              ))}
            </select>
            <span className={styles.selectArrow} aria-hidden="true">
              ▼
            </span>
          </div>

          {/* Malzeme */}
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={filters.material}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  material: e.target.value as MaterialKey,
                }))
              }
              aria-label={t.materialDefault}
            >
              {MATERIAL_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label[language]}
                </option>
              ))}
            </select>
            <span className={styles.selectArrow} aria-hidden="true">
              ▼
            </span>
          </div>

          {/* Buluntu Yeri */}
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={filters.findspot}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  findspot: e.target.value,
                }))
              }
              aria-label={t.findspotDefault}
            >
              <option value="all">{t.allFindspots}</option>
              {availableFindspots.map((spot) => (
                <option key={spot.key} value={spot.key}>
                  {spot.label[language]}
                </option>
              ))}
            </select>
            <span className={styles.selectArrow} aria-hidden="true">
              ▼
            </span>
          </div>

          {/* Yıl */}
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={filters.year}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  year: e.target.value,
                }))
              }
              aria-label={t.yearDefault}
            >
              <option value="all">{t.allYears}</option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr.toString()}>
                  {yr}
                </option>
              ))}
            </select>
            <span className={styles.selectArrow} aria-hidden="true">
              ▼
            </span>
          </div>
        </div>

        {/* Sağ Taraf: Arama Kutusu */}
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon} aria-hidden="true">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>

          <input
            type="text"
            className={styles.searchInput}
            placeholder={t.searchPlaceholder}
            value={filters.searchQuery}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                searchQuery: e.target.value,
              }))
            }
            aria-label={t.searchPlaceholder}
          />

          {filters.searchQuery && (
            <button
              type="button"
              className={styles.clearSearchBtn}
              onClick={() =>
                onChange((prev) => ({
                  ...prev,
                  searchQuery: "",
                }))
              }
              aria-label={t.clearSearch}
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
