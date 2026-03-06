"use client";

import Link from "next/link";
import { AnalyticsTool, FaqItem } from "@/lib/types";
import { useLocalized } from "@/lib/i18n/useLocalized";
import { LocalizedString } from "@/lib/i18n/localize";
import Breadcrumb from "@/components/layout/Breadcrumb";
import VsSummaryBox from "@/components/compare/VsSummaryBox";
import ComparisonTable from "@/components/compare/ComparisonTable";
import VerdictSection from "@/components/compare/VerdictSection";
import ProsCons from "@/components/tools/ProsCons";
import PricingTable from "@/components/tools/PricingTable";
import ComplianceDetails from "@/components/tools/ComplianceDetails";
import FaqSection from "@/components/content/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import ComparisonPageTracker from "@/components/analytics/ComparisonPageTracker";
import { WebPage, FAQPage } from "schema-dts";
import { parseVsSlug } from "@/data/tools";
import { CURRENT_YEAR, BASE_URL } from "@/lib/constants";

interface ComparisonDetailClientProps {
  tool1: AnalyticsTool;
  tool2: AnalyticsTool;
  slug: string;
  faq: FaqItem[];
  verdict: {
    startup: LocalizedString;
    enterprise: LocalizedString;
    privacy: LocalizedString;
    budget: LocalizedString;
  };
  relatedSlugs: string[];
}

export default function ComparisonDetailClient({
  tool1,
  tool2,
  slug,
  faq,
  verdict,
  relatedSlugs,
}: ComparisonDetailClientProps) {
  const { l } = useLocalized();

  const webPageJsonLd: WebPage = {
    "@type": "WebPage",
    name: `${tool1.name} vs ${tool2.name}`,
    description: `Comparaison ${tool1.name} vs ${tool2.name}`,
    url: `${BASE_URL}/comparer/${slug}`,
    inLanguage: "fr",
  };

  const faqJsonLd: FAQPage = {
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: l(item.question),
      acceptedAnswer: { "@type": "Answer", text: l(item.answer) },
    })),
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <ComparisonPageTracker tool1Slug={tool1.slug} tool2Slug={tool2.slug} />
      <JsonLd data={{ "@context": "https://schema.org", ...webPageJsonLd }} />
      <JsonLd data={{ "@context": "https://schema.org", ...faqJsonLd }} />

      <Breadcrumb
        items={[
          { label: "Comparer", href: "/comparer" },
          { label: `${tool1.name} vs ${tool2.name}` },
        ]}
      />

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          {tool1.name} vs {tool2.name} : comparatif {CURRENT_YEAR}
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Comparaison detaillee entre {tool1.name} et {tool2.name} : fonctionnalites,
          tarifs, conformite RGPD et vie privee.
        </p>
      </header>

      <VsSummaryBox tool1={tool1} tool2={tool2} />

      {/* Comparison Table */}
      <section className="mb-12" aria-labelledby="comparatif">
        <h2 id="comparatif" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Tableau comparatif
        </h2>
        <ComparisonTable tools={[tool1, tool2]} />
      </section>

      {/* Tarifs */}
      <section className="mb-12" aria-labelledby="tarifs">
        <h2 id="tarifs" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Tarifs : {tool1.name} vs {tool2.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">{tool1.name}</h3>
            <PricingTable tiers={tool1.pricing} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">{tool2.name}</h3>
            <PricingTable tiers={tool2.pricing} />
          </div>
        </div>
      </section>

      {/* Conformite RGPD */}
      <section className="mb-12" aria-labelledby="conformite">
        <h2 id="conformite" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Conformite RGPD
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">{tool1.name}</h3>
            <ComplianceDetails compliance={tool1.compliance} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">{tool2.name}</h3>
            <ComplianceDetails compliance={tool2.compliance} />
          </div>
        </div>
      </section>

      {/* Avantages / Inconvenients */}
      <section className="mb-12" aria-labelledby="avantages">
        <h2 id="avantages" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Avantages et inconvenients
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">{tool1.name}</h3>
            <ProsCons pros={tool1.pros} cons={tool1.cons} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">{tool2.name}</h3>
            <ProsCons pros={tool2.pros} cons={tool2.cons} />
          </div>
        </div>
      </section>

      {/* Verdict */}
      <VerdictSection verdict={verdict} />

      {/* FAQ */}
      <section className="mb-12">
        <FaqSection
          items={faq}
          heading={`FAQ : ${tool1.name} vs ${tool2.name}`}
        />
      </section>

      {/* Related comparisons */}
      {relatedSlugs.length > 0 && (
        <section className="mb-12" aria-labelledby="comparaisons-liees">
          <h2 id="comparaisons-liees" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Comparaisons liees
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedSlugs.map((relSlug) => {
              const parsed = parseVsSlug(relSlug);
              if (!parsed) return null;
              return (
                <Link
                  key={relSlug}
                  href={`/comparer/${relSlug}`}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  {parsed.tool1.name} vs {parsed.tool2.name}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
