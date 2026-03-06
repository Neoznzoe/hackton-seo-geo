"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={t("toc.title")} className="hidden lg:block sticky top-24">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
        {t("toc.title")}
      </p>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block py-1 border-l-2 pl-3 transition-colors ${
                activeId === item.id
                  ? "border-emerald-700 text-emerald-700 font-medium"
                  : "border-gray-200 text-gray-500 hover:text-gray-900"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
