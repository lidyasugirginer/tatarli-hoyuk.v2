import { Landmark } from "lucide-react";

import SectionPage from "../_components/section-page";

export default function BuluntularPage() {
  return (
    <SectionPage
      eyebrow="Koleksiyon yönetimi"
      title="Buluntular"
      description="Kazı çalışmalarında ele geçen buluntuları, dönem bilgilerini ve görsellerini buradan yönetebilirsiniz."
      emptyTitle="Henüz buluntu eklenmedi"
      emptyDescription="Sisteme eklediğiniz arkeolojik buluntular burada listelenecek."
      icon={Landmark}
      newItemHref="/site-yonetimi/buluntular/yeni"
      newItemLabel="Yeni buluntu ekle"
    />
  );
}