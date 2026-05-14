/**
 * Static brand marks from /public/brand — light vs dark PNGs for theme-aware display.
 * Light pack: `public/brand/light/` · Dark pack: `public/brand/dark/`
 */
export const BRAND_ASSETS = {
  mynellaMark: {
    light: "/brand/light/mynella-logo.png",
    dark: "/brand/dark/mynella-logo.png",
  },
  /** Dark-theme-only alternate wordmark from the dark asset pack */
  mynellaWordmarkDark: "/brand/dark/mynella-logo-wordmark.png",
  products: {
    polaris: {
      light: "/brand/light/polaris.png",
      dark: "/brand/dark/polaris.png",
    },
    polarisLite: {
      light: "/brand/light/polaris-lite.png",
      dark: "/brand/dark/polaris-lite.png",
    },
    optimus: {
      light: "/brand/light/optimus.png",
      dark: "/brand/dark/optimus.png",
    },
    pledgePlus: {
      light: "/brand/light/pledge-plus.png",
      dark: "/brand/dark/pledge-plus.png",
    },
    quanto: {
      light: "/brand/light/quanto.png",
      dark: "/brand/dark/quanto.png",
    },
    alpha: {
      light: "/brand/light/alpha.png",
      dark: "/brand/dark/alpha.png",
    },
  },
} as const;

export type ProductBrandKey = keyof typeof BRAND_ASSETS.products;
