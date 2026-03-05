interface SitemapAlertProps {
  sitemapFound: boolean;
}

export default function SitemapAlert({ sitemapFound }: SitemapAlertProps) {
  if (sitemapFound) return null;

  return (
    <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex gap-3 items-start">
      <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      <div>
        <p className="text-sm font-semibold text-amber-800">Aucun sitemap trouvé</p>
        <p className="text-xs text-amber-700 mt-1">
          Nous n&apos;avons pas pu trouver de fichier <code className="bg-amber-100 px-1 rounded">sitemap.xml</code> sur ce site.
          Seule la page d&apos;accueil a été analysée. Ajoutez un sitemap pour permettre une analyse multi-pages complète.
        </p>
      </div>
    </div>
  );
}
