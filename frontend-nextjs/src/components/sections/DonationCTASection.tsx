import Link from "next/link";
import { Heart, ArrowRight, Users, Globe, TrendingUp } from "lucide-react";

const STATS = [
  { icon: Users, value: "50 000+", label: "Beneficiaires" },
  { icon: Globe, value: "35", label: "Pays" },
  { icon: TrendingUp, value: "98%", label: "Sur le terrain" },
  { icon: Heart, value: "120+", label: "Projets" },
];

const AMOUNTS = [10, 25, 50, 100];

export default function DonationCTASection() {
  return (
    <section className="py-14 bg-gradient-to-br from-primary-950 to-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-white text-xs font-medium mb-4">
              <span className="w-1.5 h-1.5 bg-secondary-400 rounded-full animate-pulse" />
              98% des dons sur le terrain
            </div>
            <h2 className="font-heading font-bold text-white text-2xl md:text-3xl mb-3">
              Agissez <span className="text-secondary-400">maintenant</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-md">
              Chaque euro investi change une vie. Rejoignez des milliers de donateurs qui font confiance a Help Funds.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <stat.icon className="w-4 h-4 text-secondary-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-none">{stat.value}</p>
                    <p className="text-white/50 text-xs mt-0.5">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/projets" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
              Voir tous nos projets <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="font-heading font-bold text-white text-lg mb-2">
              Faire un don
            </h3>
            <p className="text-white/60 text-xs mb-5">
              Choisissez un montant ou rendez-vous sur la page dedie pour plus d options.
            </p>

            <div className="grid grid-cols-4 gap-2 mb-5">
              {AMOUNTS.map((amount) => (
                <Link
                  key={amount}
                  href="/don"
                  className="py-3 rounded-xl border border-white/20 hover:border-secondary-400 hover:bg-secondary-400/10 text-white font-bold text-base text-center transition-all"
                >
                  {amount}€
                </Link>
              ))}
            </div>

            <Link
              href="/don"
              className="w-full flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-lg text-sm mb-3"
            >
              <Heart className="w-4 h-4 fill-white" />
              Faire un don maintenant
            </Link>

            <Link
              href="/don"
              className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white/80 font-medium py-2.5 rounded-xl transition-all text-xs"
            >
              Montant libre ou don mensuel →
            </Link>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-4 text-xs text-white/40">
              <span>🔒 Paiement securise</span>
              <span>·</span>
              <span>📋 Recu fiscal</span>
              <span>·</span>
              <span>🌍 Impact garanti</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}