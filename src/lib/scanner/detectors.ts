import { DetectedTool, LegalPages, SecurityHeaders, ThirdPartyResource, ConsentEffectiveness } from "./types";
import { DETECTION_PATTERNS } from "./patterns";

export function detectTools(html: string): {
  analytics: DetectedTool[];
  pixels: DetectedTool[];
  consentBanners: DetectedTool[];
  tagManagers: DetectedTool[];
} {
  const analytics: DetectedTool[] = [];
  const pixels: DetectedTool[] = [];
  const consentBanners: DetectedTool[] = [];
  const tagManagers: DetectedTool[] = [];

  for (const pattern of DETECTION_PATTERNS) {
    for (const regex of pattern.patterns) {
      const match = html.match(regex);
      if (match) {
        const tool: DetectedTool = {
          id: pattern.id,
          name: pattern.name,
          category: pattern.category,
          cnilExempt: pattern.cnilExempt,
          snippet: match[0].slice(0, 100),
        };

        switch (pattern.category) {
          case "analytics":
            if (!analytics.some((t) => t.id === tool.id)) analytics.push(tool);
            break;
          case "pixel":
            if (!pixels.some((t) => t.id === tool.id)) pixels.push(tool);
            break;
          case "consent":
            if (!consentBanners.some((t) => t.id === tool.id)) consentBanners.push(tool);
            break;
          case "tag-manager":
            if (!tagManagers.some((t) => t.id === tool.id)) tagManagers.push(tool);
            break;
        }
        break;
      }
    }
  }

  return { analytics, pixels, consentBanners, tagManagers };
}

export function detectLegalPages(html: string): LegalPages {
  const lower = html.toLowerCase();

  return {
    mentionsLegales: /mentions[- _]?l[eé]gales/i.test(lower) ||
      /href=["'][^"']*mentions[_-]?legales/i.test(lower) ||
      /href=["'][^"']*legal[_-]?notice/i.test(lower),

    cgu: /conditions[- _]?g[eé]n[eé]rales[- _]?d[''\u2019]?utilisation/i.test(lower) ||
      /href=["'][^"']*cgu[/"'?#]/i.test(lower) ||
      /href=["'][^"']*\/cgu["']/i.test(lower) ||
      /href=["'][^"']*conditions[_-]?(generales[_-]?)?utilisation/i.test(lower) ||
      /href=["'][^"']*terms[_-]?(of[_-]?)?(use|service)/i.test(lower) ||
      /href=["'][^"']*tos[/"'?#]/i.test(lower) ||
      /href=["'][^"']*\/tos["']/i.test(lower) ||
      />cgu<\//i.test(lower) ||
      />\s*cgu\s*</i.test(lower) ||
      />\s*conditions\s+(g[eé]n[eé]rales\s+)?d[''\u2019]?\s*utilisation\s*</i.test(lower) ||
      />\s*terms\s+of\s+(use|service)\s*</i.test(lower) ||
      />\s*conditions\s+d[''\u2019]?\s*utilisation\s*</i.test(lower),

    cgv: /conditions[- _]?g[eé]n[eé]rales[- _]?de[- _]?vente/i.test(lower) ||
      /href=["'][^"']*cgv/i.test(lower) ||
      /href=["'][^"']*conditions[_-]?vente/i.test(lower) ||
      />cgv<\//i.test(lower),

    politiqueConfidentialite: /politique[- _]?de[- _]?confidentialit[eé]/i.test(lower) ||
      /href=["'][^"']*confidentialit/i.test(lower) ||
      /href=["'][^"']*privacy[_-]?policy/i.test(lower) ||
      /privacy[- _]?policy/i.test(lower) ||
      /donn[eé]es[- _]?personnelles/i.test(lower),

    politiqueCookies: /politique[- _]?(?:de[- _]?)?cookies/i.test(lower) ||
      /href=["'][^"']*cookie[s]?[_-]?polic/i.test(lower) ||
      /gestion[- _]?des[- _]?cookies/i.test(lower) ||
      /cookie[- _]?policy/i.test(lower),
  };
}

/**
 * Detect if the site appears to be an e-commerce site.
 * Looks for cart/shop/payment indicators in the HTML.
 */
export function detectEcommerce(html: string): boolean {
  const lower = html.toLowerCase();
  return (
    /href=["'][^"']*\/(panier|cart|basket|checkout|commande)/i.test(lower) ||
    /href=["'][^"']*\/(shop|boutique|produit|product)/i.test(lower) ||
    /class=["'][^"']*woocommerce/i.test(lower) ||
    /shopify/i.test(lower) ||
    /prestashop/i.test(lower) ||
    /magento/i.test(lower) ||
    /data-product/i.test(lower) ||
    /add[_-]?to[_-]?cart/i.test(lower) ||
    /ajouter[- _]?au[- _]?panier/i.test(lower) ||
    /stripe\.com\/v/i.test(lower) ||
    /paypal\.com/i.test(lower) ||
    /schema\.org\/(Product|Offer)/i.test(lower) ||
    /"@type"\s*:\s*"(Product|Offer)"/i.test(lower)
  );
}

/**
 * Extract security headers from the HTTP response.
 */
export function extractSecurityHeaders(
  headers: Record<string, string>,
  url: string
): SecurityHeaders {
  const get = (name: string) => headers[name.toLowerCase()] || "";

  return {
    https: url.startsWith("https://"),
    hsts: get("strict-transport-security") !== "",
    contentSecurityPolicy: get("content-security-policy") !== "",
    xFrameOptions: get("x-frame-options") !== "",
    xContentTypeOptions: get("x-content-type-options") !== "",
    referrerPolicy: get("referrer-policy") !== "",
  };
}

/**
 * Detect third-party resources that may cause GDPR issues:
 * - Google Fonts (CJUE ruling 2022)
 * - YouTube embeds
 * - Google Maps
 * - reCAPTCHA
 * - External CDNs with tracking
 */
export function detectThirdPartyResources(html: string): ThirdPartyResource[] {
  const resources: ThirdPartyResource[] = [];

  const THIRD_PARTY_PATTERNS: {
    type: ThirdPartyResource["type"];
    name: string;
    domain: string;
    gdprRisk: boolean;
    detail: string;
    patterns: RegExp[];
  }[] = [
    {
      type: "font",
      name: "Google Fonts",
      domain: "fonts.googleapis.com",
      gdprRisk: true,
      detail: "Transfert d'IP vers Google (USA). Arrêt LG München 2022 : amende possible. Héberger les polices localement.",
      patterns: [
        /fonts\.googleapis\.com/i,
        /fonts\.gstatic\.com/i,
      ],
    },
    {
      type: "iframe",
      name: "YouTube",
      domain: "youtube.com",
      gdprRisk: true,
      detail: "L'embed YouTube standard dépose des cookies de tracking Google. Utiliser youtube-nocookie.com ou le consentement préalable.",
      patterns: [
        /youtube\.com\/embed/i,
        /youtube\.com\/iframe/i,
        /youtu\.be/i,
      ],
    },
    {
      type: "iframe",
      name: "YouTube (no-cookie)",
      domain: "youtube-nocookie.com",
      gdprRisk: false,
      detail: "Mode privacy-enhanced de YouTube. Bonne pratique, mais vérifier que le consentement est en place.",
      patterns: [
        /youtube-nocookie\.com/i,
      ],
    },
    {
      type: "iframe",
      name: "Google Maps",
      domain: "google.com/maps",
      gdprRisk: true,
      detail: "Google Maps transfère des données vers les USA et dépose des cookies. Envisager une alternative (OpenStreetMap) ou le consentement préalable.",
      patterns: [
        /maps\.googleapis\.com/i,
        /google\.com\/maps/i,
        /maps\.google\./i,
      ],
    },
    {
      type: "captcha",
      name: "Google reCAPTCHA",
      domain: "google.com/recaptcha",
      gdprRisk: true,
      detail: "reCAPTCHA collecte des données comportementales et les transfère à Google. Des alternatives existent (hCaptcha, Turnstile).",
      patterns: [
        /google\.com\/recaptcha/i,
        /recaptcha\/api/i,
        /grecaptcha/i,
        /gstatic\.com\/recaptcha/i,
      ],
    },
    {
      type: "captcha",
      name: "hCaptcha",
      domain: "hcaptcha.com",
      gdprRisk: false,
      detail: "hCaptcha est une alternative respectueuse de la vie privée à reCAPTCHA.",
      patterns: [
        /hcaptcha\.com/i,
        /js\.hcaptcha/i,
      ],
    },
    {
      type: "captcha",
      name: "Cloudflare Turnstile",
      domain: "challenges.cloudflare.com",
      gdprRisk: false,
      detail: "Turnstile est une alternative privacy-friendly hébergée par Cloudflare.",
      patterns: [
        /challenges\.cloudflare\.com/i,
        /turnstile/i,
      ],
    },
    {
      type: "iframe",
      name: "Vimeo",
      domain: "vimeo.com",
      gdprRisk: true,
      detail: "Vimeo peut déposer des cookies de tracking. Vérifier la gestion du consentement.",
      patterns: [
        /player\.vimeo\.com/i,
      ],
    },
    {
      type: "cdn",
      name: "Cloudflare CDN",
      domain: "cdnjs.cloudflare.com",
      gdprRisk: false,
      detail: "CDN Cloudflare. Pas de risque RGPD majeur si utilisé pour des ressources statiques.",
      patterns: [
        /cdnjs\.cloudflare\.com/i,
      ],
    },
    {
      type: "cdn",
      name: "jsDelivr CDN",
      domain: "cdn.jsdelivr.net",
      gdprRisk: false,
      detail: "CDN open-source. Faible risque RGPD.",
      patterns: [
        /cdn\.jsdelivr\.net/i,
      ],
    },
    {
      type: "cdn",
      name: "unpkg CDN",
      domain: "unpkg.com",
      gdprRisk: false,
      detail: "CDN npm. Faible risque RGPD.",
      patterns: [
        /unpkg\.com/i,
      ],
    },
    {
      type: "iframe",
      name: "Stripe",
      domain: "stripe.com",
      gdprRisk: false,
      detail: "Stripe est conforme RGPD avec des garanties contractuelles et un hébergement UE possible.",
      patterns: [
        /js\.stripe\.com/i,
      ],
    },
    {
      type: "font",
      name: "Adobe Fonts (Typekit)",
      domain: "use.typekit.net",
      gdprRisk: true,
      detail: "Adobe Fonts transfère des données vers les USA. Envisager l'hébergement local des polices.",
      patterns: [
        /use\.typekit\.net/i,
        /p\.typekit\.net/i,
      ],
    },
    {
      type: "iframe",
      name: "Twitter/X Embed",
      domain: "platform.twitter.com",
      gdprRisk: true,
      detail: "Les embeds Twitter déposent des cookies de tracking. Consentement préalable nécessaire.",
      patterns: [
        /platform\.twitter\.com/i,
        /platform\.x\.com/i,
      ],
    },
    {
      type: "iframe",
      name: "Facebook/Instagram Embed",
      domain: "facebook.com",
      gdprRisk: true,
      detail: "Les embeds Meta déposent des cookies de tracking. Consentement préalable nécessaire.",
      patterns: [
        /facebook\.com\/plugins/i,
        /instagram\.com\/embed/i,
      ],
    },
  ];

  for (const pattern of THIRD_PARTY_PATTERNS) {
    for (const regex of pattern.patterns) {
      if (regex.test(html)) {
        if (!resources.some((r) => r.name === pattern.name)) {
          resources.push({
            type: pattern.type,
            name: pattern.name,
            domain: pattern.domain,
            gdprRisk: pattern.gdprRisk,
            detail: pattern.detail,
          });
        }
        break;
      }
    }
  }

  return resources;
}

/**
 * Evaluate whether the consent banner actually blocks scripts before consent.
 * Checks for common implementation patterns.
 */
export function detectConsentEffectiveness(html: string): ConsentEffectiveness {
  const details: string[] = [];

  // Check for type="text/plain" pattern (scripts blocked until consent)
  const typePlaintext = /type\s*=\s*["']text\/plain["']/i.test(html);
  if (typePlaintext) {
    details.push("Scripts bloqués via type=\"text/plain\" (bonne pratique)");
  }

  // Check for data-gdpr-src or similar consent-gating attributes
  const dataGdprSrc = /data-gdpr-src|data-cookieconsent|data-consent|data-requires-consent/i.test(html);
  if (dataGdprSrc) {
    details.push("Attributs de consentement détectés sur les scripts (chargement conditionnel)");
  }

  // Check for script blocking patterns (common in CMPs)
  const consentGating =
    /data-category\s*=\s*["']analytics["']/i.test(html) ||
    /data-category\s*=\s*["']marketing["']/i.test(html) ||
    /data-service\s*=\s*["']/i.test(html) ||
    /class\s*=\s*["'][^"']*optanon-category/i.test(html) ||
    /data-cmp-/i.test(html) ||
    /data-tarteaucitron/i.test(html);

  if (consentGating) {
    details.push("Catégorisation des scripts par type de consentement détectée");
  }

  const scriptsBlocked = typePlaintext || dataGdprSrc || consentGating;

  if (!scriptsBlocked) {
    details.push("Aucun mécanisme de blocage de scripts avant consentement détecté");
  }

  return {
    scriptsBlocked,
    dataGdprSrc,
    typePlaintext,
    consentGating,
    details,
  };
}
