import InnerPageLayout from "@/components/shared/InnerPageLayout";

export default function BilecHoyukKurtarmaKazisiPage() {
  return (
    <InnerPageLayout
      breadcrumb="Kizzuwatna / Bileç Höyük Kurtarma Kazısı"
      eyebrow="Kizzuwatna Araştırmaları Projesi"
      title="Bileç Höyük Kurtarma Kazısı"
      variant="kizzuwatna"
      sections={[
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
      ]}
    />
  );
}

