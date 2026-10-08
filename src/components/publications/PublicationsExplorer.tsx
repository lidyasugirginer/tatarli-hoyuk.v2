"use client";

import { useMemo, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  RotateCcw,
} from "lucide-react";

import type { PublicationItem } from "@/types/publication";
import styles from "./PublicationsPage.module.css";

type Language = "tr" | "en";
type SortOption = "newest" | "oldest" | "title-asc" | "title-desc";

type PublicationsExplorerProps = {
  publications: PublicationItem[];
  language?: Language;
};

const filterLabels = {
  tr: {
    searchPlaceholder: "Yayınlarda ara...",
    allYears: "Tüm Yıllar",
    allTypes: "Tüm Türler",
    sortBy: "Sıralama",
    sortNewest: "Yeniden eskiye",
    sortOldest: "Eskiden yeniye",
    sortTitleAsc: "Başlığa göre A–Z",
    sortTitleDesc: "Başlığa göre Z–A",
    clearFilters: "Filtreleri Temizle",
    noResults: "Aramanızla eşleşen yayın bulunamadı.",
    totalCount: (count: number) => `${count} yayın`,
    filteredCount: (count: number) => `${count} yayın bulundu`,
    coverAltSuffix: "kapak görseli",
    perPage: "Sayfa başına:",
    previous: "Önceki",
    next: "Sonraki",
    rangeFormat: (start: number, end: number, total: number) =>
      `${start}–${end} / ${total} yayın`,
  },
  en: {
    searchPlaceholder: "Search publications...",
    allYears: "All Years",
    allTypes: "All Types",
    sortBy: "Sort by",
    sortNewest: "Newest First",
    sortOldest: "Oldest First",
    sortTitleAsc: "Title A–Z",
    sortTitleDesc: "Title Z–A",
    clearFilters: "Clear Filters",
    noResults: "No matching publications found.",
    totalCount: (count: number) =>
      `${count} publication${count === 1 ? "" : "s"}`,
    filteredCount: (count: number) =>
      `${count} publication${count === 1 ? "" : "s"} found`,
    coverAltSuffix: "cover image",
    perPage: "Per page:",
    previous: "Previous",
    next: "Next",
    rangeFormat: (start: number, end: number, total: number) =>
      `${start}–${end} of ${total} publications`,
  },
} as const;

function getPublicationType(type: string, language: Language) {
  if (language === "tr") {
    return type;
  }

  const typeTranslations: Record<string, string> = {
    "Makale": "Article",
    "Kitap": "Book",
    "Kitap Bölümü": "Book Chapter",
    "Bildiri": "Conference Paper",
    "Tez": "Thesis",
    "Rapor": "Report",
    "Monografi": "Monograph",
    "Diğer": "Other",
  };

  return typeTranslations[type] ?? type;
}

function normalizeSearchText(str: string): string {
  if (!str) return "";
  return str
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .trim();
}

function getPaginationPages(
  currentPage: number,
  totalPages: number
): (number | "...")[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  if (currentPage <= 3) {
    pages.push(1, 2, 3, 4, "...", totalPages);
  } else if (currentPage >= totalPages - 2) {
    pages.push(
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    );
  } else {
    pages.push(
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages
    );
  }

  return pages;
}

export default function PublicationsExplorer({
  publications,
  language = "tr",
}: PublicationsExplorerProps) {
  const explorerRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const t = filterLabels[language];

  // Veritabanındaki mevcut yayınlardan benzersiz yılları dinamik olarak çıkar
  const availableYears = useMemo(() => {
    const yearsSet = new Set<number>();
    publications.forEach((item) => {
      if (item.publication_year) {
        yearsSet.add(item.publication_year);
      }
    });
    return Array.from(yearsSet).sort((a, b) => b - a);
  }, [publications]);

  // Veritabanındaki mevcut yayınlardan benzersiz türleri dinamik olarak çıkar
  const availableTypes = useMemo(() => {
    const typesSet = new Set<string>();
    publications.forEach((item) => {
      if (item.publication_type && item.publication_type.trim()) {
        typesSet.add(item.publication_type.trim());
      }
    });
    return Array.from(typesSet).sort((a, b) =>
      a.localeCompare(b, language === "tr" ? "tr" : "en")
    );
  }, [publications, language]);

  // Filtreleme ve sıralama
  const normalizedQuery = useMemo(
    () => normalizeSearchText(searchQuery),
    [searchQuery]
  );

  const filteredPublications = useMemo(() => {
    return publications
      .filter((publication) => {
        // Arama filtresi (başlık veya yazar)
        if (normalizedQuery) {
          const titleNormalized = normalizeSearchText(publication.title || "");
          const authorsNormalized = normalizeSearchText(
            publication.authors || ""
          );
          if (
            !titleNormalized.includes(normalizedQuery) &&
            !authorsNormalized.includes(normalizedQuery)
          ) {
            return false;
          }
        }

        // Yıl filtresi
        if (selectedYear !== "all") {
          if (publication.publication_year !== Number(selectedYear)) {
            return false;
          }
        }

        // Tür filtresi
        if (selectedType !== "all") {
          if (publication.publication_type !== selectedType) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const locale = language === "tr" ? "tr" : "en";
        switch (sortBy) {
          case "oldest":
            if (a.publication_year !== b.publication_year) {
              return a.publication_year - b.publication_year;
            }
            return (a.title || "").localeCompare(b.title || "", locale);
          case "title-asc":
            return (a.title || "").localeCompare(b.title || "", locale);
          case "title-desc":
            return (b.title || "").localeCompare(a.title || "", locale);
          case "newest":
          default:
            if (a.publication_year !== b.publication_year) {
              return b.publication_year - a.publication_year;
            }
            return (a.title || "").localeCompare(b.title || "", locale);
        }
      });
  }, [
    publications,
    normalizedQuery,
    selectedYear,
    selectedType,
    sortBy,
    language,
  ]);

  // Sayfalama hesaplamaları
  const totalItems = filteredPublications.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const paginatedPublications = useMemo(() => {
    return filteredPublications.slice(startIndex, endIndex);
  }, [filteredPublications, startIndex, endIndex]);

  const paginationPages = useMemo(() => {
    return getPaginationPages(safeCurrentPage, totalPages);
  }, [safeCurrentPage, totalPages]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedYear !== "all" ||
    selectedType !== "all" ||
    sortBy !== "newest";

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (size: number) => {
    setItemsPerPage(size);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedYear("all");
    setSelectedType("all");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === safeCurrentPage) {
      return;
    }
    setCurrentPage(newPage);

    if (explorerRef.current) {
      const stickyHeaderOffset = 90;
      const elementTop =
        explorerRef.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementTop - stickyHeaderOffset),
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={explorerRef} className={styles.explorer}>
      {/* Filtre ve Arama Alanı */}
      <section className={styles.filterSection} aria-label="Yayın filtreleri">
        <div className={styles.filterBar}>
          {/* Arama Alanı */}
          <div className={styles.searchBox}>
            <Search
              className={styles.searchIcon}
              size={15}
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={styles.searchInput}
              aria-label={t.searchPlaceholder}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className={styles.clearSearchButton}
                aria-label={
                  language === "tr" ? "Aramayı temizle" : "Clear search"
                }
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Yıl Filtresi */}
          <div className={`${styles.selectWrapper} ${styles.yearWrapper}`}>
            <select
              value={selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
              className={styles.select}
              aria-label={t.allYears}
            >
              <option value="all">{t.allYears}</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <ChevronDown
              className={styles.selectArrow}
              size={14}
              aria-hidden="true"
            />
          </div>

          {/* Tür Filtresi */}
          <div className={`${styles.selectWrapper} ${styles.typeWrapper}`}>
            <select
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className={styles.select}
              aria-label={t.allTypes}
            >
              <option value="all">{t.allTypes}</option>
              {availableTypes.map((type) => (
                <option key={type} value={type}>
                  {getPublicationType(type, language)}
                </option>
              ))}
            </select>
            <ChevronDown
              className={styles.selectArrow}
              size={14}
              aria-hidden="true"
            />
          </div>

          {/* Sıralama Alanı */}
          <div className={`${styles.selectWrapper} ${styles.sortWrapper}`}>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className={styles.select}
              aria-label={t.sortBy}
            >
              <option value="newest">{t.sortNewest}</option>
              <option value="oldest">{t.sortOldest}</option>
              <option value="title-asc">{t.sortTitleAsc}</option>
              <option value="title-desc">{t.sortTitleDesc}</option>
            </select>
            <ChevronDown
              className={styles.selectArrow}
              size={14}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Durum / Sayaç ve Temizleme Butonu */}
        <div className={styles.statusBar}>
          <span className={styles.resultCount}>
            {hasActiveFilters
              ? t.filteredCount(totalItems)
              : t.totalCount(publications.length)}
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className={styles.clearFiltersButton}
            >
              <RotateCcw size={12} aria-hidden="true" />
              <span>{t.clearFilters}</span>
            </button>
          )}
        </div>
      </section>

      {/* Yayın Listesi veya Eşleşme Bulunamadı Durumu */}
      {totalItems === 0 ? (
        <section className={styles.noMatches}>
          <p className={styles.noMatchesText}>{t.noResults}</p>
          <button
            type="button"
            onClick={handleClearFilters}
            className={styles.clearFiltersButton}
          >
            <RotateCcw size={13} aria-hidden="true" />
            <span>{t.clearFilters}</span>
          </button>
        </section>
      ) : (
        <>
          <section className={styles.publicationList}>
            {paginatedPublications.map((publication) => (
              <article key={publication.id} className={styles.publicationItem}>
                <div className={styles.coverWrapper}>
                  <Image
                    src={publication.cover_image_url}
                    alt={`${publication.title} ${t.coverAltSuffix}`}
                    width={240}
                    height={340}
                    className={styles.cover}
                  />
                </div>

                <div className={styles.publicationInfo}>
                  <Link
                    href={publication.publication_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.publicationTitle}
                  >
                    {publication.title}
                  </Link>

                  <p className={styles.authors}>{publication.authors}</p>

                  <div className={styles.meta}>
                    <span>{publication.publication_year}</span>

                    <span className={styles.dot}>•</span>

                    <span>
                      {getPublicationType(
                        publication.publication_type,
                        language
                      )}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* Sayfalama (Pagination) */}
          <div className={styles.paginationContainer}>
            <div className={styles.paginationInfo}>
              <span className={styles.rangeText}>
                {t.rangeFormat(startIndex + 1, endIndex, totalItems)}
              </span>

              <div className={styles.perPageSelector}>
                <span className={styles.perPageLabel}>{t.perPage}</span>
                <div className={styles.perPageOptions}>
                  {[5, 10, 20].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleItemsPerPageChange(size)}
                      className={`${styles.perPageButton} ${
                        itemsPerPage === size ? styles.perPageButtonActive : ""
                      }`}
                      aria-label={`${size} ${language === "tr" ? "yayın" : "publications"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {totalPages > 1 && (
              <nav
                className={styles.paginationNav}
                aria-label={language === "tr" ? "Sayfalama" : "Pagination"}
              >
                <button
                  type="button"
                  onClick={() => handlePageChange(safeCurrentPage - 1)}
                  disabled={safeCurrentPage === 1}
                  className={styles.pageArrowButton}
                  aria-label={t.previous}
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                  <span className={styles.navButtonText}>{t.previous}</span>
                </button>

                <div className={styles.pageNumbers}>
                  {paginationPages.map((pageItem, idx) =>
                    pageItem === "..." ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className={styles.pageEllipsis}
                        aria-hidden="true"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={pageItem}
                        type="button"
                        onClick={() => handlePageChange(Number(pageItem))}
                        className={`${styles.pageNumberButton} ${
                          safeCurrentPage === pageItem
                            ? styles.pageNumberActive
                            : ""
                        }`}
                        aria-current={
                          safeCurrentPage === pageItem ? "page" : undefined
                        }
                      >
                        {pageItem}
                      </button>
                    )
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handlePageChange(safeCurrentPage + 1)}
                  disabled={safeCurrentPage === totalPages}
                  className={styles.pageArrowButton}
                  aria-label={t.next}
                >
                  <span className={styles.navButtonText}>{t.next}</span>
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              </nav>
            )}
          </div>
        </>
      )}
    </div>
  );
}
