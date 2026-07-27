import { BookOpen } from "lucide-react";

import SectionPage from "../_components/section-page";

export default function YayinlarPage() {
  return (
    <SectionPage
      eyebrow="Akademik içerik"
      title="Yayınlar"
      description="Makaleleri, kitap bölümlerini, bildirileri ve diğer akademik yayınları buradan yönetebilirsiniz."
      emptyTitle="Henüz yayın eklenmedi"
      emptyDescription="Sisteme eklediğiniz akademik yayınlar burada listelenecek."
      icon={BookOpen}
      newItemHref="/site-yonetimi/yayinlar/yeni"
      newItemLabel="Yeni yayın ekle"
    />
  );
}