import Link from "next/link";
import { Heart, ArrowRight, Users, Globe, TrendingUp, Shield, FileText } from "lucide-react";

const STATS = [
  { icon: Users, value: "50 000+", label: "Beneficiaires" },
  { icon: Globe, value: "35", label: "Pays" },
  { icon: TrendingUp, value: "98%", label: "Sur le terrain" },
  { icon: Heart, value: "120+", label: "Projets" },
];

const AMOUNTS = [10, 25, 50, 100];

const GUARANTEES = [
  { icon: Shield, text: "Paiement 100% securise" },
  { icon: FileText, text: "Recu fiscal immediat" },
  { icon: Globe, text: "98% des fonds sur le terrain" },
  { icon: Heart, text: "Impact visible et mesurable" },
];

export default function DonationCTASection() {
  return (
    <section className="py-16 bg-neutral-50 border-t border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-secondary-50 border border-secondary-200 rounded-full px-4 py-1.5 text-secondary-700 text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full animate-pulse" />
            98% des dons vont directement sur le terrain
          </div>
          <h2 className="font-heading font-bold text-neutral-900 text-2xl md:text-3xl mb-3">
            Agissez <span className="text-primary-600">maintenant</span>
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm leading-relaxed">
            Chaque euro investi change une vie. Rejoignez des milliers de donateurs qui font confiance a Help Funds.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white border border-neutral-200 rounded-2xl p-5 flex items-center gap-3 hover:border-primary-200 hover:shadow-sm transition-all">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-neutral-900 font-bold text-lg leading-none">{stat.value}</p>
                <p className="text-neutral-400 text-xs mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          <div className="bg-white border border-neutral-200 rounded-2xl p-6 hover:border-primary-200 hover:shadow-sm transition-all">
            <h3 className="font-heading font-bold text-neutral-900 text-lg mb-2">
              Faire un don
            </h3>
            <p className="text-neutral-500 text-sm mb-5">
              Choisissez un montant rapide ou rendez-vous sur la page dedicee pour plus d options.
            </p>

            <div className="grid grid-cols-4 gap-2 mb-5">
              {AMOUNTS.map((amount) => (
                <Link
                  key={amount}
                  href="/don"
                  className="py-3 rounded-xl border-2 border-neutral-200 hover:border-primary-500 hover:bg-primary-50 text-neutral-800 hover:text-primary-700 font-bold text-base text-center transition-all"
                >
                  {amount}€
                </Link>
              ))}
            </div>

            <Link
              href="/don"
              className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-md text-sm mb-3"
            >
              <Heart className="w-4 h-4 fill-white" />
              Faire un don maintenant
            </Link>

            <Link
              href="/don"
              className="w-full flex items-center justify-center gap-2 border border-neutral-200 hover:border-neutral-300 text-neutral-600 font-medium py-2.5 rounded-xl transition-all text-xs hover:bg-neutral-50"
            >
              Montant libre ou don mensuel
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 hover:border-primary-200 hover:shadow-sm transition-all">
              <h3 className="font-heading font-bold text-neutral-900 text-base mb-4">
                Pourquoi nous faire confiance
              </h3>
              <div className="space-y-3">
                {GUARANTEES.map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-neutral-600 text-sm">
                    <div className="w-7 h-7 bg-secondary-50 border border-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-secondary-600" />
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-5 hover:border-primary-200 hover:shadow-sm transition-all">
              <p className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-3">
                Dons recents
              </p>
              <div className="space-y-3">
                {[
                  { name: "Marie D.", amount: 50, time: "il y a 2 min" },
                  { name: "Anonyme", amount: 100, time: "il y a 5 min" },
                  { name: "Pierre M.", amount: 25, time: "il y a 12 min" },
                ].map((donor, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-600 font-bold text-xs">
                        {donor.name[0]}
                      </div>
                      <div>
                        <p className="text-neutral-800 text-xs font-medium">{donor.name}</p>
                        <p className="text-neutral-400 text-[10px]">{donor.time}</p>
                      </div>
                    </div>
                    <span className="text-primary-600 font-bold text-sm">{donor.amount}€</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/projets"
              className="flex items-center justify-center gap-2 text-neutral-500 hover:text-primary-600 text-sm transition-colors"
            >
              Voir tous nos projets
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}