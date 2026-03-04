import { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ToolCard from "@/components/tools/ToolCard";
import ComparisonTable from "@/components/compare/ComparisonTable";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: {
      canonical: `/categorie/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryTools = getToolsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Categories", href: "/#categories" },
          { label: category.name },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          {category.metaTitle}
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-3xl">
          {category.description}
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {categoryTools.length} outil{categoryTools.length > 1 ? "s" : ""} dans
          cette categorie
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {categoryTools.length > 1 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Comparatif {category.name}
          </h2>
          <ComparisonTable tools={categoryTools} />
        </section>
      )}
    </div>
  );
}
