import { Locale } from "./translations";

/**
 * A string that can be either a plain string (French by default)
 * or a bilingual object with fr/en keys.
 */
export type LocalizedString = string | { fr: string; en: string };

/**
 * Resolve a LocalizedString to a plain string based on the current locale.
 * Falls back to French if the locale key is missing.
 */
export function localize(value: LocalizedString, locale: Locale): string {
  if (typeof value === "string") return value;
  return value[locale] ?? value.fr;
}
