"use client";

import Link from "next/link";
import { tools } from "@/data/tools";
import { SITE_NAME, BASE_URL, CURRENT_YEAR } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FaqSection from "@/components/content/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import { Article } from "schema-dts";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { localize } from "@/lib/i18n/localize";

const articleJsonLd: Article = {
  "@type": "Article",
  headline: `Analytics conforme RGPD : guide complet ${CURRENT_YEAR}`,
  description: `Guide complet sur la conformite RGPD des outils analytics.`,
  url: `${BASE_URL}/ressources/rgpd-analytics`,
  inLanguage: "fr",
  datePublished: `${CURRENT_YEAR}-01-01`,
  dateModified: new Date().toISOString().split("T")[0],
  author: { "@type": "Organization", name: SITE_NAME },
  publisher: { "@type": "Organization", name: SITE_NAME },
};

export default function RgpdAnalyticsPage() {
  const { locale } = useTranslation();
  const compliantTools = tools.filter((t) => t.compliance.gdprCompliant);
  const cnilExemptTools = tools.filter((t) => t.compliance.cnilExempt);
  const cookielessTools = tools.filter((t) => t.compliance.cookieless);

  const rgpdFaq = locale === "fr"
    ? [
        {
          question: "Google Analytics est-il conforme au RGPD ?",
          answer: `Non, Google Analytics (GA4) n'est pas considere conforme au RGPD par la CNIL depuis fevrier 2022. Les donnees sont transferees aux serveurs Google aux USA, ce qui viole le RGPD apres l'invalidation du Privacy Shield. Le Consent Mode v2 et le server-side tagging ameliorent la situation mais ne resolvent pas completement le probleme.`,
        },
        {
          question: "Quels outils analytics sont exemptes de consentement par la CNIL ?",
          answer: `La CNIL exempte de consentement les outils analytics qui respectent certaines conditions : pas de cookies, pas de donnees personnelles, pas de suivi cross-site, donnees hebergees en UE. En ${CURRENT_YEAR}, les outils exemptes incluent Matomo (en configuration sans cookies), Plausible, Simple Analytics, Fathom, Umami et Piwik PRO (en mode cookieless).`,
        },
        {
          question: "Quelles sont les sanctions en cas de non-conformite RGPD ?",
          answer: "Les sanctions RGPD peuvent atteindre 20 millions d'euros ou 4 % du chiffre d'affaires mondial annuel (le montant le plus eleve est retenu). La CNIL a deja sanctionne des entreprises francaises pour utilisation non conforme de Google Analytics. Les mises en demeure sont publiques et impactent la reputation.",
        },
        {
          question: "Le Consent Mode v2 de Google rend-il GA4 conforme ?",
          answer: "Le Consent Mode v2 ameliore la conformite de GA4 en modelisant les donnees des utilisateurs qui refusent le consentement, mais ne resout pas le probleme fondamental du transfert de donnees vers les USA. Il reste necessaire d'afficher un bandeau de consentement et les donnees modelisees ne sont que des estimations.",
        },
      ]
    : [
        {
          question: "Is Google Analytics GDPR compliant?",
          answer: `No, Google Analytics (GA4) has not been considered GDPR compliant by the CNIL since February 2022. Data is transferred to Google servers in the USA, which violates the GDPR after the invalidation of the Privacy Shield. Consent Mode v2 and server-side tagging improve the situation but do not fully resolve the issue.`,
        },
        {
          question: "Which analytics tools are exempt from consent by the CNIL?",
          answer: `The CNIL exempts from consent analytics tools that meet certain conditions: no cookies, no personal data, no cross-site tracking, data hosted in the EU. In ${CURRENT_YEAR}, exempt tools include Matomo (in cookieless configuration), Plausible, Simple Analytics, Fathom, Umami, and Piwik PRO (in cookieless mode).`,
        },
        {
          question: "What are the penalties for GDPR non-compliance?",
          answer: "GDPR penalties can reach 20 million euros or 4% of annual global turnover (whichever is higher). The CNIL has already sanctioned French companies for non-compliant use of Google Analytics. Formal notices are public and impact reputation.",
        },
        {
          question: "Does Google's Consent Mode v2 make GA4 compliant?",
          answer: "Consent Mode v2 improves GA4 compliance by modeling data from users who refuse consent, but does not solve the fundamental problem of data transfers to the USA. A consent banner is still required and modeled data is only an estimate.",
        },
      ];

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={{ "@context": "https://schema.org", ...articleJsonLd }} />

      <Breadcrumb
        items={[
          { label: locale === "fr" ? "Ressources" : "Resources" },
          { label: locale === "fr" ? "RGPD Analytics" : "GDPR Analytics" },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          {locale === "fr"
            ? `Analytics conforme RGPD : le guide complet ${CURRENT_YEAR}`
            : `GDPR-Compliant Analytics: The Complete ${CURRENT_YEAR} Guide`}
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          {locale === "fr"
            ? "Tout savoir sur la conformite RGPD des outils analytics web : reglementation, recommandations CNIL, outils conformes et bonnes pratiques."
            : "Everything you need to know about GDPR compliance for web analytics tools: regulations, CNIL recommendations, compliant tools, and best practices."}
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-12 bg-emerald-50 border border-emerald-200 rounded-lg p-6">
        <p className="text-sm font-semibold text-emerald-900 uppercase tracking-wide mb-3">
          {locale === "fr" ? "En resume" : "Summary"}
        </p>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            {locale === "fr"
              ? <><strong>{compliantTools.length} outils sur {tools.length}</strong> sont conformes au RGPD dans notre comparatif.</>
              : <><strong>{compliantTools.length} out of {tools.length} tools</strong> are GDPR compliant in our comparison.</>}
          </li>
          <li>
            {locale === "fr"
              ? <><strong>{cnilExemptTools.length} outils</strong> sont exemptes de consentement par la CNIL.</>
              : <><strong>{cnilExemptTools.length} tools</strong> are exempt from consent by the CNIL.</>}
          </li>
          <li>
            {locale === "fr"
              ? <><strong>{cookielessTools.length} outils</strong> fonctionnent sans aucun cookie.</>
              : <><strong>{cookielessTools.length} tools</strong> work without any cookies.</>}
          </li>
          <li>
            {locale === "fr"
              ? <>Google Analytics n&apos;est <strong>pas considere conforme</strong> au RGPD par la CNIL.</>
              : <>Google Analytics is <strong>not considered compliant</strong> with the GDPR by the CNIL.</>}
          </li>
        </ul>
      </section>

      {/* Contexte reglementaire */}
      <section className="mb-12" aria-labelledby="contexte">
        <h2 id="contexte" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {locale === "fr" ? "Contexte reglementaire" : "Regulatory Context"}
        </h2>
        <div className="prose prose-sm text-gray-700 dark:text-gray-300 space-y-4">
          <p>
            {locale === "fr"
              ? "Le RGPD (Reglement General sur la Protection des Donnees), en vigueur depuis mai 2018, impose des regles strictes sur la collecte de donnees personnelles des residents europeens. Les outils analytics collectent par nature des donnees (adresses IP, identifiants de cookies, comportement de navigation) qui peuvent etre considerees comme personnelles."
              : "The GDPR (General Data Protection Regulation), in force since May 2018, imposes strict rules on the collection of personal data from European residents. Analytics tools inherently collect data (IP addresses, cookie identifiers, browsing behavior) that can be considered personal."}
          </p>
          <p>
            {locale === "fr" ? (
              <>
                En <strong>fevrier 2022</strong>, la CNIL a juge que l&apos;utilisation de Google Analytics
                violait le RGPD en raison du transfert de donnees vers les Etats-Unis, apres l&apos;invalidation
                du Privacy Shield par la Cour de Justice de l&apos;UE (arret Schrems II, juillet 2020).
              </>
            ) : (
              <>
                In <strong>February 2022</strong>, the CNIL ruled that the use of Google Analytics
                violated the GDPR due to data transfers to the United States, following the invalidation
                of the Privacy Shield by the EU Court of Justice (Schrems II ruling, July 2020).
              </>
            )}
          </p>
          <p>
            {locale === "fr"
              ? "Depuis, la CNIL recommande l'utilisation d'outils analytics qui ne transferent pas de donnees hors UE et qui peuvent fonctionner sans cookies ni donnees personnelles."
              : "Since then, the CNIL has recommended the use of analytics tools that do not transfer data outside the EU and that can function without cookies or personal data."}
          </p>
        </div>
      </section>

      {/* Outils conformes */}
      <section className="mb-12" aria-labelledby="outils-conformes">
        <h2 id="outils-conformes" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {locale === "fr" ? "Outils analytics conformes RGPD" : "GDPR-Compliant Analytics Tools"}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">
                  {locale === "fr" ? "Outil" : "Tool"}
                </th>
                <th className="text-center p-3 border border-gray-200 dark:border-gray-700 font-semibold">
                  {locale === "fr" ? "Conforme RGPD" : "GDPR Compliant"}
                </th>
                <th className="text-center p-3 border border-gray-200 dark:border-gray-700 font-semibold">
                  {locale === "fr" ? "Exempte CNIL" : "CNIL Exempt"}
                </th>
                <th className="text-center p-3 border border-gray-200 dark:border-gray-700 font-semibold">
                  {locale === "fr" ? "Sans cookies" : "Cookieless"}
                </th>
                <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">
                  {locale === "fr" ? "Donnees" : "Data"}
                </th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => (
                <tr key={tool.slug}>
                  <td className="p-3 border border-gray-200 dark:border-gray-700">
                    <Link href={`/outils/${tool.slug}`} className="text-emerald-700 hover:text-emerald-900 font-medium">
                      {tool.name}
                    </Link>
                  </td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-center">
                    {tool.compliance.gdprCompliant
                      ? <span className="text-green-600">{locale === "fr" ? "Oui" : "Yes"}</span>
                      : <span className="text-red-600">{locale === "fr" ? "Non" : "No"}</span>}
                  </td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-center">
                    {tool.compliance.cnilExempt
                      ? <span className="text-green-600">{locale === "fr" ? "Oui" : "Yes"}</span>
                      : <span className="text-red-600">{locale === "fr" ? "Non" : "No"}</span>}
                  </td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-center">
                    {tool.compliance.cookieless
                      ? <span className="text-green-600">{locale === "fr" ? "Oui" : "Yes"}</span>
                      : <span className="text-red-600">{locale === "fr" ? "Non" : "No"}</span>}
                  </td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">{localize(tool.compliance.dataLocation, locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bonnes pratiques */}
      <section className="mb-12" aria-labelledby="bonnes-pratiques">
        <h2 id="bonnes-pratiques" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {locale === "fr" ? "Bonnes pratiques pour etre conforme" : "Best Practices for Compliance"}
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <li>
            {locale === "fr" ? (
              <><strong>Choisissez un outil exempte de consentement CNIL</strong> : Matomo, Plausible, Umami, Fathom, Simple Analytics ou Piwik PRO en mode cookieless.</>
            ) : (
              <><strong>Choose a CNIL consent-exempt tool</strong>: Matomo, Plausible, Umami, Fathom, Simple Analytics, or Piwik PRO in cookieless mode.</>
            )}
          </li>
          <li>
            {locale === "fr" ? (
              <><strong>Hebergez les donnees en Europe</strong> : privilegiez les solutions avec des serveurs en UE ou l&apos;auto-hebergement sur vos propres serveurs francais.</>
            ) : (
              <><strong>Host data in Europe</strong>: favor solutions with EU servers or self-hosting on your own French servers.</>
            )}
          </li>
          <li>
            {locale === "fr" ? (
              <><strong>Activez l&apos;anonymisation IP</strong> : masquez les adresses IP des visiteurs avant stockage pour minimiser la collecte de donnees personnelles.</>
            ) : (
              <><strong>Enable IP anonymization</strong>: mask visitor IP addresses before storage to minimize personal data collection.</>
            )}
          </li>
          <li>
            {locale === "fr" ? (
              <><strong>Desactivez les cookies</strong> : utilisez le mode sans cookies quand il est disponible pour eviter l&apos;obligation de bandeau de consentement.</>
            ) : (
              <><strong>Disable cookies</strong>: use cookieless mode when available to avoid the consent banner requirement.</>
            )}
          </li>
          <li>
            {locale === "fr" ? (
              <><strong>Documentez votre conformite</strong> : tenez a jour votre registre de traitement, votre politique de confidentialite et votre analyse d&apos;impact (AIPD si necessaire).</>
            ) : (
              <><strong>Document your compliance</strong>: keep your processing register, privacy policy, and impact assessment (DPIA if necessary) up to date.</>
            )}
          </li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <FaqSection
          items={rgpdFaq}
          heading={locale === "fr" ? "Questions frequentes RGPD et analytics" : "Frequently Asked Questions: GDPR & Analytics"}
        />
      </section>

      {/* CTA */}
      <section className="bg-emerald-50 rounded-lg p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {locale === "fr"
            ? "Trouvez un outil analytics conforme RGPD"
            : "Find a GDPR-Compliant Analytics Tool"}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
          {locale === "fr"
            ? `Comparez les ${cnilExemptTools.length} outils exemptes de consentement CNIL dans notre comparatif.`
            : `Compare the ${cnilExemptTools.length} CNIL consent-exempt tools in our comparison.`}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/comparer"
            className="inline-flex items-center justify-center px-6 py-3 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-800 transition-colors"
          >
            {locale === "fr" ? "Voir le comparatif" : "View Comparison"}
          </Link>
          <Link
            href="/categorie/privacy-first"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {locale === "fr" ? "Outils privacy-first" : "Privacy-First Tools"}
          </Link>
        </div>
      </section>
    </article>
  );
}
