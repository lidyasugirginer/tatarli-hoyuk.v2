import { Users } from "lucide-react";

import SectionPage from "../_components/section-page";

export default function KullanicilarPage() {
  return (
    <SectionPage
      eyebrow="Yetkilendirme"
      title="Kullanıcılar"
      description="Yönetim paneline erişebilen kullanıcıları ve kullanıcı rollerini buradan yönetebilirsiniz."
      emptyTitle="Kullanıcı kayıtları hazırlanıyor"
      emptyDescription="Supabase Auth ve admins tablosundaki yöneticiler bu alanda görüntülenecek."
      icon={Users}
    />
  );
}