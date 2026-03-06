"use client";

import Link from "next/link";
import { tools } from "@/data/tools";
import { BASE_URL, CURRENT_YEAR, SITE_NAME } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ComparisonTable from "@/components/compare/ComparisonTable";
import FaqSection from "@/components/content/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import { Article } from "schema-dts";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

const articleJsonLd: Article = {
  "@type": "Article",
  headline: `Guide : comment choisir son outil analytics en ${CURRENT_YEAR}`,
  description: `Guide complet pour choisir le meilleur outil analytics web en ${CURRENT_YEAR}.`,
  url: `${BASE_URL}/guide/choisir-outil-analytics`,
  inLanguage: "fr",
  datePublished: `${CURRENT_YEAR}-01-01`,
  dateModified: new Date().toISOString().split("T")[0],
  author: { "@type": "Organization", name: SITE_NAME },
  publisher: { "@type": "Organization", name: SITE_NAME },
};

export default function GuidePage() {
  const { locale } = useTranslation();

  const privacyTools = tools.filter((t) => t.compliance.gdprCompliant && t.compliance.cnilExempt);
  const freeTools = tools.filter((t) => t.pricing.some((p) => p.price === "0 \u20ac"));

  const guideFaq = [
    {
      question: locale === "fr"
        ? "Quel est le meilleur outil analytics pour un site vitrine ?"
        : "What is the best analytics tool for a showcase website?",
      answer: locale === "fr"
        ? `Plausible Analytics est le meilleur choix pour un site vitrine en ${CURRENT_YEAR}. Son script ultra-leger (< 1 ko) n'impacte pas les performances, il est conforme RGPD sans bandeau cookies, et son tableau de bord simple couvre toutes les metriques essentielles. Alternative gratuite : Umami en auto-hebergement.`
        : `Plausible Analytics is the best choice for a showcase website in ${CURRENT_YEAR}. Its ultra-light script (< 1 KB) doesn't impact performance, it's GDPR-compliant without a cookie banner, and its simple dashboard covers all essential metrics. Free alternative: self-hosted Umami.`,
    },
    {
      question: locale === "fr"
        ? "Quel outil analytics pour un site e-commerce ?"
        : "Which analytics tool for an e-commerce site?",
      answer: locale === "fr"
        ? `Pour un site e-commerce, Matomo est la meilleure option en ${CURRENT_YEAR}. Il offre un suivi e-commerce complet (panier, revenus, produits), des entonnoirs de conversion, et reste conforme au RGPD avec exemption CNIL. Google Analytics 4 est egalement adapte mais necessite un bandeau de consentement.`
        : `For an e-commerce site, Matomo is the best option in ${CURRENT_YEAR}. It offers comprehensive e-commerce tracking (cart, revenue, products), conversion funnels, and remains GDPR-compliant with CNIL exemption. Google Analytics 4 is also suitable but requires a consent banner.`,
    },
    {
      question: locale === "fr"
        ? "Comment migrer de Google Analytics vers une alternative ?"
        : "How to migrate from Google Analytics to an alternative?",
      answer: locale === "fr"
        ? "La migration se fait en 3 etapes : 1) Installez le nouvel outil en parallele de GA pendant 2-4 semaines pour comparer les donnees. 2) Importez vos donnees historiques GA (Matomo propose un import natif). 3) Supprimez le script GA une fois satisfait. Matomo, Plausible et Fathom proposent des guides de migration detailles."
        : "Migration is done in 3 steps: 1) Install the new tool alongside GA for 2-4 weeks to compare data. 2) Import your historical GA data (Matomo offers native import). 3) Remove the GA script once satisfied. Matomo, Plausible, and Fathom provide detailed migration guides.",
    },
    {
      question: locale === "fr"
        ? "Faut-il un bandeau cookies pour Google Analytics 4 ?"
        : "Do you need a cookie banner for Google Analytics 4?",
      answer: locale === "fr"
        ? "Oui, Google Analytics 4 utilise des cookies et transfere les donnees aux USA, ce qui necessite un bandeau de consentement conforme au RGPD. La CNIL a juge GA non conforme en fevrier 2022. Le Consent Mode v2 et le server-side tagging ameliorent la conformite mais ne suppriment pas l'obligation de consentement."
        : "Yes, Google Analytics 4 uses cookies and transfers data to the USA, which requires a GDPR-compliant consent banner. The CNIL ruled GA non-compliant in February 2022. Consent Mode v2 and server-side tagging improve compliance but do not remove the consent requirement.",
    },
  ];

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={{ "@context": "https://schema.org", ...articleJsonLd }} />

      <Breadcrumb
        items={[
          { label: "Guide" },
          { label: locale === "fr" ? "Choisir son outil analytics" : "Choose your analytics tool" },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          {locale === "fr"
            ? `Comment choisir son outil analytics en ${CURRENT_YEAR} ?`
            : `How to choose your analytics tool in ${CURRENT_YEAR}?`}
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          {locale === "fr"
            ? "Guide complet pour trouver la solution analytics adaptee a vos besoins : criteres de choix, conformite RGPD, comparatif et recommandations."
            : "Complete guide to finding the right analytics solution for your needs: selection criteria, GDPR compliance, comparison, and recommendations."}
        </p>
      </header>

      {/* Criteres essentiels */}
      <section className="mb-12" aria-labelledby="criteres">
        <h2 id="criteres" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {locale === "fr" ? "Les criteres essentiels pour choisir" : "Essential criteria for choosing"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === "fr" ? "Fonctionnalites" : "Features"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {locale === "fr"
                ? "Identifiez vos besoins : metriques de base (pages vues, sources, pays) ou avancees (e-commerce, entonnoirs, heatmaps, A/B testing). Un site vitrine n\u2019a pas les memes besoins qu\u2019un e-commerce."
                : "Identify your needs: basic metrics (page views, sources, countries) or advanced (e-commerce, funnels, heatmaps, A/B testing). A showcase site doesn\u2019t have the same needs as an e-commerce site."}
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === "fr" ? "Conformite RGPD" : "GDPR compliance"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {locale === "fr"
                ? "La conformite au RGPD est obligatoire en Europe. Privilegiez les outils exemptes de consentement par la CNIL pour eviter la perte de donnees liee aux refus de cookies (30-50 % des visiteurs)."
                : "GDPR compliance is mandatory in Europe. Prioritize CNIL consent-exempt tools to avoid data loss from cookie refusals (30-50% of visitors)."}
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === "fr" ? "Budget" : "Budget"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {locale === "fr"
                ? "Les prix varient de 0 \u20ac (GA4, Matomo On-Premise, Umami) a plus de 100 000 $/an (Adobe Analytics). Evaluez le cout total : hebergement, plugins, support."
                : "Prices range from \u20ac0 (GA4, Matomo On-Premise, Umami) to over $100,000/year (Adobe Analytics). Evaluate total cost: hosting, plugins, support."}
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === "fr" ? "Facilite d\u2019utilisation" : "Ease of use"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {locale === "fr"
                ? "Un outil complexe non maitrise est inutile. Plausible et Simple Analytics sont les plus simples. GA4 et Adobe Analytics necessitent une formation approfondie."
                : "A complex tool you don\u2019t master is useless. Plausible and Simple Analytics are the simplest. GA4 and Adobe Analytics require extensive training."}
            </p>
          </div>
        </div>
      </section>

      {/* RGPD/CNIL */}
      <section className="mb-12" aria-labelledby="rgpd">
        <h2 id="rgpd" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {locale === "fr" ? "RGPD et recommandations CNIL" : "GDPR and CNIL recommendations"}
        </h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            <strong>{locale === "fr" ? "Ce que dit la CNIL :" : "What the CNIL says:"}</strong>{" "}
            {locale === "fr"
              ? "Depuis fevrier 2022, la CNIL considere que l\u2019utilisation de Google Analytics entraine des transferts illegaux de donnees vers les Etats-Unis. Elle recommande des alternatives conformes."
              : "Since February 2022, the CNIL considers that using Google Analytics results in illegal data transfers to the United States. It recommends compliant alternatives."}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>{locale === "fr" ? "Outils exemptes de consentement :" : "Consent-exempt tools:"}</strong>{" "}
            {locale === "fr"
              ? "Matomo (en configuration sans cookies), Plausible, Simple Analytics, Fathom, Umami et Piwik PRO (en mode cookieless) peuvent etre utilises sans bandeau de consentement."
              : "Matomo (in cookieless configuration), Plausible, Simple Analytics, Fathom, Umami, and Piwik PRO (in cookieless mode) can be used without a consent banner."}
          </p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>{privacyTools.length} {locale === "fr" ? `outils sur ${tools.length}` : `out of ${tools.length} tools`}</strong>{" "}
          {locale === "fr"
            ? "sont conformes RGPD et exemptes de consentement CNIL dans notre comparatif."
            : "are GDPR-compliant and CNIL consent-exempt in our comparison."}
        </p>
      </section>

      {/* Comparatif rapide */}
      <section className="mb-12" aria-labelledby="comparatif">
        <h2 id="comparatif" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {locale === "fr" ? "Comparatif rapide" : "Quick comparison"}
        </h2>
        <ComparisonTable tools={tools} />
      </section>

      {/* Recommandations par profil */}
      <section className="mb-12" aria-labelledby="recommandations">
        <h2 id="recommandations" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {locale === "fr" ? "Recommandations par profil" : "Recommendations by profile"}
        </h2>
        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === "fr" ? "Blog / site vitrine" : "Blog / showcase site"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>{locale === "fr" ? "Recommande :" : "Recommended:"}</strong>{" "}
              <Link href="/outils/plausible" className="text-blue-600 hover:text-blue-800">Plausible</Link>{" "}
              {locale === "fr" ? "ou" : "or"}{" "}
              <Link href="/outils/umami" className="text-blue-600 hover:text-blue-800">Umami</Link>.{" "}
              {locale === "fr"
                ? "Legers, simples, conformes RGPD. Umami est gratuit en auto-hebergement."
                : "Lightweight, simple, GDPR-compliant. Umami is free when self-hosted."}
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === "fr" ? "Site e-commerce" : "E-commerce site"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>{locale === "fr" ? "Recommande :" : "Recommended:"}</strong>{" "}
              <Link href="/outils/matomo" className="text-blue-600 hover:text-blue-800">Matomo</Link>{" "}
              {locale === "fr" ? "ou" : "or"}{" "}
              <Link href="/outils/piwik-pro" className="text-blue-600 hover:text-blue-800">Piwik PRO</Link>.{" "}
              {locale === "fr"
                ? "Suivi e-commerce complet, entonnoirs de conversion, conformes RGPD."
                : "Complete e-commerce tracking, conversion funnels, GDPR-compliant."}
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === "fr" ? "Grande entreprise" : "Large enterprise"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>{locale === "fr" ? "Recommande :" : "Recommended:"}</strong>{" "}
              <Link href="/outils/adobe-analytics" className="text-blue-600 hover:text-blue-800">Adobe Analytics</Link>{" "}
              {locale === "fr" ? "ou" : "or"}{" "}
              <Link href="/outils/google-analytics-4" className="text-blue-600 hover:text-blue-800">GA4 360</Link>.{" "}
              {locale === "fr"
                ? "Fonctionnalites avancees, IA predictive, support dedie, SLA garanti."
                : "Advanced features, predictive AI, dedicated support, guaranteed SLA."}
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === "fr" ? "Budget zero" : "Zero budget"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>{locale === "fr" ? "Recommande :" : "Recommended:"}</strong>{" "}
              {freeTools.map((t, i) => (
                <span key={t.slug}>
                  {i > 0 && ", "}
                  <Link href={`/outils/${t.slug}`} className="text-blue-600 hover:text-blue-800">{t.name}</Link>
                </span>
              ))}
              .{" "}
              {locale === "fr"
                ? "Tous proposent une offre gratuite suffisante pour la plupart des besoins."
                : "All offer a free plan sufficient for most needs."}
            </p>
          </div>
        </div>
      </section>

      {/* Migration GA */}
      <section className="mb-12" aria-labelledby="migration">
        <h2 id="migration" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {locale === "fr" ? "Migrer depuis Google Analytics" : "Migrating from Google Analytics"}
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>{locale === "fr" ? "Choisissez votre alternative" : "Choose your alternative"}</strong> :{" "}
            {locale === "fr" ? "utilisez notre" : "use our"}{" "}
            <Link href="/comparer" className="text-blue-600 hover:text-blue-800">
              {locale === "fr" ? "comparatif" : "comparison"}
            </Link>{" "}
            {locale === "fr"
              ? "pour identifier l\u2019outil adapte a vos besoins."
              : "to identify the tool that fits your needs."}
          </li>
          <li>
            <strong>{locale === "fr" ? "Installez en parallele" : "Install in parallel"}</strong> :{" "}
            {locale === "fr"
              ? "faites tourner les deux outils pendant 2-4 semaines pour comparer les donnees et valider la fiabilite."
              : "run both tools for 2-4 weeks to compare data and validate reliability."}
          </li>
          <li>
            <strong>{locale === "fr" ? "Importez vos historiques" : "Import your history"}</strong> :{" "}
            {locale === "fr"
              ? "Matomo propose un import natif des donnees GA. Les autres outils repartent generalement de zero."
              : "Matomo offers native GA data import. Other tools generally start from scratch."}
          </li>
          <li>
            <strong>{locale === "fr" ? "Supprimez GA" : "Remove GA"}</strong> :{" "}
            {locale === "fr"
              ? "une fois satisfait, retirez le script Google Analytics et le bandeau de consentement associe."
              : "once satisfied, remove the Google Analytics script and the associated consent banner."}
          </li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <FaqSection
          items={guideFaq}
          heading={locale === "fr"
            ? "Questions frequentes sur le choix d'un outil analytics"
            : "Frequently asked questions about choosing an analytics tool"}
        />
      </section>

      {/* CTA */}
      <section className="bg-blue-50 dark:bg-blue-950 rounded-lg p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {locale === "fr" ? "Pret a comparer ?" : "Ready to compare?"}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
          {locale === "fr"
            ? "Consultez notre tableau comparatif complet avec les 8 outils analytics."
            : "Check out our complete comparison table with all 8 analytics tools."}
        </p>
        <Link
          href="/comparer"
          className="inline-flex items-center justify-center mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          {locale === "fr" ? "Voir le comparatif complet" : "View the full comparison"}
        </Link>
      </section>
    </article>
  );
}
