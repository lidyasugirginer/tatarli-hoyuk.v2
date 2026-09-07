import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import type { NewsItem } from "@/types/news";

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
        title_tr,
        title_en,
        summary_tr,
        summary_en,
        cover_image_url,
        url,
        published_at,
        status,
        created_at,
        updated_at
      `
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  return <NewsForm news={data as NewsItem} />;
}