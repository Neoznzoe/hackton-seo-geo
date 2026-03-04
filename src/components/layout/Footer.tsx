import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold text-white">{SITE_NAME}</p>
            <p className="mt-2 text-sm">
              Comparateur d&apos;outils analytics web. Trouvez la solution
              adaptee a vos besoins en matiere de confidentialite, fonctionnalites
              et budget.
            </p>
          </div>

          {/* Outils */}
          <div>
            <p className="text-sm font-semibold text-white uppercase tracking-wide">
              Outils
            </p>
            <ul className="mt-3 space-y-2">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/outils/${tool.slug}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <p className="text-sm font-semibold text-white uppercase tracking-wide">
              Categories
            </p>
            <ul className="mt-3 space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categorie/${cat.slug}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/comparer"
                  className="text-sm hover:text-white transition-colors"
                >
                  Comparer tous les outils
                </Link>
              </li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <p className="text-sm font-semibold text-white uppercase tracking-wide">
              Ressources
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/guide/choisir-outil-analytics" className="text-sm hover:text-white transition-colors">
                  Guide : choisir son outil
                </Link>
              </li>
              <li>
                <Link href="/ressources/rgpd-analytics" className="text-sm hover:text-white transition-colors">
                  RGPD et analytics
                </Link>
              </li>
              <li>
                <Link href="/glossaire" className="text-sm hover:text-white transition-colors">
                  Glossaire
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME}. Projet hackathon M2
            IW. Tous droits reserves.
          </p>
        </div>
      </div>
    </footer>
  );
}
