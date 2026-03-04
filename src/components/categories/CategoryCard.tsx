import Link from "next/link";
import { Category } from "@/lib/types";

interface CategoryCardProps {
  category: Category;
  toolCount: number;
}

export default function CategoryCard({ category, toolCount }: CategoryCardProps) {
  return (
    <Link
      href={`/categorie/${category.slug}`}
      className="block border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-blue-300 transition-all"
    >
      <h3 className="font-semibold text-gray-900">{category.name}</h3>
      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
        {category.description}
      </p>
      <p className="text-xs text-blue-600 mt-3 font-medium">
        {toolCount} outil{toolCount > 1 ? "s" : ""} &rarr;
      </p>
    </Link>
  );
}
