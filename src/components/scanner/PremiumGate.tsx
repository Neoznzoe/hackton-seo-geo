"use client";

import { useTranslation } from "@/lib/i18n/LanguageProvider";

interface PremiumGateProps {
  children: React.ReactNode;
  locked: boolean;
  onUpgrade: () => void;
}

export default function PremiumGate({ children, locked, onUpgrade }: PremiumGateProps) {
  const { t } = useTranslation();

  if (!locked) return <>{children}</>;

  return (
    <div className="relative">
      {/* Blurred content skeleton */}
      <div className="pointer-events-none select-none" aria-hidden="true">
        <div className="blur-[6px] opacity-60">
          {children}
        </div>
      </div>

      {/* Overlay with CTA */}
      <div className="absolute inset-0 flex items-center justify-center bg-white/40 dark:bg-gray-950/40 backdrop-blur-[2px] rounded-xl">
        <div className="text-center px-6 py-8 max-w-sm">
          <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {t("premium.unlock")}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            {t("premium.upgradeDesc")}
          </p>
          <button
            onClick={onUpgrade}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors text-sm shadow-sm"
          >
            {t("premium.choosePlan")}
          </button>
        </div>
      </div>
    </div>
  );
}
