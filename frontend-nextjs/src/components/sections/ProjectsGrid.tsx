"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Users, ArrowRight, Heart, Search, Filter } from "lucide-react";

const CATEGORIES = [
  { value: "tous", label: "Tous les projets" },
  { value: "education", label: "Education" },
  { value: "sante", label: "Sante" },
  { value: "eau", label: "Eau potable" },
  { value: "alimentation", label: "Alimentation" },
  { value: "logement", label: "Logement" },
  { value: "economie", label: "Economie" },
];

const STATUSES = [
  { value: "tous", label: "Tous" },
  { value: "en-cours", label: "En cours" },
  { value: "termine", label: "Termines" },
  { value: "a-venir", label: "A venir" },
];

interface Project {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  status: string;
  country: string;
  region: string;
  goalAmount: number;
  raisedAmount: number;
  beneficiaries: number;
  image: string;
  featured: boolean;
  startDate: string;
}

const MOCK_PROJECTS: Project[] = [
  { id: 1, slug: "ecole-primaire-kano", title: "Ecole primaire de Kano", shortDescription: "Construction et equipement d une ecole primaire pour 300 enfants dans la region de Kano au Nigeria.", category: "education", status: "en-cours", country: "Nigeria", region: "Kano", goalAmount: 45000, raisedAmount: 31500, beneficiaries: 300, image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80", featured: true, startDate: "2024-01-15" },
  { id: 2, slug: "eau-potable-sahel", title: "Eau potable — Sahel", shortDescription: "Installation de 12 points d eau potable pour 5 villages isoles dans la region du Sahel au Mali.", category: "eau", status: "en-cours", country: "Mali", region: "Sahel", goalAmount: 28000, raisedAmount: 22400, beneficiaries: 2500, image: "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=800&q=80", featured: true, startDate: "2024-02-01" },
  { id: 3, slug: "centre-sante-kivu", title: "Centre de sante — Kivu", shortDescription: "Rehabilitation d un centre de sante communautaire et formation de 8 agents de sante locaux.", category: "sante", status: "en-cours", country: "RD Congo", region: "Kivu", goalAmount: 60000, raisedAmount: 18000, beneficiaries: 1200, image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80", featured: true, startDate: "2024-03-10" },
  { id: 4, slug: "nutrition-enfants-haiti", title: "Nutrition enfants — Haiti", shortDescription: "Programme de nutrition et d alimentation pour 500 enfants de moins de 5 ans en situation de malnutrition.", category: "alimentation", status: "en-cours", country: "Haiti", region: "Artibonite", goalAmount: 35000, raisedAmount: 28000, beneficiaries: 500, image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80", featured: false, startDate: "2024-01-20" },
  { id: 5, slug: "logement-urgence-syrie", title: "Logement d urgence — Syrie", shortDescription: "Construction de 50 abris temporaires pour des familles deplacees dans le nord de la Syrie.", category: "logement", status: "termine", country: "Syrie", region: "Idlib", goalAmount: 40000, raisedAmount: 40000, beneficiaries: 250, image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80", featured: false, startDate: "2023-06-01" },
  { id: 6, slug: "microfinance-kenya", title: "Microfinance femmes — Kenya", shortDescription: "Programme de microfinancement pour 200 femmes entrepreneures dans les zones rurales du Kenya.", category: "economie", status: "termine", country: "Kenya", region: "Nairobi", goalAmount: 25000, raisedAmount: 25000, beneficiaries: 200, image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80", featured: false, startDate: "2023-09-15" },
  { id: 7, slug: "vaccination-niger", title: "Campagne vaccination — Niger", shortDescription: "Campagne de vaccination contre la rougeole et la polio pour 3 000 enfants dans 10 villages.", category: "sante", status: "a-venir", country: "Niger", region: "Agadez", goalAmount: 20000, raisedAmount: 5000, beneficiaries: 3000, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80", featured: false, startDate: "2024-06-01" },
  { id: 8, slug: "formation-agricole-senegal", title: "Formation agricole — Senegal", shortDescription: "Formation de 150 agriculteurs aux techniques d agriculture durable et resistante au climat.", category: "economie", status: "en-cours", country: "Senegal", region: "Casamance", goalAmount: 18000, raisedAmount: 9000, beneficiaries: 150, image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80", featured: false, startDate: "2024-02-15" },
  { id: 9, slug: "ecoles-mobiles-soudan", title: "Ecoles mobiles — Soudan", shortDescription: "Mise en place de 5 unites scolaires mobiles pour les enfants dans les camps de refugies.", category: "education", status: "a-venir", country: "Soudan", region: "Darfour", goalAmount: 55000, raisedAmount: 12000, beneficiaries: 800, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", featured: false, startDate: "2024-07-01" },
];

const categoryColors: Record<string, string> = {
  education: "bg-blue-100 text-blue-700",
  sante: "bg-green-100 text-green-700",
  eau: "bg-cyan-100 text-cyan-700",
  alimentation: "bg-orange-100 text-orange-700",
  logement: "bg-purple-100 text-purple-700",
  economie: "bg-yellow-100 text-yellow-700",
};

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  "en-cours": { label: "En cours", color: "bg-secondary-100 text-secondary-700", dot: "bg-secondary-500" },
  "termine": { label: "Termine", color: "bg-neutral-100 text-neutral-600", dot: "bg-neutral-400" },
  "a-venir": { label: "A venir", color: "bg-primary-100 text-primary-700", dot: "bg-primary-500" },
};

function getProgress(raised: number, goal: number): number {
  return Math.min(Math.round((raised / goal) * 100), 100);
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(amount);
}

export default function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("tous");
  const [selectedStatus, setSelectedStatus] = useState("tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = MOCK_PROJECTS.filter((p) => {
    const matchCat = selectedCategory === "tous" || p.category === selectedCategory;
    const matchStatus = selectedStatus === "tous" || p.status === selectedStatus;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchStatus && matchSearch;
  });

  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Filtres */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5 mb-10">
          {/* Barre de recherche */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Rechercher un projet, un pays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-neutral-200 hover:border-primary-300 font-medium text-sm text-neutral-700 transition-all"
            >
              <Filter className="w-4 h-4" />
              Filtres
              {(selectedCategory !== "tous" || selectedStatus !== "tous") && (
                <span className="w-2 h-2 bg-primary-600 rounded-full" />
              )}
            </button>
          </div>

          {/* Filtres expandable */}
          {showFilters && (
            <div className="border-t border-neutral-100 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">Categorie</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedCategory === cat.value
                          ? "bg-primary-600 text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">Statut</p>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setSelectedStatus(s.value)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedStatus === s.value
                          ? "bg-primary-600 text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Résultats */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-neutral-500">
            <span className="font-bold text-neutral-900">{filtered.length}</span> projet{filtered.length > 1 ? "s" : ""} trouve{filtered.length > 1 ? "s" : ""}
          </p>
          {(selectedCategory !== "tous" || selectedStatus !== "tous" || searchQuery) && (
            <button
              onClick={() => { setSelectedCategory("tous"); setSelectedStatus("tous"); setSearchQuery(""); }}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Reinitialiser les filtres
            </button>
          )}
        </div>

        {/* Projets mis en avant */}
        {featured.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-heading font-bold text-neutral-900 mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse" />
              Projets a la une
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((project, index) => (
                <ProjectCardComponent key={project.id} project={project} index={index} featured />
              ))}
            </div>
          </div>
        )}

        {/* Tous les projets */}
        {regular.length > 0 && (
          <div>
            {featured.length > 0 && (
              <h2 className="text-lg font-heading font-bold text-neutral-900 mb-5">
                Tous les projets
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regular.map((project, index) => (
                <ProjectCardComponent key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Aucun résultat */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-heading font-bold text-neutral-900 text-xl mb-2">
              Aucun projet trouve
            </h3>
            <p className="text-neutral-500 mb-6">
              Essayez de modifier vos criteres de recherche.
            </p>
            <button
              onClick={() => { setSelectedCategory("tous"); setSelectedStatus("tous"); setSearchQuery(""); }}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-all"
            >
              Voir tous les projets
            </button>
          </div>
        )}

        {/* CTA don */}
        <div className="mt-16 bg-gradient-to-r from-primary-900 to-primary-950 rounded-2xl p-8 text-center">
          <h3 className="font-heading font-bold text-white text-2xl mb-3">
            Soutenez nos projets
          </h3>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Chaque don nous permet de lancer de nouveaux projets et d aider davantage de communautes.
          </p>
          <Link
            href="/don"
            className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:-translate-y-1 shadow-lg"
          >
            <Heart className="w-5 h-5 fill-white" />
            Faire un don
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCardComponent({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) {
  const progress = getProgress(project.raisedAmount, project.goalAmount);
  const status = statusConfig[project.status];
  const catColor = categoryColors[project.category] || "bg-neutral-100 text-neutral-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catColor}`}>
            {project.category}
          </span>
          {featured && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
              A la une
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${status.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot} ${project.status === "en-cours" ? "animate-pulse" : ""}`} />
            {status.label}
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-neutral-400 mb-3">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {project.country}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {project.beneficiaries.toLocaleString("fr-FR")} beneficiaires
          </span>
        </div>

        <h3 className="font-heading font-bold text-neutral-900 text-base mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-sm text-neutral-500 leading-relaxed mb-4 flex-1">
          {project.shortDescription}
        </p>

        {/* Barre de progression */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-primary-600">
              {formatCurrency(project.raisedAmount)}
            </span>
            <span className="text-xs font-bold text-neutral-600">{progress}%</span>
          </div>
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className={`h-full rounded-full ${progress === 100 ? "bg-secondary-500" : "bg-gradient-to-r from-primary-500 to-secondary-500"}`}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-neutral-400">
              Objectif : {formatCurrency(project.goalAmount)}
            </span>
            {project.status === "en-cours" && (
              <span className="text-xs text-neutral-400">
                {formatCurrency(project.goalAmount - project.raisedAmount)} restants
              </span>
            )}
          </div>
        </div>

        {/* Boutons */}
        <div className="flex gap-2">
          <Link
            href={`/projets/${project.slug}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-all"
          >
            Voir le projet
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          {project.status === "en-cours" && (
            <Link
              href="/don"
              className="flex items-center justify-center gap-1 bg-secondary-50 hover:bg-secondary-100 text-secondary-700 font-semibold py-2.5 px-3 rounded-xl text-sm transition-all border border-secondary-200"
            >
              <Heart className="w-3.5 h-3.5" />
              Don
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}