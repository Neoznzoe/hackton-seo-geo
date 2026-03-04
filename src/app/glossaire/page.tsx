import { Metadata } from "next";
import Link from "next/link";
import { glossaryTerms } from "@/data/glossary";
import { getToolBySlug } from "@/data/tools";
import { SITE_NAME, BASE_URL, CURRENT_YEAR } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { DefinedTermSet } from "schema-dts";

export const metadata: Metadata = {
  title: `Glossaire analytics et RGPD ${CURRENT_YEAR}`,
  description: `Definitions des termes essentiels de l'analytics web et du RGPD : cookies, consentement, CNIL, tracking, attribution, heatmap et plus encore.`,
  alternates: { canonical: "/glossaire" },
  openGraph: {
    title: `Glossaire analytics et RGPD ${CURRENT_YEAR} | ${SITE_NAME}`,
    description: `Definitions des termes essentiels de l'analytics web et du RGPD.`,
    type: "website",
  },
};

const glossaryJsonLd: DefinedTermSet = {
  "@type": "DefinedTermSet",
  name: "Glossaire analytics et RGPD",
  url: `${BASE_URL}/glossaire`,
  inLanguage: "fr",
  hasDefinedTerm: glossaryTerms.map((term) => ({
    "@type": "DefinedTerm" as const,
    name: term.term,
    description: term.definition,
  })),
};

export default function GlossairePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={{ "@context": "https://schema.org", ...glossaryJsonLd }} />

      <Breadcrumb items={[{ label: "Glossaire" }]} />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Glossaire analytics et RGPD
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          {glossaryTerms.length} definitions pour comprendre l&apos;analytics web,
          la protection des donnees et la conformite RGPD.
        </p>
      </header>

      <dl className="space-y-6">
        {glossaryTerms.map((term) => (
          <div
            key={term.slug}
            id={term.slug}
            className="border border-gray-200 rounded-lg p-5"
          >
            <dt className="text-lg font-semibold text-gray-900">{term.term}</dt>
            <dd className="mt-2 text-sm text-gray-600 leading-relaxed">
              {term.definition}
            </dd>
            {term.relatedTools && term.relatedTools.length > 0 && (
              <dd className="mt-3 flex flex-wrap gap-2">
                {term.relatedTools.map((toolSlug) => {
                  const tool = getToolBySlug(toolSlug);
                  if (!tool) return null;
                  return (
                    <Link
                      key={toolSlug}
                      href={`/outils/${toolSlug}`}
                      className="inline-block text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      {tool.name}
                    </Link>
                  );
                })}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </div>
  );
}
