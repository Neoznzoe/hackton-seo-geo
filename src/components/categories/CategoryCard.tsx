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
      className="block border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all bg-white dark:bg-gray-900"
      onClick={() => trackCategoryClick(category.slug)}
    >
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{l(category.name)}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
        {l(category.description)}
      </p>
      <p className="text-xs text-emerald-700 mt-3 font-medium">
        {toolCount} outil{toolCount > 1 ? "s" : ""} &rarr;
      </p>
    </Link>
  );
}
