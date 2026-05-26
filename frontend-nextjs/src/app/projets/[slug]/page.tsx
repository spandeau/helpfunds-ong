import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, MapPin, Users, Calendar, Heart, Check, Target, TrendingUp } from "lucide-react";

const MOCK_PROJECTS = [
  { id: 1, slug: "ecole-primaire-kano", title: "Ecole primaire de Kano", description: "Ce projet vise a construire et equiper une ecole primaire complete pour accueillir 300 enfants dans la region de Kano au Nigeria. La region souffre d un manque criant d infrastructures scolaires, obligeant les enfants a parcourir de longues distances pour aller a l ecole, ou pire, a ne pas y aller du tout.\n\nGrace aux fonds collectes, nous avons pu construire 6 salles de classe, une bibliotheque, des sanitaires separes pour les filles et les garcons, et une cantine scolaire. Nous avons egalement forme 12 enseignants aux methodes pedagogiques modernes.\n\nL impact de ce projet depasse la simple construction : c est toute une communaute qui se transforme quand ses enfants ont acces a l education.", shortDescription: "Construction et equipement d une ecole primaire pour 300 enfants dans la region de Kano au Nigeria.", category: "education", status: "en-cours", country: "Nigeria", region: "Kano", goalAmount: 45000, raisedAmount: 31500, beneficiaries: 300, image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&q=80", startDate: "2024-01-15", objectives: ["Construire 6 salles de classe equipees", "Former 12 enseignants", "Fournir les manuels scolaires", "Installer une cantine scolaire", "Amenager des sanitaires adaptes"], results: ["4 salles de classe construites", "8 enseignants formes", "250 enfants inscrits", "Cantine fonctionnelle"] },
  { id: 2, slug: "eau-potable-sahel", title: "Eau potable — Sahel", description: "Dans la region du Sahel au Mali, l acces a l eau potable reste un defi majeur. Des millions de personnes dependent de sources d eau non securisees, provoquant maladies et deces evitables, notamment chez les enfants de moins de 5 ans.\n\nNotre projet consiste a installer 12 points d eau equipes de pompes manuelles dans 5 villages isoles, beneficiant ainsi a plus de 2 500 personnes. Chaque installation est accompagnee d une formation des communautes locales sur l hygiene et la maintenance des equipements.\n\nNous travaillons en etroite collaboration avec les autorites locales et les associations villageoises pour garantir la perennite du projet.", shortDescription: "Installation de 12 points d eau potable pour 5 villages isoles dans la region du Sahel au Mali.", category: "eau", status: "en-cours", country: "Mali", region: "Sahel", goalAmount: 28000, raisedAmount: 22400, beneficiaries: 2500, image: "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=1200&q=80", startDate: "2024-02-01", objectives: ["Installer 12 forages equipes", "Former des comites de gestion", "Sensibiliser a l hygiene", "Assurer la maintenance sur 5 ans"], results: ["8 forages installes", "3 comites formes", "1 800 personnes beneficiaires"] },
  { id: 3, slug: "centre-sante-kivu", title: "Centre de sante — Kivu", description: "La province du Kivu en Republique Democratique du Congo est l une des regions les plus touchees par les conflits et les crises sanitaires. Le centre de sante que nous rehabilitons servait autrefois 1 200 patients par mois, mais il est aujourd hui dans un etat de degradation avance.\n\nNotre intervention comprend la rehabilitation complete du batiment, l equipement en materiel medical moderne, et la formation de 8 agents de sante communautaires. Ces agents seront deployes dans les villages environnants pour assurer des soins de base et la prevention.\n\nCe projet est crucial pour une population qui n a pas d autre acces aux soins de sante.", shortDescription: "Rehabilitation d un centre de sante communautaire et formation de 8 agents de sante locaux.", category: "sante", status: "en-cours", country: "RD Congo", region: "Kivu", goalAmount: 60000, raisedAmount: 18000, beneficiaries: 1200, image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80", startDate: "2024-03-10", objectives: ["Rehabiliter le batiment principal", "Equiper la salle de consultation", "Former 8 agents de sante", "Installer une pharmacie communautaire"], results: ["Travaux de gros oeuvre termines", "2 agents en formation"] },
];

export async function generateStaticParams() {
  return MOCK_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = MOCK_PROJECTS.find((p) => p.slug === slug);
  return {
    title: project ? `${project.title} — Help Funds` : "Projet — Help Funds",
    description: project?.shortDescription || "",
  };
}

export default async function ProjetDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = MOCK_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="text-center">
            <div className="text-6xl mb-4">404</div>
            <h1 className="font-heading font-bold text-2xl mb-4">Projet introuvable</h1>
            <Link href="/projets" className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold">
              Voir tous les projets
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const progress = Math.min(Math.round((project.raisedAmount / project.goalAmount) * 100), 100);
  const remaining = project.goalAmount - project.raisedAmount;
  const statusConfig: Record<string, { label: string; color: string }> = {
    "en-cours": { label: "En cours", color: "bg-secondary-100 text-secondary-700" },
    "termine": { label: "Termine", color: "bg-neutral-100 text-neutral-600" },
    "a-venir": { label: "A venir", color: "bg-primary-100 text-primary-700" },
  };
  const status = statusConfig[project.status];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero image */}
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <Image src={project.image} alt={project.title} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="max-w-5xl mx-auto">
              <Link href="/projets" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" />Retour aux projets
              </Link>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full">{project.category}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${status.color}`}>{status.label}</span>
              </div>
              <h1 className="font-heading font-bold text-white text-3xl md:text-4xl">{project.title}</h1>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <section className="py-12 bg-neutral-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Colonne principale */}
              <div className="lg:col-span-2 space-y-8">
                {/* Infos rapides */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: MapPin, label: "Localisation", value: `${project.region}, ${project.country}` },
                    { icon: Users, label: "Beneficiaires", value: project.beneficiaries.toLocaleString("fr-FR") + " personnes" },
                    { icon: Calendar, label: "Debut du projet", value: new Date(project.startDate).toLocaleDateString("fr-FR", { month: "long", year: "numeric" }) },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-white rounded-2xl p-4 border border-neutral-100 text-center">
                      <Icon className="w-5 h-5 text-primary-600 mx-auto mb-2" />
                      <p className="text-xs text-neutral-400 mb-1">{label}</p>
                      <p className="text-sm font-bold text-neutral-900">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                  <h2 className="font-heading font-bold text-neutral-900 text-xl mb-4">Description du projet</h2>
                  {project.description.split("\n\n").map((para, i) => (
                    <p key={i} className="text-neutral-600 leading-relaxed mb-4 last:mb-0">{para}</p>
                  ))}
                </div>

                {/* Objectifs */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                  <h2 className="font-heading font-bold text-neutral-900 text-xl mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary-600" />
                    Objectifs du projet
                  </h2>
                  <ul className="space-y-3">
                    {project.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary-600 font-bold text-xs">{i + 1}</span>
                        </div>
                        <span className="text-neutral-700 text-sm">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Résultats */}
                {project.results && project.results.length > 0 && (
                  <div className="bg-secondary-50 rounded-2xl p-6 border border-secondary-100">
                    <h2 className="font-heading font-bold text-neutral-900 text-xl mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-secondary-600" />
                      Resultats a ce jour
                    </h2>
                    <ul className="space-y-3">
                      {project.results.map((result, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-secondary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-neutral-700 text-sm font-medium">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Card financement */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm sticky top-28">
                  <h3 className="font-heading font-bold text-neutral-900 mb-5">Financement</h3>

                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-heading font-bold text-primary-600">
                        {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(project.raisedAmount)}
                      </span>
                      <span className="text-lg font-bold text-neutral-600">{progress}%</span>
                    </div>
                    <div className="h-3 bg-neutral-100 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-neutral-400">
                      <span>Objectif : {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(project.goalAmount)}</span>
                      {project.status === "en-cours" && <span>Reste : {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(remaining)}</span>}
                    </div>
                  </div>

                  <div className="border-t border-neutral-100 pt-4 mb-5">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-500">Beneficiaires</span>
                      <span className="font-semibold">{project.beneficiaries.toLocaleString("fr-FR")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">Pays</span>
                      <span className="font-semibold">{project.country}</span>
                    </div>
                  </div>

                  {project.status === "en-cours" && (
                    <Link
                      href="/don"
                      className="w-full flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white font-bold py-4 rounded-2xl transition-all hover:shadow-lg"
                    >
                      <Heart className="w-5 h-5 fill-white" />
                      Soutenir ce projet
                    </Link>
                  )}

                  <Link
                    href="/projets"
                    className="w-full flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold py-3 rounded-xl transition-all mt-3 text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Voir tous les projets
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}