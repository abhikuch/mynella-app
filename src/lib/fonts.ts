import { DM_Sans, Fraunces, Inter, Playfair_Display } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  /** Omit unused weights (e.g. 300) to shrink the font payload. */
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
  /** Reduces layout shift while custom fonts load; helps LCP/CLS field scores. */
  adjustFontFallback: true,
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
  adjustFontFallback: true,
});

/** Nella brand guidelines — display + UI (landing / marketing moments). */
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
  adjustFontFallback: true,
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
  adjustFontFallback: true,
});
