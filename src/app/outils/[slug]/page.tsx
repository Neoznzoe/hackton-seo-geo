import { Metadata } from "next";
import { notFound } from "next/navigation";
import { tools, getToolBySlug, generateToolPairs } from "@/data/tools";
import { BASE_URL, SITE_NAME, CURRENT_YEAR } from "@/lib/constants";
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
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  return {
    title: `${tool.name} - Avis, tarifs et alternatives ${CURRENT_YEAR}`,
    description: `${tool.shortDescription} Decouvrez les tarifs, fonctionnalites, conformite RGPD et alternatives a ${tool.name}.`,
    alternates: {
      canonical: `/outils/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.name} - Avis, tarifs et alternatives | ${SITE_NAME}`,
      description: tool.shortDescription,
      type: "article",
    },
  };
}

const tocItems = [
  { id: "presentation", label: "Presentation" },
  { id: "tarifs", label: "Tarifs" },
  { id: "fonctionnalites", label: "Fonctionnalites" },
  { id: "conformite", label: "Conformite RGPD" },
  { id: "avantages-inconvenients", label: "Avantages / Inconvenients" },
  { id: "faq-heading", label: "FAQ" },
  { id: "comparaisons", label: "Comparer" },
];

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const lowestPrice = tool.pricing.find(
    (p) => p.price === "0 €" || p.price.match(/^\d/)
  );

  const softwareJsonLd: SoftwareApplication = {
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
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

  const hasFree = tool.pricing.some((p) => p.price === "0 €");
  const summaryPoints = [
    `${tool.name} est ${tool.shortDescription.toLowerCase()}`,
    `RGPD : ${tool.compliance.gdprCompliant ? "conforme" : "non conforme"}${tool.compliance.cnilExempt ? ", exempte de consentement CNIL" : ""}${tool.compliance.cookieless ? ", sans cookies" : ""}.`,
    `Donnees hebergees : ${tool.compliance.dataLocation}.`,
    hasFree ? `Offre gratuite disponible.` : `A partir de ${tool.pricing[0]?.price}${tool.pricing[0]?.period || ""}.`,
  ];

  // Get VS comparisons for this tool
  const vsPairs = generateToolPairs().filter(
    (p) => p.tool1.slug === tool.slug || p.tool2.slug === tool.slug
  );

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 lg:grid lg:grid-cols-[1fr_200px] lg:gap-8">
      <article>
        <Breadcrumb
          items={[
            { label: "Outils", href: "/#outils" },
            { label: tool.name },
          ]}
        />

        <JsonLd
          data={{ "@context": "https://schema.org", ...softwareJsonLd }}
        />

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl font-bold text-blue-600 shrink-0">
              {tool.name[0]}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {tool.name}
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                {tool.shortDescription}
              </p>
            </div>
          </div>
        </header>

        {/* Summary Box */}
        <SummaryBox points={summaryPoints} />

        {/* Presentation */}
        <section className="mb-12" aria-labelledby="presentation">
          <h2 id="presentation" className="text-2xl font-bold text-gray-900 mb-4">
            Presentation de {tool.name}
          </h2>
          <p className="text-gray-700 leading-relaxed">{tool.description}</p>
          <p className="mt-4">
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Visiter le site officiel &rarr;
            </a>
          </p>
        </section>

        {/* Tarifs */}
        <section className="mb-12" aria-labelledby="tarifs">
          <h2 id="tarifs" className="text-2xl font-bold text-gray-900 mb-6">
            Tarifs de {tool.name}
          </h2>
          <PricingTable tiers={tool.pricing} />
        </section>

        {/* Fonctionnalites */}
        <section className="mb-12" aria-labelledby="fonctionnalites">
          <h2
            id="fonctionnalites"
            className="text-2xl font-bold text-gray-900 mb-6"
          >
            Fonctionnalites
          </h2>
          <FeatureGrid features={tool.features} />
        </section>

        {/* Conformite */}
        <section className="mb-12" aria-labelledby="conformite">
          <h2 id="conformite" className="text-2xl font-bold text-gray-900 mb-6">
            Conformite RGPD et vie privee
          </h2>
          <ComplianceDetails compliance={tool.compliance} />
        </section>

        {/* Pros/Cons */}
        <section className="mb-12" aria-labelledby="avantages-inconvenients">
          <h2
            id="avantages-inconvenients"
            className="text-2xl font-bold text-gray-900 mb-6"
          >
            Avantages et inconvenients
          </h2>
          <ProsCons pros={tool.pros} cons={tool.cons} />
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <FaqSection
            items={tool.faq}
            heading={`Questions frequentes sur ${tool.name}`}
          />
        </section>

        {/* Contextual VS CTAs */}
        <section className="mb-12" id="comparaisons" aria-labelledby="comparaisons-heading">
          <h2 id="comparaisons-heading" className="text-2xl font-bold text-gray-900 mb-6">
            Comparez {tool.name} avec les alternatives
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {vsPairs.slice(0, 6).map((pair) => {
              const otherTool = pair.tool1.slug === tool.slug ? pair.tool2 : pair.tool1;
              return (
                <Link
                  key={pair.slug}
                  href={`/comparer/${pair.slug}`}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  {tool.name} vs {otherTool.name}
                </Link>
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
