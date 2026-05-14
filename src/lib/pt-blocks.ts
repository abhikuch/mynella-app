import type { PortableTextBlock } from "@portabletext/types";

/** Lead paragraph(s) + two inline action links (renders via PostBody link mark). */
export function ctaLinksBody(
  keyPrefix: string,
  lead: string,
  primaryLabel: string,
  primaryHref: string,
  secondaryLabel: string,
  secondaryHref: string,
): PortableTextBlock[] {
  const mk = `${keyPrefix}-m`;
  const mk2 = `${keyPrefix}-m2`;
  const leadBlocks = lead.trim() ? paragraphBlocks(lead.trim(), `${keyPrefix}-lead`) : [];
  const actions: PortableTextBlock = {
    _type: "block",
    _key: `${keyPrefix}-actions`,
    style: "normal",
    markDefs: [
      { _key: mk, _type: "link", href: primaryHref },
      { _key: mk2, _type: "link", href: secondaryHref },
    ],
    children: [
      {
        _type: "span",
        _key: `${keyPrefix}-s1`,
        text: `${primaryLabel}  ·  `,
        marks: [mk],
      },
      {
        _type: "span",
        _key: `${keyPrefix}-s2`,
        text: secondaryLabel,
        marks: [mk2],
      },
    ],
  } as unknown as PortableTextBlock;
  return [...leadBlocks, actions];
}

/** Split on blank lines into normal paragraphs (minimal Portable Text). */
export function paragraphBlocks(text: string, keyPrefix: string): PortableTextBlock[] {
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(
      (para, i) =>
        ({
          _type: "block",
          _key: `${keyPrefix}-b-${i}`,
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: `${keyPrefix}-s-${i}`,
              text: para,
              marks: [],
            },
          ],
        }) as unknown as PortableTextBlock,
    );
}
