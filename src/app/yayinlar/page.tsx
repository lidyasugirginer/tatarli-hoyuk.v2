import InnerPageLayout from "@/components/shared/InnerPageLayout";

export default function YayinlarPage() {
  return (
    <InnerPageLayout
      breadcrumb="Yayınlar"
      eyebrow="Tatarlı Höyük Kazısı"
      title="Yayınlar"
      sections={[
        {
          number: "01",
          title: "Bilimsel Yayınlar",
          paragraphs: [
            "Bu alana Tatarlı Höyük ve Kizzuwatna Araştırma Projeleri kapsamında yayımlanan bilimsel çalışmalar eklenecek.",
          ],
        },
        {
          number: "02",
          title: "Kitaplar ve Makaleler",
          paragraphs: [
            "Kitap, makale, bildiri ve kazı raporları daha sonra bu bölümde listelenecek.",
          ],
        },
      ]}
    />
  );
}