import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import GalleryImageManager from "@/app/admin/(panel)/galeri/_components/gallery-image-manager";
type GalleryPhotosPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function GalleryPhotosPage({
  params,
}: GalleryPhotosPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: album, error: albumError } = await supabase
    .from("gallery_albums")
    .select("id, title, slug")
    .eq("id", id)
    .single();

  if (albumError || !album) {
    notFound();
  }

  const { data: images, error: imagesError } = await supabase
    .from("gallery_images")
    .select(
      `
        id,
        album_id,
        image_url,
        caption,
        alt_text,
        created_at
      `
    )
    .eq("album_id", id)
    .order("created_at", { ascending: true });

  return (
    <GalleryImageManager
      album={album}
      initialImages={images ?? []}
      hasLoadError={Boolean(imagesError)}
    />
  );
}