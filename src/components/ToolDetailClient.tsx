"use client";

import { AnalyticsTool } from "@/lib/types";
import { useLocalized } from "@/lib/i18n/useLocalized";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import Breadcrumb from "@/components/layout/Breadcrumb";
import SummaryBox from "@/components/content/SummaryBox";
import TableOfContents from "@/components/content/TableOfContents";
import PricingTable from "@/components/tools/PricingTable";
import FeatureGrid from "@/components/tools/FeatureGrid";
import ComplianceDetails from "@/components/tools/ComplianceDetails";
import ProsCons from "@/components/tools/ProsCons";
import FaqSection from "@/components/content/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import { SoftwareApplication } from "schema-dts";
import ToolPageTracker, { CompareLink } from "@/components/analytics/ToolPageTracker";

interface VsPair {
  slug: string;
  tool1: AnalyticsTool;
  tool2: AnalyticsTool;
}

interface ToolDetailClientProps {
  tool: AnalyticsTool;
  vsPairs: VsPair[];
}

export default function ToolDetailClient({ tool, vsPairs }: ToolDetailClientProps) {
  const { l } = useLocalized();
  const { t } = useTranslation();

  const tocItems = [
    { id: "presentation", label: t("toc.presentation") },
    { id: "tarifs", label: t("toc.pricing") },
    { id: "fonctionnalites", label: t("toc.features") },
    { id: "conformite", label: t("toc.compliance") },
    { id: "avantages-inconvenients", label: t("toc.prosCons") },
    { id: "faq-heading", label: t("toc.faq") },
    { id: "comparaisons", label: t("toc.compare") },
  ];

  const lowestPrice = tool.pricing.find(
    (p) => p.price === "0 \u20ac" || p.price.match(/^\d/)
  );

  const softwareJsonLd: SoftwareApplication = {
    "@type": "SoftwareApplication",
    name: tool.name,
    description: l(tool.description),
    url: tool.websiteUrl,
    applicationCategory: "AnalyticsApplication",
    operatingSystem: "Web",
    ...(lowestPrice && lowestPrice.price !== "Sur devis"
      ? {
          offers: {
            "@type": "Offer",
            price: lowestPrice.price.replace(/[^0-9.,]/g, "") || "0",
            priceCurrency: "EUR",
          },
        }
      : {}),
  };

  const hasFree = tool.pricing.some((p) => p.price === "0 \u20ac");
  const summaryPoints = [
    `${tool.name} ${l(tool.shortDescription).toLowerCase()}`,
    `${t("tool.summary.gdpr")} : ${tool.compliance.gdprCompliant ? t("tool.summary.compliant") : t("tool.summary.nonCompliant")}${tool.compliance.cnilExempt ? `, ${t("tool.summary.cnilExempt")}` : ""}${tool.compliance.cookieless ? `, ${t("tool.summary.cookieless")}` : ""}.`,
    `${t("tool.summary.dataHosted")} : ${l(tool.compliance.dataLocation)}.`,
    hasFree ? t("tool.summary.freeTier") : `${t("tool.summary.startingAt")} ${tool.pricing[0]?.price}${tool.pricing[0]?.period ? l(tool.pricing[0].period) : ""}.`,
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 lg:grid lg:grid-cols-[1fr_200px] lg:gap-8">
      <article>
        <Breadcrumb
          items={[
            { label: t("tool.breadcrumb"), href: "/#outils" },
            { label: tool.name },
          ]}
        />

        <JsonLd
          data={{ "@context": "https://schema.org", ...softwareJsonLd }}
        />

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-2xl font-bold text-emerald-700 shrink-0">
              {tool.name[0]}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                {tool.name}
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                {l(tool.shortDescription)}
              </p>
            </div>
          </div>
        </header>

        {/* Summary Box */}
        <SummaryBox points={summaryPoints} />

        {/* Presentation */}
        <section className="mb-12" aria-labelledby="presentation">
          <h2 id="presentation" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t("tool.presentation")} {tool.name}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{l(tool.description)}</p>
          <p className="mt-4">
            <ToolPageTracker
              toolSlug={tool.slug}
              toolName={tool.name}
              websiteUrl={tool.websiteUrl}
              comparisons={vsPairs.slice(0, 6).map((pair) => ({
                slug: pair.slug,
                otherToolName: (pair.tool1.slug === tool.slug ? pair.tool2 : pair.tool1).name,
              }))}
            />
          </p>
        </section>

        {/* Tarifs */}
        <section className="mb-12" aria-labelledby="tarifs">
          <h2 id="tarifs" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {t("tool.pricing")} {tool.name}
          </h2>
          <PricingTable tiers={tool.pricing} />
        </section>

        {/* Fonctionnalites */}
        <section className="mb-12" aria-labelledby="fonctionnalites">
          <h2
            id="fonctionnalites"
            className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
          >
            {t("tool.features")}
          </h2>
          <FeatureGrid features={tool.features} />
        </section>

        {/* Conformite */}
        <section className="mb-12" aria-labelledby="conformite">
          <h2 id="conformite" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {t("tool.compliance")}
          </h2>
          <ComplianceDetails compliance={tool.compliance} />
        </section>

        {/* Pros/Cons */}
        <section className="mb-12" aria-labelledby="avantages-inconvenients">
          <h2
            id="avantages-inconvenients"
            className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
          >
            {t("tool.prosCons")}
          </h2>
          <ProsCons pros={tool.pros} cons={tool.cons} />
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <FaqSection
            items={tool.faq}
            heading={`${t("tool.faqAbout")} ${tool.name}`}
          />
        </section>

        {/* Contextual VS CTAs */}
        <section className="mb-12" id="comparaisons" aria-labelledby="comparaisons-heading">
          <h2 id="comparaisons-heading" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {t("tool.compareWith").replace("{name}", tool.name)}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {vsPairs.slice(0, 6).map((pair) => {
              const otherTool = pair.tool1.slug === tool.slug ? pair.tool2 : pair.tool1;
              return (
                <CompareLink
                  key={pair.slug}
                  href={`/comparer/${pair.slug}`}
                  toolName={tool.name}
                  otherToolName={otherTool.name}
                >
                  {tool.name} vs {otherTool.name}
                </CompareLink>
              );
            })}
          </div>
        </section>
      </article>

      {/* Table of Contents - sidebar */}
      <aside className="hidden lg:block">
        <TableOfContents items={tocItems} />
      </aside>
    </div>
  );
}
