import { createClient } from "@/lib/supabase/server";

export default async function TestNewsPage() {
  const supabase = await createClient();

  const { data: news, error } = await supabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    return (
      <main>
        <h1>Supabase bağlantı hatası</h1>
        <p>{error.message}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Haber Testi</h1>

      {news.length === 0 ? (
        <p>Henüz haber bulunamadı.</p>
      ) : (
        news.map((item) => (
          <article key={item.id}>
            <h2>{item.title_tr}</h2>
            <p>{item.summary_tr}</p>
            <p>{item.published_at}</p>
            <a href={item.url} target="_blank" rel="noreferrer">
              Haberi Oku
            </a>
          </article>
        ))
      )}
    </main>
  );
}