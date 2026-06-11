import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/lib/projects";
import { MapPin, Users, Heart, Clock, AlertTriangle, Sparkles, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Nos Projets — Help Funds",
  description: "Decouvrez tous les projets humanitaires de Help Funds dans le monde.",
};

const STATUS_CONFIG = {
  urgent: { label: "Urgent", color: "bg-red-100 text-red-700", icon: AlertTriangle },
  "en-cours": { label: "En cours", color: "bg-secondary-100 text-secondary-700", icon: Clock },
  termine: { label: "Termine", color: "bg-neutral-100 text-neutral-600", icon: CheckCircle },
  nouveau: { label: "Nouveau", color: "bg-primary-100 text-primary-700", icon: Sparkles },
} as const;

const CAT_LABELS: Record<string, string> = {
  sante: "Sante", education: "Education", eau: "Eau & assainissement",
  alimentation: "Nutrition", logement: "Logement", economie: "Economie",
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(n);
}

export default async function ProjetsPage() {
  const projects = await getAllProjects();

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="bg-white border-b border-neutral-100 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Nos Projets
            </span>
            <h1 className="font-heading font-bold text-neutral-900 text-4xl md:text-5xl leading-tight">
              Des projets qui transforment des vies
            </h1>
            <p className="mt-4 text-neutral-500 text-lg">
              Chaque projet represente des communautes que nous accompagnons vers un avenir meilleur.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-neutral-400 text-lg">Aucun projet disponible pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const status = STATUS_CONFIG[project.status] || STATUS_CONFIG["en-cours"];
                const StatusIcon = status.icon;
                const progress = project.goalAmount > 0
                  ? Math.min(Math.round((project.raisedAmount / project.goalAmount) * 100), 100)
                  : 0;

                return (
                  <Link
                    key={project.id}
                    href={`/projets/${project.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${status.color}`}>
                          <StatusIcon className="w-3 h-3" />{status.label}
                        </span>
                        {project.category && (
                          <span className="bg-white/90 text-neutral-700 text-xs font-bold px-2.5 py-1 rounded-full">
                            {CAT_LABELS[project.category] || project.category}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-2">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{project.region ? `${project.region}, ` : ""}{project.country}</span>
                        <span className="mx-1">·</span>
                        <Users className="w-3.5 h-3.5" />
                        <span>{project.beneficiaries.toLocaleString("fr-FR")} beneficiaires</span>
                      </div>
                      <h2 className="font-heading font-bold text-neutral-900 text-base leading-snug group-hover:text-primary-600 transition-colors mb-2">
                        {project.title}
                      </h2>
                      <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                        {project.shortDescription}
                      </p>
                      <div className="mt-auto">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="font-bold text-neutral-700">{formatCurrency(project.raisedAmount)}</span>
                          <span className="text-neutral-400">{progress}%</span>
                        </div>
                        <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${project.status === "urgent" ? "bg-gradient-to-r from-red-500 to-orange-500" : "bg-gradient-to-r from-primary-500 to-secondary-500"}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-neutral-400 mt-1">sur {formatCurrency(project.goalAmount)}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          <div className="mt-16 bg-gradient-to-br from-primary-900 to-primary-950 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="font-heading font-bold text-white text-2xl md:text-3xl mb-3">Soutenez nos projets</h2>
            <p className="text-white/70 mb-6 max-w-lg mx-auto">
              Votre don, quelle que soit sa valeur, a un impact direct sur les communautes que nous servons.
            </p>
            <Link href="/don" className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white px-8 py-3 rounded-full font-bold transition-colors">
              <Heart className="w-4 h-4 fill-white" />Faire un don
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}