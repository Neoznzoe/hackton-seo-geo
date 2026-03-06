"use client";

import { SITE_NAME, BASE_URL, CURRENT_YEAR } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { Article } from "schema-dts";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

const articleJsonLd: Article = {
  "@type": "Article",
  headline: `Mentions Legales - DevRadar`,
  description: `Mentions legales du site DevRadar.`,
  url: `${BASE_URL}/mentions-legales`,
  inLanguage: "fr",
  datePublished: `${CURRENT_YEAR}-01-01`,
  dateModified: "2026-03-05",
  author: { "@type": "Organization", name: SITE_NAME },
  publisher: { "@type": "Organization", name: SITE_NAME },
};

export default function MentionsLegalesPage() {
  const { locale } = useTranslation();

  const sections = [
    {
      id: "editeur",
      title: locale === "fr" ? "1. Editeur du site" : "1. Website Publisher",
      content: (
        <div>
          <p className="mb-3">
            {locale === "fr" ? (
              <>
                Le site{" "}
                <a
                  href="https://www.devradar.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:underline"
                >
                  DevRadar
                </a>{" "}
                est edite dans le cadre d&apos;un projet pedagogique — <strong>Hackathon Fil Rouge M2 IW</strong>.
              </>
            ) : (
              <>
                The website{" "}
                <a
                  href="https://www.devradar.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:underline"
                >
                  DevRadar
                </a>{" "}
                is published as part of an educational project — <strong>Hackathon Fil Rouge M2 IW</strong>.
              </>
            )}
          </p>
          <ul className="list-none space-y-1 text-sm">
            <li>
              <span className="font-medium">{locale === "fr" ? "Nature :" : "Nature:"}</span>{" "}
              {locale === "fr" ? "projet etudiant a vocation pedagogique" : "educational student project"}
            </li>
            <li>
              <span className="font-medium">Contact :</span>{" "}
              <a href="mailto:contact@devradar.fr" className="text-emerald-700 hover:underline">
                contact@devradar.fr
              </a>
            </li>
            <li>
              <span className="font-medium">{locale === "fr" ? "Directeur de la publication :" : "Publication Director:"}</span>{" "}
              {locale === "fr" ? "equipe DevRadar" : "DevRadar team"}
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "hebergement",
      title: locale === "fr" ? "2. Hebergement" : "2. Hosting",
      content: (
        <ul className="list-none space-y-1 text-sm">
          <li>
            <span className="font-medium">{locale === "fr" ? "Hebergeur :" : "Host:"}</span> Railway Corp.
          </li>
          <li>
            <span className="font-medium">{locale === "fr" ? "Adresse :" : "Address:"}</span> San Francisco, CA, USA
          </li>
          <li>
            <span className="font-medium">Site :</span>{" "}
            <a
              href="https://railway.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              railway.app
            </a>
          </li>
        </ul>
      ),
    },
    {
      id: "propriete-intellectuelle",
      title: locale === "fr" ? "3. Propriete intellectuelle" : "3. Intellectual Property",
      content: (
        <p>
          {locale === "fr" ? (
            <>
              L&apos;ensemble du contenu de ce site (textes, images, code source, mises en page) est
              protege par le droit d&apos;auteur. Toute reproduction, meme partielle, est soumise a
              autorisation prealable.
              <br /><br />
              Les logos et noms des outils analytics mentionnes (Google Analytics, Matomo, Plausible,
              Piwik PRO, etc.) sont la propriete de leurs detenteurs respectifs. Leur utilisation sur ce
              site est faite a titre informatif et comparatif.
            </>
          ) : (
            <>
              All content on this website (text, images, source code, layouts) is protected by
              copyright law. Any reproduction, even partial, requires prior authorization.
              <br /><br />
              The logos and names of the analytics tools mentioned (Google Analytics, Matomo, Plausible,
              Piwik PRO, etc.) are the property of their respective owners. Their use on this
              website is for informational and comparative purposes only.
            </>
          )}
        </p>
      ),
    },
    {
      id: "donnees-personnelles",
      title: locale === "fr" ? "4. Donnees personnelles et RGPD" : "4. Personal Data and GDPR",
      content: (
        <div>
          <p className="mb-3">
            {locale === "fr" ? (
              <>
                Le traitement des donnees personnelles est regi par notre politique de confidentialite,
                conformement au{" "}
                <strong>Reglement General sur la Protection des Donnees</strong> (RGPD — Reglement UE
                2016/679) et aux recommandations de la CNIL.
              </>
            ) : (
              <>
                The processing of personal data is governed by our privacy policy,
                in accordance with the{" "}
                <strong>General Data Protection Regulation</strong> (GDPR — EU Regulation
                2016/679) and CNIL recommendations.
              </>
            )}
          </p>
          <p>
            {locale === "fr" ? (
              <>
                Vous disposez d&apos;un droit d&apos;acces, de rectification, d&apos;effacement, de
                limitation, de portabilite et d&apos;opposition sur vos donnees personnelles. Pour exercer
                ces droits :{" "}
                <a href="mailto:contact@devradar.fr" className="text-emerald-700 hover:underline">
                  contact@devradar.fr
                </a>
              </>
            ) : (
              <>
                You have the right to access, rectify, erase, restrict, port, and object to the
                processing of your personal data. To exercise these rights:{" "}
                <a href="mailto:contact@devradar.fr" className="text-emerald-700 hover:underline">
                  contact@devradar.fr
                </a>
              </>
            )}
          </p>
        </div>
      ),
    },
    {
      id: "cookies",
      title: "5. Cookies",
      content: (
        <p>
          {locale === "fr"
            ? "Ce site utilise des cookies soumis a votre consentement. Un bandeau de consentement vous permet d'accepter ou de refuser les cookies non essentiels. Pour plus de details, consultez notre politique de confidentialite."
            : "This website uses cookies subject to your consent. A consent banner allows you to accept or refuse non-essential cookies. For more details, please refer to our privacy policy."}
        </p>
      ),
    },
    {
      id: "scanner-rgpd",
      title: locale === "fr" ? "6. Scanner RGPD et scraping" : "6. GDPR Scanner and Scraping",
      content: (
        <div>
          <p className="mb-3">
            {locale === "fr"
              ? "DevRadar propose un scanner de conformite RGPD et un module de veille concurrentielle qui analysent des pages web publiques. Ces fonctionnalites :"
              : "DevRadar offers a GDPR compliance scanner and a competitive intelligence module that analyze public web pages. These features:"}
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
            <li>{locale === "fr" ? "Ne collectent aucune donnee personnelle des sites scannes" : "Do not collect any personal data from scanned websites"}</li>
            <li>
              {locale === "fr" ? "Respectent le fichier" : "Respect the"}{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">robots.txt</code>{" "}
              {locale === "fr" ? "de chaque site cible" : "file of each target website"}
            </li>
            <li>
              {locale === "fr"
                ? "Appliquent un rate limiting strict (2 secondes minimum entre requetes)"
                : "Apply strict rate limiting (minimum 2 seconds between requests)"}
            </li>
            <li>
              {locale === "fr" ? "Utilisent un User-Agent identifie" : "Use an identified User-Agent"} (
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">DevRadarBot/1.0</code>)
            </li>
            <li>{locale === "fr" ? "Journalisent toutes les operations pour transparence" : "Log all operations for transparency"}</li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            {locale === "fr"
              ? "Conformement a la jurisprudence francaise et europeenne, l'extraction de donnees publiques non protegees par un droit sui generis et ne contenant pas de donnees personnelles est licite, sous reserve du respect des CGU du site cible et du robots.txt."
              : "In accordance with French and European case law, the extraction of public data not protected by a sui generis right and not containing personal data is lawful, subject to compliance with the target website's terms of use and robots.txt."}
          </p>
        </div>
      ),
    },
    {
      id: "responsabilite",
      title: locale === "fr" ? "7. Limitation de responsabilite" : "7. Limitation of Liability",
      content: (
        <p>
          {locale === "fr" ? (
            <>
              DevRadar est un projet pedagogique. Les informations fournies (comparatifs, scores de
              conformite, recommandations) sont donnees a titre indicatif et{" "}
              <strong>ne constituent pas un conseil juridique</strong>. L&apos;equipe DevRadar ne saurait
              etre tenue responsable des decisions prises sur la base de ces informations.
            </>
          ) : (
            <>
              DevRadar is an educational project. The information provided (comparisons, compliance scores,
              recommendations) is given for informational purposes only and{" "}
              <strong>does not constitute legal advice</strong>. The DevRadar team cannot be held
              responsible for decisions made based on this information.
            </>
          )}
        </p>
      ),
    },
    {
      id: "droit-applicable",
      title: locale === "fr" ? "8. Droit applicable" : "8. Applicable Law",
      content: (
        <p>
          {locale === "fr"
            ? "Le present site est soumis au droit francais. Tout litige relatif a son utilisation sera soumis aux juridictions francaises competentes."
            : "This website is subject to French law. Any dispute relating to its use shall be submitted to the competent French courts."}
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
          { label: locale === "fr" ? "Mentions legales" : "Legal Notice" },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          {locale === "fr" ? "Mentions legales" : "Legal Notice"}
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          {locale === "fr" ? "Derniere mise a jour : 5 mars 2026" : "Last updated: March 5, 2026"}
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
              ? <>DevRadar est un <strong>projet pedagogique</strong> — Hackathon Fil Rouge M2 IW.</>
              : <>DevRadar is an <strong>educational project</strong> — Hackathon Fil Rouge M2 IW.</>}
          </li>
          <li>
            {locale === "fr"
              ? <>Le site est heberge par <strong>Railway Corp.</strong> (San Francisco, USA).</>
              : <>The website is hosted by <strong>Railway Corp.</strong> (San Francisco, USA).</>}
          </li>
          <li>
            {locale === "fr"
              ? <>Les informations fournies sont a titre indicatif et <strong>ne constituent pas un conseil juridique</strong>.</>
              : <>The information provided is for informational purposes only and <strong>does not constitute legal advice</strong>.</>}
          </li>
          <li>
            {locale === "fr"
              ? <>Le droit applicable est le <strong>droit francais</strong>.</>
              : <>The applicable law is <strong>French law</strong>.</>}
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
          {locale === "fr" ? "Une question legale ?" : "Have a legal question?"}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
          {locale === "fr"
            ? "Pour toute question relative aux presentes mentions legales, contactez-nous par email."
            : "For any questions regarding this legal notice, please contact us by email."}
        </p>
        <div className="mt-4">
          <a
            href="mailto:contact@devradar.fr"
            className="inline-flex items-center justify-center px-6 py-3 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-800 transition-colors"
          >
            {locale === "fr" ? "Nous contacter" : "Contact Us"}
          </a>
        </div>
      </section>
    </article>
  );
}
