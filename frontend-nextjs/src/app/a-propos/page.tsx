import Link from "next/link";
import Image from "next/image";
import { Heart, Globe, Users, TrendingUp, Award, ArrowRight, CheckCircle, Target } from "lucide-react";

export const metadata = {
  title: "A propos — Help Funds",
  description: "Decouvrez l histoire, la mission et les valeurs de Help Funds ONG Internationale.",
};

const MILESTONES = [
  { year: "2014", title: "Fondation", desc: "Help Funds est cree avec une premiere action de distribution alimentaire au Togo." },
  { year: "2016", title: "Expansion regionale", desc: "Lancement des premiers projets au Nigeria, Mali et Ghana." },
  { year: "2018", title: "Statut international", desc: "Obtention du statut d ONG internationale. 20 pays couverts." },
  { year: "2020", title: "Crise COVID", desc: "Distribution de 50 000 repas et de materiel medical pendant la pandemie." },
  { year: "2022", title: "100 projets", desc: "Franchissement du cap des 100 projets realises. 35 pays touche." },
  { year: "2024", title: "Aujourd hui", desc: "50 000 beneficiaires, 120 projets actifs, presente dans 35 pays." },
];

const VALUES = [
  { icon: Heart, title: "Humanite", desc: "Chaque action est guidee par le respect de la dignite humaine et la compassion envers les plus vulnerables.", color: "bg-red-50 text-red-600" },
  { icon: CheckCircle, title: "Transparence", desc: "98% des dons vont directement sur le terrain. Chaque euro est tracable et justifie.", color: "bg-secondary-50 text-secondary-600" },
  { icon: Target, title: "Efficacite", desc: "Nous mesurons l impact de chaque action avec des indicateurs concrets et verifiables.", color: "bg-primary-50 text-primary-600" },
  { icon: Users, title: "Partenariat", desc: "Nous travaillons main dans la main avec les communautes locales et les autorites.", color: "bg-purple-50 text-purple-600" },
  { icon: Globe, title: "Durabilite", desc: "Nos projets sont concus pour perdurer au-dela de notre intervention directe.", color: "bg-amber-50 text-amber-600" },
  { icon: Award, title: "Excellence", desc: "Nous visons les standards les plus eleves dans la conduite de nos operations humanitaires.", color: "bg-emerald-50 text-emerald-600" },
];

const STATS = [
  { value: "10+", label: "Annees d experience", icon: Award },
  { value: "50 000+", label: "Beneficiaires", icon: Users },
  { value: "35", label: "Pays d intervention", icon: Globe },
  { value: "120+", label: "Projets realises", icon: TrendingUp },
];

export default function AProposPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-6">
                <Heart className="w-4 h-4 fill-white" />
                Depuis 2014, ensemble pour un monde meilleur
              </div>
              <h1 className="font-heading font-bold text-white text-4xl md:text-5xl mb-6 leading-tight">
                Notre histoire,<br />
                <span className="text-secondary-400">votre confiance</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Help Funds est une ONG internationale fondee en 2014 avec une conviction simple : chaque personne, ou qu elle soit dans le monde, merite de vivre dans la dignite.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/projets" className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold px-6 py-3 rounded-xl transition-all">
                  Voir nos projets <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/don" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all">
                  Faire un don
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80" alt="Help Funds equipe sur le terrain" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                  <p className="text-white font-semibold text-sm">Equipe Help Funds sur le terrain</p>
                  <p className="text-white/60 text-xs">Region du Sahel, 2024</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-600 rounded-2xl flex flex-col items-center justify-center text-white shadow-xl">
                <span className="font-heading font-black text-2xl leading-none">10+</span>
                <span className="text-xs text-center leading-tight">ans d action</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-primary-200 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="font-heading font-black text-3xl text-neutral-900 mb-1">{stat.value}</div>
                <div className="text-neutral-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading font-bold text-neutral-900 text-3xl mb-4">Notre mission</h2>
            <p className="text-neutral-500 max-w-3xl mx-auto text-lg leading-relaxed">
              Help Funds agit pour reduire les inegalites mondiales en finançant des projets durables dans les domaines de la sante, de l education, de l eau potable, de l alimentation et du logement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: "🏥", title: "Sante", desc: "Acces aux soins, vaccinations, maternites, sante communautaire." },
              { emoji: "📚", title: "Education", desc: "Ecoles, formation professionnelle, bourses d etudes." },
              { emoji: "💧", title: "Eau & Hygiene", desc: "Forages, puits, assainissement, sensibilisation." },
              { emoji: "🌾", title: "Alimentation", desc: "Aide alimentaire d urgence et agriculture durable." },
              { emoji: "🏠", title: "Logement", desc: "Reconstruction apres catastrophes, habitat digne." },
              { emoji: "💼", title: "Economie", desc: "Microfinance, formation entrepreneuriale, autonomisation." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-neutral-100 hover:border-primary-200 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-heading font-bold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading font-bold text-neutral-900 text-3xl mb-4">Notre histoire</h2>
            <p className="text-neutral-500">10 ans d engagement au service des communautes vulnerables</p>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-neutral-100" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div key={i} className="relative flex gap-6 pl-2">
                  <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 z-10 shadow-lg">
                    <span className="text-white font-heading font-black text-xs">{m.year}</span>
                  </div>
                  <div className="flex-1 bg-neutral-50 rounded-2xl p-5 border border-neutral-100 hover:border-primary-200 transition-all">
                    <h3 className="font-heading font-bold text-neutral-900 mb-1">{m.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading font-bold text-neutral-900 text-3xl mb-4">Nos valeurs</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">Les principes qui guident chacune de nos actions sur le terrain et dans notre organisation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-6 border border-neutral-100 hover:border-primary-200 hover:shadow-md transition-all">
                <div className={`w-12 h-12 ${value.color} rounded-xl flex items-center justify-center mb-4`}>
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-neutral-900 text-lg mb-2">{value.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-900 to-primary-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-white text-3xl mb-4">Rejoignez notre mission</h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Que vous souhaitiez faire un don, devenir benevole ou proposer un partenariat, nous avons besoin de vous.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/don" className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-0.5">
              <Heart className="w-5 h-5 fill-white" />Faire un don
            </Link>
            <Link href="/equipe" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl transition-all">
              <Users className="w-5 h-5" />Notre equipe
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl transition-all">
              Nous contacter <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}