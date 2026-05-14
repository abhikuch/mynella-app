import type { HomeComplianceBoard } from "@/lib/home-page-content";
import { RevealOnView } from "@/components/ui/RevealOnView";
import styles from "./ComplianceBoard.module.css";

function formatBoardDate(iso: string | null): string | null {
  if (!iso?.trim()) return null;
  const d = new Date(`${iso.trim()}T12:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ComplianceBoard({ data }: { data: HomeComplianceBoard }) {
  const updated = formatBoardDate(data.lastUpdated);

  return (
    <section className={styles.section} aria-labelledby="compliance-board-heading">
      <RevealOnView className={styles.inner}>
        <p className={styles.overline}>— {data.eyebrow.toUpperCase()}</p>
        <h2 id="compliance-board-heading" className={styles.title}>
          {data.title}
        </h2>
        <p className={styles.desc}>
          {data.description}
          {updated ? <> Last updated {updated}.</> : null}
        </p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Source</th>
                <th scope="col">Pending (last month)</th>
                <th scope="col">Received</th>
                <th scope="col">Resolved</th>
                <th scope="col">Total pending</th>
                <th scope="col">Pending &gt; 3M</th>
                <th scope="col">Avg. resolution</th>
              </tr>
            </thead>
            <tbody>
              {data.tableRows.map((row, i) => (
                <tr
                  key={`${row.source}-${i}`}
                  className={row.isTotalRow ? styles.rowTotal : undefined}
                >
                  <th scope="row">{row.source}</th>
                  <td>{row.pendingLastMonth}</td>
                  <td>{row.received}</td>
                  <td>{row.resolved}</td>
                  <td>{row.totalPending}</td>
                  <td>{row.pendingOver3m}</td>
                  <td>{row.avgResolution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </RevealOnView>
    </section>
  );
}
