"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Users } from "lucide-react";
import Container from "@/components/layout/Container";
import { formatCurrency, getProgressPercent } from "@/lib/utils";
import type { ProjectCategory, ProjectStatus } from "@/types";

interface MockProject {
  id: number;
  title: string;
  shortDescription: string;
  category: ProjectCategory;
  status: ProjectStatus;
  country: string;
  goalAmount: number;
  raisedAmount: number;
  beneficiaries: number;
  slug: string;
  emoji: string;
}

const MOCK_PROJECTS: MockProject[] = [
  {
    id: 1,
    title: "École primaire de Kano",
    shortDescription: "Construction et équipement d'une école primaire pour 300 enfants dans la région de Kano au Nigeria.",
    category: "education",
    status: "en-cours",
    country: "Nigeria 🇳🇬",
    goalAmount: 45000,
    raisedAmount: 31500,
    beneficiaries: 300,
    slug: "ecole-primaire-kano",
    emoji: "📚",
  },
  {
    id: 2,
    title: "Eau potable — Sahel",
    shortDescription: "Installation de 12 points d'eau potable pour 5 villages isolés dans la région du Sahel au Mali.",
    category: "eau",
    status: "en-cours",
    country: "Mali 🇲🇱",
    goalAmount: 28000,
    raisedAmount: 22400,
    beneficiaries: 2500,
    slug: "eau-potable-sahel",
    emoji: "💧",
  },
  {
    id: 3,
    title: "Centre de santé — Kivu",
    shortDescription: "Réhabilitation d'un centre de santé communautaire et formation de 8 agents de santé locaux.",
    category: "sante",
    status: "en-cours",
    country: "RD Congo 🇨🇩",
    goalAmount: 60000,
    raisedAmount: 18000,
    beneficiaries: 1200,
    slug: "centre-sante-kivu",
    emoji: "🏥",
  },
];

const categoryLabels: Record<ProjectCategory, string> = {
  education: "Éducation",
  sante: "Santé",
  eau: "Eau potable",
  alimentation: "Alimentation",
  logement: "Logement",
  economie: "Économie",
};

const categoryColors: Record<ProjectCategory, string> = {
  education: "bg-primary-100 text-primary-700",
  sante: "bg-secondary-100 text-secondary-700",
  eau: "bg-blue-100 text-blue-700",
  alimentation: "bg-orange-100 text-orange-700",
  logement: "bg-purple-100 text-purple-700",
  economie: "bg-neutral-100 text-neutral-700",
};

export default function ProjectsSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label"
            >
              Projets en cours
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title mb-0"
            >
              Là où votre don agit
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/projets"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
            >
              Voir tous les projets
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PROJECTS.map((project, index) => {
            const progress = getProgressPercent(project.raisedAmount, project.goalAmount);
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:border-primary-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
              >
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 relative flex items-center justify-center">
                  <span className="text-6xl">{project.emoji}</span>
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[project.category]}`}>
                      {categoryLabels[project.category]}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-secondary-700">
                      <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full animate-pulse" />
                      En cours
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    {project.country}
                    <span className="mx-1">·</span>
                    <Users className="w-3.5 h-3.5" />
                    {project.beneficiaries.toLocaleString("fr-FR")} bénéficiaires
                  </div>

                  <h3 className="font-heading font-bold text-neutral-900 text-lg mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-5 flex-1">
                    {project.shortDescription}
                  </p>

                  {/* Progress */}
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-primary-600">
                        {formatCurrency(project.raisedAmount)} collectés
                      </span>
                      <span className="text-sm font-bold text-neutral-700">
                        {progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                      />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-xs text-neutral-400">
                        Objectif : {formatCurrency(project.goalAmount)}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/projets/${project.slug}`}
                    className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-5 rounded-xl text-sm transition-all hover:shadow-md"
                  >
                    Voir le projet
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}