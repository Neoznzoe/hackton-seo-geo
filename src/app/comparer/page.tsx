import { Metadata } from "next";
import Link from "next/link";
import { tools, generateToolPairs, parseVsSlug } from "@/data/tools";
import { CURRENT_YEAR } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ComparisonTable from "@/components/compare/ComparisonTable";
import FaqSection from "@/components/content/FaqSection";

export const metadata: Metadata = {
  title: `Comparatif des outils analytics web ${CURRENT_YEAR}`,
  description: `Tableau comparatif complet de 8 outils analytics : GA4, Matomo, Plausible, Piwik PRO, Simple Analytics, Fathom, Adobe Analytics, Umami. Prix, fonctionnalites, RGPD.`,
  alternates: {
    canonical: "/comparer",
  },
};

const compareFaq = [
  {
    question:
      "Quel est l'outil analytics le moins cher ?",
    answer:
      "Google Analytics 4, Matomo On-Premise et Umami (self-hosted) sont tous gratuits. Piwik PRO Core offre egalement un plan gratuit jusqu'a 500 000 actions par mois. Les solutions payantes les plus abordables sont Plausible et Umami Cloud a partir de 9 €/mois.",
  },
  {
    question: "Quel outil offre le meilleur compromis fonctionnalites/vie privee ?",
    answer:
      "Matomo offre le meilleur compromis : il est presque aussi complet que GA4 (e-commerce, heatmaps, A/B testing) tout en etant conforme RGPD et exempte de consentement CNIL. Piwik PRO Core est egalement un excellent compromis avec son consent manager integre.",
  },
  {
    question: "Puis-je migrer facilement depuis Google Analytics ?",
    answer:
      "Matomo propose un import natif des donnees GA. Plausible et Fathom offrent des guides de migration. La plupart des outils permettent une cohabitation temporaire pour comparer les donnees avant la migration complete.",
  },
];

export default function ComparerPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "Comparer" }]} />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Comparatif des outils analytics web
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-3xl">
          Comparez les 8 principaux outils analytics cote a cote : tarifs,
          fonctionnalites, conformite RGPD et respect de la vie privee.
        </p>
      </header>

      <section aria-labelledby="tableau-comparatif" className="mb-12">
        <h2 id="tableau-comparatif" className="sr-only">
          Tableau comparatif
        </h2>
        <ComparisonTable tools={tools} />
      </section>

      <section className="mb-12">
        <FaqSection items={compareFaq} />
      </section>

      {/* Comparaisons VS */}
      <section aria-labelledby="comparaisons-vs" className="mb-12">
        <h2 id="comparaisons-vs" className="text-2xl font-bold text-gray-900 mb-6">
          Comparaisons detaillees
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Comparez deux outils face a face pour un comparatif approfondi.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {generateToolPairs().map((pair) => (
            <Link
              key={pair.slug}
              href={`/comparer/${pair.slug}`}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              {pair.tool1.name} vs {pair.tool2.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
