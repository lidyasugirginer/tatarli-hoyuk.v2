import InnerPageLayout from "@/components/shared/InnerPageLayout";

export default function BuluntularPage() {
  return (
    <InnerPageLayout
      breadcrumb="Buluntular"
      eyebrow="Tatarlı Höyük Kazısı"
      title="Buluntular"
      sections={[
        {
          number: "01",
          title: "Arkeolojik Buluntular",
          paragraphs: [
            "Bu alana Tatarlı Höyük kazılarında ele geçen arkeolojik buluntuların genel tanıtımı gelecek.",
          ],
        },
        {
          number: "02",
          title: "Buluntu Grupları",
          paragraphs: [
            "Seramik, mühür, figürin, metal, taş ve diğer buluntu grupları daha sonra bu bölümde tanıtılacak.",
          ],
        },
      ]}
    />
  );
}