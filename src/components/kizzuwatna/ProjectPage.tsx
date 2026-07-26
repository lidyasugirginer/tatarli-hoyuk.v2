import Link from "next/link";

import styles from "./project-page.module.css";

type ProjectPageProps = {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
};

export default function ProjectPage({
  breadcrumb,
  eyebrow,
  title,
  intro,
  children,
}: ProjectPageProps) {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <nav className={styles.breadcrumb} aria-label="Sayfa yolu">
            <Link href="/">Ana Sayfa</Link>
            <span aria-hidden="true">/</span>
            <Link href="/kizzuwatna">Kizzuwatna</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{breadcrumb}</span>
          </nav>

          <p className={styles.eyebrow}>{eyebrow}</p>

          <h1>{title}</h1>

          <div className={styles.titleLine} aria-hidden="true" />

          <p className={styles.intro}>{intro}</p>
        </header>

        {children && <section className={styles.content}>{children}</section>}
      </div>
    </main>
  );
}