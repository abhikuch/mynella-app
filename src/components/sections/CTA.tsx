import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnView } from "@/components/ui/RevealOnView";
import styles from "./CTA.module.css";

export function CTA({
  eyebrow,
  title,
  lead,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}) {
  return (
    <section className={styles.cta}>
      <div className={styles.glow} />
      <div className={styles.container}>
        <RevealOnView className={styles.inner}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2>{title}</h2>
          <p className={styles.lead}>{lead}</p>
          <div className={styles.buttons}>
            <Button href={primaryHref} external>
              {primaryLabel}
            </Button>
            <Button href={secondaryHref} variant="ghost" external>
              {secondaryLabel}
            </Button>
          </div>
        </RevealOnView>
      </div>
    </section>
  );
}
