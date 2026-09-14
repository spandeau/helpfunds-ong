"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Users } from "lucide-react";
import Container from "@/components/layout/Container";
import { formatCurrency, getProgressPercent } from "@/lib/utils";
import { getFeaturedProjects } from "@/lib/projects";
import type { Project } from "@/lib/projects-data";

const categoryLabels: Record<string, string> = {
  education: "Éducation",
  sante: "Santé",
  eau: "Eau potable",
  alimentation: "Alimentation",
  logement: "Logement",
  economie: "Économie",
};

const categoryColors: Record<string, string> = {
  education: "bg-primary-100 text-primary-700",
  sante: "bg-secondary-100 text-secondary-700",
  eau: "bg-blue-100 text-blue-700",
  alimentation: "bg-orange-100 text-orange-700",
  logement: "bg-purple-100 text-purple-700",
  economie: "bg-neutral-100 text-neutral-700",
};

const statusLabels: Record<string, string> = {
  "en-preparation": "En préparation",
  "en-cours": "En cours",
  "urgent": "Urgent",
  "termine": "Terminé",
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getFeaturedProjects()
      .then((data) => setProjects(data.slice(0, 3)))
      .finally(() => setLoaded(true));
  }, []);

  if (loaded && projects.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 bg-white">
      <Container>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!loaded &&
            [0, 1, 2].map((i) => (
              <div key={i} className="rounded-2xl border border-neutral-100 overflow-hidden animate-pulse">
                <div className="h-48 bg-neutral-100" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-1/2 bg-neutral-100 rounded" />
                  <div className="h-5 w-3/4 bg-neutral-100 rounded" />
                  <div className="h-3 w-full bg-neutral-100 rounded" />
                  <div className="h-3 w-full bg-neutral-100 rounded" />
                </div>
              </div>
            ))}

          {loaded &&
            projects.map((project, index) => {
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
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden">
                    {project.images?.[0] && (
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[project.category] || "bg-neutral-100 text-neutral-700"}`}>
                        {categoryLabels[project.category] || project.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-secondary-700">
                        <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full animate-pulse" />
                        {statusLabels[project.status] || project.status}
                      </span>
                    </div>
                  </div>

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
