"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import type { FilterState, FindItem, Language } from "@/types/find";
import { MOCK_FINDS } from "@/data/finds";
import FindsFilters from "./FindsFilters";
import FindsGrid from "./FindsGrid";
import FindModal from "./FindModal";
import styles from "./finds.module.css";

type FindsPageProps = {
  language?: Language;
};

const pageContent = {
  tr: {
    breadcrumb: "Buluntular",
    eyebrow: "Tatarlı Höyük Kazısı",
    title: "Buluntular",
    description:
      "Tatarlı Höyük'te farklı dönemlere ait arkeolojik buluntular, yerleşimin kültürel gelişimini ve bölgesel ilişkilerini yansıtmaktadır.",
  },
  en: {
    breadcrumb: "Finds",
    eyebrow: "Tatarlı Höyük Excavation",
    title: "Finds",
    description:
      "Archaeological finds from different periods at Tatarlı Höyük reflect the cultural development of the settlement and its regional connections.",
  },
} as const;

const initialFilters: FilterState = {
  period: "all",
  findType: "all",
  material: "all",
  findspot: "all",
  year: "all",
  searchQuery: "",
};

export default function FindsPage({ language = "tr" }: FindsPageProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [selectedFind, setSelectedFind] = useState<FindItem | null>(null);

  const t = pageContent[language];

  // Veri kümesindeki mevcut buluntu yerleri ve yılları dinamik olarak derle
  const { availableFindspots, availableYears } = useMemo(() => {
    const spotsMap = new Map<string, { tr: string; en: string }>();
    const yearsSet = new Set<number>();

    MOCK_FINDS.forEach((item) => {
      if (item.findspot) {
        spotsMap.set(item.findspot.tr, {
          tr: item.findspot.tr,
          en: item.findspot.en,
        });
      }
      if (item.year) {
        yearsSet.add(item.year);
      }
    });

    const spotsList = Array.from(spotsMap.entries()).map(([key, label]) => ({
      key,
      label,
    }));

    const yearsList = Array.from(yearsSet).sort((a, b) => b - a);

    return {
      availableFindspots: spotsList,
      availableYears: yearsList,
    };
  }, []);

  // Filtrelenmiş buluntuları hesapla
  const filteredFinds = useMemo(() => {
    return MOCK_FINDS.filter((item) => {
      // 1. Dönem filtresi
      if (filters.period !== "all" && item.periodKey !== filters.period) {
        return false;
      }

      // 2. Buluntu türü filtresi
      if (filters.findType !== "all" && item.typeKey !== filters.findType) {
        return false;
      }

      // 3. Malzeme filtresi
      if (filters.material !== "all" && item.materialKey !== filters.material) {
        return false;
      }

      // 4. Buluntu yeri filtresi
      if (filters.findspot !== "all" && item.findspot.tr !== filters.findspot) {
        return false;
      }

      // 5. Yıl filtresi
      if (filters.year !== "all" && item.year.toString() !== filters.year) {
        return false;
      }

      // 6. Metin araması
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const titleTr = item.title.tr.toLowerCase();
        const titleEn = item.title.en.toLowerCase();
        const descTr = item.description.tr.toLowerCase();
        const descEn = item.description.en.toLowerCase();
        const inv = item.inventoryNo.toLowerCase();
        const spotTr = item.findspot.tr.toLowerCase();
        const spotEn = item.findspot.en.toLowerCase();
        const matTr = item.material.tr.toLowerCase();
        const matEn = item.material.en.toLowerCase();

        const match =
          titleTr.includes(query) ||
          titleEn.includes(query) ||
          descTr.includes(query) ||
          descEn.includes(query) ||
          inv.includes(query) ||
          spotTr.includes(query) ||
          spotEn.includes(query) ||
          matTr.includes(query) ||
          matEn.includes(query);

        if (!match) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  const hasActiveFilters =
    filters.period !== "all" ||
    filters.findType !== "all" ||
    filters.material !== "all" ||
    filters.findspot !== "all" ||
    filters.year !== "all" ||
    filters.searchQuery.trim().length > 0;

  const handleClearFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* 1. Page Header & Frieze */}
        <PageHeader
          breadcrumb={t.breadcrumb}
          eyebrow={t.eyebrow}
          title={t.title}
          language={language}
        />

        {/* Akademik Açıklama */}
        <p className={styles.pageIntro}>{t.description}</p>

        {/* 2 & 3. Dönem Filtresi ve İkinci Filtre Satırı */}
        <FindsFilters
          filters={filters}
          onChange={setFilters}
          availableFindspots={availableFindspots}
          availableYears={availableYears}
          language={language}
        />

        {/* 4 & 5. Sonuç Satırı ve Buluntu Izgarası */}
        <FindsGrid
          finds={filteredFinds}
          totalCount={MOCK_FINDS.length}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={handleClearFilters}
          onSelectFind={setSelectedFind}
          language={language}
        />

        {/* 6. Buluntu Detay Modalı (Lightbox) */}
        <FindModal
          find={selectedFind}
          language={language}
          onClose={() => setSelectedFind(null)}
        />
      </div>
    </main>
  );
}
