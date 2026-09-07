import Image from "next/image";
import Link from "next/link";

import { BookOpen, Pencil, Plus } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import type { PublicationItem } from "@/types/publication";
import PublicationActions from "./_components/publication-actions";

import styles from "./page.module.css";

export default async function YayinlarPage() {
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
    .order("publication_year", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  const publications = (data ?? []) as PublicationItem[];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Akademik içerik</p>

          <h1>Yayınlar</h1>

          <p className={styles.description}>
            Makaleleri, kitap bölümlerini, bildirileri ve diğer akademik
            yayınları buradan yönetebilirsiniz.
          </p>
        </div>

        <Link
          href="/admin/yayinlar/yeni"
          className={styles.newButton}
        >
          <Plus size={18} />
          Yeni yayın ekle
        </Link>
      </header>

      {error ? (
        <div className={styles.message}>
          <p>Yayınlar yüklenirken bir hata oluştu.</p>
        </div>
      ) : publications.length === 0 ? (
        <div className={styles.emptyState}>
          <BookOpen size={30} />

          <div>
            <h2>Henüz yayın eklenmedi</h2>
            <p>
              Sisteme eklediğiniz akademik yayınlar burada listelenecek.
            </p>
          </div>
        </div>
      ) : (
        <section className={styles.publicationList}>
          {publications.map((publication) => {
  const sameYearPublications = publications.filter(
    (item) =>
      item.publication_year === publication.publication_year
  );

  const sameYearIndex = sameYearPublications.findIndex(
    (item) => item.id === publication.id
  );

  const canMoveUp = sameYearIndex > 0;

  const canMoveDown =
    sameYearIndex < sameYearPublications.length - 1;

  return (
    <article
      key={publication.id}
      className={styles.publicationItem}
    >
      <div className={styles.coverWrapper}>
        {publication.cover_image_url ? (
          <Image
            src={publication.cover_image_url}
            alt={`${publication.title} kapak görseli`}
            fill
            sizes="90px"
            className={styles.cover}
          />
        ) : (
          <div className={styles.coverPlaceholder}>
            <BookOpen size={24} />
          </div>
        )}
      </div>

      <div className={styles.publicationInfo}>
        <h2>{publication.title}</h2>

        <p className={styles.authors}>
          {publication.authors}
        </p>

        <div className={styles.meta}>
          <span>{publication.publication_year}</span>
          <span>•</span>
          <span>{publication.publication_type}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <Link
          href={`/admin/yayinlar/${publication.id}/duzenle`}
          className={styles.editButton}
        >
          <Pencil size={16} />
          Düzenle
        </Link>

        <PublicationActions
          id={publication.id}
          title={publication.title}
          year={publication.publication_year}
          sortOrder={publication.sort_order}
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
        />
      </div>
    </article>
  );
})}
        </section>
      )}
    </div>
  );
}