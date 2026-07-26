import InnerPageLayout from "@/components/shared/InnerPageLayout";

export default function KizzuwatnaPage() {
  return (
    <InnerPageLayout
      breadcrumb="Kizzuwatna / Hakkında"
      eyebrow="Kizzuwatna Araştırma Projeleri"
      title="Kizzuwatna"
      sections={[
        {
          number: "01",
          title: "Proje Hakkında",
          paragraphs: [
            "Bu alana Kizzuwatna Araştırma Projesi’nin genel tanıtım metni gelecek.",
            "Projenin amacı, kapsamı ve bilimsel yaklaşımı daha sonra bu bölümde ayrıntılı olarak açıklanacak.",
          ],
        },
        {
          number: "02",
          title: "Araştırma Alanı",
          paragraphs: [
            "Bu alana projenin coğrafi kapsamı ve çalışma bölgeleriyle ilgili içerik eklenecek.",
          ],
        },
      ]}
    />
  );
}