import PageHeader from "@/components/shared/PageHeader";
import { createClient } from "@/lib/supabase/server";
import type { PublicationItem } from "@/types/publication";
import PublicationsExplorer from "./PublicationsExplorer";

import styles from "./PublicationsPage.module.css";

type Language = "tr" | "en";

type PublicationsPageProps = {
  language?: Language;
};

const content = {
  tr: {
    breadcrumb: "Yayınlar",
    eyebrow: "Tatarlı Höyük Kazısı",
    title: "Yayınlar",
    error: "Yayınlar şu anda yüklenemiyor.",
    empty: "Henüz yayın eklenmedi.",
  },
  en: {
    breadcrumb: "Publications",
    eyebrow: "Tatarlı Höyük Excavation",
    title: "Publications",
    error: "Publications are currently unavailable.",
    empty: "No publications have been added yet.",
  },
} as const;

export default async function PublicationsPage({
  language = "tr",
}: PublicationsPageProps) {
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
        publication_url
      `
    )
    .order("publication_year", {
      ascending: false,
    });

  const publications = (data ?? []) as PublicationItem[];
  const t = content[language];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <PageHeader
          breadcrumb={t.breadcrumb}
          eyebrow={t.eyebrow}
          title={t.title}
          language={language}
        />

        {error ? (
          <section className={styles.emptyState}>
            <p>{t.error}</p>
          </section>
        ) : publications.length === 0 ? (
          <section className={styles.emptyState}>
            <p>{t.empty}</p>
          </section>
        ) : (
          <PublicationsExplorer
            publications={publications}
            language={language}
          />
        )}
      </div>
    </main>
  );
}

