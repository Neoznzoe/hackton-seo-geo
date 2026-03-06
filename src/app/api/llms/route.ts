import { NextResponse } from "next/server";
import { tools, generateToolPairs } from "@/data/tools";
import { categories } from "@/data/categories";
import { glossaryTerms } from "@/data/glossary";
import { BASE_URL } from "@/lib/constants";

function en(v: string | { fr: string; en: string }): string {
  return typeof v === "string" ? v : v.en;
}

export function GET() {
  const data = {
    name: "DevRadar",
    description: "Independent web analytics tool comparator focused on GDPR compliance.",
    url: BASE_URL,
    lastUpdated: new Date().toISOString().split("T")[0],
    tools: tools.map((tool) => ({
      slug: tool.slug,
      name: tool.name,
      description: en(tool.description),
      website: tool.websiteUrl,
      url: `${BASE_URL}/outils/${tool.slug}`,
      categories: tool.categories,
      compliance: {
        gdprCompliant: tool.compliance.gdprCompliant,
        cnilExempt: tool.compliance.cnilExempt,
        cookieless: tool.compliance.cookieless,
        dataLocation: en(tool.compliance.dataLocation),
      },
      pricing: tool.pricing.map((p) => ({
        name: typeof p.name === "string" ? p.name : p.name.en,
        price: p.price,
        period: p.period ? en(p.period) : undefined,
      })),
      pros: tool.pros.map(en),
      cons: tool.cons.map(en),
    })),
    comparisons: generateToolPairs().map((pair) => ({
      slug: pair.slug,
      tool1: pair.tool1.name,
      tool2: pair.tool2.name,
      url: `${BASE_URL}/comparer/${pair.slug}`,
    })),
    categories: categories.map((cat) => ({
      slug: cat.slug,
      name: en(cat.name),
      description: en(cat.description),
      url: `${BASE_URL}/categorie/${cat.slug}`,
    })),
    glossary: glossaryTerms.map((term) => ({
      term: en(term.term),
      slug: term.slug,
      definition: en(term.definition),
      relatedTools: term.relatedTools,
    })),
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
