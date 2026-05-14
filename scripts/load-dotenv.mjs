/**
 * Minimal .env loader (no dotenv dependency). Later files do not override existing process.env.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export function loadDotenvFiles(relativePaths) {
  const root = process.cwd();
  for (const rel of relativePaths) {
    const full = path.join(root, rel);
    if (!existsSync(full)) continue;
    const text = readFileSync(full, "utf8");
    for (const line of text.split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("=");
      if (i === -1) continue;
      const key = t.slice(0, i).trim();
      let val = t.slice(i + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (key && process.env[key] === undefined) process.env[key] = val;
    }
  }
}
