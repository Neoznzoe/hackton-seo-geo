import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, BASE_URL } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: `Mentions legales - ${SITE_NAME}`,
  description: `Mentions legales de ${SITE_NAME}. Informations sur l'editeur, l'hebergement et les conditions d'utilisation.`,
  alternates: { canonical: `${BASE_URL}mentions-legales` },
  robots: { index: true, follow: true },
};

const breadcrumbItems = [
  { label: "Mentions legales" },
];

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <article className="mt-6 prose prose-gray max-w-none">
        <h1>Mentions legales</h1>
        <p className="text-sm text-gray-500">Derniere mise a jour : 5 mars 2026</p>

        <h2>1. Editeur du site</h2>
        <p>
          Le site <strong>{SITE_NAME}</strong> (<a href={BASE_URL}>{BASE_URL}</a>) est edite dans
          le cadre d&apos;un projet pedagogique — Hackathon Fil Rouge M2 IW.
        </p>
        <ul>
          <li>Nature : projet etudiant a vocation pedagogique</li>
          <li>Contact : contact@devradar.fr</li>
          <li>Directeur de la publication : equipe {SITE_NAME}</li>
        </ul>

        <h2>2. Hebergement</h2>
        <ul>
          <li>Hebergeur : Railway Corp.</li>
          <li>Adresse : San Francisco, CA, USA</li>
          <li>Site : railway.app</li>
        </ul>

        <h2>3. Propriete intellectuelle</h2>
        <p>
          L&apos;ensemble du contenu de ce site (textes, images, code source, mises en page)
          est protege par le droit d&apos;auteur. Toute reproduction, meme partielle, est
          soumise a autorisation prealable.
        </p>
        <p>
          Les logos et noms des outils analytics mentionnes (Google Analytics, Matomo,
          Plausible, Piwik PRO, etc.) sont la propriete de leurs detenteurs respectifs.
          Leur utilisation sur ce site est faite a titre informatif et comparatif.
        </p>

        <h2>4. Donnees personnelles et RGPD</h2>
        <p>
          Le traitement des donnees personnelles est regi par notre{" "}
          <Link href="/politique-confidentialite">politique de confidentialite</Link>,
          conformement au <strong>Reglement General sur la Protection des Donnees
          (RGPD — Reglement UE 2016/679)</strong> et aux recommandations de la{" "}
          <strong>CNIL</strong>.
        </p>
        <p>
          Vous disposez d&apos;un droit d&apos;acces, de rectification, d&apos;effacement, de
          limitation, de portabilite et d&apos;opposition sur vos donnees personnelles.
          Pour exercer ces droits : <strong>contact@devradar.fr</strong>
        </p>

        <h2>5. Cookies</h2>
        <p>
          Ce site utilise des cookies soumis a votre consentement. Un bandeau de
          consentement vous permet d&apos;accepter ou de refuser les cookies non essentiels.
          Pour plus de details, consultez notre{" "}
          <Link href="/politique-confidentialite">politique de confidentialite</Link>.
        </p>

        <h2>6. Scanner RGPD et scraping</h2>
        <p>
          {SITE_NAME} propose un scanner de conformite RGPD et un module de veille
          concurrentielle qui analysent des pages web publiques. Ces fonctionnalites :
        </p>
        <ul>
          <li>Ne collectent aucune donnee personnelle des sites scannes</li>
          <li>Respectent le fichier robots.txt de chaque site cible</li>
          <li>Appliquent un rate limiting strict (2 secondes minimum entre requetes)</li>
          <li>Utilisent un User-Agent identifie (DevRadarBot/1.0)</li>
          <li>Journalisent toutes les operations pour transparence</li>
        </ul>
        <p>
          Conformement a la jurisprudence francaise et europeenne, l&apos;extraction de
          donnees publiques non protegees par un droit sui generis et ne contenant pas
          de donnees personnelles est licite, sous reserve du respect des CGU du site
          cible et du robots.txt.
        </p>

        <h2>7. Limitation de responsabilite</h2>
        <p>
          {SITE_NAME} est un projet pedagogique. Les informations fournies (comparatifs,
          scores de conformite, recommandations) sont donnees a titre indicatif et ne
          constituent pas un conseil juridique. L&apos;equipe {SITE_NAME} ne saurait etre
          tenue responsable des decisions prises sur la base de ces informations.
        </p>

        <h2>8. Droit applicable</h2>
        <p>
          Le present site est soumis au droit francais. Tout litige relatif a son
          utilisation sera soumis aux juridictions francaises competentes.
        </p>
      </article>
    </div>
  );
}
