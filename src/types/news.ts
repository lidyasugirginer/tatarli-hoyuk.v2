export type NewsStatus =
  | "draft"
  | "published"
  | "archived";

export type NewsContentType =
  | "news"
  | "announcement";

export type NewsLanguage =
  | "tr"
  | "en";

export type NewsTranslation = {
  id?: string;
  news_id?: string;

  language: NewsLanguage;

  title: string;
  summary: string | null;
  content: string | null;
  slug: string;

  created_at?: string;
  updated_at?: string;
};

export type NewsItem = {
  id: string;

  cover_image_url: string;
  published_at: string;

  status: NewsStatus;
  content_type: NewsContentType;

  created_at: string;
  updated_at: string;

  translations?: NewsTranslation[];

  /*
    GEÇİŞ DÖNEMİ:
    Admin haber listesi henüz eski alanları kullandığı
    için şimdilik bunları optional bırakıyoruz.
    Haber sistemi tamamen yeni yapıya geçtiğinde kaldıracağız.
  */

  title_tr?: string | null;
  title_en?: string | null;

  summary_tr?: string | null;
  summary_en?: string | null;

  url?: string | null;
};

export type NewsTranslationFormValues = {
  title: string;
  summary: string;
  content: string;
};

export type NewsFormValues = {
  cover_image_url: string;

  published_at: string;

  status: NewsStatus;

  content_type: NewsContentType;

  translations: {
    tr: NewsTranslationFormValues;
    en: NewsTranslationFormValues;
  };
};