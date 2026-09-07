import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import type { GalleryAlbum } from "@/types/gallery";

import GalleryAlbumForm from "@/app/admin/(panel)/galeri/_components/gallery-album-form";

type EditGalleryAlbumPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditGalleryAlbumPage({
  params,
}: EditGalleryAlbumPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gallery_albums")
    .select(
      `
        id,
        title,
        slug,
        description,
        cover_image_url,
        sort_order,
        created_at,
        updated_at
      `
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <GalleryAlbumForm
      album={data as GalleryAlbum}
    />
  );
}