import { Suspense } from "react";
import { Metadata } from "next";
import { SITE_NAME, BASE_URL } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ScannerClient from "@/components/scanner/ScannerClient";

export const metadata: Metadata = {
  title: `Scanner RGPD Analytics — Analysez la conformite de votre site | ${SITE_NAME}`,
  description:
    "Outil gratuit pour analyser la conformite RGPD de vos outils analytics. Detectez Google Analytics, pixels de tracking, bandeau de consentement et recevez des recommandations personnalisees.",
  alternates: {
    canonical: `${BASE_URL}/scanner`,
  },
  openGraph: {
    title: `Scanner RGPD Analytics | ${SITE_NAME}`,
    description:
      "Analysez gratuitement la conformite RGPD de n'importe quel site web. Detection des outils analytics, pixels de tracking et recommandations.",
    url: `${BASE_URL}/scanner`,
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    question: "Comment fonctionne le scanner RGPD ?",
    answer:
      "Le scanner analyse le code source HTML de la page d'accueil du site indique. Il recherche les signatures connues des outils analytics (Google Analytics, Matomo, Plausible...), des pixels de tracking (Meta, LinkedIn, TikTok...) et des bandeaux de consentement (Tarteaucitron, Axeptio, Cookiebot...). Le score de risque est calcule en fonction des outils detectes et de la presence d'un bandeau de consentement.",
  },
  {
    question: "Quels outils analytics sont detectes ?",
    answer:
      "Le scanner detecte Google Analytics 4, Matomo, Plausible, Piwik PRO, Fathom, Simple Analytics, Adobe Analytics, Umami, ainsi que les pixels Meta (Facebook), LinkedIn, TikTok, Twitter/X et Hotjar. Il identifie egalement Google Tag Manager et les principaux bandeaux de consentement.",
  },
  {
    question: "Le scanner stocke-t-il des donnees ?",
    answer:
      "Non, le scanner ne stocke aucune donnee. L'analyse est effectuee en temps reel et les resultats ne sont pas conserves. Seul le code HTML public de la page est analyse, aucune donnee personnelle n'est collectee.",
  },
  {
    question: "Qu'est-ce qu'un outil exempte CNIL ?",
    answer:
      "La CNIL accorde une exemption de consentement a certains outils analytics qui respectent des criteres stricts : donnees anonymisees, pas de transfert hors UE, finalite strictement limitee a la mesure d'audience. Matomo, Plausible, Piwik PRO, Fathom, Simple Analytics et Umami beneficient de cette exemption sous certaines configurations.",
  },
  {
    question: "Le score de risque est-il fiable a 100% ?",
    answer:
      "Le scanner analyse uniquement le code source HTML visible de la page d'accueil. Certains scripts peuvent etre charges dynamiquement, via un tag manager, ou sur d'autres pages du site. Le score donne une indication fiable mais ne remplace pas un audit RGPD complet.",
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Questions frequentes
        </h2>
        <dl className="space-y-6">
          {FAQ_ITEMS.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold text-gray-900 mb-2">
                {item.question}
              </dt>
              <dd className="text-gray-600 text-sm leading-relaxed">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
