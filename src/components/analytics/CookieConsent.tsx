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
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl p-4 sm:p-6"
    >
      <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
            Mesure d&apos;audience respectueuse de votre vie privee
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Nous utilisons <strong>Piwik Pro</strong>, heberge en Union Europeenne (Allemagne).
            Aucune donnee personnelle n&apos;est collectee, aucun transfert hors UE.
            Vos donnees restent anonymes et nous aident simplement a ameliorer le site.{" "}
            <Link href="/politique-cookies" className="underline hover:text-emerald-700 dark:hover:text-emerald-400">
              En savoir plus
            </Link>
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleRefuse}
            className="px-4 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all"
          >
            Accepter les cookies
          </button>
        </div>
      </div>
    </div>
  );
}
