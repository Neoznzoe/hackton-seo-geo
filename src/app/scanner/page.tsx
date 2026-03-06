import { Suspense } from "react";
import { Metadata } from "next";
import { SITE_NAME, BASE_URL } from "@/lib/constants";
import ScannerClient from "@/components/scanner/ScannerClient";
import { ScannerBreadcrumb, ScannerFaq } from "@/components/scanner/ScannerPageContent";

export const metadata: Metadata = {
  title: `Scanner RGPD Analytics — Analysez la conformité de votre site | ${SITE_NAME}`,
  description:
    "Outil gratuit pour analyser la conformité RGPD de vos outils analytics. Détectez Google Analytics, pixels de tracking, bandeau de consentement et recevez des recommandations personnalisées.",
  alternates: {
    canonical: `${BASE_URL}/scanner`,
  },
  openGraph: {
    title: `Scanner RGPD Analytics | ${SITE_NAME}`,
    description:
      "Analysez gratuitement la conformité RGPD de n'importe quel site web. Détection des outils analytics, pixels de tracking et recommandations.",
    url: `${BASE_URL}/scanner`,
    type: "website",
  },
};

export default function ScannerPage() {
  return (
    <>
      <ScannerBreadcrumb />

      <Suspense>
        <ScannerClient />
      </Suspense>

      <ScannerFaq />
    </>
  );
}
