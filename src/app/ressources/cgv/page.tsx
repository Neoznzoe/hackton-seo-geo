"use client";

import { SITE_NAME, BASE_URL, CURRENT_YEAR } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { Article } from "schema-dts";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

const articleJsonLd: Article = {
  "@type": "Article",
  headline: `Conditions Generales de Vente - DevRadar`,
  description: `CGV du site DevRadar.`,
  url: `${BASE_URL}/cgv`,
  inLanguage: "fr",
  datePublished: `${CURRENT_YEAR}-01-01`,
  dateModified: new Date().toISOString().split("T")[0],
  author: { "@type": "Organization", name: SITE_NAME },
  publisher: { "@type": "Organization", name: SITE_NAME },
};

export default function CgvPage() {
  const { locale } = useTranslation();

  const sections = [
    {
      id: "objet",
      title: locale === "fr" ? "1. Objet" : "1. Purpose",
      content: (
        <p>
          {locale === "fr" ? (
            <>
              Les presentes Conditions Generales de Vente (ci-apres &laquo; CGV &raquo;) definissent les modalites
              selon lesquelles le site <strong>DevRadar</strong> propose et vend ses services aux utilisateurs.
              <br /><br />
              DevRadar est une plateforme de veille technologique permettant d&apos;acceder a une agregation
              d&apos;articles et de contenus lies au developpement logiciel.
              <br /><br />
              Toute souscription a un service payant implique l&apos;acceptation sans reserve des presentes CGV.
            </>
          ) : (
            <>
              These Terms of Sale (hereinafter &quot;Terms&quot;) define the conditions under which
              the <strong>DevRadar</strong> website offers and sells its services to users.
              <br /><br />
              DevRadar is a technology watch platform providing access to an aggregation
              of articles and content related to software development.
              <br /><br />
              Any subscription to a paid service implies unreserved acceptance of these Terms of Sale.
            </>
          )}
        </p>
      ),
    },
    {
      id: "vendeur",
      title: locale === "fr" ? "2. Identite du vendeur" : "2. Seller Identity",
      content: (
        <div className="space-y-4">
          <p className="font-medium">{locale === "fr" ? "Editeur du service :" : "Service publisher:"}</p>
          <ul className="list-none space-y-1 text-sm">
            <li><span className="font-medium">{locale === "fr" ? "Nom :" : "Name:"}</span> Victor BESSON</li>
            <li><span className="font-medium">{locale === "fr" ? "Statut :" : "Status:"}</span> {locale === "fr" ? "Auto entrepreneur" : "Sole proprietor"}</li>
            <li><span className="font-medium">{locale === "fr" ? "Adresse :" : "Address:"}</span> 37 place Saint Bruno, 38000 Grenoble</li>
            <li>
              <span className="font-medium">Email :</span>{" "}
              <a href="mailto:contact@devradar.up.railway.app" className="text-blue-600 hover:underline">
                contact@devradar.up.railway.app
              </a>
            </li>
          </ul>
          <p className="font-medium mt-4">{locale === "fr" ? "Hebergement :" : "Hosting:"}</p>
          <ul className="list-none space-y-1 text-sm">
            <li><span className="font-medium">{locale === "fr" ? "Hebergeur :" : "Host:"}</span> Railway</li>
            <li>
              <span className="font-medium">Site :</span>{" "}
              <a href="https://railway.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                https://railway.app
              </a>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "services",
      title: locale === "fr" ? "3. Description des services" : "3. Service Description",
      content: (
        <div>
          <p className="mb-3">{locale === "fr" ? "DevRadar propose notamment :" : "DevRadar offers in particular:"}</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
            <li>{locale === "fr" ? "un acces a une plateforme de veille technologique" : "access to a technology watch platform"}</li>
            <li>{locale === "fr" ? "l'agregation d'articles issus de sources publiques" : "aggregation of articles from public sources"}</li>
            <li>{locale === "fr" ? "des outils de recherche et de filtrage par technologies" : "search and filtering tools by technology"}</li>
          </ul>
          <p>
            {locale === "fr"
              ? "Certaines fonctionnalites peuvent etre proposees sous forme d'offres payantes (abonnement premium ou acces API)."
              : "Some features may be offered as paid plans (premium subscription or API access)."}
          </p>
        </div>
      ),
    },
    {
      id: "prix",
      title: locale === "fr" ? "4. Prix" : "4. Pricing",
      content: (
        <p>
          {locale === "fr" ? (
            <>
              Les prix des services sont indiques en euros (EUR).
              <br /><br />
              DevRadar se reserve le droit de modifier les prix a tout moment. Toutefois, le prix applique
              sera celui affiche au moment de la commande.
            </>
          ) : (
            <>
              Service prices are listed in euros (EUR).
              <br /><br />
              DevRadar reserves the right to modify prices at any time. However, the price applied
              will be the one displayed at the time of the order.
            </>
          )}
        </p>
      ),
    },
    {
      id: "paiement",
      title: locale === "fr" ? "5. Modalites de paiement" : "5. Payment Methods",
      content: (
        <div>
          <p className="mb-3">{locale === "fr" ? "Le paiement peut etre effectue par :" : "Payment can be made by:"}</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
            <li>{locale === "fr" ? "carte bancaire" : "credit card"}</li>
            <li>{locale === "fr" ? "service de paiement en ligne" : "online payment service"}</li>
          </ul>
          <p>
            {locale === "fr"
              ? "Le paiement est exigible immediatement lors de la souscription au service."
              : "Payment is due immediately upon subscribing to the service."}
          </p>
        </div>
      ),
    },
    {
      id: "acces",
      title: locale === "fr" ? "6. Acces au service" : "6. Service Access",
      content: (
        <div>
          <p className="mb-3">
            {locale === "fr"
              ? "Apres validation du paiement, l'utilisateur recoit un acces au service correspondant a l'offre choisie."
              : "After payment validation, the user receives access to the service corresponding to the chosen plan."}
          </p>
          <p className="mb-3">
            {locale === "fr"
              ? "DevRadar s'engage a mettre en oeuvre les moyens necessaires pour assurer la disponibilite du service."
              : "DevRadar commits to implementing the necessary means to ensure service availability."}
          </p>
          <p className="mb-3">
            {locale === "fr" ? "Cependant, des interruptions peuvent survenir notamment pour :" : "However, interruptions may occur, particularly for:"}
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>{locale === "fr" ? "maintenance" : "maintenance"}</li>
            <li>{locale === "fr" ? "mise a jour" : "updates"}</li>
            <li>{locale === "fr" ? "probleme technique" : "technical issues"}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "retractation",
      title: locale === "fr" ? "7. Droit de retractation" : "7. Right of Withdrawal",
      content: (
        <p>
          {locale === "fr" ? (
            <>
              Conformement au droit de la consommation, l&apos;utilisateur dispose d&apos;un delai de{" "}
              <strong>14 jours</strong> pour exercer son droit de retractation.
              <br /><br />
              Toutefois, ce droit peut etre limite lorsque l&apos;execution du service a commence avec
              l&apos;accord de l&apos;utilisateur.
            </>
          ) : (
            <>
              In accordance with consumer law, the user has a period of{" "}
              <strong>14 days</strong> to exercise the right of withdrawal.
              <br /><br />
              However, this right may be limited when the performance of the service has begun with
              the user&apos;s agreement.
            </>
          )}
        </p>
      ),
    },
    {
      id: "responsabilite",
      title: locale === "fr" ? "8. Responsabilite" : "8. Liability",
      content: (
        <div>
          <p className="mb-3">
            {locale === "fr"
              ? "DevRadar agit comme un agregateur de contenus provenant de sources externes."
              : "DevRadar acts as a content aggregator from external sources."}
          </p>
          <p className="mb-3">
            {locale === "fr" ? "L'editeur ne peut etre tenu responsable :" : "The publisher cannot be held liable for:"}
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>{locale === "fr" ? "de l'exactitude des informations publiees par les sources tierces" : "the accuracy of information published by third-party sources"}</li>
            <li>{locale === "fr" ? "de l'indisponibilite temporaire du service" : "temporary unavailability of the service"}</li>
            <li>{locale === "fr" ? "de dommages indirects lies a l'utilisation du service" : "indirect damages related to the use of the service"}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "propriete-intellectuelle",
      title: locale === "fr" ? "9. Propriete intellectuelle" : "9. Intellectual Property",
      content: (
        <p>
          {locale === "fr" ? (
            <>
              La structure du site, son design, son code et ses fonctionnalites sont proteges par le droit
              de la propriete intellectuelle.
              <br /><br />
              Toute reproduction ou exploitation non autorisee est interdite.
              <br /><br />
              Les contenus provenant de sites tiers restent la propriete de leurs auteurs respectifs.
            </>
          ) : (
            <>
              The website structure, design, code, and features are protected by intellectual
              property law.
              <br /><br />
              Any unauthorized reproduction or exploitation is prohibited.
              <br /><br />
              Content from third-party websites remains the property of their respective authors.
            </>
          )}
        </p>
      ),
    },
    {
      id: "donnees-personnelles",
      title: locale === "fr" ? "10. Donnees personnelles" : "10. Personal Data",
      content: (
        <p>
          {locale === "fr" ? (
            <>
              Le traitement des donnees personnelles respecte les dispositions du Reglement general sur la
              protection des donnees (RGPD) et les recommandations de la Commission nationale de
              l&apos;informatique et des libertes (CNIL).
              <br /><br />
              Les modalites de traitement des donnees sont detaillees dans la politique de confidentialite
              du site.
            </>
          ) : (
            <>
              The processing of personal data complies with the provisions of the General Data
              Protection Regulation (GDPR) and the recommendations of the French National Commission
              for Data Protection (CNIL).
              <br /><br />
              The data processing procedures are detailed in the website&apos;s privacy policy.
            </>
          )}
        </p>
      ),
    },
    {
      id: "resiliation",
      title: locale === "fr" ? "11. Resiliation" : "11. Termination",
      content: (
        <p>
          {locale === "fr" ? (
            <>
              L&apos;utilisateur peut resilier son abonnement a tout moment.
              <br /><br />
              La resiliation prendra effet a la fin de la periode d&apos;abonnement en cours.
              <br /><br />
              Aucun remboursement ne sera effectue pour la periode restante.
            </>
          ) : (
            <>
              The user may terminate their subscription at any time.
              <br /><br />
              The termination will take effect at the end of the current subscription period.
              <br /><br />
              No refund will be issued for the remaining period.
            </>
          )}
        </p>
      ),
    },
    {
      id: "droit-applicable",
      title: locale === "fr" ? "12. Droit applicable" : "12. Applicable Law",
      content: (
        <p>
          {locale === "fr" ? (
            <>
              Les presentes CGV sont soumises au droit francais.
              <br /><br />
              En cas de litige, les tribunaux francais seront seuls competents.
            </>
          ) : (
            <>
              These Terms of Sale are governed by French law.
              <br /><br />
              In the event of a dispute, French courts shall have sole jurisdiction.
            </>
          )}
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
          { label: locale === "fr" ? "Conditions Generales de Vente" : "Terms of Sale" },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          {locale === "fr" ? "Conditions Generales de Vente" : "Terms of Sale"}
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          {locale === "fr"
            ? `Derniere mise a jour : ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`
            : `Last updated: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
        </p>
      </header>

      {/* Resume */}
      <section className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-3">
          {locale === "fr" ? "En resume" : "Summary"}
        </p>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            {locale === "fr"
              ? <>DevRadar propose des offres payantes sous forme d&apos;<strong>abonnement premium ou acces API</strong>.</>
              : <>DevRadar offers paid plans in the form of <strong>premium subscription or API access</strong>.</>}
          </li>
          <li>
            {locale === "fr"
              ? <>Le paiement est <strong>immediat</strong> lors de la souscription.</>
              : <>Payment is <strong>immediate</strong> upon subscription.</>}
          </li>
          <li>
            {locale === "fr"
              ? <>Vous disposez d&apos;un <strong>delai de retractation de 14 jours</strong>.</>
              : <>You have a <strong>14-day withdrawal period</strong>.</>}
          </li>
          <li>
            {locale === "fr"
              ? <>La resiliation est possible a tout moment, <strong>sans remboursement de la periode en cours</strong>.</>
              : <>Termination is possible at any time, <strong>without refund for the current period</strong>.</>}
          </li>
        </ul>
      </section>

      {/* Sommaire */}
      <nav className="mb-12 border border-gray-200 dark:border-gray-700 rounded-lg p-6" aria-label={locale === "fr" ? "Sommaire" : "Table of Contents"}>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
          {locale === "fr" ? "Sommaire" : "Table of Contents"}
        </p>
        <ol className="space-y-1 text-sm text-blue-600">
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
      <section className="bg-blue-50 rounded-lg p-8 text-center mt-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {locale === "fr" ? "Une question sur nos offres ?" : "Have a question about our plans?"}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
          {locale === "fr"
            ? "Pour toute question relative aux presentes CGV ou a nos services, contactez-nous par email."
            : "For any questions regarding these Terms of Sale or our services, please contact us by email."}
        </p>
        <div className="mt-4">
          <a
            href="mailto:contact@devradar.up.railway.app"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {locale === "fr" ? "Nous contacter" : "Contact Us"}
          </a>
        </div>
      </section>
    </article>
  );
}
