import Link from "next/link";
import { BASE_URL } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";
import { BreadcrumbList } from "schema-dts";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems: BreadcrumbItem[] = [{ label: "Accueil", href: "/" }, ...items];

  const jsonLd: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${BASE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...jsonLd }} />
      <nav aria-label="Fil d'Ariane" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          {allItems.map((item, index) => (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && <span aria-hidden="true">/</span>}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-emerald-700 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
