import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateToolPairs, parseVsSlug } from "@/data/tools";
import { generateVsFaq, generateVerdict, getRelatedComparisons } from "@/data/comparisons";
import { CURRENT_YEAR, SITE_NAME } from "@/lib/constants";
import ComparisonDetailClient from "@/components/ComparisonDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const allPairs = generateToolPairs();
const allSlugs = allPairs.map((p) => p.slug);

export async function generateStaticParams() {
  return allPairs.map((pair) => ({ slug: pair.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseVsSlug(slug);
  if (!parsed) return {};

  const { tool1, tool2 } = parsed;
  const title = `${tool1.name} vs ${tool2.name} - Comparatif ${CURRENT_YEAR}`;
  const description = `Comparaison detaillee ${tool1.name} vs ${tool2.name} : fonctionnalites, tarifs, conformite RGPD, avantages et inconvenients. Quel outil analytics choisir en ${CURRENT_YEAR} ?`;

  return {
    title,
    description,
    alternates: { canonical: `/comparer/${slug}` },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      type: "article",
    },
  };
}

export default async function VsPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseVsSlug(slug);
  if (!parsed) notFound();

  const { tool1, tool2 } = parsed;
  const faq = generateVsFaq(tool1, tool2);
  const verdict = generateVerdict(tool1, tool2);
  const relatedSlugs = getRelatedComparisons(tool1.slug, allSlugs)
    .concat(getRelatedComparisons(tool2.slug, allSlugs))
    .filter((s, i, arr) => arr.indexOf(s) === i && s !== slug)
    .slice(0, 6);

  return (
    <ComparisonDetailClient
      tool1={tool1}
      tool2={tool2}
      slug={slug}
      faq={faq}
      verdict={verdict}
      relatedSlugs={relatedSlugs}
    />
  );
}
