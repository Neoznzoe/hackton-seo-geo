import { tools, generateToolPairs } from "@/data/tools";
import { categories } from "@/data/categories";
import { glossaryTerms } from "@/data/glossary";
import { BASE_URL } from "@/lib/constants";

function fr(v: string | { fr: string; en: string }): string {
  return typeof v === "string" ? v : v.fr;
}

function en(v: string | { fr: string; en: string }): string {
  return typeof v === "string" ? v : v.en;
}

function buildContent(): string {
  const lines: string[] = [];

  lines.push("# DevRadar - Full Content for LLMs");
  lines.push("");
  lines.push("> Independent web analytics tool comparator focused on GDPR compliance.");
  lines.push(`> Website: ${BASE_URL}`);
  lines.push(`> Last updated: ${new Date().toISOString().split("T")[0]}`);
  lines.push("");

  // Tools
  lines.push("---");
  lines.push("");
  lines.push("## Analytics Tools Compared");
  lines.push("");

  for (const tool of tools) {
    lines.push(`### ${tool.name}`);
    lines.push("");
    lines.push(`- Slug: ${tool.slug}`);
    lines.push(`- URL: ${BASE_URL}/outils/${tool.slug}`);
    lines.push(`- Website: ${tool.websiteUrl}`);
    lines.push(`- Description (FR): ${fr(tool.description)}`);
    lines.push(`- Description (EN): ${en(tool.description)}`);
    lines.push(`- Categories: ${tool.categories.join(", ")}`);
    lines.push("");

    // Compliance
    lines.push("#### Compliance");
    lines.push(`- GDPR Compliant: ${tool.compliance.gdprCompliant ? "Yes" : "No"}`);
    lines.push(`- CNIL Consent-Exempt: ${tool.compliance.cnilExempt ? "Yes" : "No"}`);
    lines.push(`- Cookieless: ${tool.compliance.cookieless ? "Yes" : "No"}`);
    lines.push(`- Data Location: ${en(tool.compliance.dataLocation)}`);
    lines.push(`- Details: ${en(tool.compliance.details)}`);
    lines.push("");

    // Pricing
    lines.push("#### Pricing");
    for (const tier of tool.pricing) {
      lines.push(`- ${typeof tier.name === "string" ? tier.name : tier.name.en}: ${tier.price}${tier.period ? ` ${en(tier.period)}` : ""}`);
    }
    lines.push("");

    // Pros/Cons
    lines.push("#### Pros");
    for (const pro of tool.pros) {
      lines.push(`- ${en(pro)}`);
    }
    lines.push("");
    lines.push("#### Cons");
    for (const con of tool.cons) {
      lines.push(`- ${en(con)}`);
    }
    lines.push("");

    // FAQ
    lines.push("#### FAQ");
    for (const faq of tool.faq) {
      lines.push(`Q: ${en(faq.question)}`);
      lines.push(`A: ${en(faq.answer)}`);
      lines.push("");
    }
    lines.push("");
  }

  // Comparison summary table
  lines.push("---");
  lines.push("");
  lines.push("## Quick Comparison Table");
  lines.push("");
  lines.push("| Tool | Free Plan | GDPR | CNIL Exempt | Cookieless | Data Location | Self-Host |");
  lines.push("|------|-----------|------|-------------|------------|---------------|-----------|");
  for (const tool of tools) {
    const hasFree = tool.pricing.some((p) => p.price === "0 €");
    const selfHost = tool.features.some(
      (f) => (typeof f.label === "string" ? f.label : f.label.en) === "Self-hosting" && f.available
    );
    lines.push(
      `| ${tool.name} | ${hasFree ? "Yes" : "No"} | ${tool.compliance.gdprCompliant ? "Yes" : "No"} | ${tool.compliance.cnilExempt ? "Yes" : "No"} | ${tool.compliance.cookieless ? "Yes" : "No"} | ${en(tool.compliance.dataLocation)} | ${selfHost ? "Yes" : "No"} |`
    );
  }
  lines.push("");

  // Available comparisons
  lines.push("---");
  lines.push("");
  lines.push("## Available Comparisons");
  lines.push("");
  const pairs = generateToolPairs();
  for (const pair of pairs) {
    lines.push(`- ${pair.tool1.name} vs ${pair.tool2.name}: ${BASE_URL}/comparer/${pair.slug}`);
  }
  lines.push("");

  // Categories
  lines.push("---");
  lines.push("");
  lines.push("## Categories");
  lines.push("");
  for (const cat of categories) {
    lines.push(`### ${en(cat.name)}`);
    lines.push(`- URL: ${BASE_URL}/categorie/${cat.slug}`);
    lines.push(`- Description: ${en(cat.description)}`);
    const catTools = tools.filter((t) => t.categories.includes(cat.slug));
    lines.push(`- Tools: ${catTools.map((t) => t.name).join(", ")}`);
    lines.push("");
  }

  // Glossary
  lines.push("---");
  lines.push("");
  lines.push("## Glossary (Key Terms)");
  lines.push("");
  for (const term of glossaryTerms) {
    lines.push(`### ${en(term.term)}`);
    lines.push(`${en(term.definition)}`);
    if (term.relatedTools?.length) {
      lines.push(`Related tools: ${term.relatedTools.join(", ")}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

export function GET() {
  return new Response(buildContent(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
