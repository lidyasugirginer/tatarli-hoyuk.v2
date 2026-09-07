import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import type { PublicationItem } from "@/types/publication";

import PublicationForm from "../../_components/publication-form";

type EditPublicationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPublicationPage({
  params,
}: EditPublicationPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("publications")
    .select(
      `
        id,
        title,
        authors,
        publication_year,
        publication_type,
        cover_image_url,
        publication_url,
        sort_order
      `
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <PublicationForm
      publication={data as PublicationItem}
    />
  );
}