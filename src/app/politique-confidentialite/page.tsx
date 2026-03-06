"use client";

import { SITE_NAME, BASE_URL, CURRENT_YEAR } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { Article } from "schema-dts";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

const articleJsonLd: Article = {
  "@type": "Article",
  headline: `Politique de confidentialite - DevRadar`,
  description: `Politique de confidentialite du site DevRadar.`,
  url: `${BASE_URL}/politique-confidentialite`,
  inLanguage: "fr",
  datePublished: `${CURRENT_YEAR}-01-01`,
  dateModified: "2026-03-05",
  author: { "@type": "Organization", name: SITE_NAME },
  publisher: { "@type": "Organization", name: SITE_NAME },
};

export default function PolitiqueConfidentialitePage() {
  const { locale } = useTranslation();

  const sections = [
    {
      id: "responsable",
      title: locale === "fr" ? "1. Responsable du traitement" : "1. Data Controller",
      content: (
        <div>
          <p className="mb-3">
            {locale === "fr"
              ? "Le responsable du traitement des donnees est l'equipe DevRadar, dans le cadre du projet hackathon M2 IW."
              : "The data controller is the DevRadar team, as part of the M2 IW hackathon project."}
          </p>
          <ul className="list-none space-y-1 text-sm">
            <li>
              <span className="font-medium">{locale === "fr" ? "Site web :" : "Website:"}</span>{" "}
              <a
                href="https://www.devradar.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                https://www.devradar.fr
              </a>
            </li>
            <li>
              <span className="font-medium">Contact :</span>{" "}
              <a href="mailto:contact@devradar.fr" className="text-emerald-700 hover:underline">
                contact@devradar.fr
              </a>{" "}
              <span className="text-gray-500 dark:text-gray-400">
                ({locale === "fr" ? "adresse projet" : "project email"})
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "donnees-collectees",
      title: locale === "fr" ? "2. Donnees collectees" : "2. Data Collected",
      content: (
        <div className="space-y-8">
          {/* 2.1 */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === "fr" ? "2.1 Donnees de navigation (analytics)" : "2.1 Browsing Data (Analytics)"}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              {locale === "fr"
                ? "Nous utilisons Piwik PRO, une solution d'analytics respectueuse de la vie privee, hebergee en Union Europeenne. Les donnees collectees incluent :"
                : "We use Piwik PRO, a privacy-respecting analytics solution hosted in the European Union. The data collected includes:"}
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-3">
              <li>{locale === "fr" ? "Pages visitees et parcours de navigation" : "Pages visited and navigation paths"}</li>
              <li>{locale === "fr" ? "Duree de visite et profondeur de scroll" : "Visit duration and scroll depth"}</li>
              <li>{locale === "fr" ? "Source de trafic (referrer)" : "Traffic source (referrer)"}</li>
              <li>{locale === "fr" ? "Type d'appareil et navigateur (sans fingerprinting)" : "Device type and browser (without fingerprinting)"}</li>
              <li>{locale === "fr" ? "Evenements d'interaction (clics CTA, utilisation du scanner)" : "Interaction events (CTA clicks, scanner usage)"}</li>
            </ul>
            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-3">
              <span className="font-medium">{locale === "fr" ? "Base legale :" : "Legal basis:"}</span>{" "}
              {locale === "fr"
                ? "Consentement (article 6.1.a du RGPD). Le tracking n'est active qu'apres acceptation explicite via notre bandeau de consentement."
                : "Consent (Article 6.1.a of the GDPR). Tracking is only activated after explicit acceptance via our consent banner."}
            </p>
          </div>

          {/* 2.2 */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === "fr" ? "2.2 Donnees du scanner RGPD" : "2.2 GDPR Scanner Data"}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              {locale === "fr"
                ? "Lorsque vous utilisez notre scanner de conformite, nous traitons :"
                : "When you use our compliance scanner, we process:"}
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-3">
              <li>{locale === "fr" ? "L'URL du site soumis a l'analyse" : "The URL of the website submitted for analysis"}</li>
              <li>{locale === "fr" ? "Les resultats du scan (outils detectes, score)" : "Scan results (detected tools, score)"}</li>
            </ul>
            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-3 mb-3">
              <span className="font-medium">{locale === "fr" ? "Base legale :" : "Legal basis:"}</span>{" "}
              {locale === "fr"
                ? "Interet legitime (article 6.1.f du RGPD) — fournir le service demande par l'utilisateur."
                : "Legitimate interest (Article 6.1.f of the GDPR) — providing the service requested by the user."}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {locale === "fr"
                ? "Aucune donnee personnelle du site scanne n'est stockee. Seul le code HTML public est analyse de maniere ephemere."
                : "No personal data from the scanned website is stored. Only public HTML code is analyzed in a transient manner."}
            </p>
          </div>

          {/* 2.3 */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === "fr" ? "2.3 Donnees de veille concurrentielle (scraping)" : "2.3 Competitive Intelligence Data (Scraping)"}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              {locale === "fr" ? (
                <>
                  Notre module de veille concurrentielle collecte exclusivement des donnees produit
                  publiquement accessibles (tarifs, fonctionnalites) sur les sites des outils analytics.{" "}
                  <strong>Aucune donnee personnelle n&apos;est collectee via le scraping.</strong>
                </>
              ) : (
                <>
                  Our competitive intelligence module exclusively collects publicly accessible product data
                  (pricing, features) from analytics tool websites.{" "}
                  <strong>No personal data is collected through scraping.</strong>
                </>
              )}
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>
                {locale === "fr" ? "Respect systematique du fichier" : "Systematic compliance with the"}{" "}
                <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">robots.txt</code>{" "}
                {locale === "fr" ? "de chaque site cible" : "file of each target website"}
              </li>
              <li>
                {locale === "fr"
                  ? "Rate limiting : minimum 2 secondes entre chaque requete"
                  : "Rate limiting: minimum 2 seconds between each request"}
              </li>
              <li>
                {locale === "fr" ? "User-Agent identifie :" : "Identified User-Agent:"}{" "}
                <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">DevRadarBot/1.0</code>
              </li>
              <li>{locale === "fr" ? "Journalisation complete de chaque operation" : "Complete logging of each operation"}</li>
              <li>{locale === "fr" ? "Donnees minimisees : seules les informations produit sont extraites" : "Minimized data: only product information is extracted"}</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "cookies",
      title: locale === "fr" ? "3. Cookies et technologies de suivi" : "3. Cookies and Tracking Technologies",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === "fr" ? "3.1 Cookies essentiels" : "3.1 Essential Cookies"}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {locale === "fr" ? (
                <>
                  Cookie de consentement (
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">devradar_consent</code>) : stocke
                  votre choix concernant les cookies. Duree : <strong>12 mois</strong>. Pas de
                  consentement requis (necessaire au fonctionnement du site).
                </>
              ) : (
                <>
                  Consent cookie (
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">devradar_consent</code>): stores
                  your cookie preferences. Duration: <strong>12 months</strong>. No
                  consent required (necessary for the website to function).
                </>
              )}
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === "fr" ? "3.2 Cookies analytics (Piwik PRO)" : "3.2 Analytics Cookies (Piwik PRO)"}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {locale === "fr"
                ? "Deposes uniquement apres votre consentement explicite. Permettent l'analyse d'audience anonymisee. Duree : 13 mois maximum."
                : "Only placed after your explicit consent. They enable anonymized audience analysis. Duration: 13 months maximum."}
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {locale === "fr" ? "3.3 Cookies tiers" : "3.3 Third-Party Cookies"}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {locale === "fr"
                ? "Ahrefs Analytics : script d'analyse SEO, depose apres consentement."
                : "Ahrefs Analytics: SEO analysis script, placed after consent."}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "conservation",
      title: locale === "fr" ? "4. Duree de conservation" : "4. Data Retention Period",
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">
                  {locale === "fr" ? "Donnee" : "Data"}
                </th>
                <th className="text-left p-3 border border-gray-200 dark:border-gray-700 font-semibold">
                  {locale === "fr" ? "Duree de conservation" : "Retention Period"}
                </th>
              </tr>
            </thead>
            <tbody>
              {(locale === "fr"
                ? [
                    ["Donnees analytics Piwik PRO", "25 mois (recommandation CNIL)"],
                    ["Cookie de consentement", "12 mois"],
                    ["Resultats de scan", "Non conserves (temps reel uniquement)"],
                    ["Logs de scraping", "1 000 dernieres operations en memoire, non persistes"],
                  ]
                : [
                    ["Piwik PRO analytics data", "25 months (CNIL recommendation)"],
                    ["Consent cookie", "12 months"],
                    ["Scan results", "Not retained (real-time only)"],
                    ["Scraping logs", "Last 1,000 operations in memory, not persisted"],
                  ]
              ).map(([donnee, duree], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">{donnee}</td>
                  <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">{duree}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: "transferts",
      title: locale === "fr" ? "5. Transferts de donnees" : "5. Data Transfers",
      content: (
        <p>
          {locale === "fr" ? (
            <>
              Piwik PRO heberge les donnees en <strong>Union Europeenne (Allemagne)</strong>. Aucun
              transfert de donnees hors UE n&apos;est effectue pour les donnees analytics.
              <br /><br />
              Le site est heberge sur Railway. Les donnees de navigation transitent via leurs serveurs.
            </>
          ) : (
            <>
              Piwik PRO hosts data in the <strong>European Union (Germany)</strong>. No
              data transfers outside the EU are made for analytics data.
              <br /><br />
              The website is hosted on Railway. Browsing data transits through their servers.
            </>
          )}
        </p>
      ),
    },
    {
      id: "droits",
      title: locale === "fr" ? "6. Vos droits (RGPD)" : "6. Your Rights (GDPR)",
      content: (
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {locale === "fr"
              ? "Conformement aux articles 15 a 22 du RGPD, vous disposez des droits suivants :"
              : "In accordance with Articles 15 to 22 of the GDPR, you have the following rights:"}
          </p>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
            {(locale === "fr"
              ? [
                  ["Droit d'acces", "obtenir une copie de vos donnees personnelles"],
                  ["Droit de rectification", "corriger des donnees inexactes"],
                  ["Droit a l'effacement", "demander la suppression de vos donnees"],
                  ["Droit a la limitation", "restreindre le traitement"],
                  ["Droit a la portabilite", "recevoir vos donnees dans un format structure"],
                  ["Droit d'opposition", "vous opposer au traitement"],
                  ["Droit de retirer votre consentement", "a tout moment, sans affecter la liceite du traitement anterieur"],
                ]
              : [
                  ["Right of access", "obtain a copy of your personal data"],
                  ["Right to rectification", "correct inaccurate data"],
                  ["Right to erasure", "request the deletion of your data"],
                  ["Right to restriction", "restrict processing"],
                  ["Right to data portability", "receive your data in a structured format"],
                  ["Right to object", "object to the processing"],
                  ["Right to withdraw consent", "at any time, without affecting the lawfulness of prior processing"],
                ]
            ).map(([droit, description], i) => (
              <li key={i} className="flex gap-2">
                <span className="text-emerald-700 mt-0.5">&#8594;</span>
                <span>
                  <strong>{droit}</strong> : {description}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            {locale === "fr" ? "Pour exercer vos droits, contactez-nous a :" : "To exercise your rights, contact us at:"}{" "}
            <a href="mailto:contact@devradar.fr" className="text-emerald-700 hover:underline">
              contact@devradar.fr
            </a>
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {locale === "fr" ? (
              <>
                Vous pouvez egalement introduire une reclamation aupres de la{" "}
                <strong>CNIL</strong> :{" "}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:underline"
                >
                  www.cnil.fr
                </a>
              </>
            ) : (
              <>
                You may also file a complaint with the{" "}
                <strong>CNIL</strong> (French Data Protection Authority):{" "}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:underline"
                >
                  www.cnil.fr
                </a>
              </>
            )}
          </p>
        </div>
      ),
    },
    {
      id: "securite",
      title: locale === "fr" ? "7. Securite" : "7. Security",
      content: (
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {locale === "fr"
              ? "Nous mettons en oeuvre les mesures techniques et organisationnelles appropriees pour proteger vos donnees :"
              : "We implement appropriate technical and organizational measures to protect your data:"}
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>{locale === "fr" ? "Connexion HTTPS obligatoire" : "Mandatory HTTPS connection"}</li>
            <li>{locale === "fr" ? "Protection SSRF sur les endpoints de scan" : "SSRF protection on scan endpoints"}</li>
            <li>{locale === "fr" ? "Rate limiting sur toutes les API" : "Rate limiting on all APIs"}</li>
            <li>{locale === "fr" ? "Pas de base de donnees de donnees personnelles" : "No personal data database"}</li>
            <li>{locale === "fr" ? "Minimisation des donnees collectees" : "Minimization of collected data"}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "privacy-by-design",
      title: "8. Privacy-by-Design",
      content: (
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {locale === "fr"
              ? "Conformement a l'article 25 du RGPD, DevRadar integre la protection des donnees des la conception :"
              : "In accordance with Article 25 of the GDPR, DevRadar integrates data protection by design:"}
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>{locale === "fr" ? "Analytics respectueux de la vie privee (Piwik PRO, hebergement UE)" : "Privacy-respecting analytics (Piwik PRO, EU hosting)"}</li>
            <li>{locale === "fr" ? "Consentement requis avant tout tracking" : "Consent required before any tracking"}</li>
            <li>{locale === "fr" ? "Aucune collecte de donnees personnelles via le scraping" : "No personal data collection through scraping"}</li>
            <li>{locale === "fr" ? "Pas de stockage persistant des donnees de scan" : "No persistent storage of scan data"}</li>
            <li>{locale === "fr" ? "Journalisation des operations de scraping pour audit" : "Logging of scraping operations for auditing"}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "modifications",
      title: locale === "fr" ? "9. Modifications" : "9. Changes",
      content: (
        <p>
          {locale === "fr"
            ? "Cette politique peut etre mise a jour. La date de derniere modification est indiquee en haut du document. En cas de modification substantielle, nous vous en informerons via un bandeau sur le site."
            : "This policy may be updated. The date of the last modification is indicated at the top of this document. In case of substantial changes, we will inform you via a banner on the website."}
        </p>
      ),
    },
  ];

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={{ "@context": "https://schema.org", ...articleJsonLd }} />

      <Breadcrumb
        items={[
          { label: locale === "fr" ? "Legal" : "Legal" },
          { label: locale === "fr" ? "Politique de confidentialite" : "Privacy Policy" },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          {locale === "fr" ? "Politique de confidentialite" : "Privacy Policy"}
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          {locale === "fr" ? "Derniere mise a jour : 5 mars 2026" : "Last updated: March 5, 2026"}
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {locale === "fr"
            ? "Conformement au RGPD — Reglement UE 2016/679 et a la loi Informatique et Libertes modifiee."
            : "In compliance with the GDPR — EU Regulation 2016/679 and the amended French Data Protection Act."}
        </p>
      </header>

      {/* Resume */}
      <section className="mb-12 bg-emerald-50 border border-emerald-200 rounded-lg p-6">
        <p className="text-sm font-semibold text-emerald-900 uppercase tracking-wide mb-3">
          {locale === "fr" ? "En resume" : "Summary"}
        </p>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            {locale === "fr"
              ? <>Analytics via <strong>Piwik PRO</strong>, heberge en UE — active uniquement apres votre consentement.</>
              : <>Analytics via <strong>Piwik PRO</strong>, hosted in the EU — activated only after your consent.</>}
          </li>
          <li>
            {locale === "fr"
              ? <>Le scanner RGPD analyse uniquement le <strong>HTML public</strong>, sans stocker de donnees personnelles.</>
              : <>The GDPR scanner only analyzes <strong>public HTML</strong>, without storing personal data.</>}
          </li>
          <li>
            {locale === "fr"
              ? <>Vous disposez de <strong>7 droits RGPD</strong> exercables a tout moment par email.</>
              : <>You have <strong>7 GDPR rights</strong> exercisable at any time by email.</>}
          </li>
          <li>
            {locale === "fr"
              ? <>DevRadar applique le principe de <strong>Privacy-by-Design</strong> des la conception.</>
              : <>DevRadar applies the <strong>Privacy-by-Design</strong> principle from the ground up.</>}
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
          {locale === "fr" ? "Exercer vos droits" : "Exercise Your Rights"}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
          {locale === "fr"
            ? "Pour toute question relative a vos donnees personnelles ou pour exercer vos droits RGPD, contactez-nous par email."
            : "For any questions about your personal data or to exercise your GDPR rights, please contact us by email."}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:contact@devradar.fr"
            className="inline-flex items-center justify-center px-6 py-3 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-800 transition-colors"
          >
            {locale === "fr" ? "Nous contacter" : "Contact Us"}
          </a>
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {locale === "fr" ? "Contacter la CNIL" : "Contact the CNIL"}
          </a>
        </div>
      </section>
    </article>
  );
}
