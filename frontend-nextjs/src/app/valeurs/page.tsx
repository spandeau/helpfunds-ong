import Link from "next/link";
import { Heart, CheckCircle, Target, Users, Globe, Award, ArrowRight, Shield } from "lucide-react";

export const metadata = {
  title: "Nos valeurs — Help Funds",
  description: "Les valeurs fondamentales qui guident chaque action de Help Funds.",
};

const VALUES = [
  {
    icon: Heart,
    color: "bg-red-50 border-red-100 text-red-600",
    iconBg: "bg-red-100",
    title: "Humanite avant tout",
    desc: "Chaque decision, chaque action est guidee par le respect de la dignite humaine. Nous croyons que chaque etre humain, independamment de son origine, merite de vivre dans la dignite et la securite.",
    examples: ["Aide sans discrimination", "Respect des cultures locales", "Priorite aux plus vulnerables"],
  },
  {
    icon: Shield,
    color: "bg-secondary-50 border-secondary-100 text-secondary-600",
    iconBg: "bg-secondary-100",
    title: "Transparence totale",
    desc: "Nous nous engageons a une transparence absolue dans l utilisation des fonds. 98% de chaque don va directement sur le terrain. Nos comptes sont audites et publics.",
    examples: ["Rapports financiers publics", "98% sur le terrain", "Audits independants"],
  },
  {
    icon: Target,
    color: "bg-primary-50 border-primary-100 text-primary-600",
    iconBg: "bg-primary-100",
    title: "Impact mesurable",
    desc: "Nous ne nous contentons pas de bonnes intentions. Chaque projet est assorti d indicateurs precis et d evaluations regulieres pour mesurer son impact reel sur les communautes.",
    examples: ["Indicateurs de performance", "Evaluations terrain", "Rapports d impact annuels"],
  },
  {
    icon: Users,
    color: "bg-purple-50 border-purple-100 text-purple-600",
    iconBg: "bg-purple-100",
    title: "Partenariat local",
    desc: "Nous ne venons pas imposer des solutions. Nous travaillons avec les communautes locales, les autorites et les partenaires sur le terrain pour concevoir des projets adaptes.",
    examples: ["Co-construction des projets", "Formation locale", "Transfert de competences"],
  },
  {
    icon: Globe,
    color: "bg-emerald-50 border-emerald-100 text-emerald-600",
    iconBg: "bg-emerald-100",
    title: "Durabilite",
    desc: "Nos interventions sont conçues pour durer. Nous formons les populations, nous transferons les competences et nous mettons en place des systemes autonomes qui perdurent apres notre depart.",
    examples: ["Formation des beneficiaires", "Autonomisation locale", "Projets auto-suffisants"],
  },
  {
    icon: Award,
    color: "bg-amber-50 border-amber-100 text-amber-600",
    iconBg: "bg-amber-100",
    title: "Excellence operationnelle",
    desc: "Nous exigeons les plus hauts standards dans la conduite de nos operations. De la selection des projets a leur evaluation finale, chaque etape est rigoureusement encadree.",
    examples: ["Standards internationaux", "Formation continue", "Procedures de qualite"],
  },
];

export default function ValeursPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-6">
            <Heart className="w-4 h-4 fill-white" />
            Ce en quoi nous croyons
          </div>
          <h1 className="font-heading font-bold text-white text-4xl md:text-5xl mb-6 leading-tight">
            Nos <span className="text-secondary-400">valeurs</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Les valeurs ne sont pas des mots sur un mur. Ce sont les principes qui guident chacune de nos decisions, chaque jour, sur le terrain comme au bureau.
          </p>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {VALUES.map((value, i) => (
              <div key={value.title} className={`bg-white rounded-2xl p-8 border ${value.color.split(" ")[1]} hover:shadow-md transition-all`}>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className={`w-16 h-16 ${value.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <value.icon className={`w-8 h-8 ${value.color.split(" ")[2]}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full">Valeur {String(i + 1).padStart(2, "0")}</span>
                      <h2 className="font-heading font-bold text-neutral-900 text-xl">{value.title}</h2>
                    </div>
                    <p className="text-neutral-600 leading-relaxed mb-4">{value.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {value.examples.map((example) => (
                        <span key={example} className="flex items-center gap-1.5 text-xs bg-neutral-50 border border-neutral-200 text-neutral-600 px-3 py-1.5 rounded-full font-medium">
                          <CheckCircle className="w-3 h-3 text-secondary-500" />{example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-900 to-primary-950 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-heading font-bold text-white text-2xl mb-4">Ces valeurs vous parlent ?</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Rejoignez une communaute de donateurs, benevoles et partenaires qui partagent ces convictions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/don" className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:-translate-y-0.5">
                <Heart className="w-5 h-5 fill-white" />Faire un don
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl transition-all">
                Nous rejoindre <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}