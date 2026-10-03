import KizzuwatnaPageLayout from "@/components/kizzuwatna/KizzuwatnaPageLayout";

type Language = "tr" | "en";

type KayseriSurveyPageProps = {
  language?: Language;
};

const content = {
  tr: {
    breadcrumb: "Kayseri İli Yüzey Araştırmaları",
    eyebrow: "Yüzey Araştırmaları",
    title: "Kayseri İli Yüzey Araştırmaları",
    sections: [
      {
        number: "01",
        title: "Araştırmanın Kapsamı",
        paragraphs: [
          "Kayseri'nin güney ilçelerinde yürütülen yüzey araştırmaları, Çukurova Üniversitesi’nden Doç. Dr. K. Serdar Girginer tarafından \"Kizzuwatna Araştırmaları Projesi\" kapsamında 2002 yılından itibaren başlatılmıştır. Çalışmalar; Sarız (2004), Develi (2005) ve Yahyalı (2006) ilçelerinde yoğunlaşmış olup, bölgenin Orta Anadolu kültürleri ile güneydeki Kilikya arasındaki köprü konumunu bilimsel verilerle ortaya koymuştur.",
        ],
      },
      {
        number: "02",
        title: "Sarız Araştırmaları",
        paragraphs: [
          "2004 yılında gerçekleştirilen Sarız araştırmalarında, bölgenin antik ticaret yolları üzerindeki stratejik önemi belgelenmiştir. Araştırmalarda özellikle Hitit metinlerinde adı geçen Kussara şehri ile lokalize edilen Kemer Höyük ve çevresindeki Darıdere, Sarız Höyük, Yeşilkent (Yalak) Höyük gibi merkezlerde M.Ö. II. binyıl ve Asur Ticaret Kolonileri Çağı'na ait yoğun seramik buluntuları saptanmıştır. Bu veriler, Sarız'ın Kültepe-Kanes'ten başlayıp güneye, Suriye ve Mezopotamya'ya uzanan \"ATKÇ kervan yolu\" ve \"Hitit Dağ Yolu\"nun kilit bir noktasını oluşturduğunu kanıtlamaktadır.",
        ],
        images: [
          {
            src: "/images/kayseri-yuzey-arastirmalari/sariz-0.jpg",
            alt: "Sarız yüzey araştırmaları",
          },
          {
            src: "/images/kayseri-yuzey-arastirmalari/sariz-1.jpg",
            alt: "Sarız yüzey araştırmaları",
          },
        ],
      },
      {
        number: "03",
        title: "Develi Araştırmaları",
        paragraphs: [
          "2005 yılında yürütülen Develi çalışmaları, Kızılırmak Havzası'nın en büyük ovalarından biri olan Develi Ovası'ndaki yerleşim modelini aydınlatmıştır. Şahmelik Höyük, İkitepe ve Sarıca gibi merkezlerin yanı sıra, Erciyes Dağı'nın volkanik faaliyetleri sonucu oluşan tüf tabakasına oyulmuş çok sayıda kaya mekânı, yeraltı şehri ve şarap üretim atölyesi tespit edilmiştir. Bu buluntular, Develi'nin kültürel açıdan merkez Kapadokya ile olan güçlü bağını gösterirken; Fraktin, Taşçı ve İmamkulu gibi Hitit imparatorluk Dönemi kaya kabartmaları da bölgenin kutsal ve siyasi coğrafyadaki yerini vurgulamaktadır.",
        ],
        images: [
          {
            src: "/images/kayseri-yuzey-arastirmalari/develi-0.jpg",
            alt: "Develi yüzey araştırmaları",
          },
          {
            src: "/images/kayseri-yuzey-arastirmalari/develi-1.jpg",
            alt: "Develi yüzey araştırmaları",
          },
        ],
      },
      {
        number: "04",
        title: "Yahyalı Araştırmaları",
        paragraphs: [
          "2006 yılında tamamlanan Yahyalı araştırmaları ise 168 gibi oldukça yüksek bir sayıda arkeolojik merkezin tespitiyle sonuçlanmıştır. Bölgede Fethullah Höyük gibi erken dönem yerleşimlerinin yanı sıra Madazı, Dereciağzı ve Takaya mevkilerinde bulunan anıtsal kaya mezarları, dromoslu oda mezarlar ve çok sayıda tümülüs kayıt altına alınmıştır. Ayrıca Yahyalı'nın antik çağlardan itibaren önemli bir madencilik merkezi olduğunu kanıtlayan demir, çinko ve kurşun maden ocakları ile bu alanlardaki antik işlik ve cüruf kalıntıları, araştırmanın en önemli ekonomik verileri arasında yer almaktadır.",
        ],
        images: [
          {
            src: "/images/kayseri-yuzey-arastirmalari/yahyali-0.jpg",
            alt: "Yahyalı yüzey araştırmaları",
          },
          {
            src: "/images/kayseri-yuzey-arastirmalari/yahyali-1.jpg",
            alt: "Yahyalı yüzey araştırmaları",
          },
        ],
      },
    ],
  },
  en: {
    breadcrumb: "Kayseri Province Archaeological Surveys",
    eyebrow: "Archaeological Surveys",
    title: "Kayseri Province Archaeological Surveys",
    sections: [
      {
        number: "01",
        title: "Scope of the Survey",
        paragraphs: [
          "Archaeological surveys in the southern districts of Kayseri were launched in 2002 by Assoc. Prof. Dr. K. Serdar Girginer from Çukurova University as part of the \"Kizzuwatna Research Project\". Investigations focused on Sarız (2004), Develi (2005), and Yahyalı (2006), scientifically demonstrating the region's bridging role between Central Anatolian cultures and Cilicia to the south.",
        ],
      },
      {
        number: "02",
        title: "Sarız Surveys",
        paragraphs: [
          "The Sarız surveys carried out in 2004 documented the region's strategic importance along ancient trade routes. Abundant ceramic assemblages dating to the second millennium BCE and the Old Assyrian Colony Period were identified, particularly at Kemer Höyük—localized with the city of Kussara mentioned in Hittite texts—and surrounding centres such as Darıdere, Sarız Höyük, and Yeşilkent (Yalak) Höyük. These data prove that Sarız formed a crucial junction on the Old Assyrian caravan route and the 'Hittite Mountain Road', running from Kültepe-Kanesh southwards to Syria and Mesopotamia.",
        ],
        images: [
          {
            src: "/images/kayseri-yuzey-arastirmalari/sariz-0.jpg",
            alt: "Sarız archaeological surveys",
          },
          {
            src: "/images/kayseri-yuzey-arastirmalari/sariz-1.jpg",
            alt: "Sarız archaeological surveys",
          },
        ],
      },
      {
        number: "03",
        title: "Develi Surveys",
        paragraphs: [
          "Investigations in Develi in 2005 illuminated the settlement pattern across the Develi Plain, one of the largest plains in the Kızılırmak Basin. Alongside centres such as Şahmelik Höyük, İkitepe, and Sarıca, numerous rock-cut settlements, underground cities, and wine production workshops carved into volcanic tuff layers from Mount Erciyes were identified. These discoveries demonstrate Develi's close cultural affinities with central Cappadocia, while Hittite Empire Period rock reliefs such as Fraktin, Taşçı, and İmamkulu highlight the area's significance within the sacred and political landscape.",
        ],
        images: [
          {
            src: "/images/kayseri-yuzey-arastirmalari/develi-0.jpg",
            alt: "Develi archaeological surveys",
          },
          {
            src: "/images/kayseri-yuzey-arastirmalari/develi-1.jpg",
            alt: "Develi archaeological surveys",
          },
        ],
      },
      {
        number: "04",
        title: "Yahyalı Surveys",
        paragraphs: [
          "Completed in 2006, the Yahyalı surveys identified a remarkable total of 168 archaeological sites. Alongside early settlements such as Fethullah Höyük, monumental rock-cut tombs, chamber tombs with dromoi, and numerous tumuli were recorded at localities including Madazı, Dereciağzı, and Takaya. Furthermore, iron, zinc, and lead mines, accompanied by ancient workshop remains and slag heaps, attest to Yahyalı's status as a prominent mining centre from antiquity, representing vital economic evidence recovered by the survey.",
        ],
        images: [
          {
            src: "/images/kayseri-yuzey-arastirmalari/yahyali-0.jpg",
            alt: "Yahyalı archaeological surveys",
          },
          {
            src: "/images/kayseri-yuzey-arastirmalari/yahyali-1.jpg",
            alt: "Yahyalı archaeological surveys",
          },
        ],
      },
    ],
  },
} as const;

export default function KayseriSurveyPage({
  language = "tr",
}: KayseriSurveyPageProps) {
  const t = content[language];

  return (
    <KizzuwatnaPageLayout
      breadcrumb={t.breadcrumb}
      eyebrow={t.eyebrow}
      title={t.title}
      language={language}
      sections={t.sections}
    />
  );
}

