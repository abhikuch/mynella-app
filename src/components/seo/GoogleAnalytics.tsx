import Script from "next/script";
import { GOOGLE_ANALYTICS_MEASUREMENT_ID } from "@/lib/seo-config";

export function GoogleAnalytics() {
  const id = GOOGLE_ANALYTICS_MEASUREMENT_ID;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics-init" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config','${id}');`}
      </Script>
    </>
  );
}
