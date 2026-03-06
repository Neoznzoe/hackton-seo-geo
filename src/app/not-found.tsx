import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">404</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        La page que vous recherchez n&apos;existe pas.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-800 transition-colors"
        >
          Retour a l&apos;accueil
        </Link>
        <Link
          href="/comparer"
          className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Comparer les outils
        </Link>
      </div>
    </div>
  );
}
