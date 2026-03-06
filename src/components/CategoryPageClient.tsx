"use client";

import { useLocalized } from "@/lib/i18n/useLocalized";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { Category, AnalyticsTool } from "@/lib/types";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ToolCard from "@/components/tools/ToolCard";
import ComparisonTable from "@/components/compare/ComparisonTable";

interface Props {
  category: Category;
  categoryTools: AnalyticsTool[];
}

export default function CategoryPageClient({ category, categoryTools }: Props) {
  const { l } = useLocalized();
  const { locale } = useTranslation();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: locale === "fr" ? "Catégories" : "Categories", href: "/#categories" },
          { label: l(category.name) },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          {l(category.metaTitle)}
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          {l(category.description)}
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {categoryTools.length} {locale === "fr"
            ? `outil${categoryTools.length > 1 ? "s" : ""} dans cette catégorie`
            : `tool${categoryTools.length > 1 ? "s" : ""} in this category`}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {categoryTools.length > 1 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {locale === "fr" ? "Comparatif" : "Comparison"} {l(category.name)}
          </h2>
          <ComparisonTable tools={categoryTools} />
        </section>
      )}
    </div>
  );
}
