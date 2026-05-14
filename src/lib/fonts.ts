import { Inter, Playfair_Display } from "next/font/google";

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
