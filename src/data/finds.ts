import type { FindItem, PeriodKey, FindTypeKey, MaterialKey } from "@/types/find";

export const PERIOD_FILTERS: { key: PeriodKey; label: { tr: string; en: string } }[] = [
  { key: "all", label: { tr: "Tümü", en: "All" } },
  { key: "neolithic", label: { tr: "Neolitik", en: "Neolithic" } },
  { key: "chalcolithic", label: { tr: "Kalkolitik", en: "Chalcolithic" } },
  { key: "early-bronze", label: { tr: "Erken Tunç Çağı", en: "Early Bronze Age" } },
  { key: "middle-bronze", label: { tr: "Orta Tunç Çağı", en: "Middle Bronze Age" } },
  { key: "late-bronze", label: { tr: "Geç Tunç Çağı", en: "Late Bronze Age" } },
  { key: "iron-age", label: { tr: "Demir Çağı", en: "Iron Age" } },
  { key: "hellenistic-roman", label: { tr: "Hellenistik – Roma", en: "Hellenistic – Roman" } },
];

export const FIND_TYPE_OPTIONS: { key: FindTypeKey; label: { tr: string; en: string } }[] = [
  { key: "all", label: { tr: "Tüm Buluntu Türleri", en: "All Find Types" } },
  { key: "ceramic", label: { tr: "Seramik", en: "Pottery" } },
  { key: "seal", label: { tr: "Mühür / Mühür Baskısı", en: "Seal / Impression" } },
  { key: "figurine", label: { tr: "Figürin", en: "Figurine" } },
  { key: "metal", label: { tr: "Metal", en: "Metal" } },
  { key: "stone", label: { tr: "Taş", en: "Stone" } },
  { key: "other", label: { tr: "Diğer", en: "Other" } },
];

export const MATERIAL_OPTIONS: { key: MaterialKey; label: { tr: string; en: string } }[] = [
  { key: "all", label: { tr: "Tüm Malzemeler", en: "All Materials" } },
  { key: "ceramic", label: { tr: "Seramik", en: "Pottery" } },
  { key: "terracotta", label: { tr: "Pişmiş Toprak", en: "Terracotta" } },
  { key: "stone", label: { tr: "Taş", en: "Stone" } },
  { key: "bronze", label: { tr: "Bronz", en: "Bronze" } },
  { key: "obsidian", label: { tr: "Obsidyen", en: "Obsidian" } },
];

export const MOCK_FINDS: FindItem[] = [
  {
    id: "th-find-01",
    periodKey: "late-bronze",
    period: {
      tr: "Geç Tunç Çağı",
      en: "Late Bronze Age",
    },
    typeKey: "seal",
    type: {
      tr: "Mühür / Mühür Baskısı",
      en: "Seal / Impression",
    },
    materialKey: "stone",
    material: {
      tr: "Taş",
      en: "Stone",
    },
    findspot: {
      tr: "Fırın Çevresi",
      en: "Kiln Area",
    },
    year: 2022,
    inventoryNo: "TH-22-456",
    title: {
      tr: "Hiyeroglifli Mühür",
      en: "Hieroglyphic Seal",
    },
    description: {
      tr: "Tatarlı Höyük'te ele geçen hiyeroglifli taş mühür, Geç Tunç Çağı'nda bölgenin kültürel ve idari ilişkilerini değerlendirmek açısından önemli buluntular arasındadır. Mühür yüzeyindeki Luvi hiyeroglif karakterleri, yerleşimin Kizzuwatna ve Hitit İmparatorluğu yönetim ağlarıyla doğrudan bağlantısını belgeler.",
      en: "The hieroglyphic stone seal recovered from Tatarlı Höyük is among the significant finds for evaluating the cultural and administrative interactions of the region during the Late Bronze Age. The Luwian hieroglyphic signs engraved on the seal surface document direct connections with the administrative network of Kizzuwatna and the Hittite Empire.",
    },
    images: [
      "/images/hakkinda/cizim0.png",
      "/images/finds/find-metal-1.jpg",
    ],
  },
  {
    id: "th-find-02",
    periodKey: "middle-bronze",
    period: {
      tr: "Orta Tunç Çağı",
      en: "Middle Bronze Age",
    },
    typeKey: "ceramic",
    type: {
      tr: "Seramik",
      en: "Pottery",
    },
    materialKey: "terracotta",
    material: {
      tr: "Pişmiş Toprak",
      en: "Terracotta",
    },
    findspot: {
      tr: "Sitadel Doğu Sektör",
      en: "Citadel East Sector",
    },
    year: 2019,
    inventoryNo: "TH-19-312",
    title: {
      tr: "Kuş Biçimli Kap (Askos)",
      en: "Bird-Shaped Vessel (Askos)",
    },
    description: {
      tr: "Orta Tunç Çağı tabakalarında açığa çıkarılan zoomorfik kap, özenle açkılanmış kırmızı astarı ve stilize kuş formuyla dikkat çekmektedir. Kült ve ritüel sunularında kullanıldığı düşünülen eser, Doğu Kilikya'nın yerel seramik geleneği ile Orta Anadolu ritüel kap formları arasındaki ortak repertuvarı yansıtır.",
      en: "Unearthed in the Middle Bronze Age layers, this zoomorphic vessel is distinguished by its burnished red slip and stylized avian form. Interpreted as a libation vessel used in ritual contexts, the piece illustrates the shared repertoire between the regional pottery traditions of Eastern Cilicia and Central Anatolian ceremonial vessels.",
    },
    images: [
      "/images/finds/find-ceramic-3.jpg",
      "/images/hakkinda/cizim0.png",
    ],
  },
  {
    id: "th-find-03",
    periodKey: "late-bronze",
    period: {
      tr: "Geç Tunç Çağı",
      en: "Late Bronze Age",
    },
    typeKey: "ceramic",
    type: {
      tr: "Seramik",
      en: "Pottery",
    },
    materialKey: "ceramic",
    material: {
      tr: "Seramik",
      en: "Pottery",
    },
    findspot: {
      tr: "Sitadel",
      en: "Citadel",
    },
    year: 2021,
    inventoryNo: "TH-21-284",
    title: {
      tr: "Boyalı Seramik Kap",
      en: "Painted Ceramic Vessel",
    },
    description: {
      tr: "Geç Tunç Çağı tabakasında bulunan çok renkli geometrik bezemeli kap, açık bej hamuru ve kahverengi-kırmızı tonlardaki bant bezemeleriyle karakterizedir. Kap üzerindeki dalgalı hatlar ve bant kompozisyonları, Doğu Akdeniz ve Kuzey Suriye seramik atölyeleriyle sürdürülen yoğun ticari iletişimin göstergesidir.",
      en: "Discovered in the Late Bronze Age level, this polychrome painted vessel is characterized by buff fabric and banded geometric ornamentation executed in reddish-brown tones. The wavy band compositions and horizontal registers attest to dynamic trade and ceramic exchange with Eastern Mediterranean and Northern Syrian workshops.",
    },
    images: [
      "/images/finds/find-ceramic-4.jpg",
      "/images/finds/find-ceramic-2.jpg",
    ],
  },
  {
    id: "th-find-04",
    periodKey: "iron-age",
    period: {
      tr: "Demir Çağı",
      en: "Iron Age",
    },
    typeKey: "figurine",
    type: {
      tr: "Figürin",
      en: "Figurine",
    },
    materialKey: "terracotta",
    material: {
      tr: "Pişmiş Toprak",
      en: "Terracotta",
    },
    findspot: {
      tr: "Aşağı Şehir",
      en: "Lower Town",
    },
    year: 2016,
    inventoryNo: "TH-16-198",
    title: {
      tr: "Pişmiş Toprak Kadın Figürini",
      en: "Terracotta Female Figurine",
    },
    description: {
      tr: "Aşağı Şehir yerleşim alanında bulunan el yapımı pişmiş toprak kadın figürini, silindirik gövdesi ve stilize yüz hatlarıyla Demir Çağı yerel inanç pratiklerini temsil etmektedir. Bereket ve adak kültleriyle ilişkilendirilen figürin, dönemin heykelcik sanatına ışık tutar.",
      en: "Recovered from the domestic quarters of the Lower Town, this hand-modelled terracotta female figurine features a columnar body and stylized facial contours characteristic of regional Iron Age votive practices. Associated with fertility cults, it provides valuable insight into local coroplastic traditions.",
    },
    images: [
      "/images/finds/find-ceramic-1.jpg",
      "/images/hakkinda/cizim0.png",
    ],
  },
  {
    id: "th-find-05",
    periodKey: "early-bronze",
    period: {
      tr: "Erken Tunç Çağı",
      en: "Early Bronze Age",
    },
    typeKey: "metal",
    type: {
      tr: "Metal",
      en: "Metal",
    },
    materialKey: "bronze",
    material: {
      tr: "Bronz",
      en: "Bronze",
    },
    findspot: {
      tr: "Sitadel Batı Açma",
      en: "Citadel West Trench",
    },
    year: 2018,
    inventoryNo: "TH-18-085",
    title: {
      tr: "Bronz Mızrak Ucu",
      en: "Bronze Spearhead",
    },
    description: {
      tr: "Erken Tunç Çağı III tabakasından ele geçen döküm bronz mızrak ucu, belirgin orta kaburgası ve boru biçimli sap yuvasıyla yüksek metalurji teknolojisinin kanıtıdır. Arkeometrik analizler, alaşımda kullanılan kalay ve bakır kaynaklarının bölgesel maden yataklarıyla örtüştüğünü ortaya koymuştur.",
      en: "Originating from the Early Bronze Age III level, this cast bronze spearhead with a pronounced midrib and tubular socket reflects advanced metallurgical craft. Archaeometric analyses indicate that the copper and alloying agents correspond with regional metal procurement circuits linking the Taurus Mountains and Cilicia.",
    },
    images: [
      "/images/finds/find-metal-1.jpg",
      "/images/finds/find-metal-2.jpg",
    ],
  },
  {
    id: "th-find-06",
    periodKey: "chalcolithic",
    period: {
      tr: "Kalkolitik",
      en: "Chalcolithic",
    },
    typeKey: "seal",
    type: {
      tr: "Mühür / Mühür Baskısı",
      en: "Seal / Impression",
    },
    materialKey: "stone",
    material: {
      tr: "Taş",
      en: "Stone",
    },
    findspot: {
      tr: "Derin Sondaj",
      en: "Deep Sounding",
    },
    year: 2014,
    inventoryNo: "TH-14-112",
    title: {
      tr: "Geometrik Bezemeli Damga Mühür",
      en: "Stamp Seal with Geometric Pattern",
    },
    description: {
      tr: "Geç Kalkolitik döneme tarihlenen klorit damga mühür, dairesel mühür yüzeyine derin oyma tekniğiyle işlenmiş çapraz ve ışınsal geometrik motifler barındırır. Erken idari örgütlenme ve mülkiyet kavramının gelişimini simgeleyen nadide örneklerdendir.",
      en: "Dating to the Late Chalcolithic period, this chlorite stamp seal features deeply incised cross-hatched and radial geometric motifs across its circular base. It represents early administrative practices and concepts of property control prior to the rise of urban state structures.",
    },
    images: [
      "/images/hakkinda/cizim0.png",
      "/images/finds/find-metal-3.jpg",
    ],
  },
  {
    id: "th-find-07",
    periodKey: "neolithic",
    period: {
      tr: "Neolitik",
      en: "Neolithic",
    },
    typeKey: "stone",
    type: {
      tr: "Taş",
      en: "Stone",
    },
    materialKey: "obsidian",
    material: {
      tr: "Obsidyen",
      en: "Obsidian",
    },
    findspot: {
      tr: "Sitadel Alt Tabaka",
      en: "Citadel Basal Layer",
    },
    year: 2011,
    inventoryNo: "TH-11-042",
    title: {
      tr: "Obsidyen Dilgi ve Çekirdek",
      en: "Obsidian Blade and Core",
    },
    description: {
      tr: "Neolitik tabakalarda tespit edilen yeşilimsi siyah obsidyen dilgiler ve çekirdek parçası, baskı tekniğiyle yontulmuş keskin kenarlara sahiptir. Jeokimyasal analizler hammaddenin Kapadokya (Göllüdağ / Nenezi Dağ) kaynaklı olduğunu kanıtlamakta, Neolitik çağdaki uzun mesafe hammadde rotalarını belgelemektedir.",
      en: "Obsidian prismatic blades and core fragments documented in the Neolithic horizons exhibit finely pressure-flaked cutting edges. Geochemical provenance analyses confirm raw material extraction from Cappadocian volcanic sources (Göllüdağ / Nenezi Dağ), confirming long-distance exchange circuits during the early Neolithic.",
    },
    images: [
      "/images/finds/find-ceramic-1.jpg",
      "/images/finds/find-ceramic-3.jpg",
    ],
  },
  {
    id: "th-find-08",
    periodKey: "middle-bronze",
    period: {
      tr: "Orta Tunç Çağı",
      en: "Middle Bronze Age",
    },
    typeKey: "ceramic",
    type: {
      tr: "Seramik",
      en: "Pottery",
    },
    materialKey: "ceramic",
    material: {
      tr: "Seramik",
      en: "Pottery",
    },
    findspot: {
      tr: "Fırın Çevresi",
      en: "Kiln Area",
    },
    year: 2023,
    inventoryNo: "TH-23-518",
    title: {
      tr: "Kırmızı Astarlı Matara",
      en: "Red Slip Pilgrim Flask",
    },
    description: {
      tr: "Çift kulplu basık gövdeli seramik matara, parlak kırmızı astarı ve pürüzsüz yüzey işçiliğiyle Orta Tunç Çağı seramik sanatının yetkin bir ürünüdür. Sıvı depolama ve taşıma amacıyla üretilen kap, yerleşimdeki atölye üretiminin teknik olgunluğunu gösterir.",
      en: "This lentoid two-handled flask with a lustrous red slip and burnished surface exemplifies the technological refinement of Middle Bronze Age ceramic production. Designed for liquid transport and table service, it demonstrates the sophistication of specialized pottery kilns active at Tatarlı Höyük.",
    },
    images: [
      "/images/finds/find-ceramic-3.jpg",
      "/images/finds/find-ceramic-4.jpg",
    ],
  },
  {
    id: "th-find-09",
    periodKey: "late-bronze",
    period: {
      tr: "Geç Tunç Çağı",
      en: "Late Bronze Age",
    },
    typeKey: "figurine",
    type: {
      tr: "Figürin",
      en: "Figurine",
    },
    materialKey: "terracotta",
    material: {
      tr: "Pişmiş Toprak",
      en: "Terracotta",
    },
    findspot: {
      tr: "Sitadel Kutsal Alan",
      en: "Citadel Cult Area",
    },
    year: 2020,
    inventoryNo: "TH-20-376",
    title: {
      tr: "Pişmiş Toprak Boğa Başı (Protome)",
      en: "Terracotta Bull Head (Protome)",
    },
    description: {
      tr: "Kutsal alan dolgusunda ele geçen boğa protomu, Hitit fırtına tanrısı Teshub/Tarhunta inancı ve yerel Kizzuwatna tapınım gelenekleriyle yakından bağlantılıdır. Heykelsi formun detaylarındaki boynuz ve göz kabartmaları ustalıklı bir zanaatı işaret eder.",
      en: "Found in cultic deposit context, this terracotta bull protome is closely associated with the iconography of the Storm God (Teshub/Tarhunta) venerated throughout Kizzuwatna and the Hittite sphere. The sculpted anatomical details around the horns and muzzle reflect skilled ceramic sculpting.",
    },
    images: [
      "/images/finds/find-metal-2.jpg",
      "/images/hakkinda/cizim0.png",
    ],
  },
  {
    id: "th-find-09b",
    periodKey: "iron-age",
    period: {
      tr: "Demir Çağı",
      en: "Iron Age",
    },
    typeKey: "metal",
    type: {
      tr: "Metal",
      en: "Metal",
    },
    materialKey: "bronze",
    material: {
      tr: "Bronz",
      en: "Bronze",
    },
    findspot: {
      tr: "Aşağı Şehir Doğu Nekropolü",
      en: "Lower Town East Necropolis",
    },
    year: 2017,
    inventoryNo: "TH-17-210",
    title: {
      tr: "Bronz Fibula",
      en: "Bronze Fibula",
    },
    description: {
      tr: "Geç Demir Çağı mezar kontekstinden ele geçirilen kemerli bronz fibula (çengelli iğne), yay mekanizması ve iğne yuvasıyla kusursuz korunmuştur. Frig ve Geç Hitit formlarıyla paralellikler gösteren eser, giyim kuşam modası ve maden işçiliği hakkında zengin bilgi sağlar.",
      en: "Recovered from a Late Iron Age mortuary context, this arched bronze fibula with an intact spring coil and catchplate is remarkably preserved. Displaying stylistic parallels with Phrygian and Neo-Hittite metal accessories, it illustrates costume traditions and elite metalcraft.",
    },
    images: [
      "/images/finds/find-metal-4.jpg",
      "/images/finds/find-metal-1.jpg",
    ],
  },
  {
    id: "th-find-10",
    periodKey: "hellenistic-roman",
    period: {
      tr: "Hellenistik – Roma",
      en: "Hellenistic – Roman",
    },
    typeKey: "ceramic",
    type: {
      tr: "Seramik",
      en: "Pottery",
    },
    materialKey: "ceramic",
    material: {
      tr: "Seramik",
      en: "Pottery",
    },
    findspot: {
      tr: "Yüzey Tabakası",
      en: "Surface Layer",
    },
    year: 2008,
    inventoryNo: "TH-08-015",
    title: {
      tr: "Hellenistik Boyalı Kase",
      en: "Hellenistic Painted Bowl",
    },
    description: {
      tr: "Hellenistik döneme ait ince cidarlı seramik kase, batı yamacı stili açık renkli zemin üzerine koyu renkli palmet ve sarmaşık motifleriyle bezenmiştir. Tatarlı Höyük'ün klasik çağlarda da Akdeniz ticaret ve kültür havzasındaki aktif yerini kanıtlar.",
      en: "This thin-walled Hellenistic ceramic bowl features fine pale slip ornamented with dark painted palmette and ivy sprays reminiscent of West Slope style pottery. It demonstrates Tatarlı Höyük's continued integration within Mediterranean trade networks in the Hellenistic period.",
    },
    images: [
      "/images/finds/find-ceramic-2.jpg",
      "/images/finds/find-ceramic-4.jpg",
    ],
  },
  {
    id: "th-find-11",
    periodKey: "middle-bronze",
    period: {
      tr: "Orta Tunç Çağı",
      en: "Middle Bronze Age",
    },
    typeKey: "seal",
    type: {
      tr: "Mühür / Mühür Baskısı",
      en: "Seal / Impression",
    },
    materialKey: "stone",
    material: {
      tr: "Taş",
      en: "Stone",
    },
    findspot: {
      tr: "İdari Yapı",
      en: "Administrative Building",
    },
    year: 2022,
    inventoryNo: "TH-22-491",
    title: {
      tr: "Silindir Mühür",
      en: "Cylinder Seal",
    },
    description: {
      tr: "Hematit taştan yontulmuş silindir mühür, Asur Ticaret Kolonileri Çağı üslubunda karşılıklı duran figürler, hayat ağacı ve astral sembollerle bezelidir. Eski Babil ve Suriye-Kapadokya ticaret ağlarının Kilikya geçitlerindeki idari ve ticari izlerini taşır.",
      en: "Carved from hematite, this cylinder seal depicts standing worshipers flanking a sacred tree beneath astral emblems in the Old Syrian / Assyrian Colony style. It provides compelling evidence of administrative record-keeping linked to interregional mercantile caravans traversing Cilician passes.",
    },
    images: [
      "/images/hakkinda/cizim0.png",
      "/images/finds/find-metal-2.jpg",
    ],
  },
];
