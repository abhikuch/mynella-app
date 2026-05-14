/** Build a minimal Portable Text block tree from plain text (for seeds & migrations). */
export function plainTextToAnswerBlocks(text: string, keyPrefix: string) {
  return [
    {
      _type: "block" as const,
      _key: `${keyPrefix}-b`,
      style: "normal" as const,
      markDefs: [],
      children: [
        {
          _type: "span" as const,
          _key: `${keyPrefix}-s`,
          text,
          marks: [],
        },
      ],
    },
  ];
}
