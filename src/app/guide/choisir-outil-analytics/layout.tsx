import { Metadata } from "next";
import { SITE_NAME, CURRENT_YEAR } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Guide : comment choisir son outil analytics en ${CURRENT_YEAR}`,
  description: `Guide complet pour choisir le meilleur outil analytics web en ${CURRENT_YEAR}. Criteres essentiels, conformite RGPD/CNIL, comparatif et recommandations par profil.`,
  alternates: { canonical: "/guide/choisir-outil-analytics" },
  openGraph: {
    title: `Guide : comment choisir son outil analytics en ${CURRENT_YEAR} | ${SITE_NAME}`,
    description: `Guide complet pour choisir le meilleur outil analytics web en ${CURRENT_YEAR}.`,
    type: "article",
  },
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
