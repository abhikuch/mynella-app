import Link from "next/link";
import { SITE_URL } from "@/lib/seo-config";
import styles from "./LegalDocumentPage.module.css";

type Props = {
  title: string;
  description: string;
  pdfPath: string;
};

export function LegalDocumentPage({ title, description, pdfPath }: Props) {
  const pdfUrl = pdfPath.startsWith("http") ? pdfPath : `${SITE_URL}${pdfPath}`;

  return (
    <main className={styles.wrap}>
      <div className={styles.inner}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lead}>{description}</p>
        <div className={styles.actions}>
          <a className={styles.download} href={pdfPath} target="_blank" rel="noopener noreferrer">
            Download PDF
          </a>
          <Link href="/contact" className={styles.download} style={{ background: "transparent", border: "1px solid var(--cm-line-2)", color: "var(--cm-text-primary)" }}>
            Contact us
          </Link>
        </div>
        <div className={styles.frame}>
          <iframe title={title} src={`${pdfPath}#view=FitH`} />
        </div>
        <p className={styles.note}>
          If the document does not load, use <strong>Download PDF</strong> or open{" "}
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            this link
          </a>
          . Add the file to <code>public/legal/</code> if it is missing.
        </p>
      </div>
    </main>
  );
}
