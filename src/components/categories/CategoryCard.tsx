"use client";

import Link from "next/link";
import { Category } from "@/lib/types";
import { trackCategoryClick } from "@/lib/tracking";
import { useLocalized } from "@/lib/i18n/useLocalized";

interface CategoryCardProps {
  category: Category;
  toolCount: number;
}

export default function CategoryCard({ category, toolCount }: CategoryCardProps) {
  const { l } = useLocalized();
  return (
    <Link
      href={`/categorie/${category.slug}`}
      className="block border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-blue-300 transition-all"
      onClick={() => trackCategoryClick(category.slug)}
    >
      <h3 className="font-semibold text-gray-900">{l(category.name)}</h3>
      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
        {l(category.description)}
      </p>
      <p className="text-xs text-blue-600 mt-3 font-medium">
        {toolCount} outil{toolCount > 1 ? "s" : ""} &rarr;
      </p>
    </Link>
  );
}
