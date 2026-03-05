"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Locale, translations, TranslationKey } from "./translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "fr",
  setLocale: () => {},
  t: (key) => translations[key]?.fr ?? key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("devradar-locale") as Locale | null;
    if (saved === "en" || saved === "fr") {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("devradar-locale", l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => translations[key]?.[locale] ?? key,
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
