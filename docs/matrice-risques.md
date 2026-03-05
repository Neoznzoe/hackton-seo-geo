# Matrice de risques — DevRadar

## 1. Risques lies au scraping

| # | Risque | Probabilite | Impact | Niveau | Mesure de mitigation | Statut |
|---|--------|-------------|--------|--------|---------------------|--------|
| S1 | Violation du robots.txt d'un site cible | Faible | Eleve | MOYEN | Verification systematique du robots.txt avant chaque requete. Si interdit, scraping annule et journalise. | IMPLEMENTE |
| S2 | Surcharge du serveur cible (DDoS involontaire) | Faible | Eleve | MOYEN | Rate limiting strict : 2s minimum entre requetes par domaine + max 5 operations/min par utilisateur. | IMPLEMENTE |
| S3 | Collecte accidentelle de donnees personnelles | Faible | Tres eleve | ELEVE | Extraction limitee aux donnees produit (prix, fonctionnalites). Aucun champ nom/email/IP collecte. Minimisation des donnees (500KB max par page). | IMPLEMENTE |
| S4 | Violation des CGU d'un site cible | Moyen | Moyen | MOYEN | Scraping limite aux pages publiques de pricing/features. User-Agent identifie. Possibilite pour le site cible de nous bloquer. | ACCEPTE |
| S5 | Atteinte au droit sui generis sur les bases de donnees | Faible | Eleve | MOYEN | Extraction non substantielle : seules quelques donnees ponctuelles sont extraites, pas de copie de base de donnees. | ACCEPTE |
| S6 | Contenu scrape obsolete ou errone | Moyen | Faible | FAIBLE | Horodatage de chaque collecte. Donnees presentees comme "veille automatisee" avec source affichee. | IMPLEMENTE |

## 2. Risques lies au scanner RGPD

| # | Risque | Probabilite | Impact | Niveau | Mesure de mitigation | Statut |
|---|--------|-------------|--------|--------|---------------------|--------|
| R1 | SSRF (Server-Side Request Forgery) | Moyen | Tres eleve | ELEVE | Blocage des URLs privees/internes (localhost, 192.168.x.x, 10.x.x.x, .local, .internal). Validation du protocole (HTTP/HTTPS uniquement). | IMPLEMENTE |
| R2 | Abus du scanner (scan massif non autorise) | Moyen | Moyen | MOYEN | Rate limiting : max 10 scans/minute par IP. Plans limites (5/25/50 pages). Timeout global par plan. | IMPLEMENTE |
| R3 | Faux positifs/negatifs dans la detection | Moyen | Faible | FAIBLE | 30+ patterns de detection. Affichage du snippet detecte pour verification. Mise a jour reguliere des patterns. | ACCEPTE |
| R4 | Resultats de scan utilises comme "certification" RGPD | Moyen | Moyen | MOYEN | Disclaimer clair : "Les resultats sont indicatifs et ne constituent pas un audit juridique." | IMPLEMENTE |

## 3. Risques lies aux analytics (Piwik PRO)

| # | Risque | Probabilite | Impact | Niveau | Mesure de mitigation | Statut |
|---|--------|-------------|--------|--------|---------------------|--------|
| A1 | Tracking sans consentement | Faible | Tres eleve | ELEVE | Bandeau de consentement obligatoire. Tracking bloque par defaut, active uniquement apres consentement explicite. | IMPLEMENTE |
| A2 | Conservation excessive des donnees | Faible | Moyen | FAIBLE | Retention Piwik PRO limitee a 25 mois (recommandation CNIL). Cookie de consentement : 12 mois. | IMPLEMENTE |
| A3 | Transfert de donnees hors UE | Faible | Eleve | MOYEN | Piwik PRO heberge en Allemagne (UE). Pas de Google Analytics. | IMPLEMENTE |

## 4. Risques juridiques generaux

| # | Risque | Probabilite | Impact | Niveau | Mesure de mitigation | Statut |
|---|--------|-------------|--------|--------|---------------------|--------|
| J1 | Absence de mentions legales | Faible | Moyen | FAIBLE | Page /mentions-legales creee avec toutes les mentions obligatoires. | IMPLEMENTE |
| J2 | Absence de politique de confidentialite | Faible | Eleve | MOYEN | Page /politique-confidentialite creee, detaillant tous les traitements, bases legales, droits des personnes. | IMPLEMENTE |
| J3 | Non-conformite CNIL sur les cookies | Faible | Eleve | MOYEN | Bandeau cookies conforme (refus aussi simple que acceptation). Pas de cookie wall. Tracking conditionne au consentement. | IMPLEMENTE |
| J4 | Plainte d'un concurrent pour scraping | Faible | Moyen | FAIBLE | Approche respectueuse (robots.txt, rate limiting, User-Agent identifie). Donnees non personnelles et publiques uniquement. | ACCEPTE |

## Synthese

| Niveau de risque | Nombre | Pourcentage |
|-----------------|--------|-------------|
| FAIBLE | 5 | 36% |
| MOYEN | 7 | 50% |
| ELEVE | 2 | 14% |

**Risque global : MAITRISE**

Tous les risques eleves sont couverts par des mesures techniques implementees. Les risques moyens sont soit implementes soit acceptes avec justification. Aucun risque residuel critique.
