import { Suspense } from "react";
import { Metadata } from "next";
import { SITE_NAME, BASE_URL } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ScannerClient from "@/components/scanner/ScannerClient";
import FaqSection from "@/components/content/FaqSection";

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

const FAQ_ITEMS = [
  {
    question: "Comment fonctionne le scanner RGPD ?",
    answer:
      "Le scanner analyse le code source HTML de la page d'accueil du site indiqué. Il recherche les signatures connues des outils analytics (Google Analytics, Matomo, Plausible...), des pixels de tracking (Meta, LinkedIn, TikTok...) et des bandeaux de consentement (Tarteaucitron, Axeptio, Cookiebot...). Le score de risque est calculé en fonction des outils détectés et de la présence d'un bandeau de consentement.",
  },
  {
    question: "Quels outils analytics sont détectés ?",
    answer:
      "Le scanner détecte Google Analytics 4, Matomo, Plausible, Piwik PRO, Fathom, Simple Analytics, Adobe Analytics, Umami, ainsi que les pixels Meta (Facebook), LinkedIn, TikTok, Twitter/X et Hotjar. Il identifie également Google Tag Manager et les principaux bandeaux de consentement.",
  },
  {
    question: "Le scanner stocke-t-il des données ?",
    answer:
      "Non, le scanner ne stocke aucune donnée. L'analyse est effectuée en temps réel et les résultats ne sont pas conservés. Seul le code HTML public de la page est analysé, aucune donnée personnelle n'est collectée.",
  },
  {
    question: "Qu'est-ce qu'un outil exempté CNIL ?",
    answer:
      "La CNIL accorde une exemption de consentement à certains outils analytics qui respectent des critères stricts : données anonymisées, pas de transfert hors UE, finalité strictement limitée à la mesure d'audience. Matomo, Plausible, Piwik PRO, Fathom, Simple Analytics et Umami bénéficient de cette exemption sous certaines configurations.",
  },
  {
    question: "Le score de risque est-il fiable à 100% ?",
    answer:
      "Le scanner analyse uniquement le code source HTML visible de la page d'accueil. Certains scripts peuvent être chargés dynamiquement, via un tag manager, ou sur d'autres pages du site. Le score donne une indication fiable mais ne remplace pas un audit RGPD complet.",
  },
];

export default function ScannerPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Scanner RGPD", href: "/scanner" },
          ]}
        />
      </div>

      <Suspense>
        <ScannerClient />
      </Suspense>

      {/* FAQ Section for SEO */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <FaqSection items={FAQ_ITEMS} />
      </section>
    </>
  );
}
