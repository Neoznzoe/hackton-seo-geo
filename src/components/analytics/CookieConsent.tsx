"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "devradar_consent";

export type ConsentValue = "accepted" | "refused" | null;

export function getConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CONSENT_KEY) as ConsentValue;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    window.location.reload();
  }

  function handleRefuse() {
    localStorage.setItem(CONSENT_KEY, "refused");
    setVisible(false);
    // Track refusal via a simple beacon (no Piwik needed since user refused)
  }

  function handleReset() {
    localStorage.removeItem(CONSENT_KEY);
    setVisible(true);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg p-4 sm:p-6"
    >
      <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Nous utilisons Piwik Pro pour mesurer l&apos;audience de ce site.
            Ces cookies nous permettent d&apos;ameliorer votre experience.
            Conformement au RGPD et aux recommandations de la CNIL, vous pouvez
            accepter ou refuser ces cookies.{" "}
            <Link href="/politique-cookies" className="underline hover:text-blue-600">
              En savoir plus
            </Link>
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleRefuse}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
