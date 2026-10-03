import GalleryDetailPage from "@/components/gallery/GalleryDetailPage";

type GalleryAlbumPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EnglishGalleryAlbumPage({
  params,
}: GalleryAlbumPageProps) {
  const { slug } = await params;

  return (
    <GalleryDetailPage
      slug={slug}
      language="en"
    />
  );
}

