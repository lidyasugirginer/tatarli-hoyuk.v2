import InnerPageLayout from "@/components/shared/InnerPageLayout";
import KizzuwatnaSubnav from "@/components/kizzuwatna/KizzuwatnaSubnav";

type Language = "tr" | "en";

type KizzuwatnaOverviewPageProps = {
  language?: Language;
};

const content = {
  tr: {
    breadcrumb: "Kizzuwatna / Hakkında",
    eyebrow: "Kizzuwatna Araştırmaları Projesi",
    title: "Kizzuwatna Araştırmaları Projesi",
    sections: [
      {
        number: "01",
        title: "Proje Hakkında",
        paragraphs: [
          "Kizzuwatna Araştırmaları Projesi, Doç. Dr. K. Serdar Girginer tarafından hazırlandı ve 2002 yılında hayata geçirildi. Projenin en büyük amacı; Kayseri’nin güneyi ile Adana ilçelerinde ve çevresinde Kizzuwatna Devleti’ne ait kentlerin tespit edilmesi ve lokalizasyonlarının yapılmasıdır. Bunun yanı sıra, literatürde yer alan yerleşimlerin yeniden ziyaret edilerek koruma durumlarının ortaya konulması, bölgenin arkeolojik potansiyelinin belirlenmesi ve taşınmaz kültür varlıklarının korunmasına yönelik yöntemlerin geliştirilmesi de projenin amaçları arasında yer almaktadır.",
          "Bu bağlamda, 2002 yılında Tufanbeyli’de, 2003 yılında Saimbeyli’de, 2004 yılında Sarız ve Kozan’ın ovalık alanlarında, 2005 yılında Ceyhan’daki ilk çalışma ile Develi’de ve 2006 yılında Ceyhan’daki ikinci çalışma ile Yahyalı’da yüzey araştırmaları gerçekleştirilmiştir. Bu çalışmalar sonucunda 200’den fazla yerleşim yeri literatüre dahil edilmiştir.",
          "Projenin çalışmalarından biri de Kayseri’nin Develi ilçesi sınırları içinde yer alan Bileç Höyük kurtarma kazısıdır. 2007 yılında üç ay süreyle kurtarma kazıları gerçekleştirilmiş ve Bileç Höyük literatüre kazandırılmıştır.",
          "Projenin bir diğer çalışması ise 2007 yılında başlayan Adana, Ceyhan, Tatarlı Mahallesi’ndeki Tatarlı Höyük kazı çalışmalarıdır.",
        ],
        image: "/images/kizzuwatna/kizzuwatna-hakkinda.jpg",
        imageAlt: "Kizzuwatna Araştırmaları Projesi",
      },
    ],
  },
  en: {
    breadcrumb: "Kizzuwatna / About",
    eyebrow: "Kizzuwatna Research Project",
    title: "Kizzuwatna Research Project",
    sections: [
      {
        number: "01",
        title: "About the Project",
        paragraphs: [
          "The Kizzuwatna Research Project was developed by Assoc. Prof. Dr. K. Serdar Girginer and initiated in 2002. The primary objective of the project is the identification and localisation of settlements belonging to the Land of Kizzuwatna in the southern districts of Kayseri, across Adana, and in their surrounding environs. In addition, revisiting settlements documented in scholarly literature to evaluate their state of preservation, determining the archaeological potential of the region, and developing methods for the protection of immovable cultural assets are among the project's key objectives.",
          "In this framework, archaeological surveys were carried out in Tufanbeyli in 2002, Saimbeyli in 2003, the plains of Sarız and Kozan in 2004, Develi alongside the first campaign in Ceyhan in 2005, and Yahyalı alongside the second campaign in Ceyhan in 2006. As a result of these investigations, more than 200 settlements were documented and introduced into the scholarly literature.",
          "One of the key field projects was the rescue excavation at Bileç Höyük, located within the boundaries of Develi District in Kayseri. Conducted for three months in 2007, these rescue excavations brought Bileç Höyük into archaeological literature.",
          "Another major component of the project is the excavations at Tatarlı Höyük in Tatarlı Quarter, Ceyhan, Adana, which commenced in 2007.",
        ],
        image: "/images/kizzuwatna/kizzuwatna-hakkinda.jpg",
        imageAlt: "Kizzuwatna Research Project",
      },
    ],
  },
} as const;

export default function KizzuwatnaOverviewPage({
  language = "tr",
}: KizzuwatnaOverviewPageProps) {
  const t = content[language];

  return (
    <InnerPageLayout
      breadcrumb={t.breadcrumb}
      eyebrow={t.eyebrow}
      title={t.title}
      variant="kizzuwatna"
      language={language}
      sideNavigation={<KizzuwatnaSubnav language={language} />}
      sections={t.sections}
    />
  );
}

