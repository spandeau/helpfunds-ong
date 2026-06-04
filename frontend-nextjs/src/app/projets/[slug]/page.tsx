import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/lib/projects-data";
import { ArrowLeft, MapPin, Users, Calendar, Heart, Check, Target, TrendingUp, Share2, Clock, AlertTriangle, Sparkles, CheckCircle } from "lucide-react";

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  return {
    title: project ? `${project.title} — Help Funds` : "Projet — Help Funds",
    description: project?.shortDescription || "",
  };
}

const STATUS_CONFIG = {
  "urgent": { label: "Urgent", color: "bg-red-100 text-red-700", icon: AlertTriangle },
  "en-cours": { label: "En cours", color: "bg-secondary-100 text-secondary-700", icon: Clock },
  "termine": { label: "Termine", color: "bg-neutral-100 text-neutral-600", icon: CheckCircle },
  "nouveau": { label: "Nouveau", color: "bg-primary-100 text-primary-700", icon: Sparkles },
};

const CAT_LABELS: Record<string, string> = {
  sante: "Sante", education: "Education", eau: "Eau & assainissement",
  alimentation: "Nutrition", logement: "Logement", economie: "Economie",
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(amount);
}

export default async function ProjetDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="font-heading font-bold text-2xl mb-4">Projet introuvable</h1>
          <Link href="/projets" className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold">Voir tous les projets</Link>
        </div>
      </main>
    );
  }

  const progress = Math.min(Math.round((project.raisedAmount / project.goalAmount) * 100), 100);
  const remaining = project.goalAmount - project.raisedAmount;
  const status = STATUS_CONFIG[project.status];
  const StatusIcon = status.icon;

  return (
    <main>
      <div className="relative h-[60vh] min-h-[450px] overflow-hidden">
        <Image src={project.images[0]} alt={project.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-5xl mx-auto">
            <Link href="/projets" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-5 transition-colors">
              <ArrowLeft className="w-4 h-4" />Retour aux projets
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${status.color}`}>
                <StatusIcon className="w-3.5 h-3.5" />{status.label}
              </span>
              <span className="bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full">
                {CAT_LABELS[project.category] || project.category}
              </span>
            </div>
            <h1 className="font-heading font-bold text-white text-3xl md:text-5xl mb-4 leading-tight">{project.title}</h1>
            <p className="text-white/80 text-lg max-w-2xl mb-6">{project.shortDescription}</p>
            <div className="flex flex-wrap gap-3">
              {project.status !== "termine" && (
                <Link href="/don" className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg">
                  <Heart className="w-4 h-4 fill-white" />Soutenir ce projet
                </Link>
              )}
              <button className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all border border-white/20">
                <Share2 className="w-4 h-4" />Partager
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: MapPin, label: "Localisation", value: `${project.region}, ${project.country}` },
                  { icon: Users, label: "Beneficiaires", value: `${project.beneficiaries.toLocaleString("fr-FR")} / ${project.beneficiariesTarget.toLocaleString("fr-FR")}` },
                  { icon: Calendar, label: "Debut", value: new Date(project.startDate).toLocaleDateString("fr-FR", { month: "short", year: "numeric" }) },
                  { icon: Target, label: "Equipe", value: `${project.team} membres` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-white rounded-2xl p-4 border border-neutral-100 text-center">
                    <Icon className="w-5 h-5 text-primary-600 mx-auto mb-2" />
                    <p className="text-xs text-neutral-400 mb-1">{label}</p>
                    <p className="text-sm font-bold text-neutral-900 leading-tight">{value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                <h2 className="font-heading font-bold text-neutral-900 text-xl mb-4">Notre mission</h2>
                {project.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-neutral-600 leading-relaxed mb-4 last:mb-0">{para}</p>
                ))}
              </div>

              <div className="bg-secondary-50 rounded-2xl p-6 border border-secondary-100">
                <h2 className="font-heading font-bold text-neutral-900 text-xl mb-5 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-secondary-600" />Ce qui a deja ete accompli
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.results.map((result, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-secondary-100">
                      <div className="w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-neutral-700 text-sm font-medium">{result}</span>
                    </div>
                  ))}
                </div>
              </div>

              {project.remaining.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                  <h2 className="font-heading font-bold text-neutral-900 text-xl mb-5 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary-600" />Ce qu il reste a accomplir
                  </h2>
                  <div className="space-y-3 mb-5">
                    {project.remaining.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-neutral-100 border-2 border-dashed border-neutral-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-neutral-400 font-bold text-xs">{i + 1}</span>
                        </div>
                        <span className="text-neutral-600 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  {project.status !== "termine" && (
                    <Link href="/don" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all">
                      <Heart className="w-4 h-4 fill-white" />Aider a completer ce projet
                    </Link>
                  )}
                </div>
              )}

              {project.images.length > 1 && (
                <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                  <h2 className="font-heading font-bold text-neutral-900 text-xl mb-4">Galerie du projet</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {project.images.map((img, i) => (
                      <div key={i} className="relative h-32 rounded-xl overflow-hidden">
                        <Image src={img} alt={`Photo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 50vw, 33vw" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                <h2 className="font-heading font-bold text-neutral-900 text-xl mb-5">Comment les dons sont utilises</h2>
                <div className="space-y-3">
                  {project.budgetBreakdown.map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-medium text-neutral-700">{item.label}</span>
                        <span className="text-sm font-bold text-neutral-900">{item.percentage}%</span>
                      </div>
                      <div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                <h2 className="font-heading font-bold text-neutral-900 text-xl mb-5">Avancement du projet</h2>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-neutral-100" />
                  <div className="space-y-6">
                    {project.milestones.map((milestone, i) => (
                      <div key={i} className="relative flex gap-4 pl-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 ${milestone.done ? "bg-secondary-500 border-secondary-500" : "bg-white border-neutral-200"}`}>
                          {milestone.done ? <Check className="w-4 h-4 text-white" /> : <div className="w-2 h-2 bg-neutral-300 rounded-full" />}
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="text-xs text-neutral-400 font-medium mb-0.5">{milestone.date}</div>
                          <h4 className={`font-bold text-sm mb-1 ${milestone.done ? "text-neutral-900" : "text-neutral-400"}`}>{milestone.title}</h4>
                          <p className={`text-xs leading-relaxed ${milestone.done ? "text-neutral-500" : "text-neutral-300"}`}>{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {project.updates.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                  <h2 className="font-heading font-bold text-neutral-900 text-xl mb-5">Actualites du projet</h2>
                  <div className="space-y-5">
                    {project.updates.map((update, i) => (
                      <div key={i} className="border-l-2 border-primary-200 pl-4">
                        <div className="text-xs text-neutral-400 font-medium mb-1">{update.date}</div>
                        <h4 className="font-bold text-neutral-900 mb-2">{update.title}</h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">{update.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.testimonials.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                  <h2 className="font-heading font-bold text-neutral-900 text-xl mb-5">Temoignages</h2>
                  <div className="space-y-5">
                    {project.testimonials.map((t, i) => (
                      <div key={i} className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100">
                        <p className="text-neutral-600 italic mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">{t.avatar}</div>
                          <div>
                            <div className="font-semibold text-neutral-900 text-sm">{t.name}</div>
                            <div className="text-xs text-neutral-400">{t.role}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-5">
                <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
                  <h3 className="font-heading font-bold text-neutral-900 mb-4">Financement</h3>
                  <div className="text-3xl font-heading font-bold text-primary-600 mb-1">{formatCurrency(project.raisedAmount)}</div>
                  <div className="text-sm text-neutral-400 mb-3">collectes sur {formatCurrency(project.goalAmount)}</div>
                  <div className="h-3 bg-neutral-100 rounded-full overflow-hidden mb-2">
                    <div className={`h-full rounded-full ${progress === 100 ? "bg-secondary-500" : project.status === "urgent" ? "bg-gradient-to-r from-red-500 to-orange-500" : "bg-gradient-to-r from-primary-500 to-secondary-500"}`} style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="font-bold text-neutral-700">{progress}% atteint</span>
                    {project.status !== "termine" && <span className="text-orange-600 font-semibold">{formatCurrency(remaining)} restants</span>}
                  </div>
                  <div className="space-y-2 mb-5 text-sm">
                    <div className="flex justify-between border-b border-neutral-50 pb-2">
                      <span className="text-neutral-500">Beneficiaires</span>
                      <span className="font-bold">{project.beneficiaries.toLocaleString("fr-FR")} / {project.beneficiariesTarget.toLocaleString("fr-FR")}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-50 pb-2">
                      <span className="text-neutral-500">Villages</span>
                      <span className="font-bold">{project.villages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Equipe terrain</span>
                      <span className="font-bold">{project.team} membres</span>
                    </div>
                  </div>
                  {project.status !== "termine" && (
                    <Link href="/don" className="w-full flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white font-bold py-4 rounded-2xl transition-all hover:shadow-lg">
                      <Heart className="w-5 h-5 fill-white" />Soutenir ce projet
                    </Link>
                  )}
                  <Link href="/projets" className="w-full flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold py-3 rounded-xl transition-all mt-3 text-sm">
                    <ArrowLeft className="w-4 h-4" />Tous les projets
                  </Link>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                  <h3 className="font-heading font-bold text-neutral-900 mb-4 flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary-600" />Objectifs
                  </h3>
                  <ul className="space-y-2">
                    {project.objectives.slice(0, 4).map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                        <div className="w-4 h-4 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary-600 font-bold text-[10px]">{i + 1}</span>
                        </div>
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-br from-primary-900 to-primary-950 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="font-heading font-bold text-white text-2xl md:text-3xl mb-3">Aidez-nous a terminer ce projet</h3>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">Chaque contribution rapproche des familles d un meilleur acces a la sante, a l education et a des conditions de vie dignes.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/don" className="inline-flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold px-10 py-4 rounded-2xl transition-all hover:-translate-y-1 shadow-lg text-lg">
                <Heart className="w-5 h-5 fill-white" />Faire un don
              </Link>
              <button className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-10 py-4 rounded-2xl transition-all border border-white/20 text-lg">
                <Share2 className="w-5 h-5" />Partager le projet
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}