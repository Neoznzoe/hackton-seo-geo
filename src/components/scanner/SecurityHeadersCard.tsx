"use client";

import { SecurityHeaders } from "@/lib/scanner/types";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { TranslationKey } from "@/lib/i18n/translations";

interface SecurityHeadersCardProps {
  headers: SecurityHeaders;
}

const HEADERS_INFO: { key: keyof SecurityHeaders; label: string; detailKey: TranslationKey }[] = [
  { key: "https", label: "HTTPS", detailKey: "security.https" },
  { key: "hsts", label: "HSTS", detailKey: "security.hsts" },
  { key: "contentSecurityPolicy", label: "Content-Security-Policy", detailKey: "security.csp" },
  { key: "xFrameOptions", label: "X-Frame-Options", detailKey: "security.xframe" },
  { key: "xContentTypeOptions", label: "X-Content-Type-Options", detailKey: "security.xcontent" },
  { key: "referrerPolicy", label: "Referrer-Policy", detailKey: "security.referrer" },
];

export default function SecurityHeadersCard({ headers }: SecurityHeadersCardProps) {
  const { t } = useTranslation();
  const presentCount = Object.values(headers).filter(Boolean).length;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-emerald-50 dark:bg-emerald-950 rounded-lg flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-emerald-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{t("security.title")}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{presentCount}/6 {t("security.headersPresent")}</p>
        </div>
      </div>

      <div className="space-y-2">
        {HEADERS_INFO.map(({ key, label, detailKey }) => {
          const present = headers[key];
          return (
            <div key={key} className="flex items-center gap-2.5">
              {present ? (
                <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <div className="min-w-0">
                <span className={`text-xs font-medium ${present ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"}`}>
                  {label}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 ml-1.5">{t(detailKey)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
