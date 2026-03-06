import { Metadata } from "next";
import { SITE_NAME, CURRENT_YEAR } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Glossaire analytics et RGPD ${CURRENT_YEAR}`,
  description: `Definitions des termes essentiels de l'analytics web et du RGPD : cookies, consentement, CNIL, tracking, attribution, heatmap et plus encore.`,
  alternates: { canonical: "/glossaire" },
  openGraph: {
    title: `Glossaire analytics et RGPD ${CURRENT_YEAR} | ${SITE_NAME}`,
    description: `Definitions des termes essentiels de l'analytics web et du RGPD.`,
    type: "website",
  },
};

export default function GlossaireLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
