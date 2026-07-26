import InnerPageLayout from "@/components/shared/InnerPageLayout";

export default function GaleriPage() {
  return (
    <InnerPageLayout
      breadcrumb="Galeri"
      eyebrow="Tatarlı Höyük Kazısı"
      title="Galeri"
      sections={[
        {
          number: "01",
          title: "Kazı Çalışmaları",
          paragraphs: [
            "Kazı sezonlarına ait fotoğraflar bu bölümde yer alacak.",
          ],
        },
        {
          number: "02",
          title: "Buluntular ve Mimari",
          paragraphs: [
            "Buluntular, mimari kalıntılar ve arazi görüntüleri daha sonra eklenecek.",
          ],
        },
      ]}
    />
  );
}