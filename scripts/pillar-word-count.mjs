#!/usr/bin/env node
/**
 * Approximate word counts: text between JSX tags (visible copy only).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const bodiesDir = path.join(__dirname, "..", "src", "components", "pillar-articles", "bodies");

function stripTsxToText(src) {
  const parts = [];
  const re = />([^<]*)</g;
  let m;
  while ((m = re.exec(src))) {
    let t = m[1].replace(/\s+/g, " ").trim();
    if (!t) continue;
    if (/^\{/.test(t)) continue;
    t = t.replace(/&apos;/g, "'");
    t = t.replace(/&quot;/g, '"');
    t = t.replace(/&amp;/g, "&");
    parts.push(t);
  }
  return parts.join(" ");
}

function countWords(text) {
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

function splitExports(src) {
  const blocks = src.split(/(?=^export function \w+\(\) \{)/m).filter((b) => /^export function \w+/.test(b));
  return blocks.map((body) => {
    const name = body.match(/^export function (\w+)\(\)/)[1];
    return { name, body };
  });
}

const files = fs.readdirSync(bodiesDir).filter((f) => f.endsWith(".tsx")).sort();

const rows = [];
for (const f of files) {
  const src = fs.readFileSync(path.join(bodiesDir, f), "utf8");
  for (const { name, body } of splitExports(src)) {
    rows.push({ article: `${f} → ${name}`, words: countWords(stripTsxToText(body)) });
  }
}

rows.sort((a, b) => a.article.localeCompare(b.article));

console.log("| Article (approx.) | Words |");
console.log("|------------------|-------|");
for (const r of rows) {
  console.log(`| ${r.article.replace(/\|/g, "\\|")} | ${r.words} |`);
}

const low = rows.filter((r) => r.words < 2000);
if (low.length) {
  console.log("\nUnder ~2000 words (editorial target for long-form pillars):");
  for (const r of low) console.log(`- ${r.article}: ${r.words}`);
}
