export type Language = "tr" | "en";

export type PeriodKey =
  | "all"
  | "neolithic"
  | "chalcolithic"
  | "early-bronze"
  | "middle-bronze"
  | "late-bronze"
  | "iron-age"
  | "hellenistic-roman";

export type FindTypeKey =
  | "all"
  | "ceramic"
  | "seal"
  | "figurine"
  | "metal"
  | "stone"
  | "other";

export type MaterialKey =
  | "all"
  | "ceramic"
  | "terracotta"
  | "stone"
  | "bronze"
  | "obsidian";

export type FindItem = {
  id: string;
  periodKey: PeriodKey;
  period: {
    tr: string;
    en: string;
  };
  typeKey: FindTypeKey;
  type: {
    tr: string;
    en: string;
  };
  materialKey: MaterialKey;
  material: {
    tr: string;
    en: string;
  };
  findspot: {
    tr: string;
    en: string;
  };
  year: number;
  inventoryNo: string;
  title: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  images: string[];
};

export type FilterState = {
  period: PeriodKey;
  findType: FindTypeKey;
  material: MaterialKey;
  findspot: string;
  year: string;
  searchQuery: string;
};
