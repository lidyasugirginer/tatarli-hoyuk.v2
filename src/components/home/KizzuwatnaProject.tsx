import Image from "next/image";
import Link from "next/link";

import styles from "./kizzuwatna-project.module.css";

export default function KizzuwatnaProject() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.logoArea}>
                    <div className={styles.logoWrapper}>
                        <Image
                            src="/images/kizzuwatna-logo.png"
                            alt="Kizzuwatna Araştırmaları Projesi logosu"
                            width={320}
                            height={320}
                            className={styles.logo}
                        />
                    </div>

                </div>

                <div className={styles.content}>
                    <p className={styles.eyebrow}>
                        Araştırma Çerçevesi
                    </p>

                    <h2>Kizzuwatna Araştırmaları Projesi</h2>

                    <div className={styles.titleLine} />

                    <p className={styles.lead}>
                        Tatarlı Höyük Kazısı, Kizzuwatna bölgesinin tarihsel,
                        arkeolojik ve kültürel gelişimini araştırmayı amaçlayan
                        Kizzuwatna Araştırmaları Projesi kapsamında yürütülen
                        çalışmaların önemli bir parçasını oluşturmaktadır.
                    </p>

                    <p className={styles.description}>
                        Proje; Tatarlı Höyük başta olmak üzere Doğu Kilikya ve
                        çevresinde gerçekleştirilen kazı, kurtarma kazısı ve yüzey
                        araştırmalarını ortak bir araştırma çerçevesinde
                        değerlendirmektedir.
                    </p>

                    <div className={styles.linkRow}>
                        <div className={styles.relatedWorks}>
                            <Link href="/kizzuwatna/bilec-hoyuk-kurtarma-kazisi">
                                Bileç Höyük Kurtarma Kazısı
                            </Link>

                            <Link href="/kizzuwatna/yuzey-arastirmalari/adana">
                                Adana Yüzey Araştırmaları
                            </Link>

                            <Link href="/kizzuwatna/yuzey-arastirmalari/kayseri">
                                Kayseri Yüzey Araştırmaları
                            </Link>
                        </div>

                        <Link
                            href="/kizzuwatna"
                            className={styles.mainLink}
                        >
                            Projeyi Keşfet
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}