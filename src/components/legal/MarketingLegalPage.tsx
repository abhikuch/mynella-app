import Link from "next/link";
import { MarketingPageShell } from "@/components/landing/MarketingPageShell";
import shell from "@/components/landing/marketing-shell.module.css";
import { SITE_URL } from "@/lib/seo-config";
import legalStyles from "./marketing-legal.module.css";

type Props = {
  title: string;
  description: string;
  pdfPath: string;
  activeNav?: null;
};

export function MarketingLegalPage({ title, description, pdfPath }: Props) {
  const pdfUrl = pdfPath.startsWith("http") ? pdfPath : `${SITE_URL}${pdfPath}`;

  return (
    <MarketingPageShell>
      <section className={shell.pageHero} aria-labelledby="legal-heading">
        <div className={shell.pageHeroInner}>
          <p className={shell.eyebrow}>Legal</p>
          <h1 id="legal-heading" className={shell.pageTitle}>
            {title}
          </h1>
          <p className={shell.pageLead}>{description}</p>
          <div className={shell.ctaRow}>
            <a className={shell.ctaPrimary} href={pdfPath} target="_blank" rel="noopener noreferrer">
              Download PDF
            </a>
            <Link href="/contact" className={shell.ctaGhost}>
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <section className={shell.section} aria-label="Document">
        <div className={shell.sectionInner}>
          <div className={legalStyles.frame}>
            <iframe title={title} src={`${pdfPath}#view=FitH`} />
          </div>
          <p className={legalStyles.note}>
            If the document does not load, use <strong>Download PDF</strong> or open{" "}
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              this link
            </a>
            .
          </p>
        </div>
      </section>
    </MarketingPageShell>
  );
}
