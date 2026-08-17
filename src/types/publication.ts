export type PublicationItem = {
  id: string;
  title: string;
  authors: string;
  publication_year: number;
  publication_type: string;
  cover_image_url: string;
  publication_url: string;
  sort_order: number;
};

export type PublicationFormValues = {
  title: string;
  authors: string;
  publication_year: string;
  publication_type: string;
  cover_image_url: string;
  publication_url: string;
};