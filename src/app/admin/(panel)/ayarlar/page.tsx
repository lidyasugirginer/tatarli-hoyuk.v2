import { Settings } from "lucide-react";

import SectionPage from "../_components/section-page";

export default function AyarlarPage() {
  return (
    <SectionPage
      eyebrow="Sistem yönetimi"
      title="Ayarlar"
      description="Site başlığı, iletişim bilgileri, logolar ve genel site ayarları bu bölümden yönetilecek."
      emptyTitle="Ayarlar ekranı hazırlanıyor"
      emptyDescription="Site ayarları için kullanılacak alanlar burada yer alacak."
      icon={Settings}
    />
  );
}