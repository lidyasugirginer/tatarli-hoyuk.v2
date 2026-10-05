import Link from "next/link";

import {
  Newspaper,
  BookOpen,
  Landmark,
  Images,
  ArrowRight,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";

import styles from "./page.module.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboardPage() {
  await requireAdmin();

  const supabase = await createClient();

  const [
    newsCountResult,
    publicationsCountResult,
    latestNewsResult,
  ] = await Promise.all([
    supabase
      .from("news")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("publications")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("news")
      .select(
        `
          id,
          title_tr,
          published_at,
          status
        `
      )
      .order("published_at", {
        ascending: false,
      })
      .limit(3),
  ]);

  const totalNews = newsCountResult.count ?? 0;
  const totalPublications =
    publicationsCountResult.count ?? 0;

  const latestNews = latestNewsResult.data ?? [];

  const statistics = [
    {
      title: "Toplam Haber",
      value: totalNews.toString(),
      description: "Sistemdeki haber",
      icon: Newspaper,
      href: "/admin/haberler",
    },
    {
      title: "Toplam Yayın",
      value: totalPublications.toString(),
      description: "Sistemdeki yayın",
      icon: BookOpen,
      href: "/admin/yayinlar",
    },
    {
      title: "Buluntular",
      value: "0",
      description: "Kayıtlı eser",
      icon: Landmark,
      href: "/admin/buluntular",
    },
    {
      title: "Galeri",
      value: "0",
      description: "Yüklenmiş görsel",
      icon: Images,
      href: "/admin/galeri",
    },
  ];

  return (
    <div className={styles.dashboard}>
      <section className={styles.welcome}>
        <div>
          <p className={styles.eyebrow}>Tatarlı Höyük</p>

          <h2>Yönetim paneline hoş geldiniz.</h2>

          <p className={styles.welcomeText}>
            Haberleri, yayınları ve diğer site içeriklerini
            buradan yönetebilirsiniz.
          </p>
        </div>

        <div className={styles.dateBox}>
          <span>Panel durumu</span>
          <strong>Aktif</strong>
        </div>
      </section>

      <section className={styles.statistics}>
        {statistics.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={styles.statCard}
            >
              <div className={styles.statHeader}>
                <div className={styles.iconBox}>
                  <Icon size={20} />
                </div>

                <span className={styles.statValue}>
                  {item.value}
                </span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Link>
          );
        })}
      </section>

      <section className={styles.bottomGrid}>
        <article className={styles.contentCard}>
          <div className={styles.cardHeading}>
            <div>
              <p className={styles.cardLabel}>İçerik</p>
              <h3>Son haberler</h3>
            </div>

            <Link
              href="/admin/haberler"
              className={styles.textButton}
            >
              Tümünü görüntüle
              <ArrowRight size={16} />
            </Link>
          </div>

          {latestNews.length === 0 ? (
            <div className={styles.emptyState}>
              <Newspaper size={27} />
              <h4>Henüz haber bulunmuyor</h4>
              <p>
                Eklenen son haberler burada görüntülenecek.
              </p>
            </div>
          ) : (
            <div className={styles.latestNewsList}>
              {latestNews.map((news) => (
                <Link
                  key={news.id}
                  href={`/admin/haberler/${news.id}/duzenle`}
                  className={styles.latestNewsItem}
                >
                  <div>
                    <strong>{news.title_tr}</strong>

                    <span>
                      {new Intl.DateTimeFormat("tr-TR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }).format(
                        new Date(
                          `${news.published_at}T00:00:00`
                        )
                      )}
                    </span>
                  </div>

                  <span className={styles.latestNewsStatus}>
                    {news.status === "published"
                      ? "Yayında"
                      : news.status === "draft"
                        ? "Taslak"
                        : "Arşiv"}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </article>

        <article className={styles.contentCard}>
          <div className={styles.cardHeading}>
            <div>
              <p className={styles.cardLabel}>Hızlı erişim</p>
              <h3>İçerik işlemleri</h3>
            </div>
          </div>

          <div className={styles.quickActions}>
            <Link href="/admin/haberler/yeni">
              <Newspaper size={18} />
              <span>Yeni haber ekle</span>
              <ArrowRight size={16} />
            </Link>

            <Link href="/admin/yayinlar/yeni">
              <BookOpen size={18} />
              <span>Yeni yayın ekle</span>
              <ArrowRight size={16} />
            </Link>

            <Link href="/admin/buluntular/yeni">
              <Landmark size={18} />
              <span>Yeni buluntu ekle</span>
              <ArrowRight size={16} />
            </Link>

            <Link href="/admin/galeri/yeni">
              <Images size={18} />
              <span>Galeriye görsel ekle</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}