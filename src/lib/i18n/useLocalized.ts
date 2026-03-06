"use client";

import { useTranslation } from "./LanguageProvider";
import { localize, LocalizedString } from "./localize";
import { Locale } from "./translations";

/**
 * Hook that returns a `l()` function to resolve LocalizedString values.
 */
export function useLocalized() {
  const { locale } = useTranslation();
  return {
    locale,
    l: (value: LocalizedString) => localize(value, locale),
  };
}

/**
 * Non-hook version for use in server components or utility functions.
 */
export function resolveLocalized(value: LocalizedString, locale: Locale): string {
  return localize(value, locale);
}
