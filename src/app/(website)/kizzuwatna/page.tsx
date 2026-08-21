import InnerPageLayout from "@/components/shared/InnerPageLayout";
export default function KizzuwatnaPage() {
  return (
    <InnerPageLayout
      breadcrumb="Kizzuwatna / Hakkında"
      eyebrow="Kizzuwatna Araştırmaları Projesi"
      title="Kizzuwatna Araştırmaları Projesi"
      variant="kizzuwatna"
      sections={[
        {
          number: "01",
          title: "Proje Hakkında",
          paragraphs: [
            "Kizzuwatna Araştırmaları Projesi, Doç. Dr. K. Serdar Girginer tarafından hazırlandı ve 2002 yılında hayata geçirildi. Projenin en büyük amacı; Kayseri’nin güneyi ile Adana ilçelerinde ve çevresinde Kizzuwatna Devleti’ne ait kentlerin tespit edilmesi ve lokalizasyonlarının yapılmasıdır. Bunun yanı sıra, literatürde yer alan yerleşimlerin yeniden ziyaret edilerek koruma durumlarının ortaya konulması, bölgenin arkeolojik potansiyelinin belirlenmesi ve taşınmaz kültür varlıklarının korunmasına yönelik yöntemlerin geliştirilmesi de projenin amaçları arasında yer almaktadır.",
            "Bu bağlamda, 2002 yılında Tufanbeyli’de, 2003 yılında Saimbeyli’de, 2004 yılında Sarız ve Kozan’ın ovalık alanlarında, 2005 yılında Ceyhan’daki ilk çalışma ile Develi’de ve 2006 yılında Ceyhan’daki ikinci çalışma ile Yahyalı’da yüzey araştırmaları gerçekleştirilmiştir. Bu çalışmalar sonucunda 200’den fazla yerleşim yeri literatüre dahil edilmiştir.",
            "Projenin çalışmalarından biri de Kayseri’nin Develi ilçesi sınırları içinde yer alan Bileç Höyük kurtarma kazısıdır. 2007 yılında üç ay süreyle kurtarma kazıları gerçekleştirilmiş ve Bileç Höyük literatüre kazandırılmıştır.",
            "Projenin bir diğer çalışması ise 2007 yılında başlayan Adana, Ceyhan, Tatarlı Mahallesi’ndeki Tatarlı Höyük kazı çalışmalarıdır.",
          ],
        },
      ]}
    />
  );
}