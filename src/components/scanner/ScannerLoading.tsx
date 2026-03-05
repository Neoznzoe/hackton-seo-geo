"use client";

import { useState, useEffect } from "react";

const STEPS = [
  "Connexion au site...",
  "Analyse du code source...",
  "Détection des outils analytics...",
  "Détection des pixels de tracking...",
  "Vérification du bandeau de consentement...",
  "Vérification des pages légales...",
  "Calcul du score RGPD...",
];

export default function ScannerLoading() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <div className="space-y-4">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              {i < currentStep ? (
                <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : i === currentStep ? (
                <div className="w-5 h-5 shrink-0 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <div className="w-5 h-5 shrink-0 rounded-full border-2 border-gray-300" />
              )}
              <span className={`text-sm ${i < currentStep ? "text-gray-900 font-medium" : i === currentStep ? "text-blue-700 font-medium" : "text-gray-400"}`}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
