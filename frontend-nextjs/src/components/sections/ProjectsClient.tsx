"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Users, Heart, ArrowRight, X, AlertTriangle, Clock, CheckCircle, Sparkles } from "lucide-react";
import type { Project } from "@/lib/projects-data";

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

const CAT_ICONS: Record<string, string> = {
  sante: "🏥", education: "📚", eau: "💧", alimentation: "🌾", logement: "🏠", economie: "💼",
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(amount);
}

function getProgress(raised: number, goal: number): number {
  return Math.min(Math.round((raised / goal) * 100), 100);
}

function ProjectCard({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) {
  const progress = getProgress(project.raisedAmount, project.goalAmount);
  const status = STATUS_CONFIG[project.status] || STATUS_CONFIG["en-cours"];
  const StatusIcon = status.icon;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.06 }}
      className="bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
      <div className="relative h-48 overflow-hidden">
        <Image src={project.images[0]} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${status.color}`}>
            <StatusIcon className="w-3 h-3" />{status.label}
          </span>
          {featured && <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">A la une</span>}
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur text-neutral-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            {CAT_ICONS[project.category]} {CAT_LABELS[project.category] || project.category}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-white/80" />
          <span className="text-white text-xs font-medium">{project.country}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
          <Users className="w-3.5 h-3.5" />
          <span>{project.beneficiaries.toLocaleString("fr-FR")} / {project.beneficiariesTarget.toLocaleString("fr-FR")} beneficiaires</span>
        </div>
        <h3 className="font-heading font-bold text-neutral-900 text-base mb-2 leading-snug">{project.title}</h3>
        <p className="text-sm text-neutral-500 leading-relaxed mb-4 flex-1 line-clamp-2">{project.shortDescription}</p>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm font-bold text-primary-600">{formatCurrency(project.raisedAmount)}</span>
            <span className="text-sm font-bold text-neutral-700">{progress}%</span>
          </div>
          <div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, delay: 0.3 }}
              className={`h-full rounded-full ${progress === 100 ? "bg-secondary-500" : project.status === "urgent" ? "bg-gradient-to-r from-red-500 to-orange-500" : "bg-gradient-to-r from-primary-500 to-secondary-500"}`} />
          </div>
          <div className="flex justify-between mt-1.5 text-xs text-neutral-400">
            <span>sur {formatCurrency(project.goalAmount)}</span>
            {project.status !== "termine" && <span className="text-orange-600 font-medium">{formatCurrency(project.goalAmount - project.raisedAmount)} manquants</span>}
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/projets/${project.slug}`} className="flex-1 flex items-center justify-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-all">
            Voir le projet<ArrowRight className="w-3.5 h-3.5" />
          </Link>
          {project.status !== "termine" && (
            <Link href="/don" className="flex items-center justify-center gap-1 bg-secondary-50 hover:bg-secondary-100 text-secondary-700 font-semibold py-2.5 px-3 rounded-xl text-sm border border-secondary-200 transition-all">
              <Heart className="w-3.5 h-3.5" />Don
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("tous");
  const [selectedCategory, setSelectedCategory] = useState("tous");
  const [selectedStatus, setSelectedStatus] = useState("tous");
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  const countries = useMemo(() => [...new Set(projects.map(p => p.country))].sort(), [projects]);
  const categories = useMemo(() => [...new Set(projects.map(p => p.category))].sort(), [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.country.toLowerCase().includes(search.toLowerCase());
      const matchCountry = selectedCountry === "tous" || p.country === selectedCountry;
      const matchCat = selectedCategory === "tous" || p.category === selectedCategory;
      const matchStatus = selectedStatus === "tous" || p.status === selectedStatus;
      return matchSearch && matchCountry && matchCat && matchStatus;
    });
  }, [projects, search, selectedCountry, selectedCategory, selectedStatus]);

  const featured = filtered.filter(p => p.featured);
  const regular = filtered.filter(p => !p.featured);
  const hasFilters = !!(search || selectedCountry !== "tous" || selectedCategory !== "tous" || selectedStatus !== "tous");
  const resetFilters = () => { setSearch(""); setSelectedCountry("tous"); setSelectedCategory("tous"); setSelectedStatus("tous"); };

  const projectsByCountry = useMemo(() => {
    const map: Record<string, Project[]> = {};
    projects.forEach(p => { if (!map[p.country]) map[p.country] = []; map[p.country].push(p); });
    return map;
  }, [projects]);

  return (
    <div className="bg-neutral-50 min-h-screen">
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" />
            {projects.length}+ projets realises dans le monde
          </div>
          <h1 className="font-heading font-bold text-white mb-4">
            Nos <span className="text-secondary-400">projets</span> sur le terrain
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Chaque projet est mene en partenariat avec des acteurs locaux pour garantir un impact durable.
          </p>
        </div>
      </section>

      <div className="bg-white border-b border-neutral-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input type="text" placeholder="Rechercher un projet, un pays..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm" />
              {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-neutral-400" /></button>}
            </div>
            <div className="flex flex-wrap gap-2">
              <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="px-3 py-2.5 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm bg-white">
                <option value="tous">Tous les pays</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-2.5 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm bg-white">
                <option value="tous">Toutes categories</option>
                {categories.map(c => <option key={c} value={c}>{CAT_LABELS[c] || c}</option>)}
              </select>
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="px-3 py-2.5 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm bg-white">
                <option value="tous">Tous statuts</option>
                <option value="urgent">Urgent</option>
                <option value="en-cours">En cours</option>
                <option value="nouveau">Nouveau</option>
                <option value="termine">Termine</option>
              </select>
              {hasFilters && <button onClick={resetFilters} className="px-3 py-2.5 rounded-xl border-2 border-red-200 text-red-600 text-sm hover:bg-red-50"><X className="w-4 h-4" /></button>}
            </div>
          </div>
          <p className="text-sm text-neutral-500 mt-2">
            <span className="font-bold text-neutral-900">{filtered.length}</span> projet{filtered.length > 1 ? "s" : ""} trouve{filtered.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {featured.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary-600 rounded-full" />
              <h2 className="text-xl font-heading font-bold text-neutral-900">Projets a la une</h2>
              <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2.5 py-1 rounded-full">{featured.length}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((project, index) => <ProjectCard key={project.id} project={project} index={index} featured />)}
            </div>
          </div>
        )}

        {!hasFilters && Object.keys(projectsByCountry).length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-secondary-600 rounded-full" />
              <h2 className="text-xl font-heading font-bold text-neutral-900">Explorer par pays</h2>
            </div>
            <div className="flex flex-wrap gap-3 mb-6">
              {Object.entries(projectsByCountry).map(([country, projs]) => (
                <button key={country} onClick={() => setActiveCountry(activeCountry === country ? null : country)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 font-medium text-sm transition-all ${activeCountry === country ? "border-primary-600 bg-primary-600 text-white" : "border-neutral-200 bg-white text-neutral-700 hover:border-primary-300"}`}>
                  <MapPin className="w-3.5 h-3.5" />{country}
                  <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${activeCountry === country ? "bg-white/20" : "bg-neutral-100"}`}>{projs.length}</span>
                </button>
              ))}
            </div>
            <AnimatePresence>
              {activeCountry && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-2xl border border-neutral-100 p-6 mb-8 overflow-hidden">
                  <h3 className="font-heading font-bold text-neutral-900 text-lg mb-5 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary-600" />Projets au {activeCountry}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projectsByCountry[activeCountry].map((p) => (
                      <Link key={p.id} href={`/projets/${p.slug}`}
                        className="flex items-center gap-4 p-4 rounded-xl border border-neutral-100 hover:border-primary-200 hover:bg-primary-50 transition-all group">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={p.images[0]} alt={p.title} fill className="object-cover" sizes="64px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-neutral-900 text-sm truncate">{p.title}</h4>
                          <div className="mt-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" style={{ width: `${getProgress(p.raisedAmount, p.goalAmount)}%` }} />
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-primary-600 flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {regular.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-neutral-400 rounded-full" />
              <h2 className="text-xl font-heading font-bold text-neutral-900">{hasFilters ? "Resultats" : "Autres projets"}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regular.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-neutral-100">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-heading font-bold text-xl mb-2">Aucun projet trouve</h3>
            <p className="text-neutral-500 mb-6">Essayez de modifier vos criteres.</p>
            <button onClick={resetFilters} className="bg-primary-600 text-white font-semibold px-6 py-3 rounded-xl">Voir tous les projets</button>
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-primary-900 to-primary-950 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="font-heading font-bold text-white text-2xl md:text-3xl mb-3">Soutenez nos projets</h3>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">Chaque don nous permet de lancer de nouveaux projets.</p>
          <Link href="/don" className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold px-10 py-4 rounded-2xl transition-all hover:-translate-y-1 shadow-lg text-lg">
            <Heart className="w-5 h-5 fill-white" />Faire un don
          </Link>
        </div>
      </div>
    </div>
  );
}