import Link from "next/link";
import { FileText, Download, Calendar, TrendingUp, Users, Globe, Heart, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Rapports annuels — Help Funds",
  description: "Consultez nos rapports annuels et financiers. Transparence totale sur l utilisation des fonds.",
};

const REPORTS = [
  {
    year: "2024",
    title: "Rapport annuel 2024",
    description: "Bilan complet de nos actions, projets realises et utilisation des fonds collectes.",
    stats: { donations: "285 000€", projects: 28, beneficiaries: "12 400", countries: 18 },
    status: "available",
    highlight: true,
  },
  {
    year: "2023",
    title: "Rapport annuel 2023",
    description: "Retour sur une annee exceptionnelle avec 24 projets menes a bien dans 15 pays.",
    stats: { donations: "210 000€", projects: 24, beneficiaries: "9 800", countries: 15 },
    status: "available",
    highlight: false,
  },
  {
    year: "2022",
    title: "Rapport annuel 2022",
    description: "Consolidation de nos actions apres la crise COVID avec un focus sur la sante.",
    stats: { donations: "175 000€", projects: 19, beneficiaries: "7 200", countries: 12 },
    status: "available",
    highlight: false,
  },
  {
    year: "2021",
    title: "Rapport annuel 2021",
    description: "Reprise progressive de nos operations terrain apres la periode COVID.",
    stats: { donations: "145 000€", projects: 15, beneficiaries: "5 800", countries: 10 },
    status: "available",
    highlight: false,
  },
  {
    year: "2020",
    title: "Rapport annuel 2020",
    description: "Mobilisation exceptionnelle pour la crise COVID : 50 000 repas distribues.",
    stats: { donations: "190 000€", projects: 18, beneficiaries: "8 500", countries: 14 },
    status: "available",
    highlight: false,
  },
];

const TRANSPARENCY = [
  { icon: TrendingUp, value: "98%", label: "des fonds sur le terrain", color: "text-secondary-600" },
  { icon: FileText, value: "100%", label: "des comptes audites", color: "text-primary-600" },
  { icon: Users, value: "50 000+", label: "beneficiaires documentes", color: "text-purple-600" },
  { icon: Globe, value: "35", label: "pays d intervention", color: "text-emerald-600" },
];

export default function RapportsPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />
            Transparence totale
          </div>
          <h1 className="font-heading font-bold text-white text-4xl md:text-5xl mb-6 leading-tight">
            Rapports <span className="text-secondary-400">annuels</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Chaque euro compte. Retrouvez ici l ensemble de nos rapports financiers et d activite, audites et publics.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {TRANSPARENCY.map((item) => (
              <div key={item.label} className="text-center p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-primary-200 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className={`font-heading font-black text-3xl mb-1 ${item.color}`}>{item.value}</div>
                <div className="text-neutral-500 text-xs leading-tight">{item.label}</div>
              </div>
            ))}
          </div>

          <h2 className="font-heading font-bold text-neutral-900 text-2xl mb-8">Rapports disponibles</h2>

          <div className="space-y-4">
            {REPORTS.map((report) => (
              <div
                key={report.year}
                className={`bg-white rounded-2xl p-6 border-2 transition-all hover:shadow-md ${
                  report.highlight ? "border-primary-200 bg-primary-50/30" : "border-neutral-100 hover:border-primary-200"
                }`}
              >
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${report.highlight ? "bg-primary-600" : "bg-neutral-100"}`}>
                    <span className={`font-heading font-black text-lg ${report.highlight ? "text-white" : "text-neutral-600"}`}>
                      {report.year}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-heading font-bold text-neutral-900 text-lg">{report.title}</h3>
                      {report.highlight && (
                        <span className="bg-secondary-100 text-secondary-700 text-xs font-bold px-2.5 py-1 rounded-full">
                          Dernier
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-500 text-sm mb-4">{report.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { icon: Heart, label: "Dons", value: report.stats.donations },
                        { icon: TrendingUp, label: "Projets", value: String(report.stats.projects) },
                        { icon: Users, label: "Beneficiaires", value: report.stats.beneficiaries },
                        { icon: Globe, label: "Pays", value: String(report.stats.countries) },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-white rounded-xl p-3 border border-neutral-100 text-center">
                          <p className="font-bold text-neutral-900 text-sm">{stat.value}</p>
                          <p className="text-neutral-400 text-xs">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all">
                      <Download className="w-4 h-4" />
                      Telecharger PDF
                    </button>
                    <button className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold px-4 py-2.5 rounded-xl text-sm transition-all">
                      <FileText className="w-4 h-4" />
                      Consulter en ligne
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-8 h-8 text-secondary-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-neutral-900 text-xl mb-2">
                  Rapport 2025 en cours de preparation
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  Notre rapport annuel 2025 sera disponible au premier trimestre 2026.
                  Inscrivez-vous a notre newsletter pour etre notifie de sa publication.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold px-6 py-3 rounded-xl transition-all flex-shrink-0"
              >
                S inscrire <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary-900 to-primary-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-white text-2xl mb-4">
            Notre engagement envers la transparence
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Nous sommes audites chaque annee par un cabinet independant. Tous nos comptes sont publics et accessibles a tout moment.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/don" className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:-translate-y-0.5">
              <Heart className="w-5 h-5 fill-white" />Faire un don
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