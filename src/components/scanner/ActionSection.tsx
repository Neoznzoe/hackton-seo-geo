"use client";

import { trackScanRecommendationClick } from "@/lib/tracking";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { TranslationKey } from "@/lib/i18n/translations";

export default function ActionSection() {
  const { t } = useTranslation();

  const links: { href: string; event: string; icon: string; iconBg: string; titleKey: TranslationKey; descKey: TranslationKey }[] = [
    {
      href: "/comparer",
      event: "comparer",
      icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
      iconBg: "bg-blue-100 text-blue-600",
      titleKey: "action.compareTools",
      descKey: "action.compareDesc",
    },
    {
      href: "/guide/choisir-outil-analytics",
      event: "guide",
      icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
      iconBg: "bg-purple-100 text-purple-600",
      titleKey: "action.migrationGuide",
      descKey: "action.migrationDesc",
    },
    {
      href: "/ressources/rgpd-analytics",
      event: "rgpd",
      icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
      iconBg: "bg-green-100 text-green-600",
      titleKey: "action.rgpdAnalytics",
      descKey: "action.rgpdDesc",
    },
    {
      href: "/#outils",
      event: "outils",
      icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
      iconBg: "bg-orange-100 text-orange-600",
      titleKey: "action.allTools",
      descKey: "action.allToolsDesc",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t("scanner.goFurther")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {links.map((link) => (
          <a
            key={link.event}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackScanRecommendationClick(link.event)}
            className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 ${link.iconBg} rounded-lg flex items-center justify-center shrink-0`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">{t(link.titleKey)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t(link.descKey)}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
