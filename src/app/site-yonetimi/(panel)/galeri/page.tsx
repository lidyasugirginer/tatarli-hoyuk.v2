import { Images } from "lucide-react";

import SectionPage from "../_components/section-page";

export default function GaleriPage() {
  return (
    <SectionPage
      eyebrow="Medya yönetimi"
      title="Galeri"
      description="Kazı çalışmaları, buluntular, etkinlikler ve arazi çalışmalarına ait görselleri buradan yönetebilirsiniz."
      emptyTitle="Henüz görsel eklenmedi"
      emptyDescription="Galeriye yüklediğiniz görseller burada görüntülenecek."
      icon={Images}
      newItemHref="/site-yonetimi/galeri/yeni"
      newItemLabel="Yeni görsel ekle"
    />
  );
}