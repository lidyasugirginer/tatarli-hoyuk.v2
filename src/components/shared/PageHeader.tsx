import Image from "next/image";
import Link from "next/link";

import styles from "./page-header.module.css";

type PageHeaderProps = {
    breadcrumb: string;
    eyebrow: string;
    title: string;

    variant?: "tatarli" | "kizzuwatna";
};

export default function PageHeader({
    breadcrumb,
    eyebrow,
    title,
    variant = "tatarli",
}: PageHeaderProps) {
    const friezeImage =
        variant === "kizzuwatna"
            ? "/images/kizzuwatna/kizzuwatna-frieze.png"
            : "/images/hakkinda/cizim0.png";
    return (
        <header className={styles.pageHeader}>
            <div className={styles.headerText}>
                <nav
                    className={styles.breadcrumb}
                    aria-label="Sayfa yolu"
                >
                    <Link href="/">Ana Sayfa</Link>

                    <span aria-hidden="true">/</span>

                    {variant === "kizzuwatna" && (
                        <>
                            <Link href="/kizzuwatna">
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