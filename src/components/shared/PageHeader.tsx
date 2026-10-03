import Image from "next/image";
import Link from "next/link";

import styles from "./page-header.module.css";

type Language = "tr" | "en";

type PageHeaderProps = {
    breadcrumb: string;
    eyebrow: string;
    title: string;

    variant?: "tatarli" | "kizzuwatna";
    language?: Language;
};

export default function PageHeader({
    breadcrumb,
    eyebrow,
    title,
    variant = "tatarli",
    language = "tr",
}: PageHeaderProps) {
    const isEnglish = language === "en";
    const friezeImage =
        variant === "kizzuwatna"
            ? "/images/kizzuwatna/kizzuwatna-frieze.png"
            : "/images/hakkinda/cizim0.png";
    return (
        <header className={styles.pageHeader}>
            <div className={styles.headerText}>
                <nav
                    className={styles.breadcrumb}
                    aria-label={isEnglish ? "Breadcrumb" : "Sayfa yolu"}
                >
                    <Link href={isEnglish ? "/en" : "/"}>
                        {isEnglish ? "Home" : "Ana Sayfa"}
                    </Link>

                    <span aria-hidden="true">/</span>

                    {variant === "kizzuwatna" && (
                        <>
                            <Link href={isEnglish ? "/en/kizzuwatna" : "/kizzuwatna"}>
                                Kizzuwatna
                            </Link>

                            <span aria-hidden="true">/</span>
                        </>
                    )}

                    <span aria-current="page">
                        {breadcrumb}
                    </span>
                </nav>

                <p className={styles.eyebrow}>
                    {eyebrow}
                </p>

                <h1>{title}</h1>

                <div
                    className={styles.titleLine}
                    aria-hidden="true"
                />
            </div>

            <div
                className={`${styles.frieze} ${variant === "kizzuwatna"
                        ? styles.kizzuwatnaFrieze
                        : ""
                    }`}
                aria-hidden="true"
            >
                {[1, 2, 3].map((item) => (
                    <Image
                        key={item}
                        src={friezeImage}
                        alt=""
                        width={520}
                        height={230}
                    />
                ))}
            </div>
        </header>
    );
}