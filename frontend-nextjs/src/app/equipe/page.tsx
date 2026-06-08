import Link from "next/link";

import {
  Heart,
  Mail,
  ArrowRight,
  Users,
  Globe,
  Share2,
} from "lucide-react";

export const metadata = {
  title: "Notre equipe — Help Funds",
  description: "Decouvrez l equipe passionnee qui fait vivre Help Funds chaque jour.",
};

const TEAM = [
  { name: "Samuel Adjonou", role: "Directeur General", dept: "Direction", bio: "Fondateur de Help Funds, Samuel a consacre plus de 10 ans au developpement humanitaire en Afrique de l Ouest.", avatar: "SA", gradient: "from-primary-600 to-primary-800" },
  { name: "Amina Diallo", role: "Directrice des Operations", dept: "Direction", bio: "Avec 8 ans d experience en gestion de projets humanitaires, Amina coordonne nos operations dans 15 pays.", avatar: "AD", gradient: "from-secondary-600 to-secondary-800" },
  { name: "Koffi Mensah", role: "Responsable Terrain", dept: "Terrain", bio: "Koffi supervise nos equipes sur le terrain et s assure que chaque projet repond aux besoins reels des communautes.", avatar: "KM", gradient: "from-emerald-600 to-emerald-800" },
  { name: "Fatou Camara", role: "Responsable Communication", dept: "Communication", bio: "Fatou dirige notre strategie de communication et veille a la transparence de nos actions aupres de nos donateurs.", avatar: "FC", gradient: "from-purple-600 to-purple-800" },
  { name: "Ibrahim Traore", role: "Responsable Finance", dept: "Finance", bio: "Expert-comptable certifie, Ibrahim garantit la tracabilite de chaque euro et la conformite de nos rapports financiers.", avatar: "IT", gradient: "from-amber-600 to-amber-800" },
  { name: "Marie-Claire Doe", role: "Coordinatrice Projets", dept: "Terrain", bio: "Marie-Claire gere le suivi et l evaluation de nos projets educatifs et de sante dans la region de l Afrique centrale.", avatar: "MD", gradient: "from-pink-600 to-pink-800" },
  { name: "Oumar Sow", role: "Responsable Partenariats", dept: "Communication", bio: "Oumar developpe nos partenariats avec les institutions internationales et les autres ONG.", avatar: "OS", gradient: "from-cyan-600 to-cyan-800" },
  { name: "Aissatou Barry", role: "Chargee de Mission", dept: "Terrain", bio: "Specialiste en nutrition et sante communautaire, Aissatou coordonne nos programmes d aide alimentaire.", avatar: "AB", gradient: "from-orange-600 to-orange-800" },
];

const DEPTS = ["Tous", "Direction", "Terrain", "Communication", "Finance"];

const DEPT_COLORS: Record<string, string> = {
  Direction: "bg-primary-100 text-primary-700",
  Terrain: "bg-emerald-100 text-emerald-700",
  Communication: "bg-purple-100 text-purple-700",
  Finance: "bg-amber-100 text-amber-700",
};

export default function EquipePage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Des professionels passionnes
          </div>
          <h1 className="font-heading font-bold text-white text-4xl md:text-5xl mb-6 leading-tight">
            Notre <span className="text-secondary-400">equipe</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Derriere chaque projet, il y a des hommes et des femmes engages, competents et passionnes par la cause humanitaire.
          </p>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-neutral-900 text-2xl mb-2">Les membres de l equipe</h2>
            <p className="text-neutral-500">Une equipe multiculturelle et multidisciplinaire</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className={`h-32 bg-gradient-to-br ${member.gradient} flex items-center justify-center relative`}>
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/30">
                    <span className="text-white font-heading font-black text-2xl">{member.avatar}</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${DEPT_COLORS[member.dept] || "bg-neutral-100 text-neutral-600"}`}>
                      {member.dept}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-neutral-900 text-base mb-0.5">{member.name}</h3>
                  <p className="text-primary-600 text-xs font-semibold mb-3">{member.role}</p>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-4 line-clamp-3">{member.bio}</p>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 bg-neutral-100 hover:bg-primary-100 hover:text-primary-600 rounded-lg flex items-center justify-center text-neutral-400 transition-all">
                      <Globe className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-8 h-8 bg-neutral-100 hover:bg-primary-100 hover:text-primary-600 rounded-lg flex items-center justify-center text-neutral-400 transition-all">
                    <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-8 h-8 bg-neutral-100 hover:bg-primary-100 hover:text-primary-600 rounded-lg flex items-center justify-center text-neutral-400 transition-all">
                      <Mail className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12 border border-primary-100 text-center">
            <h2 className="font-heading font-bold text-neutral-900 text-2xl mb-4">Rejoignez l equipe</h2>
            <p className="text-neutral-600 mb-6 max-w-xl mx-auto">
              Vous partagez nos valeurs et souhaitez contribuer a notre mission ? Nous recherchons toujours des profils engages.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-3 rounded-xl transition-all">
                Postuler <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/don" className="inline-flex items-center gap-2 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 font-semibold px-6 py-3 rounded-xl transition-all">
                <Heart className="w-4 h-4 text-secondary-600" />Faire un don
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}