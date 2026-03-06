import { Metadata } from "next";
import { notFound } from "next/navigation";
import { tools, getToolBySlug, generateToolPairs } from "@/data/tools";
import { CURRENT_YEAR, SITE_NAME } from "@/lib/constants";
import { localize } from "@/lib/i18n/localize";
import ToolDetailClient from "@/components/ToolDetailClient";

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

  const shortDesc = localize(tool.shortDescription, "fr");

  return {
    title: `${tool.name} - Avis, tarifs et alternatives ${CURRENT_YEAR}`,
    description: `${shortDesc} Decouvrez les tarifs, fonctionnalites, conformite RGPD et alternatives a ${tool.name}.`,
    alternates: {
      canonical: `/outils/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.name} - Avis, tarifs et alternatives | ${SITE_NAME}`,
      description: shortDesc,
      type: "article",
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  // Get VS comparisons for this tool
  const vsPairs = generateToolPairs().filter(
    (p) => p.tool1.slug === tool.slug || p.tool2.slug === tool.slug
  );

  return <ToolDetailClient tool={tool} vsPairs={vsPairs} />;
}
