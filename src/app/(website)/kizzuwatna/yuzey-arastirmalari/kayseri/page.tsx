import KizzuwatnaPageLayout from "@/components/kizzuwatna/KizzuwatnaPageLayout";


export default function KayseriYuzeyArastirmalariPage() {
  return (
    <KizzuwatnaPageLayout
      breadcrumb="Kayseri İli Yüzey Araştırmaları"
      eyebrow="Yüzey Araştırmaları"
      title="Kayseri İli Yüzey Araştırmaları"
      sections={[
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
          images : [
            {
              src: "/images/kayseri-yuzey-arastirmalari/sariz-0.jpg",
              alt: "Develi yüzey araştırmaları",
            },
            {
              src: "/images/kayseri-yuzey-arastirmalari/sariz-1.jpg",
              alt: "Develi yüzey araştırmaları",
            }
          ]
        },
        {
          number: "03",
          title: "Develi Araştırmaları",
          paragraphs: [
            "2005 yılında yürütülen Develi çalışmaları, Kızılırmak Havzası'nın en büyük ovalarından biri olan Develi Ovası'ndaki yerleşim modelini aydınlatmıştır. Şahmelik Höyük, İkitepe ve Sarıca gibi merkezlerin yanı sıra, Erciyes Dağı'nın volkanik faaliyetleri sonucu oluşan tüf tabakasına oyulmuş çok sayıda kaya mekânı, yeraltı şehri ve şarap üretim atölyesi tespit edilmiştir. Bu buluntular, Develi'nin kültürel açıdan merkez Kapadokya ile olan güçlü bağını gösterirken; Fraktin, Taşçı ve İmamkulu gibi Hitit imparatorluk Dönemi kaya kabartmaları da bölgenin kutsal ve siyasi coğrafyadaki yerini vurgulamaktadır.",
          ],
          images : [
            {
              src: "/images/kayseri-yuzey-arastirmalari/develi-0.jpg",
              alt: "Develi yüzey araştırmaları",
            },
            {
              src: "/images/kayseri-yuzey-arastirmalari/develi-1.jpg",
              alt: "Develi yüzey araştırmaları",
            }
          ]
        },
        {
          number: "04",
          title: "Yahyalı Araştırmaları",
          paragraphs: [
            "2006 yılında tamamlanan Yahyalı araştırmaları ise 168 gibi oldukça yüksek bir sayıda arkeolojik merkezin tespitiyle sonuçlanmıştır. Bölgede Fethullah Höyük gibi erken dönem yerleşimlerinin yanı sıra Madazı, Dereciağzı ve Takaya mevkilerinde bulunan anıtsal kaya mezarları, dromoslu oda mezarlar ve çok sayıda tümülüs kayıt altına alınmıştır. Ayrıca Yahyalı'nın antik çağlardan itibaren önemli bir madencilik merkezi olduğunu kanıtlayan demir, çinko ve kurşun maden ocakları ile bu alanlardaki antik işlik ve cüruf kalıntıları, araştırmanın en önemli ekonomik verileri arasında yer almaktadır.",
          ],
          images : [
            {
              src: "/images/kayseri-yuzey-arastirmalari/yahyali-0.jpg",
              alt: "Yahyalı yüzey araştırmaları",
            },
            {
              src: "/images/kayseri-yuzey-arastirmalari/yahyali-1.jpg",
              alt: "Yahyalı yüzey araştırmaları",
            }
          ]
        },
      ]}
    />
  );
}