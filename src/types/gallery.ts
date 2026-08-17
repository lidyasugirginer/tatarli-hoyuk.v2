export type GalleryAlbum = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_image_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type GalleryAlbumFormValues = {
  title: string;
  description: string;
  cover_image_url: string;
};