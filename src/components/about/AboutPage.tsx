import Image from "next/image";

import PageHeader from "@/components/shared/PageHeader";

import styles from "./AboutPage.module.css";

type Language = "tr" | "en";

type AboutPageProps = {
  language?: Language;
};

const chronology = {
  tr: [
    ["IX", "Geç PPNB", "MÖ 7500–7200?/7000"],
    ["VIIIb–VIIIa", "Erken / Geç Neolitik", "MÖ 7000–5200?"],
    ["VIId", "Orta Kalkolitik", "MÖ 5200–4500"],
    ["VIIc", "Geç Ubeyd / Erken LC 2", "MÖ 4500–4200?"],
    ["VIIb", "Geç Kalkolitik 2–3", "MÖ 4200–3700/3600?"],
    ["VIIa3", "Geç Kalkolitik 4/5", "MÖ 3400–3200"],
    ["VIIa2", "Geç Kalkolitik 5", "MÖ 3200–3100"],
    ["VIIa1", "İlk Tunç Çağı", "MÖ 3100–2000"],
    ["VI", "Orta Tunç Çağı", "MÖ 2000–1600"],
    ["V", "Geç Tunç Çağı", "MÖ 1600–1200"],
    ["IV", "Demir Çağı", "MÖ 1200–334"],
    ["III", "Roma Dönemi", "MÖ 334–MS 395"],
  ],

  en: [
    ["IX", "Late PPNB", "7500–7200?/7000 BCE"],
    ["VIIIb–VIIIa", "Early / Late Neolithic", "7000–5200? BCE"],
    ["VIId", "Middle Chalcolithic", "5200–4500 BCE"],
    ["VIIc", "Late Ubaid / Early LC 2", "4500–4200? BCE"],
    ["VIIb", "Late Chalcolithic 2–3", "4200–3700/3600? BCE"],
    ["VIIa3", "Late Chalcolithic 4/5", "3400–3200 BCE"],
    ["VIIa2", "Late Chalcolithic 5", "3200–3100 BCE"],
    ["VIIa1", "Early Bronze Age", "3100–2000 BCE"],
    ["VI", "Middle Bronze Age", "2000–1600 BCE"],
    ["V", "Late Bronze Age", "1600–1200 BCE"],
    ["IV", "Iron Age", "1200–334 BCE"],
    ["III", "Roman Period", "334 BCE–395 CE"],
  ],
} as const;

const content = {
  tr: {
    header: {
      breadcrumb: "Hakkında",
      eyebrow: "Tatarlı Höyük Kazısı",
      title: "Hakkında",
    },

    sections: {
      tatarli: {
        title: "Tatarlı Höyük",
        paragraphs: [
          "Tatarlı Höyük, Adana ilinin Ceyhan ilçesinin yaklaşık 40 kilometre doğusunda, Doğu Ovalık Kilikya’nın verimli düzlüklerinde yer alan önemli bir arkeolojik yerleşimdir.",
          "Neolitik Çağ’dan Roma Dönemi’ne kadar uzanan yaklaşık yedi bin yıllık kesintisiz iskân geçmişiyle Tatarlı Höyük, Çukurova’nın en uzun süre yaşamın devam ettiği merkezlerden biridir.",
          "2007 yılından bu yana Doç. Dr. K. Serdar Girginer'in Başkanlığında Çukurova Üniversitesi ve T.C. Kültür ve Turizm Bakanlığı adına, Adana Büyükşehir Belediyesi destekleriyle sürdürülen kazılar, yerleşimin tarih öncesinden tarihî dönemlere uzanan gelişimini ortaya koymaktadır.",
          "Kazılarda ortaya çıkarılan mimari kalıntılar, seramikler, mühürler, figürinler ve diğer arkeolojik buluntular, Tatarlı Höyük’ün tarih boyunca farklı kültürlerin buluştuğu önemli bir merkez olduğunu göstermektedir.",
        ],
        alt: "Tatarlı Höyük ve Doğu Akdeniz bağlantılarını gösteren harita",
      },

      geography: {
        title: "Coğrafya ve Stratejik Konum",
        paragraphs: [
          "Tatarlı Höyük, Amanos Dağları’nın batı eteklerinde; kuzeyde Toroslar, doğuda Gaziantep ve İslahiye ovaları, güneyde ise Amik Ovası ve Akdeniz’e uzanan doğal ulaşım koridorlarının kesişim noktasında yer almaktadır.",
          "Amanos geçitleri aracılığıyla Kuzey Suriye’ye, Hitit-Kizzuwatna güzergâhı üzerinden ise Orta Anadolu’ya bağlanan bu konum, yerleşimin tarih boyunca bölgesel ticaret, ulaşım ve kültürel etkileşim içerisindeki önemini artırmıştır.",
          "Verimli alüvyal ve volkanik topraklar, zengin su kaynakları ve tarıma elverişli ovalar, Neolitik Çağ’dan itibaren sürekli iskânın temel koşullarını oluşturmuştur.",
          "Bu doğal avantajlar sayesinde Tatarlı Höyük, Anadolu ve Akdeniz arasında gerçekleşen ekonomik ve kültürel etkileşimin önemli duraklarından biri hâline gelmiştir.",
        ],
        alt: "Tatarlı Höyük çevresindeki doğal su kaynakları",
      },

      settlement: {
        title: "Çoklu Höyük Yerleşim Sistemi",
        paragraphs: [
          "Tatarlı Höyük, geleneksel tek höyük modelinden farklı olarak çoklu höyük yerleşim sistemiyle gelişmiş özgün bir yerleşim organizasyonunu temsil etmektedir.",
          "Merkezde yer alan Sitadel’in çevresindeki Aşağı Şehir ile Bucak Höyük, Berende Tepesi, Kuyluk Tepe ve Geçebey Höyük aynı kültürel peyzajın birbirini tamamlayan unsurlarını oluşturmaktadır.",
          "Yaklaşık 230 × 370 metre ölçülerindeki Sitadel, Çukurova’nın en büyük höyüklerinden biridir. Sitadel ile Aşağı Şehir birlikte değerlendirildiğinde, özellikle MÖ II. binyılda geniş alanlara yayılan gelişmiş bir kent dokusunun varlığı anlaşılmaktadır.",
          "Anıtsal yapılar, üretim ve depolama alanları ile çevredeki yerleşimlerin bütüncül organizasyonu, Tatarlı’nın geniş bir yerleşim ağına sahip olduğunu göstermektedir.",
        ],
        alt: "Tatarlı Höyük çoklu yerleşim sistemi",
      },

      significance: {
        title: "Yerleşimin Önemi",
        paragraphs: [
          "Tatarlı Höyük, sahip olduğu uzun kronolojik süreklilik ve zengin arkeolojik buluntularıyla Doğu Akdeniz arkeolojisinin temel araştırma alanlarından biri olarak değerlendirilmektedir.",
          "Yerleşimde yürütülen çalışmalar, Neolitik Çağ’dan Erken Roma Dönemi’ne kadar uzanan kültürel değişimin izlenmesine olanak sağlarken; Anadolu, Kıbrıs, Kuzey Suriye ve Levant arasındaki ilişkilerin daha iyi anlaşılmasına katkıda bulunmaktadır.",
          "Kazılar yalnızca arkeolojik buluntuların belgelenmesiyle sınırlı kalmamakta; arkeometri, jeoarkeoloji, bioarkeoloji ve koruma bilimleri gibi farklı disiplinlerin katkısıyla geçmiş toplumların yaşam biçimleri, üretim teknolojileri ve çevreyle ilişkileri çok yönlü olarak araştırılmaktadır.",
          "Her kazı sezonunda elde edilen yeni veriler, Tatarlı Höyük’ün Kilikya ve Doğu Akdeniz’in tarihsel gelişimini anlamadaki önemini daha da güçlendirmektedir.",
        ],
        alt: "Tatarlı Höyük kazı alanının hava görünümü",
      },
    },

    chronology: {
      title: "Kronolojik Tabakalar",
      layer: "Tabaka",
      period: "Dönem",
      date: "Tarih",
      note: "* Tarihlendirmeler yeni veriler doğrultusunda güncellenebilir.",
    },
  },

  en: {
    header: {
      breadcrumb: "About",
      eyebrow: "Tatarlı Höyük Excavation",
      title: "About",
    },

    sections: {
      tatarli: {
        title: "Tatarlı Höyük",
        paragraphs: [
          "Tatarlı Höyük is an important archaeological settlement located approximately 40 kilometres east of Ceyhan in Adana Province, on the fertile plains of eastern Cilicia.",
          "With nearly seven thousand years of continuous occupation extending from the Neolithic period to the Roman period, Tatarlı Höyük is one of the longest-lived settlement centres in the Çukurova region.",
          "Excavations have been conducted since 2007 under the direction of Assoc. Prof. Dr. K. Serdar Girginer on behalf of Çukurova University and the Ministry of Culture and Tourism of the Republic of Türkiye, with the support of Adana Metropolitan Municipality. These investigations reveal the development of the settlement from prehistory into the historical periods.",
          "Architectural remains, pottery, seals, figurines, and other archaeological finds uncovered during the excavations demonstrate that Tatarlı Höyük was an important centre where different cultures interacted throughout its history.",
        ],
        alt: "Map showing Tatarlı Höyük and its connections with the Eastern Mediterranean",
      },

      geography: {
        title: "Geography and Strategic Location",
        paragraphs: [
          "Tatarlı Höyük lies on the western foothills of the Amanos Mountains, at the intersection of natural communication routes extending towards the Taurus Mountains to the north, the Gaziantep and İslahiye plains to the east, and the Amuq Plain and the Mediterranean to the south.",
          "Its connections with northern Syria through the Amanos passes and with Central Anatolia via the Hittite-Kizzuwatna route enhanced the settlement’s importance in regional trade, communication, and cultural interaction throughout its history.",
          "Fertile alluvial and volcanic soils, abundant water resources, and plains suitable for agriculture provided the fundamental conditions for continuous occupation from the Neolithic period onwards.",
          "These natural advantages made Tatarlı Höyük an important point within the networks of economic and cultural interaction between Anatolia and the Mediterranean.",
        ],
        alt: "Natural water resources around Tatarlı Höyük",
      },

      settlement: {
        title: "Multi-Mound Settlement System",
        paragraphs: [
          "Unlike the conventional single-mound model, Tatarlı Höyük represents a distinctive settlement organisation that developed as a multi-mound settlement system.",
          "The Lower Town surrounding the central Citadel, together with Bucak Höyük, Berende Tepesi, Kuyluk Tepe, and Geçebey Höyük, formed interconnected elements of the same cultural landscape.",
          "Measuring approximately 230 × 370 metres, the Citadel is one of the largest mounds in Çukurova. When the Citadel and Lower Town are considered together, the evidence indicates the existence of an extensive and developed urban settlement, particularly during the second millennium BCE.",
          "Monumental structures, production and storage areas, and the integrated organisation of the surrounding settlements demonstrate that Tatarlı formed part of an extensive settlement network.",
        ],
        alt: "Multi-mound settlement system of Tatarlı Höyük",
      },

      significance: {
        title: "Significance of the Settlement",
        paragraphs: [
          "With its long chronological continuity and rich archaeological record, Tatarlı Höyük constitutes an important field of research for the archaeology of the Eastern Mediterranean.",
          "Research at the settlement makes it possible to trace cultural change from the Neolithic period to the Early Roman period, while contributing to a better understanding of the relationships between Anatolia, Cyprus, northern Syria, and the Levant.",
          "The excavations are not limited to the documentation of archaeological finds. Through contributions from archaeometry, geoarchaeology, bioarchaeology, and conservation science, the lifeways, production technologies, and environmental relationships of past communities are investigated from multiple perspectives.",
          "New evidence obtained during each excavation season further strengthens the significance of Tatarlı Höyük for understanding the historical development of Cilicia and the Eastern Mediterranean.",
        ],
        alt: "Aerial view of the Tatarlı Höyük excavation area",
      },
    },

    chronology: {
      title: "Chronological Sequence",
      layer: "Level",
      period: "Period",
      date: "Date",
      note: "* Dates may be revised in light of new evidence.",
    },
  },
} as const;

export default function AboutPage({
  language = "tr",
}: AboutPageProps) {
  const t = content[language];
  const chronologyData = chronology[language];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <PageHeader
          breadcrumb={t.header.breadcrumb}
          eyebrow={t.header.eyebrow}
          title={t.header.title}
          language={language}
        />

        <section className={styles.introSection}>
          <div className={styles.introText}>
            <p className={styles.sectionNumber}>01</p>

            <h2>{t.sections.tatarli.title}</h2>

            {t.sections.tatarli.paragraphs.map(
              (paragraph, index) => (
                <p key={index}>{paragraph}</p>
              )
            )}
          </div>

          <div className={styles.introVisual}>
            <Image
              className={styles.contentImage}
              src="/images/hakkinda/hakkinda-tatarli.jpg"
              alt={t.sections.tatarli.alt}
              width={1800}
              height={827}
              priority
              sizes="(max-width: 900px) 100vw, 55vw"
            />
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.sectionText}>
            <p className={styles.sectionNumber}>02</p>

            <h2>{t.sections.geography.title}</h2>

            {t.sections.geography.paragraphs.map(
              (paragraph, index) => (
                <p key={index}>{paragraph}</p>
              )
            )}
          </div>

          <div className={styles.landscapeImage}>
            <Image
              className={styles.contentImage}
              src="/images/hakkinda/hakkinda-cografya.jpg"
              alt={t.sections.geography.alt}
              width={1464}
              height={1002}
              sizes="(max-width: 900px) 100vw, 55vw"
            />
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.sectionText}>
            <p className={styles.sectionNumber}>03</p>

            <h2>{t.sections.settlement.title}</h2>

            {t.sections.settlement.paragraphs.map(
              (paragraph, index) => (
                <p key={index}>{paragraph}</p>
              )
            )}
          </div>

          <div className={styles.landscapeImage}>
            <Image
              className={styles.contentImage}
              src="/images/hakkinda/hakkinda-coklu.jpg"
              alt={t.sections.settlement.alt}
              width={1210}
              height={824}
              sizes="(max-width: 900px) 100vw, 55vw"
            />
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.sectionText}>
            <p className={styles.sectionNumber}>04</p>

            <h2>{t.sections.significance.title}</h2>

            {t.sections.significance.paragraphs.map(
              (paragraph, index) => (
                <p key={index}>{paragraph}</p>
              )
            )}
          </div>

          <div className={styles.landscapeImage}>
            <Image
              className={styles.contentImage}
              src="/images/hakkinda/hakkinda-yerlesim.JPG"
              alt={t.sections.significance.alt}
              width={1650}
              height={1100}
              sizes="(max-width: 900px) 100vw, 55vw"
            />
          </div>
        </section>

        <section className={styles.chronologySection}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionNumber}>05</p>
            <h2>{t.chronology.title}</h2>
          </div>

          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th scope="col">
                    {t.chronology.layer}
                  </th>
                  <th scope="col">
                    {t.chronology.period}
                  </th>
                  <th scope="col">
                    {t.chronology.date}
                  </th>
                </tr>
              </thead>

              <tbody>
                {chronologyData.map(
                  ([layer, period, date]) => (
                    <tr key={layer}>
                      <td>{layer}</td>
                      <td>{period}</td>
                      <td>{date}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <p className={styles.tableNote}>
            {t.chronology.note}
          </p>
        </section>
      </div>
    </main>
  );
}