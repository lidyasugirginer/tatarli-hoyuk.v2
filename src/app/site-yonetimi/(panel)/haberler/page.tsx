import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Edit3,
  Newspaper,
  Plus,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";

import type { NewsItem } from "@/types/news";

import DeleteNewsButton from "./_components/delete-news-button";

import styles from "./page.module.css";

const statusLabels: Record<NewsItem["status"], string> = {
  published: "Yayında",
  draft: "Taslak",
  archived: "Arşiv",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default async function HaberlerPage() {
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
    .order("published_at", {
      ascending: false,
    });

  const news = (data ?? []) as NewsItem[];

  return (
    <div className={styles.page}>
      <section className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>
            İçerik yönetimi
          </p>

          <h2>Haberler</h2>

          <p className={styles.description}>
            Tatarlı Höyük ile ilgili haberleri
            oluşturabilir, düzenleyebilir ve yayın
            durumlarını yönetebilirsiniz.
          </p>
        </div>

        <Link
          href="/site-yonetimi/haberler/yeni"
          className={styles.primaryButton}
        >
          <Plus size={18} />
          Yeni haber ekle
        </Link>
      </section>

      <section className={styles.contentCard}>
        <div className={styles.cardHeader}>
          <div>
            <p className={styles.cardLabel}>Kayıtlar</p>
            <h3>Haberler</h3>
          </div>

          <span className={styles.recordCount}>
            {news.length} kayıt
          </span>
        </div>

        {error ? (
          <div className={styles.errorState}>
            <strong>Haberler yüklenemedi.</strong>
            <p>{error.message}</p>
          </div>
        ) : news.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Newspaper size={28} />
            </div>

            <h3>Henüz haber eklenmedi</h3>

            <p>
              Eklediğiniz haberler bu alanda
              listelenecek.
            </p>

            <Link href="/site-yonetimi/haberler/yeni">
              Yeni haber ekle
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Haber</th>
                  <th>Yayın tarihi</th>
                  <th>Durum</th>
                  <th className={styles.actionsHeading}>
                    İşlemler
                  </th>
                </tr>
              </thead>

              <tbody>
                {news.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.newsCell}>
                        <div className={styles.imageWrapper}>
                          <Image
                            src={item.cover_image_url}
                            alt={item.title_tr}
                            fill
                            sizes="72px"
                          />
                        </div>

                        <div className={styles.newsInfo}>
                          <strong>{item.title_tr}</strong>

                          <p>{item.summary_tr}</p>

                          <span>
                            /haberler/{item.url}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className={styles.dateCell}>
                      {formatDate(item.published_at)}
                    </td>

                    <td>
                      <span
                        className={`${styles.status} ${
                          styles[item.status]
                        }`}
                      >
                        {statusLabels[item.status]}
                      </span>
                    </td>

                    <td>
                      <div className={styles.actions}>
                        <Link
                          href={`/site-yonetimi/haberler/${item.id}/duzenle`}
                          className={styles.editButton}
                        >
                          <Edit3 size={16} />
                          <span>Düzenle</span>
                        </Link>

                        <DeleteNewsButton
                          newsId={item.id}
                          newsTitle={item.title_tr}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}