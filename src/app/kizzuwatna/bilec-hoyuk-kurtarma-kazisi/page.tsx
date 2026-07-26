import InnerPageLayout from "@/components/shared/InnerPageLayout";

export default function BilecHoyukKurtarmaKazisiPage() {
  return (
    <InnerPageLayout
      breadcrumb="Kizzuwatna / Bileç Höyük Kurtarma Kazısı"
      eyebrow="Kizzuwatna Araştırma Projeleri"
      title="Bileç Höyük Kurtarma Kazısı"
      sections={[
        {
          number: "01",
          title: "Kurtarma Kazısı",
          paragraphs: [
            "Bu alana Bileç Höyük Kurtarma Kazısı’nın genel tanıtım metni gelecek.",
          ],
        },
        {
          number: "02",
          title: "Kazı Çalışmaları",
          paragraphs: [
            "Bu alana kazı sezonları, çalışma alanları ve bulgular eklenecek.",
          ],
        },
      ]}
    />
  );
}