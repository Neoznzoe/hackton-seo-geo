import { Metadata } from "next";
import { CURRENT_YEAR } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Comparatif des outils analytics web ${CURRENT_YEAR}`,
  description: `Tableau comparatif complet de 8 outils analytics : GA4, Matomo, Plausible, Piwik PRO, Simple Analytics, Fathom, Adobe Analytics, Umami. Prix, fonctionnalites, RGPD.`,
  alternates: {
    canonical: "/comparer",
  },
};

export default function ComparerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
