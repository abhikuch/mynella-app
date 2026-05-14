import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps {
  href: string;
  variant?: "primary" | "ghost";
  size?: "default" | "small";
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  href,
  variant = "primary",
  size = "default",
  external,
  children,
  className,
}: ButtonProps) {
  const cls = [styles.btn, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
