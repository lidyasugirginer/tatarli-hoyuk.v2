import KizzuwatnaPageLayout from "@/components/kizzuwatna/KizzuwatnaPageLayout";

export default function AdanaYuzeyArastirmalariPage() {
  return (
    <KizzuwatnaPageLayout
      breadcrumb="Adana İli Yüzey Araştırmaları"
      eyebrow="Yüzey Araştırmaları"
      title="Adana İli Yüzey Araştırmaları"
      sections={[
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
            }
          ]
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
              alt: ""
            },
            {
              src: "/images/adana-yuzey-arastirmalari/ceyhan-1.jpg",
              alt: ""
            },
          ]
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
              alt: ""
            },
            {
              src: "/images/adana-yuzey-arastirmalari/adana-tahribat-1.jpg",
              alt: ""
            },
          ]
        },
      ]}
    />
  );
}