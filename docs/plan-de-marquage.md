# Plan de Marquage — DevRadar

**Outil de tracking :** Piwik PRO
**Container ID :** `63d0dcd9-adc4-4484-9a9b-5d278b1ca118`
**Consent Management :** Bandeau cookies custom (RGPD/CNIL conforme)
**Principe :** Aucun tracking si consentement refuse (activation conditionnelle)

---

## 1. KPI Principal

**Conversion = Scan RGPD complete avec score affiche**

| KPI | Definition | Objectif |
|-----|-----------|----------|
| Taux de scan | Scans completes / Visiteurs uniques | > 15% |
| Taux CTA homepage | Clics "Scanner mon site" / Visiteurs homepage | > 20% |
| Taux de completion scanner | step_5_result / step_1_open | > 60% |
| Taux d'action post-scan | step_6 clics / step_5_result | > 10% |
| Profondeur de visite | Pages vues / Session | > 2.5 |

---

## 2. Funnel Principal (Scanner RGPD)

```
Step 0: funnel > step_0_scanner_cta (CTA homepage)
  |
Step 1: funnel > step_1_scanner_open (page /scanner)
  |
Step 2: funnel > step_2_url_input (saisie URL)
  |
Step 3: funnel > step_3_plan_select (choix plan)
  |
Step 4: funnel > step_4_scan_start (lancement scan)
  |
Step 5: funnel > step_5_scan_result (score affiche)
  |
Step 6a: funnel > step_6_recommendation_click (clic reco)
Step 6b: funnel > step_6_tool_click (clic vers outil)
```

| Etape | Categorie | Action | Name | Valeur |
|-------|----------|--------|------|--------|
| CTA homepage | funnel | step_0_scanner_cta | `homepage` | — |
| Ouverture scanner | funnel | step_1_scanner_open | `scanner_page` | — |
| Saisie URL | funnel | step_2_url_input | `url` | — |
| Selection plan | funnel | step_3_plan_select | `gratuit/rapide/complet` | — |
| Lancement scan | funnel | step_4_scan_start | `url` | — |
| Resultat | funnel | step_5_scan_result | `risque_level` | score (0-100) |
| Clic recommandation | funnel | step_6_recommendation_click | `link` | — |
| Clic vers outil | funnel | step_6_tool_click | `toolName` | — |

---

## 3. Funnel Secondaire (Decouverte outils)

```
Step 1: discovery > view_tool (page outil)
  |
Step 2: discovery > compare (page comparaison)
  |
Step 3: discovery > external_link (clic site officiel)
```

| Etape | Categorie | Action | Name | Valeur |
|-------|----------|--------|------|--------|
| Vue outil | discovery | view_tool | `slug` | — |
| Comparaison | discovery | compare | `tool1-vs-tool2` | — |
| Clic comparer | discovery | compare_click | `from -> to` | — |
| Lien externe | discovery | external_link | `toolName \| url` | — |
| CTA click | discovery | cta_click | `label du CTA` | — |

---

## 4. Events d'Engagement

| Categorie | Action | Name | Valeur | Declencheur |
|----------|--------|------|--------|-------------|
| engagement | scroll_depth | `25%/50%/75%/100%` | depth | Scroll 25/50/75/100% |
| engagement | faq_toggle | `question` | — | Clic sur FAQ |
| engagement | time_on_page | `pageType` | seconds | Quitte la page (>5s) |
| engagement | content_interaction | `type:action:label` | — | Interaction contenu |

---

## 5. Segmentation Utilisateur

| Categorie | Action | Name | Declencheur |
|----------|--------|------|-------------|
| user | segment | `new` / `returning` | 1er chargement (localStorage) |
| user | entry_source | `google/bing/direct/chatgpt/perplexity/...` | document.referrer |

### Sources detectees
- `google` : Trafic Google Search
- `bing` : Trafic Bing
- `chatgpt` / `openai` : Trafic depuis ChatGPT (GEO)
- `perplexity` : Trafic depuis Perplexity AI (GEO)
- `linkedin` / `twitter` : Reseaux sociaux
- `direct` : Acces direct
- `other_referral` : Autre referent

---

## 6. Consent Management

| Categorie | Action | Name | Declencheur |
|----------|--------|------|-------------|
| consent | cookie_banner | `accepted` / `refused` | Clic bandeau cookies |

### Regles RGPD
- **Consentement refuse** = Piwik PRO n'est PAS initialise, aucun cookie depose
- **Consentement accepte** = Piwik PRO initialise, tracking actif
- Le choix est stocke dans `localStorage` (cle : `devradar_consent`)
- Pas de tracking avant consentement (conforme CNIL)

---

## 7. Table de KPI Business

| KPI | Metrique | Source | Frequence |
|-----|---------|--------|-----------|
| **Visiteurs uniques** | Users | Piwik PRO | Quotidien |
| **Taux CTA scanner** | step_0_cta / homepage users | Events | Quotidien |
| **Scans lances** | step_4_scan_start count | Events | Quotidien |
| **Scans completes** | step_5_scan_result count | Events | Quotidien |
| **Taux de completion** | step_5 / step_1 | Events | Hebdo |
| **Score moyen scanner** | Avg value step_5 | Events | Hebdo |
| **Plan le plus choisi** | step_3 breakdown | Events | Hebdo |
| **Taux d'action post-scan** | step_6 / step_5 | Events | Hebdo |
| **Top outils vus** | view_tool count | Events | Hebdo |
| **Top comparaisons** | compare count | Events | Hebdo |
| **Taux de rebond** | Bounce rate | Piwik PRO | Hebdo |
| **Taux consentement** | accepted / (accepted+refused) | Events | Mensuel |
| **Part trafic GEO (IA)** | chatgpt+perplexity / total | Events | Mensuel |

---

## 8. Architecture Technique

```
[Bandeau Consent] --> localStorage (devradar_consent)
        |
    accepted?
        |
  [PiwikProProvider] --> PiwikPro.initialize()
        |
  [FunnelTracker] --> trackUserSegment() + trackEntryPoint() + trackPageLanding()
        |
  [ScrollTracker] --> trackScrollDepth() (25/50/75/100%)
        |
  [Homepage] --> trackScannerCtaClick() (CTA principal)
        |
  [Scanner] --> trackScannerOpen() -> trackScanPlanSelect() -> trackScan() -> trackScanResult()
        |
  [Pages outils] --> trackToolView(), trackComparison(), trackExternalLink()
```

---

## 9. Nommage

Convention : `snake_case` pour toutes les actions et noms d'evenements.

Categories :
- `funnel` : etapes du tunnel principal (Scanner RGPD)
- `discovery` : etapes du tunnel secondaire (decouverte outils)
- `navigation` : deplacement entre pages
- `engagement` : interactions de profondeur
- `user` : segmentation visiteur
- `consent` : gestion du consentement
