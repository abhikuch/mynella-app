import styles from "./Eyebrow.module.css";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <div className={[styles.eyebrow, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
