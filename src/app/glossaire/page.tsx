"use client";

import Link from "next/link";
import { glossaryTerms } from "@/data/glossary";
import { getToolBySlug } from "@/data/tools";
import { BASE_URL } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { DefinedTermSet } from "schema-dts";
import { useLocalized } from "@/lib/i18n/useLocalized";

export default function GlossairePage() {
  const { locale, l } = useLocalized();

  const glossaryJsonLd: DefinedTermSet = {
    "@type": "DefinedTermSet",
    name: locale === "fr" ? "Glossaire analytics et RGPD" : "Analytics and GDPR glossary",
    url: `${BASE_URL}/glossaire`,
    inLanguage: locale,
    hasDefinedTerm: glossaryTerms.map((term) => ({
      "@type": "DefinedTerm" as const,
      name: l(term.term),
      description: l(term.definition),
    })),
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={{ "@context": "https://schema.org", ...glossaryJsonLd }} />

      <Breadcrumb items={[{ label: locale === "fr" ? "Glossaire" : "Glossary" }]} />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          {locale === "fr"
            ? "Glossaire analytics et RGPD"
            : "Analytics and GDPR glossary"}
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          {locale === "fr"
            ? `${glossaryTerms.length} definitions pour comprendre l\u2019analytics web, la protection des donnees et la conformite RGPD.`
            : `${glossaryTerms.length} definitions to understand web analytics, data protection, and GDPR compliance.`}
        </p>
      </header>

      <dl className="space-y-6">
        {glossaryTerms.map((term) => (
          <div
            key={term.slug}
            id={term.slug}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-5"
          >
            <dt className="text-lg font-semibold text-gray-900 dark:text-gray-100">{l(term.term)}</dt>
            <dd className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {l(term.definition)}
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
                      className="inline-block text-xs bg-emerald-50 dark:bg-emerald-950 text-emerald-800 px-2 py-1 rounded-full hover:bg-emerald-100 transition-colors"
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
