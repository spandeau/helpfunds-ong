import Link from "next/link";
import {
  FileText, Download, Calendar,
  TrendingUp, Users, Globe, Heart, ArrowRight, Shield
} from "lucide-react";

export const metadata = {
  title: "Rapports annuels — Help Funds",
  description: "Consultez nos rapports annuels et financiers. Transparence totale sur l utilisation des fonds.",
};

const REPORTS = [
  {
    year: "2024",
    title: "Rapport annuel 2024",
    description: "Bilan complet de nos actions, projets realises et utilisation des fonds collectes en 2024.",
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
    description: "Premiere annee complete post-COVID avec une reprise forte de nos interventions.",
    stats: { donations: "140 000€", projects: 15, beneficiaries: "5 600", countries: 10 },
    status: "available",
    highlight: false,
  },
];

const GUARANTEES = [
  { icon: Shield, label: "Audit independant", desc: "Comptes certifies par un cabinet independant" },
  { icon: TrendingUp, label: "98% sur le terrain", desc: "Seulement 2% de frais de structure" },
  { icon: FileText, label: "Transparence totale", desc: "Tous les rapports disponibles publiquement" },
  { icon: Heart, label: "Impact mesure", desc: "Indicateurs verifies et documentes" },
];

export default function RapportsPage() {
  return (
    <main className="bg-neutral-50 min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            Transparence financiere
          </span>
          <h1 className="font-heading font-bold text-white text-4xl md:text-6xl mb-6 leading-tight">
            Nos <span className="text-secondary-400">rapports</span> annuels
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            La transparence est au coeur de notre engagement. Consultez l utilisation precise de chaque euro qui nous est confie.
          </p>
        </div>
      </section>

      {/* Garanties */}
      <section className="py-12 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {GUARANTEES.map((g) => (
              <div key={g.label} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <g.icon className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 text-sm">{g.label}</div>
                  <div className="text-xs text-neutral-400">{g.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Liste rapports */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label">Documents officiels</span>
            <h2 className="section-title">Rapports et bilans</h2>
            <div className="divider" />
          </div>

          <div className="space-y-6">
            {REPORTS.map((report) => (
              <div
                key={report.year}
                className={`bg-white rounded-3xl border p-8 transition-all duration-300 hover:shadow-xl ${
                  report.highlight
                    ? "border-primary-200 shadow-lg ring-1 ring-primary-100"
                    : "border-neutral-100 hover:border-primary-200"
                }`}
              >
                {report.highlight && (
                  <div className="inline-flex items-center gap-1.5 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-5">
                    <TrendingUp className="w-3 h-3" />
                    Rapport le plus recent
                  </div>
                )}

                <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center ${
                      report.highlight ? "bg-primary-500" : "bg-neutral-100"
                    }`}>
                      <Calendar className={`w-6 h-6 mb-1 ${report.highlight ? "text-white" : "text-neutral-500"}`} />
                      <span className={`font-heading font-black text-lg ${report.highlight ? "text-white" : "text-neutral-700"}`}>
                        {report.year}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-neutral-900 text-xl mb-2">
                      {report.title}
                    </h3>
                    <p className="text-neutral-500 text-sm mb-5">{report.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { icon: Heart, label: "Dons collectes", value: report.stats.donations },
                        { icon: Globe, label: "Projets", value: report.stats.projects },
                        { icon: Users, label: "Beneficiaires", value: report.stats.beneficiaries },
                        { icon: Globe, label: "Pays", value: report.stats.countries },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="bg-neutral-50 rounded-xl p-3 text-center">
                          <Icon className="w-4 h-4 text-primary-500 mx-auto mb-1" />
                          <div className="font-heading font-bold text-neutral-900 text-sm">{value}</div>
                          <div className="text-xs text-neutral-400">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 flex-shrink-0">
                    <button className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold px-5 py-3 rounded-xl transition-all text-sm">
                      <Download className="w-4 h-4" />
                      Telecharger PDF
                    </button>
                    <button className="inline-flex items-center gap-2 border border-neutral-200 hover:border-primary-300 text-neutral-700 font-semibold px-5 py-3 rounded-xl transition-all text-sm">
                      <FileText className="w-4 h-4" />
                      Voir en ligne
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-primary-900 to-primary-950 rounded-3xl p-10">
            <h2 className="font-heading font-bold text-white text-2xl md:text-3xl mb-3">
              Soutenez notre mission
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Vos dons sont geres avec la plus grande rigueur. Rejoignez nos donateurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/don" className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white font-bold px-8 py-4 rounded-2xl transition-all">
                <Heart className="w-5 h-5 fill-white" />Faire un don
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl transition-all">
                Nous contacter <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}