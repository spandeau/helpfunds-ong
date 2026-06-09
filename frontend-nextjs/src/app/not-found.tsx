import Link from "next/link";
import { Home, Search, ArrowLeft, Heart } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="text-8xl font-heading font-black text-neutral-200 mb-4">404</div>
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="font-heading font-bold text-neutral-900 text-2xl mb-3">
            Page introuvable
          </h1>
          <p className="text-neutral-500 leading-relaxed mb-8">
            La page que vous recherchez n existe pas ou a ete deplacee. Pas d inquietude, vous pouvez retourner a l accueil ou explorer nos projets.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-3 rounded-xl transition-all">
            <Home className="w-4 h-4" />Retour a l accueil
          </Link>
          <Link href="/projets" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-neutral-200 hover:border-primary-300 text-neutral-700 font-semibold px-6 py-3 rounded-xl transition-all">
            Voir nos projets
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm">
          <p className="text-sm text-neutral-500 mb-4">Pages principales</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              { label: "Accueil", href: "/" },
              { label: "Nos projets", href: "/projets" },
              { label: "Actualites", href: "/actualites" },
              { label: "A propos", href: "/a-propos" },
              { label: "Notre equipe", href: "/equipe" },
              { label: "Nos valeurs", href: "/valeurs" },
              { label: "Rapports", href: "/rapports" },
              { label: "Contact", href: "/contact" },
            ].map((page) => (
              <Link key={page.href} href={page.href} className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary-50 hover:text-primary-600 text-neutral-600 transition-colors">
                <ArrowLeft className="w-3 h-3" />{page.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Link href="/don" className="inline-flex items-center gap-2 text-secondary-600 hover:text-secondary-700 font-semibold text-sm transition-colors">
            <Heart className="w-4 h-4 fill-secondary-600" />Faire un don
          </Link>
        </div>
      </div>
    </main>
  );
}