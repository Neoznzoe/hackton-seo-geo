"use client";

import { LegalPages } from "@/lib/scanner/types";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { TranslationKey } from "@/lib/i18n/translations";

const LEGAL_ITEMS: { key: keyof LegalPages; labelKey: TranslationKey; requiredKey: TranslationKey }[] = [
  { key: "mentionsLegales", labelKey: "legal.mentionsLegales", requiredKey: "legal.mentionsRequired" },
  { key: "politiqueConfidentialite", labelKey: "legal.privacy", requiredKey: "legal.privacyRequired" },
  { key: "cgu", labelKey: "legal.cgu", requiredKey: "legal.cguRequired" },
  { key: "cgv", labelKey: "legal.cgv", requiredKey: "legal.cgvRequired" },
  { key: "politiqueCookies", labelKey: "legal.cookies", requiredKey: "legal.cookiesRequired" },
];

export default function LegalPagesCard({ legalPages, isEcommerce }: { legalPages: LegalPages; isEcommerce: boolean }) {
  const { t } = useTranslation();
  const applicableItems = LEGAL_ITEMS.filter((item) => item.key !== "cgv" || isEcommerce);
  const found = applicableItems.filter((item) => legalPages[item.key]).length;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-emerald-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t("legal.title")}</h3>
        <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">{found}/{applicableItems.length}</span>
      </div>
      <ul className="space-y-2.5">
        {LEGAL_ITEMS.map((item) => {
          const detected = legalPages[item.key];
          const isCgvNotRequired = item.key === "cgv" && !isEcommerce;
          return (
            <li key={item.key} className="flex items-start gap-2.5">
              {detected ? (
                <svg className="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : isCgvNotRequired ? (
                <svg className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <div>
                <p className={`text-sm font-medium ${detected ? "text-gray-900 dark:text-gray-100" : isCgvNotRequired ? "text-gray-400 dark:text-gray-500" : "text-red-700"}`}>
                  {t(item.labelKey)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {isCgvNotRequired && !detected ? t("legal.cgvNotRequired") : t(item.requiredKey)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
