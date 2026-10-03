import NewsDetailPage from "@/components/news/NewsDetailPage";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function NewsDetail({
  params,
}: PageProps) {
  const { slug } = await params;

  return (
    <NewsDetailPage
      slug={slug}
      language="en"
    />
  );
}