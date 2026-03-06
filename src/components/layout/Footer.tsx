"use client";

import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { localize } from "@/lib/i18n/localize";

export default function Footer() {
  const { t, locale } = useTranslation();
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold text-white">{SITE_NAME}</p>
            <p className="mt-2 text-sm">
              {t("footer.description")}
            </p>
          </div>

          {/* Outils */}
          <div>
            <p className="text-sm font-semibold text-white uppercase tracking-wide">
              {t("footer.tools")}
            </p>
            <ul className="mt-3 space-y-2">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/outils/${tool.slug}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <p className="text-sm font-semibold text-white uppercase tracking-wide">
              {t("footer.categories")}
            </p>
            <ul className="mt-3 space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categorie/${cat.slug}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {localize(cat.name, locale)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/comparer"
                  className="text-sm hover:text-white transition-colors"
                >
                  {t("footer.compareAll")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <p className="text-sm font-semibold text-white uppercase tracking-wide">
              {t("footer.resources")}
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/scanner" className="text-sm hover:text-white transition-colors font-medium text-emerald-300">
                  {t("footer.freeScanner")}
                </Link>
              </li>
              <li>
                <Link href="/guide/choisir-outil-analytics" className="text-sm hover:text-white transition-colors">
                  {t("footer.guideChoose")}
                </Link>
              </li>
              <li>
                <Link href="/ressources/rgpd-analytics" className="text-sm hover:text-white transition-colors">
                  {t("footer.rgpdAnalytics")}
                </Link>
              </li>
              <li>
                <Link href="/ressources/cgu" className="text-sm hover:text-white transition-colors">
                  CGU
                </Link>
              </li>
              <li>
                <Link href="/ressources/cgv" className="text-sm hover:text-white transition-colors">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/glossaire" className="text-sm hover:text-white transition-colors">
                  Glossaire
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-8 border-t border-gray-700 dark:border-gray-600 pt-6">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              {t("footer.legalNotice")}
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-white transition-colors">
              {t("footer.privacyPolicy")}
            </Link>
            <Link href="/politique-cookies" className="hover:text-white transition-colors">
              {t("footer.cookiePolicy")}
            </Link>
            <Link href="/veille-concurrentielle" className="hover:text-white transition-colors">
              {t("footer.competitive")}
            </Link>
          </div>
          <p className="mt-4 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {SITE_NAME}. {t("footer.project")} {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
