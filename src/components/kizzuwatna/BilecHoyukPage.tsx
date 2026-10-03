import InnerPageLayout from "@/components/shared/InnerPageLayout";
import KizzuwatnaSubnav from "@/components/kizzuwatna/KizzuwatnaSubnav";

type Language = "tr" | "en";

type BilecHoyukPageProps = {
  language?: Language;
};

const content = {
  tr: {
    breadcrumb: "Kizzuwatna / Bileç Höyük Kurtarma Kazısı",
    eyebrow: "Kizzuwatna Araştırmaları Projesi",
    title: "Bileç Höyük Kurtarma Kazısı",
    sections: [
      {
        number: "01",
        title: "Bileç Höyük ve Kazı Süreci",
        paragraphs: [
          "Bileç Höyük (Ahmetağa Tepesi), 2005 yılında Kayseri’nin Develi Ovası’nda keşfedilmiş ancak kısa süre içinde yok edilmiştir. 2007 yılında Kayseri Müze Müdürlüğü Başkanlığında ve Çukurova Üniversitesi’nden Doç. Dr. K. Serdar Girginer’in Bilimsel danışmanlığında acil bir kurtarma kazısına başlanmıştır.",
          "Kazılar, höyüğün bimsli ana toprak üzerindeki ilk yerleşiminin Geç Kalkolitik ile Erken Tunç Çağı I arasındaki geçiş evresine (III. Tabaka) ait olduğunu belgelemiştir. Yerleşimin tarihsel süreci, tabakalarda ele geçen buluntularla Karum, Eski Hitit ve Hitit İmparatorluk dönemlerine kadar kesintisiz bir iskânın varlığını ortaya koymuştur.",
          "Kazılarda açığa çıkarılan 4.5 metre yüksekliğindeki anıtsal sur sistemi, Bileç Höyük’ün yalnızca bir üretim merkezi değil, aynı zamanda tahkim edilmiş stratejik bir savunma noktası olduğunu ispatlamıştır.",
        ],
        image: "/images/bilec/bilec-konum-0.jpg",
        imageAlt: "Bileç Höyük konum haritası",
      },
      {
        number: "02",
        title: "Metalürji ve Uzmanlaşmış Üretim",
        paragraphs: [
          "Kazıların en çarpıcı sonuçlarından biri, yerleşimin erken evrelerinde son derece gelişmiş bir metalürji merkezi olduğunun saptanmasıdır. Alanda taştan inşa edilmiş, ortalama 2,20 metre çapında dairesel formlu dört adet eritme ocağı ile birlikte çok sayıda pota parçası ve cüruf bulunmuştur. Potalar üzerinde yapılan pXRF analizlerinde %37’ye varan kalay oranlarının tespit edilmesi, burada erken dönemde bilinçli bir tunç üretimi yapıldığını ve yerleşimin uzmanlaşmış bir zanaat merkezi olduğunu kanıtlamıştır.",
          "Metalürji işliğinde bulunan kemik terazi kolu, kıymetli madenlerin tartılmasında kullanıldığı tahmin edilen ve Anadolu’nun Geç Kalkolitik - Erken Tunç Çağı geçişi için oldukça nadir rastlanan bir statü objesi olarak öne çıkmaktadır. Ayrıca balta kalıpları ve cevher hazırlamada kullanılan taş çekiçler, yerel üretimin yüksek teknik kapasitesini ve standardizasyonunu gözler önüne sermiştir. Bu buluntular, Bileç Höyük’ün bölgesel ticaret ağları ve kıymetli maden ekonomisi içindeki kilit rolünü simgelemektedir.",
        ],
        image: "/images/bilec/bilec-metalurji.jpg",
        imageAlt: "Bileç Höyük metalürji buluntuları ve üretim alanı",
      },
      {
        number: "03",
        title: "Kültürel Etkileşim ve Seramik Gelenekleri",
        paragraphs: [
          "Yerleşimde ele geçen buluntular, Orta Anadolu’nun Kura-Aras (Karaz) kültürü ile olan etkileşimini de yansıtmaktadır. At nalı biçimli kutsal ocak ayakları (andironlar), antropomorfik andiron parçaları ve \"Black Topped\" (içi siyah, dışı devetüyü/kırmızı) çanak çömlekler bu kültürel iletişimin en net göstergeleridir. Özellikle siyah ağız kenarlı kapların yoğunluğu, yerel halkın Kafkasya kökenli topluluklarla hem teknolojik hem de sanatsal gelenekleri paylaştığını göstermektedir.",
          "Kazılar sonucunda ilk kez sistematik olarak tanımlanan \"Develi Boyalıları\" (Develi Painted Ware), Güney Kapadokya için özgün bir bölgesel seramik geleneği olarak literatüre kazandırılmıştır. Beyaz veya krem astar üzerine kırmızımsı kahverengi boya ile uygulanan dikey çizgiler ve spiral motifler bu grubun ayırt edici bezeme özellikleridir. Arkeometrik veriler, bu seramiklerin ortak bir teknolojik gelenek içinde ancak esnek bir üretim modeliyle yerel hammaddeler kullanılarak üretildiğini teyit etmiştir.",
        ],
        image: "/images/bilec/bilec-seramik.jpg",
        imageAlt: "Bileç Höyük seramik buluntuları ve Develi Boyalıları",
      },
    ],
  },
  en: {
    breadcrumb: "Kizzuwatna / Bileç Höyük Rescue Excavation",
    eyebrow: "Kizzuwatna Research Project",
    title: "Bileç Höyük Rescue Excavation",
    sections: [
      {
        number: "01",
        title: "Bileç Höyük and the Excavation Process",
        paragraphs: [
          "Bileç Höyük (Ahmetağa Tepesi) was discovered in 2005 on the Develi Plain in Kayseri, but faced rapid destruction shortly thereafter. In 2007, an emergency rescue excavation was launched under the direction of the Kayseri Museum Directorate with the scientific consultancy of Assoc. Prof. Dr. K. Serdar Girginer from Çukurova University.",
          "The excavations documented that the initial occupation of the mound on the pumice bedrock dates to the transitional phase between the Late Chalcolithic and Early Bronze Age I (Level III). Finds from successive strata demonstrated continuous occupation through the Karum Period, Old Hittite Kingdom, and Hittite Empire Period.",
          "The monumental fortification wall system uncovered during the excavations, standing 4.5 metres high, proved that Bileç Höyük was not merely a centre of production, but also a fortified strategic stronghold.",
        ],
        image: "/images/bilec/bilec-konum-0.jpg",
        imageAlt: "Location map of Bileç Höyük",
      },
      {
        number: "02",
        title: "Metallurgy and Specialized Production",
        paragraphs: [
          "One of the most striking findings of the excavations was the identification of the settlement as a highly advanced metallurgical centre in its early phases. Four stone-built circular smelting furnaces with an average diameter of 2.20 metres were uncovered, alongside numerous crucible fragments and slag. Portable XRF (pXRF) analyses on the crucibles revealed tin concentrations of up to 37%, confirming deliberate early bronze alloying and demonstrating that the settlement functioned as a specialized craft centre.",
          "A bone balance scale beam discovered in the metallurgical workshop stands out as an exceptional prestige object for the Late Chalcolithic–Early Bronze Age transition in Anatolia, likely used for weighing precious metals. Furthermore, axe moulds and stone hammers utilized in ore preparation illustrate the high technological capacity and standardization of local production. These artefacts underscore Bileç Höyük’s key role in regional trade networks and the precious metals economy.",
        ],
        image: "/images/bilec/bilec-metalurji.jpg",
        imageAlt: "Bileç Höyük metallurgical finds and production area",
      },
      {
        number: "03",
        title: "Cultural Interaction and Ceramic Traditions",
        paragraphs: [
          "Artefacts recovered from the settlement also reflect interactions between Central Anatolia and the Kura-Araxes (Karaz) culture. Horseshoe-shaped hearth stands (andirons), anthropomorphic andiron fragments, and \"Black Topped\" (black interior, buff/red exterior) pottery represent the clearest manifestations of this cultural connection. The high frequency of black-topped vessels demonstrates that local communities shared both technological and stylistic traditions with Caucasian-related groups.",
          "Systematically identified for the first time during the excavations, \"Develi Painted Ware\" was introduced into scholarly literature as a distinctive regional ceramic tradition of Southern Cappadocia. Vertical linear bands and spiral motifs applied in reddish-brown paint over a white or cream slip constitute the diagnostic decorative features of this ware. Archaeometric data confirm that these ceramics were produced within a shared technological tradition using local raw materials under an adaptable production model.",
        ],
        image: "/images/bilec/bilec-seramik.jpg",
        imageAlt: "Bileç Höyük ceramic finds and Develi Painted Ware",
      },
    ],
  },
} as const;

export default function BilecHoyukPage({
  language = "tr",
}: BilecHoyukPageProps) {
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

