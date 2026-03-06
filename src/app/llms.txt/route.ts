import { BASE_URL } from "@/lib/constants";

const CONTENT = `# DevRadar

> Comparateur d'outils analytics web conforme RGPD. Analyse, compare et choisis le meilleur outil analytics pour ton site.

## A propos

DevRadar est un comparateur independant d'outils analytics web. Il aide les entreprises et developpeurs a choisir un outil analytics conforme au RGPD, avec des comparaisons detaillees, un scanner de conformite et un glossaire.

## Outils analyses

- Google Analytics 4 (GA4)
- Matomo
- Plausible Analytics
- Piwik PRO
- Simple Analytics
- Fathom Analytics
- Adobe Analytics
- Umami

## Sections principales

- Comparateur d'outils: ${BASE_URL}/comparer
- Fiches outils detaillees: ${BASE_URL}/outils/{slug}
- Scanner RGPD (audit de site): ${BASE_URL}/scanner
- Guide: Choisir un outil analytics: ${BASE_URL}/guide/choisir-outil-analytics
- Glossaire RGPD & Analytics: ${BASE_URL}/glossaire
- Ressources RGPD & Analytics: ${BASE_URL}/ressources/rgpd-analytics
- Veille concurrentielle: ${BASE_URL}/veille-concurrentielle

## Categories

- Privacy-First: ${BASE_URL}/categorie/privacy-first
- Open Source: ${BASE_URL}/categorie/open-source
- Gratuit: ${BASE_URL}/categorie/gratuit
- Entreprise: ${BASE_URL}/categorie/entreprise
- Sans Cookies: ${BASE_URL}/categorie/sans-cookies
- Hebergement Local: ${BASE_URL}/categorie/hebergement-local

## Donnees structurees disponibles

- Version complete: ${BASE_URL}/llms-full.txt
- API JSON: ${BASE_URL}/api/llms
`;

export function GET() {
  return new Response(CONTENT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
