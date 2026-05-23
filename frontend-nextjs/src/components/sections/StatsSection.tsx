"use client";

import { motion } from "framer-motion";
import { Users, FolderOpen, Globe, Heart } from "lucide-react";
import Container from "@/components/layout/Container";
import { HOME_STATS } from "@/constants";

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  folder: FolderOpen,
  globe: Globe,
  heart: Heart,
};

const colorMap: Record<number, { bg: string; text: string; border: string }> = {
  0: { bg: "bg-primary-50", text: "text-primary-600", border: "border-primary-100" },
  1: { bg: "bg-secondary-50", text: "text-secondary-600", border: "border-secondary-100" },
  2: { bg: "bg-accent-50", text: "text-accent-600", border: "border-accent-100" },
  3: { bg: "bg-primary-50", text: "text-primary-600", border: "border-primary-100" },
};

export default function StatsSection() {
  return (
    <section className="py-20 md:py-28 bg-neutral-50">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            Notre impact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Des résultats concrets sur le terrain
          </motion.h2>
          <div className="divider" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Chaque euro donné est tracé, audité et utilisé directement
            pour maximiser l&apos;impact sur les communautés que nous soutenons.
          </motion.p>
        </div>

        {/* Grid stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOME_STATS.map((stat, index) => {
            const Icon = iconMap[stat.icon] || Heart;
            const colors = colorMap[index] || colorMap[0];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center border border-neutral-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 ${colors.bg} border ${colors.border} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                  <Icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                <div className={`text-4xl font-heading font-bold ${colors.text} mb-2`}>
                  {stat.value}
                </div>
                <div className="font-semibold text-neutral-800 mb-2 text-sm">
                  {stat.label}
                </div>
                <div className="text-xs text-neutral-400 leading-relaxed">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Barre de confiance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-white rounded-2xl border border-neutral-100 p-6 flex flex-wrap justify-center gap-8 text-sm"
        >
          {[
            { icon: "✅", text: "Comptes audités annuellement" },
            { icon: "🔒", text: "Dons 100% sécurisés" },
            { icon: "📋", text: "Rapports publics disponibles" },
            { icon: "🏆", text: "Certifiée organisme d'utilité publique" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-neutral-600">
              <span>{item.icon}</span>
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}