import KizzuwatnaPageLayout from "@/components/kizzuwatna/KizzuwatnaPageLayout";

export default function YuzeyArastirmalariPage() {
  return (
    <KizzuwatnaPageLayout
      breadcrumb="Yüzey Araştırmaları"
      eyebrow="Kizzuwatna Araştırma Projeleri"
      title="Yüzey Araştırmaları"
      sections={[
        {
          number: "01",
          title: "Araştırmalar Hakkında",
          paragraphs: [
            "Bu alana Kizzuwatna Araştırma Projesi kapsamında yürütülen yüzey araştırmalarının genel tanıtımı gelecek.",
          ],
        },
        {
          number: "02",
          title: "Araştırma Bölgeleri",
          paragraphs: [
            "Adana ve Kayseri illerinde yürütülen çalışmalar daha sonra bu bölümde açıklanacak.",
          ],
        },
      ]}
    />
  );
}