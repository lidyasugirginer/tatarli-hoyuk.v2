import Link from "next/link";

export default function NewsNotFound() {
  return (
    <div
      style={{
        padding: "32px",
        background: "#ffffff",
        border: "1px solid #e5e1d8",
        borderRadius: "14px",
      }}
    >
      <h2 style={{ marginTop: 0 }}>
        Haber bulunamadı
      </h2>

      <p>
        Düzenlemek istediğiniz haber silinmiş veya mevcut
        olmayabilir.
      </p>

      <Link href="/site-yonetimi/haberler">
        Haberler sayfasına dön
      </Link>
    </div>
  );
}