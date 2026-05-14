import styles from "./Marquee.module.css";

type MarqueeProps = {
  items: string[];
};

export function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {doubled.map((text, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.dot} />
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
