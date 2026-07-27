export type NewsStatus = "draft" | "published" | "archived";

export type NewsItem = {
  id: string;
  title_tr: string;
  title_en: string;
  summary_tr: string;
  summary_en: string;
  cover_image_url: string;
  url: string;
  published_at: string;
  status: NewsStatus;
  created_at: string;
  updated_at: string;
};

export type NewsFormValues = {
  title_tr: string;
  title_en: string;
  summary_tr: string;
  summary_en: string;
  cover_image_url: string;
  url: string;
  published_at: string;
  status: NewsStatus;
};