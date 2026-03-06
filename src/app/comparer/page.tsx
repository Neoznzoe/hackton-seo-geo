"use client";

import Link from "next/link";
import { tools, generateToolPairs } from "@/data/tools";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ComparisonTable from "@/components/compare/ComparisonTable";
import FaqSection from "@/components/content/FaqSection";
import { useLocalized } from "@/lib/i18n/useLocalized";

export default function ComparerPage() {
  const { locale, l } = useLocalized();

  const compareFaq = [
    {
      question: locale === "fr"
        ? "Quel est l'outil analytics le moins cher ?"
        : "What is the cheapest analytics tool?",
      answer: locale === "fr"
        ? "Google Analytics 4, Matomo On-Premise et Umami (self-hosted) sont tous gratuits. Piwik PRO Core offre egalement un plan gratuit jusqu'a 500 000 actions par mois. Les solutions payantes les plus abordables sont Plausible et Umami Cloud a partir de 9 \u20ac/mois."
        : "Google Analytics 4, Matomo On-Premise, and Umami (self-hosted) are all free. Piwik PRO Core also offers a free plan up to 500,000 actions per month. The most affordable paid solutions are Plausible and Umami Cloud starting at \u20ac9/month.",
    },
    {
      question: locale === "fr"
        ? "Quel outil offre le meilleur compromis fonctionnalites/vie privee ?"
        : "Which tool offers the best features/privacy trade-off?",
      answer: locale === "fr"
        ? "Matomo offre le meilleur compromis : il est presque aussi complet que GA4 (e-commerce, heatmaps, A/B testing) tout en etant conforme RGPD et exempte de consentement CNIL. Piwik PRO Core est egalement un excellent compromis avec son consent manager integre."
        : "Matomo offers the best trade-off: it is almost as comprehensive as GA4 (e-commerce, heatmaps, A/B testing) while being GDPR-compliant and CNIL consent-exempt. Piwik PRO Core is also an excellent compromise with its built-in consent manager.",
    },
    {
      question: locale === "fr"
        ? "Puis-je migrer facilement depuis Google Analytics ?"
        : "Can I easily migrate from Google Analytics?",
      answer: locale === "fr"
        ? "Matomo propose un import natif des donnees GA. Plausible et Fathom offrent des guides de migration. La plupart des outils permettent une cohabitation temporaire pour comparer les donnees avant la migration complete."
        : "Matomo offers native GA data import. Plausible and Fathom provide migration guides. Most tools allow temporary coexistence to compare data before complete migration.",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: locale === "fr" ? "Comparer" : "Compare" }]} />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          {locale === "fr"
            ? "Comparatif des outils analytics web"
            : "Web analytics tools comparison"}
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          {locale === "fr"
            ? "Comparez les 8 principaux outils analytics cote a cote : tarifs, fonctionnalites, conformite RGPD et respect de la vie privee."
            : "Compare the 8 main analytics tools side by side: pricing, features, GDPR compliance, and privacy."}
        </p>
      </header>

      <section aria-labelledby="tableau-comparatif" className="mb-12">
        <h2 id="tableau-comparatif" className="sr-only">
          {locale === "fr" ? "Tableau comparatif" : "Comparison table"}
        </h2>
        <ComparisonTable tools={tools} />
      </section>

      <section className="mb-12">
        <FaqSection items={compareFaq} />
      </section>

      {/* Comparaisons VS */}
      <section aria-labelledby="comparaisons-vs" className="mb-12">
        <h2 id="comparaisons-vs" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {locale === "fr" ? "Comparaisons detaillees" : "Detailed comparisons"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
          {locale === "fr"
            ? "Comparez deux outils face a face pour un comparatif approfondi."
            : "Compare two tools head to head for an in-depth comparison."}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {generateToolPairs().map((pair) => (
            <Link
              key={pair.slug}
              href={`/comparer/${pair.slug}`}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow text-sm font-medium text-emerald-700 hover:text-emerald-900"
            >
              {pair.tool1.name} vs {pair.tool2.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
