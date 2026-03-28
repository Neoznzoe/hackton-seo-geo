import { Suspense } from "react";
import { Metadata } from "next";
import { SITE_NAME, BASE_URL } from "@/lib/constants";
import ScannerClient from "@/components/scanner/ScannerClient";
import { ScannerBreadcrumb, ScannerFaq } from "@/components/scanner/ScannerPageContent";

export const metadata: Metadata = {
  title: `Scanner site en ligne gratuit — Audit RGPD & conformite | ${SITE_NAME}`,
  description:
    "Scanner un site en ligne gratuitement : detectez trackers, pixels, cookies et pages legales. Score de conformite RGPD instantane avec recommandations. Scan site web en ligne sans inscription.",
  alternates: {
    canonical: `${BASE_URL}/scanner`,
  },
  openGraph: {
    title: `Scanner site en ligne — Audit RGPD gratuit | ${SITE_NAME}`,
    description:
      "Scannez n'importe quel site web en ligne gratuitement. Detection des outils analytics, pixels de tracking, bandeaux cookies et recommandations RGPD personnalisees.",
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
