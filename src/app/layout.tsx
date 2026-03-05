import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_NAME, BASE_URL, SITE_DESCRIPTION, SITE_LOCALE, SITE_LANGUAGE, SITE_COUNTRY } from "@/lib/constants";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import JsonLd from "@/components/seo/JsonLd";
import PiwikProProvider from "@/components/analytics/PiwikProProvider";
import CookieConsent from "@/components/analytics/CookieConsent";
import ScrollTracker from "@/components/analytics/ScrollTracker";
import FunnelTracker from "@/components/analytics/FunnelTracker";
import { WebSite } from "schema-dts";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_NAME} - Comparateur d'outils analytics web`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Comparateur d'outils analytics web`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "fr": "/",
      "x-default": "/",
    },
  },
  other: {
    "geo.region": SITE_COUNTRY,
    "geo.placename": "France",
    "content-language": SITE_LANGUAGE,
  },
  verification: {
    other: {
      "ahrefs-site-verification": "2fee7d9bd4184eea7bdb303eb34b3beed69bb36ce0e72b14181aaece5f637196",
    },
  },
};

const websiteJsonLd: WebSite = {
  "@type": "WebSite",
  name: SITE_NAME,
  url: BASE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: SITE_LANGUAGE,
};

const organizationJsonLd = {
  "@context": "https://schema.org" as const,
  "@type": "Organization",
  name: SITE_NAME,
  url: BASE_URL,
  description: SITE_DESCRIPTION,
  areaServed: {
    "@type": "Country",
    name: "France",
  },
  knowsLanguage: SITE_LANGUAGE,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.className}>
      <head>
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="vYRjRajg31erbUZSCpLk9w"
          strategy="afterInteractive"
          async
        />
        <meta name="google-site-verification" content="OpBP-OpU253pvgSruj3o8hV4VM_c8I6i0EYVFtbt2F4" />
      </head>
      <body className="bg-white text-gray-900 antialiased min-h-screen flex flex-col">
        <PiwikProProvider />
        <FunnelTracker />
        <JsonLd data={{ "@context": "https://schema.org", ...websiteJsonLd }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
        <ScrollTracker />
        <CookieConsent />
      </body>
    </html>
  );
}
