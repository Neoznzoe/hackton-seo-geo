"use client";

import Link from "next/link";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import ToolCard from "@/components/tools/ToolCard";
import CategoryCard from "@/components/categories/CategoryCard";
import FaqSection from "@/components/content/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/constants";
import { ItemList } from "schema-dts";
import TrackedCta from "@/components/analytics/HomeCtaTracker";
import HomeScannerCta from "@/components/scanner/HomeScannerCta";
import { useLocalized } from "@/lib/i18n/useLocalized";

const homeFaq = [
  {
    question: {
      fr: `Quel est le meilleur outil analytics en ${new Date().getFullYear()} ?`,
      en: `What is the best analytics tool in ${new Date().getFullYear()}?`,
    },
    answer: {
      fr: `Le meilleur outil analytics depend de vos besoins. Google Analytics 4 est le plus complet et gratuit (25 millions d'evenements/mois). Matomo est la reference pour la conformite RGPD avec auto-hebergement gratuit. Plausible est le choix ideal pour la simplicite et le respect de la vie privee (script < 1 ko). Pour les grandes entreprises, Adobe Analytics offre l'IA predictive et l'attribution avancee.`,
      en: `The best analytics tool depends on your needs. Google Analytics 4 is the most comprehensive and free (25 million events/month). Matomo is the reference for GDPR compliance with free self-hosting. Plausible is the ideal choice for simplicity and privacy (script < 1 KB). For large enterprises, Adobe Analytics offers predictive AI and advanced attribution.`,
    },
  },
  {
    question: {
      fr: "Quel outil analytics est conforme au RGPD sans bandeau cookies ?",
      en: "Which analytics tool is GDPR-compliant without a cookie banner?",
    },
    answer: {
      fr: "6 outils sur 8 sont exemptes de consentement CNIL : Matomo (en configuration sans cookies), Plausible, Simple Analytics, Fathom, Umami et Piwik PRO (en mode cookieless). La CNIL recommande officiellement Matomo en configuration respectueuse de la vie privee. Ces outils ne collectent aucune donnee personnelle et fonctionnent sans cookies.",
      en: "6 out of 8 tools are exempt from CNIL consent: Matomo (in cookieless configuration), Plausible, Simple Analytics, Fathom, Umami, and Piwik PRO (in cookieless mode). The CNIL officially recommends Matomo in a privacy-friendly configuration. These tools do not collect any personal data and work without cookies.",
    },
  },
  {
    question: {
      fr: "Existe-t-il des alternatives gratuites a Google Analytics ?",
      en: "Are there free alternatives to Google Analytics?",
    },
    answer: {
      fr: "Oui, 4 alternatives gratuites existent : Matomo On-Premise (open source, auto-heberge, fonctionnalites comparables a GA4), Umami (open source, MIT License, interface moderne), Piwik PRO Core (500 000 actions/mois gratuites, consent manager inclus) et Google Analytics 4 lui-meme. Matomo et Umami offrent en plus un controle total des donnees et la conformite RGPD.",
      en: "Yes, 4 free alternatives exist: Matomo On-Premise (open source, self-hosted, features comparable to GA4), Umami (open source, MIT License, modern interface), Piwik PRO Core (500,000 free actions/month, consent manager included), and Google Analytics 4 itself. Matomo and Umami also offer full data control and GDPR compliance.",
    },
  },
  {
    question: {
      fr: "Comment choisir entre Matomo et Plausible ?",
      en: "How to choose between Matomo and Plausible?",
    },
    answer: {
      fr: "Matomo est le choix pour les sites complexes : suivi e-commerce, heatmaps, A/B testing, import GA, auto-hebergement gratuit. Plausible est le choix pour la simplicite : script ultra-leger (< 1 ko vs 45 ko pour GA4), tableau de bord epure, tarifs a partir de 9 \u20ac/mois. Les deux sont conformes RGPD et exemptes de consentement CNIL.",
      en: "Matomo is the choice for complex sites: e-commerce tracking, heatmaps, A/B testing, GA import, free self-hosting. Plausible is the choice for simplicity: ultra-light script (< 1 KB vs 45 KB for GA4), clean dashboard, pricing from \u20ac9/month. Both are GDPR-compliant and CNIL consent-exempt.",
    },
  },
  {
    question: {
      fr: "Qu'est-ce que DevRadar ?",
      en: "What is DevRadar?",
    },
    answer: {
      fr: "DevRadar est un comparateur independant d'outils analytics web cree en France. Il analyse et compare 8 solutions (GA4, Matomo, Plausible, Piwik PRO, Simple Analytics, Fathom, Adobe Analytics, Umami) sur des criteres objectifs : fonctionnalites, tarifs, conformite RGPD/CNIL et facilite d'utilisation. Aucun classement sponsorise.",
      en: "DevRadar is an independent web analytics tool comparator created in France. It analyzes and compares 8 solutions (GA4, Matomo, Plausible, Piwik PRO, Simple Analytics, Fathom, Adobe Analytics, Umami) on objective criteria: features, pricing, GDPR/CNIL compliance, and ease of use. No sponsored rankings.",
    },
  },
  {
    question: {
      fr: "Quelles sont les recommandations de la CNIL pour les analytics ?",
      en: "What are the CNIL recommendations for analytics?",
    },
    answer: {
      fr: "La CNIL recommande d'utiliser des outils analytics qui ne transferent pas de donnees hors UE, fonctionnent sans cookies et ne collectent pas de donnees personnelles. Depuis fevrier 2022, la CNIL considere Google Analytics non conforme au RGPD. Elle recommande Matomo en configuration sans cookies comme alternative et exempte de consentement 6 outils de notre comparatif.",
      en: "The CNIL recommends using analytics tools that do not transfer data outside the EU, work without cookies, and do not collect personal data. Since February 2022, the CNIL considers Google Analytics non-compliant with the GDPR. It recommends Matomo in cookieless configuration as an alternative and exempts 6 tools from our comparison from consent requirements.",
    },
  },
  {
    question: {
      fr: "Quel est le meilleur outil analytics open source ?",
      en: "What is the best open source analytics tool?",
    },
    answer: {
      fr: "Matomo est le meilleur outil analytics open source en termes de fonctionnalites : suivi e-commerce, heatmaps, A/B testing, import GA, exempte CNIL. Umami (licence MIT) est le plus leger et le plus simple a deployer (Docker, Vercel, Railway). Plausible (AGPL) offre le meilleur compromis simplicite/conformite avec un script < 1 ko.",
      en: "Matomo is the best open source analytics tool in terms of features: e-commerce tracking, heatmaps, A/B testing, GA import, CNIL exempt. Umami (MIT license) is the lightest and simplest to deploy (Docker, Vercel, Railway). Plausible (AGPL) offers the best simplicity/compliance compromise with a script < 1 KB.",
    },
  },
  {
    question: {
      fr: "Combien coute un outil analytics ?",
      en: "How much does an analytics tool cost?",
    },
    answer: {
      fr: "Les prix varient de 0 \u20ac a plus de 100 000 $/an. Gratuits : GA4 (25M evenements/mois), Matomo On-Premise, Umami self-hosted, Piwik PRO Core (500K actions/mois). Abordables : Plausible a partir de 9 \u20ac/mois, Umami Cloud 9 $/mois, Fathom 15 $/mois. Entreprise : Adobe Analytics et GA4 360 sur devis (100 000+ $/an).",
      en: "Prices range from \u20ac0 to over $100,000/year. Free: GA4 (25M events/month), Matomo On-Premise, Umami self-hosted, Piwik PRO Core (500K actions/month). Affordable: Plausible from \u20ac9/month, Umami Cloud $9/month, Fathom $15/month. Enterprise: Adobe Analytics and GA4 360 on request ($100,000+/year).",
    },
  },
];

const itemListJsonLd: ItemList = {
  "@type": "ItemList",
  itemListElement: tools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.name,
    url: `${BASE_URL}/outils/${tool.slug}`,
  })),
};

export default function HomePage() {
  const { locale, l } = useLocalized();

  const localizedFaq = homeFaq.map((item) => ({
    question: l(item.question),
    answer: l(item.answer),
  }));

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...itemListJsonLd }} />

      {/* Hero -- Scanner as primary action */}
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 bg-white/15 rounded-full text-sm font-medium text-emerald-100">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            {locale === "fr" ? "Gratuit et sans inscription" : "Free and no signup required"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {locale === "fr"
              ? "Votre site est-il conforme RGPD ?"
              : "Is your website GDPR compliant?"}
          </h1>
          <p className="mt-4 text-lg text-emerald-100 max-w-2xl mx-auto">
            {locale === "fr"
              ? "Scannez votre site en quelques secondes : detection des trackers, pixels, bandeaux cookies et pages legales. Score de conformite instantane avec recommandations personnalisees."
              : "Scan your website in seconds: tracker detection, pixels, cookie banners, and legal pages. Instant compliance score with personalized recommendations."}
          </p>

          <div className="mt-10">
            <HomeScannerCta />
          </div>

          <p className="text-sm text-emerald-200 mt-4">
            {locale === "fr"
              ? "Analyse multi-pages automatique via sitemap. Jusqu\u2019a 50 pages scannees."
              : "Automatic multi-page analysis via sitemap. Up to 50 pages scanned."}
          </p>
        </div>
      </section>

      {/* CTA secondaire -- Comparer les outils */}
      <section className="py-10 bg-white dark:bg-gray-900 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {locale === "fr"
              ? "Vous cherchez un outil analytics ? Comparez 8 solutions sur les prix, fonctionnalites et conformite RGPD."
              : "Looking for an analytics tool? Compare 8 solutions on pricing, features, and GDPR compliance."}
          </p>
          <TrackedCta
            href="/comparer"
            label={locale === "fr" ? "Comparer les outils analytics" : "Compare analytics tools"}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          />
        </div>
      </section>

      {/* Outils */}
      <section id="outils" className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {locale === "fr" ? "8 outils analytics compares" : "8 analytics tools compared"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {locale === "fr"
              ? "De la solution gratuite a la suite entreprise, trouvez l\u2019outil qui correspond a votre projet."
              : "From free solutions to enterprise suites, find the tool that fits your project."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
          <div className="text-center mt-8">
            <TrackedCta
              href="/comparer"
              label={locale === "fr" ? "Comparer les outils entre eux" : "Compare tools side by side"}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {locale === "fr" ? "Explorez par categorie" : "Explore by category"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {locale === "fr"
              ? "Filtrez les outils analytics selon vos criteres prioritaires."
              : "Filter analytics tools by your priority criteria."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.slug}
                category={cat}
                toolCount={getToolsByCategory(cat.slug).length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA -- rappel scanner */}
      <section className="py-14 bg-gradient-to-br from-emerald-800 to-emerald-950 text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            {locale === "fr"
              ? "Pret a verifier votre conformite ?"
              : "Ready to check your compliance?"}
          </h2>
          <p className="text-emerald-100 mb-8">
            {locale === "fr"
              ? "Lancez un scan gratuit maintenant et recevez votre score RGPD en quelques secondes."
              : "Launch a free scan now and get your GDPR score in seconds."}
          </p>
          <HomeScannerCta />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FaqSection items={localizedFaq} />
        </div>
      </section>
    </>
  );
}
