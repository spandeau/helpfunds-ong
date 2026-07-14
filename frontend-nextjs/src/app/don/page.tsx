import Link from "next/link";
import { Check, Heart, FileText, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Don confirme — Help Funds",
  description: "Merci pour votre don a Help Funds.",
};

export default function DonSuccesPage() {
  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center pt-20">
      <div className="max-w-lg mx-auto px-4 text-center">

        <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <Check className="w-12 h-12 text-secondary-600" />
        </div>

        <h1 className="font-heading font-bold text-neutral-900 text-3xl md:text-4xl mb-4">
          Merci pour votre don !
        </h1>

        <p className="text-neutral-500 text-lg mb-8">
          Votre paiement a ete confirme avec succes. Un recu fiscal vous sera envoye par email.
        </p>

        <div className="bg-white rounded-2xl border border-neutral-100 p-6 mb-8 text-left space-y-4">
          <h2 className="font-heading font-bold text-neutral-900 mb-4">Ce que votre don permet :</h2>
          {[
            { emoji: "📚", text: "Fournitures scolaires pour des enfants defavorises" },
            { emoji: "💧", text: "Acces a l eau potable dans les villages ruraux" },
            { emoji: "🏥", text: "Soins medicaux pour les communautes isolees" },
            { emoji: "🌱", text: "Projets agricoles durables pour l autonomie alimentaire" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-neutral-600 text-sm">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/projets"
            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-3 rounded-xl transition-all"
          >
            Voir nos projets <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/rapports"
            className="inline-flex items-center gap-2 border-2 border-neutral-200 hover:border-primary-300 text-neutral-700 font-semibold px-6 py-3 rounded-xl transition-all"
          >
            <FileText className="w-4 h-4" />
            Nos rapports
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white font-bold px-6 py-3 rounded-xl transition-all"
          >
            <Heart className="w-4 h-4 fill-white" />
            Accueil
          </Link>
        </div>

      </div>
    </main>
  );
}