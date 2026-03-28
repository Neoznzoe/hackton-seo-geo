import type { Metadata } from "next";
import localFont from "next/font/local";
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
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { WebSite } from "schema-dts";

const plusJakarta = localFont({
  src: [
    {
      path: "../fonts/PlusJakartaSans-Variable.woff2",
      style: "normal",
    },
    {
      path: "../fonts/PlusJakartaSans-VariableItalic.woff2",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: "/devradar-favicon.svg",
    apple: "/devradar-favicon.svg",
  },
  title: {
    default: `${SITE_NAME} — Comparateur d'outils analytics RGPD ${new Date().getFullYear()}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Comparateur d'outils analytics RGPD`,
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
    <html lang="fr" className={plusJakarta.className}>
      <head>
        <Script
          id="ahrefs-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `try{var s=document.createElement("script");s.src="https://analytics.ahrefs.com/analytics.js";s.dataset.key="vYRjRajg31erbUZSCpLk9w";s.async=true;s.onerror=function(){};document.head.appendChild(s)}catch(e){}`
          }}
        />
        <meta name="google-site-verification" content="OpBP-OpU253pvgSruj3o8hV4VM_c8I6i0EYVFtbt2F4" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM content summary" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM full content" />
      </head>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased min-h-screen flex flex-col transition-colors">
        <ThemeProvider>
          <LanguageProvider>
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
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
