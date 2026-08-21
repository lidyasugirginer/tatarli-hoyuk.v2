import Image from "next/image";

import PageHeader from "@/components/shared/PageHeader";

import styles from "./hakkinda.module.css";

const chronology = [
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
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
      <PageHeader
  breadcrumb="Hakkında"
  eyebrow="Tatarlı Höyük Kazısı"
  title="Hakkında"
/>

        <section className={styles.introSection}>
          <div className={styles.introText}>
            <p className={styles.sectionNumber}>01</p>
            <h2>Tatarlı Höyük</h2>
            <p>Tatarlı Höyük, Adana ilinin Ceyhan ilçesinin yaklaşık 40 kilometre doğusunda, Doğu Ovalık Kilikya’nın verimli düzlüklerinde yer alan önemli bir arkeolojik yerleşimdir.</p>
            <p>Neolitik Çağ’dan Roma Dönemi’ne kadar uzanan yaklaşık yedi bin yıllık kesintisiz iskân geçmişiyle Tatarlı Höyük, Çukurova’nın en uzun süre yaşamın devam ettiği merkezlerden biridir.</p>
            <p>2007 yılından bu yana Doç. Dr. K. Serdar Girginer'in Başkanlığında Çukurova Üniversitesi ve T.C. Kültür ve Turizm Bakanlığı adına, Adana Büyükşehir Belediyesi destekleriyle sürdürülen kazılar, yerleşimin tarih öncesinden tarihî dönemlere uzanan gelişimini ortaya koymaktadır.</p>
            <p>Kazılarda ortaya çıkarılan mimari kalıntılar, seramikler, mühürler, figürinler ve diğer arkeolojik buluntular, Tatarlı Höyük’ün tarih boyunca farklı kültürlerin buluştuğu önemli bir merkez olduğunu göstermektedir.</p>
          </div>

          <div className={styles.introVisual}>
  <Image
    className={styles.contentImage}
    src="/images/hakkinda/hakkinda-tatarli.jpg"
    alt="Tatarlı Höyük ve Doğu Akdeniz bağlantılarını gösteren harita"
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
            <h2>Coğrafya ve Stratejik Konum</h2>
            <p>Tatarlı Höyük, Amanos Dağları’nın batı eteklerinde; kuzeyde Toroslar, doğuda Gaziantep ve İslahiye ovaları, güneyde ise Amik Ovası ve Akdeniz’e uzanan doğal ulaşım koridorlarının kesişim noktasında yer almaktadır.</p>
            <p>Amanos geçitleri aracılığıyla Kuzey Suriye’ye, Hitit-Kizzuwatna güzergâhı üzerinden ise Orta Anadolu’ya bağlanan bu konum, yerleşimin tarih boyunca bölgesel ticaret, ulaşım ve kültürel etkileşim içerisindeki önemini artırmıştır.</p>
            <p>Verimli alüvyal ve volkanik topraklar, zengin su kaynakları ve tarıma elverişli ovalar, Neolitik Çağ’dan itibaren sürekli iskânın temel koşullarını oluşturmuştur.</p>
            <p>Bu doğal avantajlar sayesinde Tatarlı Höyük, Anadolu ve Akdeniz arasında gerçekleşen ekonomik ve kültürel etkileşimin önemli duraklarından biri hâline gelmiştir.</p>
          </div>
          <div className={styles.landscapeImage}>
  <Image
    className={styles.contentImage}
    src="/images/hakkinda/hakkinda-cografya.jpg"
    alt="Tatarlı Höyük çevresindeki doğal su kaynakları"
    width={1464}
    height={1002}
    sizes="(max-width: 900px) 100vw, 55vw"
  />
</div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.sectionText}>
            <p className={styles.sectionNumber}>03</p>
            <h2>Çoklu Höyük Yerleşim Sistemi</h2>
            <p>Tatarlı Höyük, geleneksel tek höyük modelinden farklı olarak çoklu höyük yerleşim sistemiyle gelişmiş özgün bir yerleşim organizasyonunu temsil etmektedir.</p>
            <p>Merkezde yer alan Sitadel’in çevresindeki Aşağı Şehir ile Bucak Höyük, Berende Tepesi, Kuyluk Tepe ve Geçebey Höyük aynı kültürel peyzajın birbirini tamamlayan unsurlarını oluşturmaktadır.</p>
            <p>Yaklaşık 230 × 370 metre ölçülerindeki Sitadel, Çukurova’nın en büyük höyüklerinden biridir. Sitadel ile Aşağı Şehir birlikte değerlendirildiğinde, özellikle MÖ II. binyılda geniş alanlara yayılan gelişmiş bir kent dokusunun varlığı anlaşılmaktadır.</p>
            <p>Anıtsal yapılar, üretim ve depolama alanları ile çevredeki yerleşimlerin bütüncül organizasyonu, Tatarlı’nın geniş bir yerleşim ağına sahip olduğunu göstermektedir.</p>
          </div>
          <div className={styles.landscapeImage}>
  <Image
    className={styles.contentImage}
    src="/images/hakkinda/hakkinda-coklu.jpg"
    alt="Tatarlı Höyük çoklu yerleşim sistemi"
    width={1210}
    height={824}
    sizes="(max-width: 900px) 100vw, 55vw"
  />
</div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.sectionText}>
            <p className={styles.sectionNumber}>04</p>
            <h2>Yerleşimin Önemi</h2>
            <p>Tatarlı Höyük, sahip olduğu uzun kronolojik süreklilik ve zengin arkeolojik buluntularıyla Doğu Akdeniz arkeolojisinin temel araştırma alanlarından biri olarak değerlendirilmektedir.</p>
            <p>Yerleşimde yürütülen çalışmalar, Neolitik Çağ’dan Erken Roma Dönemi’ne kadar uzanan kültürel değişimin izlenmesine olanak sağlarken; Anadolu, Kıbrıs, Kuzey Suriye ve Levant arasındaki ilişkilerin daha iyi anlaşılmasına katkıda bulunmaktadır.</p>
            <p>Kazılar yalnızca arkeolojik buluntuların belgelenmesiyle sınırlı kalmamakta; arkeometri, jeoarkeoloji, bioarkeoloji ve koruma bilimleri gibi farklı disiplinlerin katkısıyla geçmiş toplumların yaşam biçimleri, üretim teknolojileri ve çevreyle ilişkileri çok yönlü olarak araştırılmaktadır.</p>
            <p>Her kazı sezonunda elde edilen yeni veriler, Tatarlı Höyük’ün Kilikya ve Doğu Akdeniz’in tarihsel gelişimini anlamadaki önemini daha da güçlendirmektedir.</p>
          </div>
          <div className={styles.landscapeImage}>
  <Image
    className={styles.contentImage}
    src="/images/hakkinda/hakkinda-yerlesim.JPG"
    alt="Tatarlı Höyük kazı alanının hava görünümü"
    width={1650}
    height={1100}
    sizes="(max-width: 900px) 100vw, 55vw"
  />
</div>
        </section>

        <section className={styles.chronologySection}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionNumber}>05</p>
            <h2>Kronolojik Tabakalar</h2>
          </div>
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Tabaka</th>
                  <th scope="col">Dönem</th>
                  <th scope="col">Tarih</th>
                </tr>
              </thead>
              <tbody>
                {chronology.map(([layer, period, date]) => (
                  <tr key={layer}>
                    <td>{layer}</td>
                    <td>{period}</td>
                    <td>{date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.tableNote}>* Tarihlendirmeler yeni veriler doğrultusunda güncellenebilir.</p>
        </section>
      </div>
    </main>
  );
}