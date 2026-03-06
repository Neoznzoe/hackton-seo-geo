"use client";

import { SITE_NAME, BASE_URL, CURRENT_YEAR } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { Article } from "schema-dts";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

const articleJsonLd: Article = {
  "@type": "Article",
  headline: `Conditions Generales d'Utilisation - DevRadar`,
  description: `CGU du site DevRadar.`,
  url: `${BASE_URL}/cgu`,
  inLanguage: "fr",
  datePublished: `${CURRENT_YEAR}-01-01`,
  dateModified: new Date().toISOString().split("T")[0],
  author: { "@type": "Organization", name: SITE_NAME },
  publisher: { "@type": "Organization", name: SITE_NAME },
};

export default function CguPage() {
  const { locale } = useTranslation();

  const sections = [
    {
      id: "objet",
      title: locale === "fr" ? "1. Objet" : "1. Purpose",
      content: (
        <p>
          {locale === "fr" ? (
            <>
              Les presentes Conditions Generales d&apos;Utilisation (ci-apres &laquo; CGU &raquo;) ont pour objet de
              definir les modalites d&apos;acces et d&apos;utilisation du site <strong>DevRadar</strong>{" "}
              (ci-apres &laquo; le Site &raquo;).
              <br /><br />
              Le Site propose un service de veille technologique permettant de consulter des articles et
              contenus relatifs au developpement logiciel et aux technologies informatiques, collectes
              automatiquement depuis differentes sources publiques sur Internet.
              <br /><br />
              Toute utilisation du Site implique l&apos;acceptation pleine et entiere des presentes CGU.
            </>
          ) : (
            <>
              These Terms of Use (hereinafter &quot;Terms&quot;) define the conditions for accessing and using
              the <strong>DevRadar</strong> website (hereinafter &quot;the Website&quot;).
              <br /><br />
              The Website provides a technology watch service that allows users to browse articles and
              content related to software development and information technology, automatically collected
              from various public sources on the Internet.
              <br /><br />
              Any use of the Website implies full and unconditional acceptance of these Terms.
            </>
          )}
        </p>
      ),
    },
    {
      id: "editeur",
      title: locale === "fr" ? "2. Editeur du site" : "2. Website Publisher",
      content: (
        <div className="space-y-4">
          <p>{locale === "fr" ? "Le site DevRadar est edite par :" : "The DevRadar website is published by:"}</p>
          <ul className="list-none space-y-1 text-sm">
            <li><span className="font-medium">{locale === "fr" ? "Nom / Raison sociale :" : "Name / Company:"}</span> Victor BESSON</li>
            <li><span className="font-medium">{locale === "fr" ? "Statut juridique :" : "Legal status:"}</span> {locale === "fr" ? "Auto entrepreneur" : "Sole proprietor"}</li>
            <li><span className="font-medium">{locale === "fr" ? "Adresse :" : "Address:"}</span> 37 place Saint Bruno, 38000 Grenoble</li>
            <li>
              <span className="font-medium">{locale === "fr" ? "Email de contact :" : "Contact email:"}</span>{" "}
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
      id: "acces",
      title: locale === "fr" ? "3. Acces au site" : "3. Website Access",
      content: (
        <p>
          {locale === "fr" ? (
            <>
              Le Site est accessible gratuitement a tout utilisateur disposant d&apos;un acces a Internet.
              Tous les frais lies a l&apos;acces au Site (materiel informatique, connexion Internet, etc.)
              sont a la charge de l&apos;utilisateur.
              <br /><br />
              L&apos;editeur se reserve le droit d&apos;interrompre, suspendre ou modifier l&apos;acces a
              tout ou partie du Site a tout moment, notamment pour maintenance ou mise a jour.
            </>
          ) : (
            <>
              The Website is freely accessible to any user with Internet access.
              All costs related to accessing the Website (hardware, Internet connection, etc.)
              are borne by the user.
              <br /><br />
              The publisher reserves the right to interrupt, suspend, or modify access to
              all or part of the Website at any time, particularly for maintenance or updates.
            </>
          )}
        </p>
      ),
    },
    {
      id: "service",
      title: locale === "fr" ? "4. Description du service" : "4. Service Description",
      content: (
        <div>
          <p className="mb-3">{locale === "fr" ? "Le Site met a disposition :" : "The Website provides:"}</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>{locale === "fr" ? "une agregation automatisee d'articles et contenus lies au developpement logiciel" : "automated aggregation of articles and content related to software development"}</li>
            <li>{locale === "fr" ? "un classement par technologies ou thematiques" : "categorization by technologies or topics"}</li>
            <li>{locale === "fr" ? "des liens vers les sources originales des contenus" : "links to the original content sources"}</li>
          </ul>
          <p className="mt-3">
            {locale === "fr"
              ? "Les articles affiches peuvent provenir de sources tierces. Le Site ne revendique pas la propriete de ces contenus et renvoie systematiquement vers leur publication originale."
              : "The displayed articles may come from third-party sources. The Website does not claim ownership of this content and systematically links back to the original publication."}
          </p>
        </div>
      ),
    },
    {
      id: "responsabilite",
      title: locale === "fr" ? "5. Responsabilite" : "5. Liability",
      content: (
        <div>
          <p className="mb-3">
            {locale === "fr"
              ? "L'editeur s'efforce de fournir des informations fiables. Toutefois :"
              : "The publisher endeavors to provide reliable information. However:"}
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
            <li>{locale === "fr" ? "les contenus agreges proviennent de sources externes" : "the aggregated content comes from external sources"}</li>
            <li>{locale === "fr" ? "leur exactitude, exhaustivite ou mise a jour ne peut etre garantie" : "their accuracy, completeness, or timeliness cannot be guaranteed"}</li>
          </ul>
          <p className="mb-3">
            {locale === "fr"
              ? "En consequence, l'editeur ne pourra etre tenu responsable :"
              : "Consequently, the publisher shall not be held liable for:"}
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>{locale === "fr" ? "d'erreurs ou d'informations inexactes provenant de sources tierces" : "errors or inaccurate information from third-party sources"}</li>
            <li>{locale === "fr" ? "d'un dommage resultant de l'utilisation des informations presentes sur le Site" : "damages resulting from the use of information on the Website"}</li>
            <li>{locale === "fr" ? "d'une indisponibilite temporaire du service" : "temporary unavailability of the service"}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "propriete-intellectuelle",
      title: locale === "fr" ? "6. Propriete intellectuelle" : "6. Intellectual Property",
      content: (
        <div>
          <p className="mb-3">
            {locale === "fr"
              ? "Les elements suivants sont proteges par le droit de la propriete intellectuelle :"
              : "The following elements are protected by intellectual property law:"}
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
            <li>{locale === "fr" ? "le design du site" : "the website design"}</li>
            <li>{locale === "fr" ? "le code source" : "the source code"}</li>
            <li>{locale === "fr" ? "la structure et l'organisation du service" : "the structure and organization of the service"}</li>
          </ul>
          <p>
            {locale === "fr"
              ? "Toute reproduction, modification ou distribution sans autorisation prealable est interdite. Les articles, logos ou marques appartenant a des tiers restent la propriete de leurs auteurs respectifs."
              : "Any reproduction, modification, or distribution without prior authorization is prohibited. Articles, logos, or trademarks belonging to third parties remain the property of their respective owners."}
          </p>
        </div>
      ),
    },
    {
      id: "utilisation",
      title: locale === "fr" ? "7. Utilisation du service" : "7. Use of the Service",
      content: (
        <div>
          <p className="mb-3">{locale === "fr" ? "L'utilisateur s'engage a :" : "The user agrees to:"}</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
            <li>{locale === "fr" ? "ne pas utiliser le Site a des fins illegales" : "not use the Website for illegal purposes"}</li>
            <li>{locale === "fr" ? "ne pas perturber le fonctionnement du service" : "not disrupt the operation of the service"}</li>
            <li>{locale === "fr" ? "ne pas tenter d'acceder de maniere frauduleuse aux systemes du Site" : "not attempt to fraudulently access the Website's systems"}</li>
          </ul>
          <p>
            {locale === "fr"
              ? "L'editeur se reserve le droit de bloquer l'acces a tout utilisateur ne respectant pas ces regles."
              : "The publisher reserves the right to block access to any user who does not comply with these rules."}
          </p>
        </div>
      ),
    },
    {
      id: "liens-externes",
      title: locale === "fr" ? "8. Liens externes" : "8. External Links",
      content: (
        <div>
          <p className="mb-3">{locale === "fr" ? "Le Site peut contenir des liens vers des sites tiers." : "The Website may contain links to third-party websites."}</p>
          <p className="mb-3">
            {locale === "fr"
              ? "L'editeur ne controle pas ces sites et ne peut etre tenu responsable :"
              : "The publisher does not control these websites and cannot be held liable for:"}
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>{locale === "fr" ? "du contenu qu'ils publient" : "the content they publish"}</li>
            <li>{locale === "fr" ? "de leur politique de confidentialite" : "their privacy policies"}</li>
            <li>{locale === "fr" ? "de leurs pratiques commerciales" : "their business practices"}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "donnees-personnelles",
      title: locale === "fr" ? "9. Donnees personnelles" : "9. Personal Data",
      content: (
        <p>
          {locale === "fr" ? (
            <>
              Le Site peut collecter certaines donnees techniques (logs, statistiques, cookies) afin
              d&apos;ameliorer l&apos;experience utilisateur.
              <br /><br />
              Ces donnees sont traitees conformement a la reglementation applicable en matiere de protection
              des donnees personnelles (notamment le RGPD).
              <br /><br />
              Pour plus d&apos;informations, l&apos;utilisateur peut consulter la Politique de confidentialite
              du Site.
            </>
          ) : (
            <>
              The Website may collect certain technical data (logs, statistics, cookies) in order to
              improve the user experience.
              <br /><br />
              This data is processed in accordance with applicable personal data protection regulations
              (in particular the GDPR).
              <br /><br />
              For more information, the user may consult the Website&apos;s Privacy Policy.
            </>
          )}
        </p>
      ),
    },
    {
      id: "modification",
      title: locale === "fr" ? "10. Modification des CGU" : "10. Changes to the Terms",
      content: (
        <p>
          {locale === "fr"
            ? "L'editeur se reserve le droit de modifier les presentes CGU a tout moment. La version applicable est celle publiee sur le Site a la date de consultation."
            : "The publisher reserves the right to modify these Terms at any time. The applicable version is the one published on the Website at the time of access."}
        </p>
      ),
    },
    {
      id: "droit-applicable",
      title: locale === "fr" ? "11. Droit applicable" : "11. Applicable Law",
      content: (
        <p>
          {locale === "fr"
            ? "Les presentes CGU sont regies par le droit francais. En cas de litige, et a defaut de resolution amiable, les tribunaux competents seront ceux du ressort de l'editeur du Site."
            : "These Terms are governed by French law. In the event of a dispute, and failing amicable resolution, the competent courts shall be those of the publisher's jurisdiction."}
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
          { label: locale === "fr" ? "Conditions Generales d'Utilisation" : "Terms of Use" },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          {locale === "fr" ? "Conditions Generales d'Utilisation" : "Terms of Use"}
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
              ? <>DevRadar est un service de <strong>veille technologique gratuit</strong> edite par Victor BESSON.</>
              : <>DevRadar is a <strong>free technology watch service</strong> published by Victor BESSON.</>}
          </li>
          <li>
            {locale === "fr"
              ? <>Les contenus agreges proviennent de <strong>sources tierces publiques</strong>.</>
              : <>Aggregated content comes from <strong>public third-party sources</strong>.</>}
          </li>
          <li>
            {locale === "fr"
              ? <>Les donnees personnelles sont traitees conformement au <strong>RGPD</strong>.</>
              : <>Personal data is processed in accordance with the <strong>GDPR</strong>.</>}
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
          <div className="prose prose-sm text-gray-700 dark:text-gray-300">
            {section.content}
          </div>
        </section>
      ))}

      {/* Contact */}
      <section className="bg-blue-50 rounded-lg p-8 text-center mt-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {locale === "fr" ? "Une question ?" : "Have a question?"}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
          {locale === "fr"
            ? "Pour toute question relative aux presentes CGU, vous pouvez nous contacter par email."
            : "For any questions regarding these Terms of Use, you can contact us by email."}
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
