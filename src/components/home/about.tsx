import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.css";

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Tatarlı Höyük Hakkında</p>

          <h2>
            Anadolu ile Doğu Akdeniz'in Kesişim Noktası 
          </h2>

          <p className={styles.description}>
            Tatarlı Höyük, Doğu Ovalık Kilikya'da yer alan ve Neolitik Çağ'dan Erken Roma Dönemi'ne kadar kesintisiz iskân gören önemli bir yerleşimdir. 
            Anadolu, Kuzey Suriye, Kıbrıs ve Doğu Akdeniz arasında uzanan ticaret ve kültürel etkileşim ağlarının kavşağında bulunan höyük, çoklu höyük yerleşim sistemi, sekiz kültür tabakası ve zengin arkeolojik buluntularıyla bölgenin tarihine ışık tutmaktadır.
          </p>
          <Link href="/hakkinda" className={styles.moreLink}>
            Daha fazla bilgi
           <span aria-hidden="true">→</span>
          </Link>

        </div>

        <div className={styles.imageWrapper}>
          <Image
            src="/images/anasayfa-hakkinda.jpg"
            alt="Tatarlı Höyük hava görünümü"
            fill
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}