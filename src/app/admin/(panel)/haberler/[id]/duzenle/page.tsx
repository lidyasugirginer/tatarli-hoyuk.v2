import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import type {
  NewsItem,
  NewsTranslation,
} from "@/types/news";

import NewsForm from "../../_components/news-form";

type EditNewsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditNewsPage({
  params,
}: EditNewsPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("news")
    .select(
      `
        id,
        cover_image_url,
        published_at,
        status,
        content_type,
        created_at,
        updated_at,

        news_translations (
          id,
          news_id,
          language,
          title,
          summary,
          content,
          slug,
          created_at,
          updated_at
        )
      `
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const news: NewsItem = {
    id: data.id,

    cover_image_url:
      data.cover_image_url ?? "",

    published_at:
      data.published_at,

    status:
      data.status,

    content_type:
      data.content_type ?? "news",

    created_at:
      data.created_at,

    updated_at:
      data.updated_at,

    translations:
      (data.news_translations ??
        []) as NewsTranslation[],
  };

  return (
    <NewsForm news={news} />
  );
}