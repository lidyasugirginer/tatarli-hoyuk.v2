import KizzuwatnaPageLayout from "@/components/kizzuwatna/KizzuwatnaPageLayout";

type Language = "tr" | "en";

type AdanaSurveyPageProps = {
  language?: Language;
};

const content = {
  tr: {
    breadcrumb: "Adana İli Yüzey Araştırmaları",
    eyebrow: "Yüzey Araştırmaları",
    title: "Adana İli Yüzey Araştırmaları",
    sections: [
      {
        number: "01",
        title: "Araştırmanın Kapsamı ve Amacı",
        paragraphs: [
          "Çukurova Üniversitesi’nden Doç. Dr. K. Serdar Girginer tarafından \"Kizzuwatna Araştırmaları\" adı altında 2002 yılında başlatılmıştır. Bu geniş kapsamlı çalışmanın temel hedefi, M.Ö. II. binyılda bölgede egemen olan Kizzuwatna Ülkesi’nin yerleşimlerini saptamaktır. Araştırmalar süresince kuzeydeki dağlık Tufanbeyli ve Saimbeyli ilçelerinden, güneydeki ovalık Kozan ve Ceyhan bölgelerine kadar uzanan yaklaşık 41.310 km²’lik oldukça geniş bir alan taranmıştır.",
        ],
        images: [
          {
            src: "/images/adana-yuzey-arastirmalari/adana-kapsam-amac-0.jpg",
            alt: "Adana yüzey araştırmaları",
          },
        ],
      },
      {
        number: "02",
        title: "Tufanbeyli ve Saimbeyli Araştırmaları",
        paragraphs: [
          "Tufanbeyli (2002) ve Saimbeyli (2003) araştırmaları, bölgenin Kapadokya ile Kilikya arasındaki kültürel geçiş konumunu belgeler niteliktedir. Tufanbeyli'de, antik Hitit metinlerinde geçen kutsal kent Kummanni ile lokalize edilen Şar Köyü (Kapadokya Komanası) ve çevresindeki Gala Tepe, Küçük Sarı Fakı Höyük gibi merkezlerde Kalkolitik Çağ’dan itibaren iskan izlerine rastlanmıştır.",
          "Saimbeyli'de ise sarp coğrafya nedeniyle yerleşimlerin daha çok nehir ve dere kenarlarında yoğunlaştığı, özellikle Roma ve Bizans dönemlerine ait anıtsal kaya mezarları (heroonlar), kaleler ve kiliselerin bölge mimarisinde baskın olduğu saptanmıştır. Ayrıca Saimbeyli'nin antik dönemlerden itibaren demir, alüminyum ve çinko gibi maden yatakları açısından zengin bir ekonomik potansiyele sahip olduğu verilerle desteklenmiştir.",
        ],
        images: [
          {
            src: "/images/adana-yuzey-arastirmalari/tufanbeyli-0.jpg",
            alt: "Tufanbeyli yüzey araştırmaları",
          },
        ],
      },
      {
        number: "03",
        title: "Kozan ve Ceyhan Araştırmaları",
        paragraphs: [
          "Kozan (2004) ve Ceyhan (2005-2006) çalışmalarının odak noktası olan \"Yukarı Ova\" bölgesi, Neolitik Çağ’dan itibaren kesintisiz ve yoğun bir iskan tablosu sunmaktadır. Kozan'da Çiriş Tepe, Tılan Höyük ve Alapınar Höyük gibi merkezlerde Kalkolitik'ten Roma Dönemine kadar uzanan buluntular derlenirken, Ceyhan'da Hacılar Höyük, Yarımhöyük ve Mercin-Boz Höyük gibi stratejik noktalar incelenmiştir.",
          "Bu araştırmalarda elde edilen en önemli verilerden biri, bölgenin Roma İmparatoru Vespasianus Döneminde inşa edilen yol ağı üzerindeki lojistik ve tarımsal üretim merkezi rolünün belgelenmesidir. Ayrıca Ceyhan ve Kozan höyüklerinden toplanan Hellenistik dönem kalıp yapımı kabartmalı kaseler (Megara kaseleri), bölgenin Akdeniz dünyası ile olan ticari ve sanatsal bağlarını kanıtlamaktadır.",
        ],
        images: [
          {
            src: "/images/adana-yuzey-arastirmalari/ceyhan-0.jpg",
            alt: "Ceyhan yüzey araştırmaları",
          },
          {
            src: "/images/adana-yuzey-arastirmalari/ceyhan-1.jpg",
            alt: "Ceyhan yüzey araştırmaları",
          },
        ],
      },
      {
        number: "04",
        title: "Arkeolojik Tahribat ve Koruma",
        paragraphs: [
          "Araştırmaların ortaya koyduğu bir diğer kritik veri ise, bölgedeki arkeolojik dokunun maruz kaldığı hızlı tahribattır. Özellikle Ceyhan Ovası'ndaki höyüklerin ve antik yerleşimlerin, tarım arazisi açma çalışmaları, iş makineleri, sulama kanalları ve sanayileşme nedeniyle %90'a varan oranlarda yok edildiği saptanmıştır.",
          "Örneğin, Ekenler Çiftliği ve Çokça Höyük gibi merkezlerin tarımsal ve endüstriyel faaliyetler sonucu büyük ölçüde zarar gördüğü rapor edilmiştir. Bu durum, Kizzuwatna Araştırmalarının sadece bir envanter çalışması değil, aynı zamanda hızla yok olan bir kültürel mirasın kayıt altına alınması adına bir koruma görevi de üstlendiğini göstermektedir.",
        ],
        images: [
          {
            src: "/images/adana-yuzey-arastirmalari/adana-tahribat-0.jpg",
            alt: "Arkeolojik tahribat belgelemesi",
          },
          {
            src: "/images/adana-yuzey-arastirmalari/adana-tahribat-1.jpg",
            alt: "Arkeolojik tahribat belgelemesi",
          },
        ],
      },
    ],
  },
  en: {
    breadcrumb: "Adana Province Archaeological Surveys",
    eyebrow: "Archaeological Surveys",
    title: "Adana Province Archaeological Surveys",
    sections: [
      {
        number: "01",
        title: "Scope and Objectives of the Survey",
        paragraphs: [
          "Initiated in 2002 by Assoc. Prof. Dr. K. Serdar Girginer from Çukurova University under the title of \"Kizzuwatna Research\", this comprehensive project primarily aims to identify the settlements of the Land of Kizzuwatna, which held hegemony over the region during the second millennium BCE. During the investigations, an extensive area of approximately 41,310 km² was surveyed, extending from the mountainous northern districts of Tufanbeyli and Saimbeyli down to the southern plains of Kozan and Ceyhan.",
        ],
        images: [
          {
            src: "/images/adana-yuzey-arastirmalari/adana-kapsam-amac-0.jpg",
            alt: "Adana archaeological surveys",
          },
        ],
      },
      {
        number: "02",
        title: "Tufanbeyli and Saimbeyli Surveys",
        paragraphs: [
          "Surveys in Tufanbeyli (2002) and Saimbeyli (2003) attest to the region's position as a cultural bridge between Cappadocia and Cilicia. In Tufanbeyli, traces of occupation from the Chalcolithic period onward were documented at Şar Village (Comana Cappadociae), identified with the holy Hittite city of Kummanni, as well as nearby centres such as Gala Tepe and Küçük Sarı Fakı Höyük.",
          "In Saimbeyli, owing to the rugged terrain, settlements were concentrated primarily along rivers and streams. Monumental rock-cut tombs (heroa), fortresses, and churches dating to the Roman and Byzantine periods predominated in the regional architecture. Furthermore, survey data confirmed that Saimbeyli possessed significant economic potential from antiquity onward due to its rich mineral deposits of iron, aluminium, and zinc.",
        ],
        images: [
          {
            src: "/images/adana-yuzey-arastirmalari/tufanbeyli-0.jpg",
            alt: "Tufanbeyli archaeological surveys",
          },
        ],
      },
      {
        number: "03",
        title: "Kozan and Ceyhan Surveys",
        paragraphs: [
          "Focusing on the 'Upper Plain' (Yukarı Ova), research in Kozan (2004) and Ceyhan (2005–2006) reveals a dense and continuous occupational sequence beginning in the Neolithic period. While finds ranging from the Chalcolithic to the Roman period were documented at centres such as Çiriş Tepe, Tılan Höyük, and Alapınar Höyük in Kozan, strategic sites including Hacılar Höyük, Yarımhöyük, and Mercin-Boz Höyük were investigated in Ceyhan.",
          "One of the most important outcomes of these investigations was the documentation of the region's role as a logistical and agricultural production hub along the Roman road network constructed under Emperor Vespasian. Additionally, Hellenistic mouldmade relief bowls (Megarian bowls) collected from mounds in Ceyhan and Kozan substantiate the region's commercial and artistic connections with the Mediterranean world.",
        ],
        images: [
          {
            src: "/images/adana-yuzey-arastirmalari/ceyhan-0.jpg",
            alt: "Ceyhan and Kozan archaeological surveys",
          },
          {
            src: "/images/adana-yuzey-arastirmalari/ceyhan-1.jpg",
            alt: "Ceyhan and Kozan archaeological surveys",
          },
        ],
      },
      {
        number: "04",
        title: "Archaeological Degradation and Conservation",
        paragraphs: [
          "Another critical datum highlighted by the surveys is the rapid rate of destruction afflicting the archaeological landscape of the region. Mounds and ancient settlements, particularly across the Ceyhan Plain, have suffered up to 90% destruction as a consequence of agricultural land clearance, heavy earth-moving machinery, irrigation canals, and industrialization.",
          "For instance, sites such as Ekenler Çiftliği and Çokça Höyük were reported to have sustained severe damage due to agricultural and industrial activity. This demonstrates that the Kizzuwatna Research Project is not solely an inventory endeavor, but also performs an essential preservation mandate by documenting cultural heritage that is rapidly vanishing.",
        ],
        images: [
          {
            src: "/images/adana-yuzey-arastirmalari/adana-tahribat-0.jpg",
            alt: "Archaeological degradation documentation",
          },
          {
            src: "/images/adana-yuzey-arastirmalari/adana-tahribat-1.jpg",
            alt: "Archaeological degradation documentation",
          },
        ],
      },
    ],
  },
} as const;

export default function AdanaSurveyPage({
  language = "tr",
}: AdanaSurveyPageProps) {
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

