"use client";

import { SITE_NAME, BASE_URL, CURRENT_YEAR } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { Article } from "schema-dts";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

const articleJsonLd: Article = {
  "@type": "Article",
  headline: `Politique de cookies - DevRadar`,
  description: `Politique de cookies du site DevRadar.`,
  url: `${BASE_URL}/politique-cookies`,
  inLanguage: "fr",
  datePublished: `${CURRENT_YEAR}-01-01`,
  dateModified: "2026-03-05",
  author: { "@type": "Organization", name: SITE_NAME },
  publisher: { "@type": "Organization", name: SITE_NAME },
};

export default function PolitiqueCookiesPage() {
  const { locale } = useTranslation();

  const cookieTableHeaders = locale === "fr"
    ? ["Nom du cookie", "Finalite", "Duree", "Emetteur"]
    : ["Cookie Name", "Purpose", "Duration", "Issuer"];

  const necessaryCookies = [
    {
      name: "devradar_consent",
      purpose: locale === "fr"
        ? "Stocke votre choix de consentement (accepte / refuse) pour les cookies analytics"
        : "Stores your consent choice (accepted / refused) for analytics cookies",
      duration: locale === "fr" ? "12 mois" : "12 months",
      emitter: "DevRadar (1st party)",
    },
    {
      name: "devradar_visited",
      purpose: locale === "fr"
        ? "Differencie les visiteurs nouveaux et recurrents pour la segmentation analytics (sans donnees personnelles)"
        : "Differentiates new and returning visitors for analytics segmentation (without personal data)",
      duration: locale === "fr" ? "Persistant (localStorage)" : "Persistent (localStorage)",
      emitter: "DevRadar (1st party)",
    },
  ];

  const piwikCookies = [
    {
      name: "_pk_id.*",
      purpose: locale === "fr"
        ? "Identifiant visiteur anonyme pour la mesure d'audience"
        : "Anonymous visitor identifier for audience measurement",
      duration: locale === "fr" ? "13 mois" : "13 months",
      emitter: "Piwik PRO",
    },
    {
      name: "_pk_ses.*",
      purpose: locale === "fr"
        ? "Identifiant de session pour regrouper les pages vues"
        : "Session identifier to group page views",
      duration: locale === "fr" ? "30 minutes" : "30 minutes",
      emitter: "Piwik PRO",
    },
    {
      name: "stg_*",
      purpose: locale === "fr"
        ? "Cookies du Tag Manager Piwik PRO pour le declenchement conditionnel des balises"
        : "Piwik PRO Tag Manager cookies for conditional tag triggering",
      duration: locale === "fr" ? "Variable (session a 12 mois)" : "Variable (session to 12 months)",
      emitter: "Piwik PRO",
    },
  ];

  const ahrefsCookies = [
    {
      name: "ahrefs_*",
      purpose: locale === "fr" ? "Mesure de trafic et analyse SEO" : "Traffic measurement and SEO analysis",
      duration: "Variable",
      emitter: "Ahrefs Pte. Ltd.",
    },
  ];

  const CookieTable = ({ rows }: { rows: typeof necessaryCookies }) => (
    <div className="overflow-x-auto mt-3">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800">
            {cookieTableHeaders.map((h) => (
              <th key={h} className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}>
              <td className="p-3 border border-gray-200 dark:border-gray-700">
                <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">{row.name}</code>
              </td>
              <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">{row.purpose}</td>
              <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 whitespace-nowrap">{row.duration}</td>
              <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">{row.emitter}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const sections = [
    {
      id: "definition",
      title: locale === "fr" ? "1. Qu'est-ce qu'un cookie ?" : "1. What Is a Cookie?",
      content: (
        <p>
          {locale === "fr"
            ? "Un cookie est un petit fichier texte depose sur votre terminal (ordinateur, smartphone, tablette) lors de la visite d'un site web. Il permet au site de memoriser des informations sur votre visite (preferences, choix de consentement, donnees de navigation)."
            : "A cookie is a small text file placed on your device (computer, smartphone, tablet) when you visit a website. It allows the website to remember information about your visit (preferences, consent choices, browsing data)."}
        </p>
      ),
    },
    {
      id: "cookies-utilises",
      title: locale === "fr" ? "2. Cookies utilises sur DevRadar" : "2. Cookies Used on DevRadar",
      content: (
        <div className="space-y-8">
          {/* 2.1 */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {locale === "fr" ? "2.1 Cookies strictement necessaires" : "2.1 Strictly Necessary Cookies"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-3 mb-2">
              {locale === "fr"
                ? "Ces cookies sont indispensables au fonctionnement du site. Ils ne necessitent pas votre consentement (article 82 de la loi Informatique et Libertes, exemption CNIL)."
                : "These cookies are essential for the website to function. They do not require your consent (Article 82 of the French Data Protection Act, CNIL exemption)."}
            </p>
            <CookieTable rows={necessaryCookies} />
          </div>

          {/* 2.2 */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {locale === "fr" ? "2.2 Cookies analytics — Piwik PRO" : "2.2 Analytics Cookies — Piwik PRO"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-3 mb-2">
              {locale === "fr"
                ? "Ces cookies sont deposes uniquement apres votre consentement explicite. Ils permettent de mesurer l'audience du site de maniere anonymisee. Piwik PRO est une solution europeenne hebergee en Allemagne (UE)."
                : "These cookies are only placed after your explicit consent. They enable anonymized audience measurement. Piwik PRO is a European solution hosted in Germany (EU)."}
            </p>
            <CookieTable rows={piwikCookies} />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
              {locale === "fr"
                ? "Donnees collectees : pages visitees, duree de visite, profondeur de scroll, clics CTA, source de trafic, type d'appareil et navigateur. Aucun fingerprinting, aucune donnee personnelle identifiante."
                : "Data collected: pages visited, visit duration, scroll depth, CTA clicks, traffic source, device type and browser. No fingerprinting, no personally identifiable data."}
            </p>
          </div>

          {/* 2.3 */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {locale === "fr" ? "2.3 Cookies tiers — Ahrefs Analytics" : "2.3 Third-Party Cookies — Ahrefs Analytics"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-3 mb-2">
              {locale === "fr"
                ? "Depose uniquement apres votre consentement. Utilise pour l'analyse SEO du site."
                : "Only placed after your consent. Used for SEO analysis of the website."}
            </p>
            <CookieTable rows={ahrefsCookies} />
          </div>
        </div>
      ),
    },
    {
      id: "consentement",
      title: locale === "fr" ? "3. Gestion de votre consentement" : "3. Managing Your Consent",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === "fr" ? "3.1 Bandeau de consentement" : "3.1 Consent Banner"}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              {locale === "fr"
                ? "Lors de votre premiere visite, un bandeau vous propose d'accepter ou de refuser les cookies non essentiels. Conformement aux recommandations de la CNIL :"
                : "On your first visit, a banner offers you the choice to accept or refuse non-essential cookies. In accordance with CNIL recommendations:"}
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>
                {locale === "fr" ? (
                  <>Le bouton <strong>Refuser</strong> est aussi visible et accessible que le bouton <strong>Accepter</strong></>
                ) : (
                  <>The <strong>Refuse</strong> button is as visible and accessible as the <strong>Accept</strong> button</>
                )}
              </li>
              <li>{locale === "fr" ? "Aucun cookie non essentiel n'est depose avant votre choix" : "No non-essential cookie is placed before your choice"}</li>
              <li>
                {locale === "fr"
                  ? "Le site reste entierement fonctionnel si vous refusez (pas de cookie wall)"
                  : "The website remains fully functional if you refuse (no cookie wall)"}
              </li>
              <li>{locale === "fr" ? "Votre choix est conserve 12 mois, puis le bandeau reapparait" : "Your choice is stored for 12 months, then the banner reappears"}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === "fr" ? "3.2 Modifier votre choix" : "3.2 Change Your Choice"}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {locale === "fr"
                ? "Vous pouvez modifier votre choix a tout moment en supprimant les donnees du site dans les parametres de votre navigateur (localStorage), ce qui fera reapparaitre le bandeau de consentement."
                : "You can change your choice at any time by deleting the site data in your browser settings (localStorage), which will make the consent banner reappear."}
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === "fr" ? "3.3 Parametres du navigateur" : "3.3 Browser Settings"}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              {locale === "fr"
                ? "Vous pouvez egalement configurer votre navigateur pour bloquer les cookies :"
                : "You can also configure your browser to block cookies:"}
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <strong>Chrome</strong> : {locale === "fr" ? "Parametres > Confidentialite et securite > Cookies" : "Settings > Privacy and Security > Cookies"}
              </li>
              <li>
                <strong>Firefox</strong> : {locale === "fr" ? "Parametres > Vie privee et securite > Cookies" : "Settings > Privacy & Security > Cookies"}
              </li>
              <li>
                <strong>Safari</strong> : {locale === "fr" ? "Preferences > Confidentialite > Cookies" : "Preferences > Privacy > Cookies"}
              </li>
              <li>
                <strong>Edge</strong> : {locale === "fr" ? "Parametres > Cookies et autorisations de site" : "Settings > Cookies and site permissions"}
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "refus",
      title: locale === "fr" ? "4. Consequences du refus des cookies" : "4. Consequences of Refusing Cookies",
      content: (
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {locale === "fr" ? "Si vous refusez les cookies analytics :" : "If you refuse analytics cookies:"}
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>{locale === "fr" ? "Le site reste entierement fonctionnel (scanner, comparateur, guides)" : "The website remains fully functional (scanner, comparator, guides)"}</li>
            <li>{locale === "fr" ? "Aucune donnee de navigation n'est collectee" : "No browsing data is collected"}</li>
            <li>{locale === "fr" ? "Aucun cookie Piwik PRO ou Ahrefs n'est depose" : "No Piwik PRO or Ahrefs cookie is placed"}</li>
            <li>
              {locale === "fr" ? (
                <>
                  Seul le cookie de consentement (
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">devradar_consent</code>) est
                  conserve pour memoriser votre refus
                </>
              ) : (
                <>
                  Only the consent cookie (
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">devradar_consent</code>) is
                  stored to remember your refusal
                </>
              )}
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "durees",
      title: locale === "fr" ? "5. Durees de conservation" : "5. Retention Periods",
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                {(locale === "fr" ? ["Categorie", "Duree maximale", "Conformite"] : ["Category", "Maximum Duration", "Compliance"]).map((h) => (
                  <th key={h} className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(locale === "fr"
                ? [
                    ["Cookie de consentement", "12 mois", "Recommandation CNIL"],
                    ["Cookies analytics Piwik PRO", "13 mois", "Recommandation CNIL (25 mois max pour les donnees)"],
                    ["Donnees collectees via Piwik PRO", "25 mois", "Recommandation CNIL"],
                  ]
                : [
                    ["Consent cookie", "12 months", "CNIL recommendation"],
                    ["Piwik PRO analytics cookies", "13 months", "CNIL recommendation (25 months max for data)"],
                    ["Data collected via Piwik PRO", "25 months", "CNIL recommendation"],
                  ]
              ).map(([cat, duree, conf], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">{cat}</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 whitespace-nowrap">{duree}</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs">{conf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: "transferts",
      title: locale === "fr" ? "6. Transferts de donnees" : "6. Data Transfers",
      content: (
        <p>
          {locale === "fr" ? (
            <>
              Les donnees collectees via les cookies analytics sont hebergees par Piwik PRO en{" "}
              <strong>Union Europeenne (Allemagne)</strong>. Aucun transfert hors UE n&apos;est effectue
              pour les donnees analytics.
            </>
          ) : (
            <>
              Data collected through analytics cookies is hosted by Piwik PRO in the{" "}
              <strong>European Union (Germany)</strong>. No transfers outside the EU are made
              for analytics data.
            </>
          )}
        </p>
      ),
    },
    {
      id: "droits",
      title: locale === "fr" ? "7. Vos droits" : "7. Your Rights",
      content: (
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {locale === "fr"
              ? "Conformement au RGPD (articles 15 a 22), vous disposez de droits sur vos donnees personnelles. Pour plus de details, consultez notre politique de confidentialite."
              : "In accordance with the GDPR (Articles 15 to 22), you have rights over your personal data. For more details, see our privacy policy."}
          </p>
          <ul className="list-none space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>
              <span className="font-medium">Contact :</span>{" "}
              <a href="mailto:contact@devradar.fr" className="text-emerald-700 hover:underline">
                contact@devradar.fr
              </a>
            </li>
            <li>
              <span className="font-medium">{locale === "fr" ? "Autorite de controle :" : "Supervisory authority:"}</span>{" "}
              CNIL —{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                www.cnil.fr
              </a>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "references",
      title: locale === "fr" ? "8. References reglementaires" : "8. Regulatory References",
      content: (
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>{locale === "fr" ? "Reglement General sur la Protection des Donnees (RGPD — Reglement UE 2016/679)" : "General Data Protection Regulation (GDPR — EU Regulation 2016/679)"}</li>
          <li>{locale === "fr" ? "Directive ePrivacy (2002/58/CE modifiee)" : "ePrivacy Directive (2002/58/EC as amended)"}</li>
          <li>{locale === "fr" ? "Loi Informatique et Libertes — Article 82 (transposition ePrivacy)" : "French Data Protection Act — Article 82 (ePrivacy transposition)"}</li>
          <li>
            {locale === "fr"
              ? "CNIL — Lignes directrices cookies et traceurs (deliberation n. 2020-091 du 17 septembre 2020)"
              : "CNIL — Cookie and tracker guidelines (deliberation no. 2020-091, September 17, 2020)"}
          </li>
          <li>
            {locale === "fr"
              ? "CNIL — Recommandation cookies (deliberation n. 2020-092 du 17 septembre 2020)"
              : "CNIL — Cookie recommendation (deliberation no. 2020-092, September 17, 2020)"}
          </li>
        </ul>
      ),
    },
  ];

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={{ "@context": "https://schema.org", ...articleJsonLd }} />

      <Breadcrumb
        items={[
          { label: locale === "fr" ? "Legal" : "Legal" },
          { label: locale === "fr" ? "Politique de cookies" : "Cookie Policy" },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          {locale === "fr" ? "Politique de cookies" : "Cookie Policy"}
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          {locale === "fr" ? "Derniere mise a jour : 5 mars 2026" : "Last updated: March 5, 2026"}
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {locale === "fr"
            ? "Conformement au RGPD, a la directive ePrivacy et aux lignes directrices de la CNIL (deliberation n. 2020-091)."
            : "In compliance with the GDPR, the ePrivacy Directive, and CNIL guidelines (deliberation no. 2020-091)."}
        </p>
      </header>

      {/* Resume */}
      <section className="mb-12 bg-emerald-50 border border-emerald-200 rounded-lg p-6">
        <p className="text-sm font-semibold text-emerald-900 uppercase tracking-wide mb-3">
          {locale === "fr" ? "En resume" : "Summary"}
        </p>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            {locale === "fr" ? (
              <>Seul le cookie <code className="bg-white dark:bg-gray-900 border border-emerald-100 px-1 rounded text-xs">devradar_consent</code> est depose <strong>sans votre accord</strong>.</>
            ) : (
              <>Only the <code className="bg-white dark:bg-gray-900 border border-emerald-100 px-1 rounded text-xs">devradar_consent</code> cookie is placed <strong>without your consent</strong>.</>
            )}
          </li>
          <li>
            {locale === "fr"
              ? <>Les cookies analytics (Piwik PRO) ne sont actives <strong>qu&apos;apres votre consentement explicite</strong>.</>
              : <>Analytics cookies (Piwik PRO) are only activated <strong>after your explicit consent</strong>.</>}
          </li>
          <li>
            {locale === "fr"
              ? <>Le site reste <strong>entierement fonctionnel</strong> si vous refusez tous les cookies non essentiels.</>
              : <>The website remains <strong>fully functional</strong> if you refuse all non-essential cookies.</>}
          </li>
          <li>
            {locale === "fr"
              ? <>Les donnees analytics sont hebergees en <strong>Union Europeenne (Allemagne)</strong>.</>
              : <>Analytics data is hosted in the <strong>European Union (Germany)</strong>.</>}
          </li>
        </ul>
      </section>

      {/* Sommaire */}
      <nav className="mb-12 border border-gray-200 dark:border-gray-700 rounded-lg p-6" aria-label={locale === "fr" ? "Sommaire" : "Table of Contents"}>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
          {locale === "fr" ? "Sommaire" : "Table of Contents"}
        </p>
        <ol className="space-y-1 text-sm text-emerald-700">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="hover:underline">
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Sections */}
      {sections.map((section) => (
        <section key={section.id} className="mb-10" aria-labelledby={section.id}>
          <h2 id={section.id} className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {section.title}
          </h2>
          <div className="prose prose-sm text-gray-700 dark:text-gray-300">{section.content}</div>
        </section>
      ))}

      {/* Contact */}
      <section className="bg-emerald-50 rounded-lg p-8 text-center mt-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {locale === "fr" ? "Gerer vos preferences cookies" : "Manage Your Cookie Preferences"}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
          {locale === "fr"
            ? "Pour toute question sur nos cookies ou pour exercer vos droits, contactez-nous."
            : "For any questions about our cookies or to exercise your rights, contact us."}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:contact@devradar.fr"
            className="inline-flex items-center justify-center px-6 py-3 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-800 transition-colors"
          >
            {locale === "fr" ? "Nous contacter" : "Contact Us"}
          </a>
          <a
            href="/politique-confidentialite"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {locale === "fr" ? "Politique de confidentialite" : "Privacy Policy"}
          </a>
        </div>
      </section>
    </article>
  );
}
