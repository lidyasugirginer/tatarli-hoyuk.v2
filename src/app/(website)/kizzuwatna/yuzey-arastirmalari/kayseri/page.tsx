import KizzuwatnaPageLayout from "@/components/kizzuwatna/KizzuwatnaPageLayout";

export default function KayseriYuzeyArastirmalariPage() {
  return (
    <KizzuwatnaPageLayout
      breadcrumb="Kayseri İli Yüzey Araştırmaları"
      eyebrow="Yüzey Araştırmaları"
      title="Kayseri İli Yüzey Araştırmaları"
      sections={[
        {
          number: "01",
          title: "Araştırmanın Kapsamı",
          paragraphs: [
            "Bu alana Kayseri ili yüzey araştırmalarının kapsamı ve amacıyla ilgili içerik gelecek.",
          ],
        },
        {
          number: "02",
          title: "Çalışma Alanları",
          paragraphs: [
            "Bu alana araştırma bölgeleri ve belgelenen yerleşimlerle ilgili içerik gelecek.",
          ],
        },
        {
          number: "03",
          title: "Araştırma Sonuçları",
          paragraphs: [
            "Bu alana araştırma sonuçları ve başlıca değerlendirmeler eklenecek.",
          ],
        },
      ]}
    />
  );
}