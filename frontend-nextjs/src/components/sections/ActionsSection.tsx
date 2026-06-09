"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, Droplets, BookOpen, Home, TrendingUp } from "lucide-react";

const ACTIONS = [
  {
    id: 1,
    icon: BookOpen,
    title: "Education",
    subtitle: "Scolariser les enfants",
    description: "Nous construisons des ecoles, formons des enseignants et fournissons les fournitures scolaires pour garantir l acces a une education de qualite.",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
    href: "/projets",
    stat: "3 500 enfants",
    statLabel: "scolarises",
    color: "from-blue-600 to-blue-800",
    badge: "Education",
  },
  {
    id: 2,
    icon: Heart,
    title: "Sante",
    subtitle: "Soigner les populations",
    description: "Consultations gratuites, vaccinations, maternites equipees. Nous rapprochons les soins des communautes les plus isolees.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    href: "/projets",
    stat: "1 200 patients",
    statLabel: "soignes / mois",
    color: "from-red-600 to-red-800",
    badge: "Sante",
  },
  {
    id: 3,
    icon: Droplets,
    title: "Eau potable",
    subtitle: "Garantir l acces a l eau",
    description: "Forages, puits et systemes de purification. L eau propre est un droit fondamental que nous contribuons a garantir.",
    image: "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=800&q=80",
    href: "/projets",
    stat: "2 500 personnes",
    statLabel: "avec acces a l eau",
    color: "from-cyan-600 to-cyan-800",
    badge: "Eau",
  },
  {
    id: 4,
    icon: Users,
    title: "Alimentation",
    subtitle: "Nourrir les familles",
    description: "Distribution alimentaire d urgence et programmes nutritionnels pour les enfants et les familles en situation de precarite.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    href: "/projets",
    stat: "12 000 repas",
    statLabel: "distribues / mois",
    color: "from-orange-600 to-orange-800",
    badge: "Nutrition",
  },
  {
    id: 5,
    icon: Home,
    title: "Logement",
    subtitle: "Reconstruire des vies",
    description: "Apres les catastrophes naturelles ou les conflits, nous aidons les familles a reconstruire un habitat sur et digne.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    href: "/projets",
    stat: "150 familles",
    statLabel: "relogees",
    color: "from-emerald-600 to-emerald-800",
    badge: "Logement",
  },
  {
    id: 6,
    icon: TrendingUp,
    title: "Economie",
    subtitle: "Autonomiser les communautes",
    description: "Microfinance, formation professionnelle et accompagnement entrepreneurial pour que chaque individu puisse subvenir a ses besoins.",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
    href: "/projets",
    stat: "512 emplois",
    statLabel: "crees",
    color: "from-purple-600 to-purple-800",
    badge: "Economie",
  },
];

export default function ActionsSection() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 rounded-full px-4 py-2 text-primary-700 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
            Nos domaines d action
          </div>
          <h2 className="font-heading font-bold text-neutral-900 text-3xl md:text-4xl mb-4">
            Nos actions <span className="text-primary-600">sur le terrain</span>
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg">
            Nous intervenons dans six domaines cles pour repondre aux besoins essentiels des populations les plus vulnerables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIONS.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={action.href} className="block group h-full">
                <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={action.image}
                      alt={action.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${action.color} opacity-60`} />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur text-neutral-800 text-xs font-bold px-2.5 py-1 rounded-full">
                        {action.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-2">
                        <p className="text-white font-bold text-sm">{action.stat}</p>
                        <p className="text-white/80 text-xs">{action.statLabel}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <action.icon className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-neutral-900 text-base leading-tight">{action.title}</h3>
                        <p className="text-primary-600 text-xs font-medium">{action.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-neutral-500 text-sm leading-relaxed flex-1 mb-4">
                      {action.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all">
                      Decouvrir <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/projets"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Voir tous nos projets <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}