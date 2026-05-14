import type { PortableTextBlock } from "@portabletext/types";

function blockText(block: PortableTextBlock): string {
  const children = block.children;
  if (!Array.isArray(children)) return "";
  return children
    .map((c) => {
      if (c && typeof c === "object" && "text" in c && typeof c.text === "string") {
        return c.text;
      }
      return "";
    })
    .join("");
}

/** Flatten Portable Text to plain string (FAQ JSON-LD, etc.). */
export function portableTextToPlain(blocks: PortableTextBlock[] | null | undefined): string {
  if (!blocks?.length) return "";
  return blocks.map(blockText).filter(Boolean).join("\n\n").trim();
}
