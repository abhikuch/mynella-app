import styles from "./SectionWrapper.module.css";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  variant?: "default" | "alt";
  className?: string;
}

export function SectionWrapper({
  children,
  id,
  variant = "default",
  className,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={[styles.section, styles[variant], className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.container}>
        <div className={styles.columnGrid}>{children}</div>
      </div>
    </section>
  );
}
