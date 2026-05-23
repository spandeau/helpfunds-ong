"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, ArrowRight, Shield, FileText, TrendingUp } from "lucide-react";
import Container from "@/components/layout/Container";

const trustItems = [
  { icon: Shield, text: "100% sécurisé" },
  { icon: FileText, text: "Reçu fiscal" },
  { icon: TrendingUp, text: "98% sur le terrain" },
  { icon: Heart, text: "Impact réel" },
];

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary-950 via-primary-900 to-neutral-900 relative overflow-hidden">

      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white/80 text-sm font-medium mb-10">
            <Heart className="w-4 h-4 text-secondary-400 fill-secondary-400" />
            Rejoignez notre communauté de donateurs
          </div>

          {/* Titre */}
          <h2 className="font-heading font-bold text-white mb-6 leading-tight">
            Votre engagement peut devenir{" "}
            <span className="text-secondary-400">
              une action concrète
            </span>{" "}
            dès aujourd&apos;hui.
          </h2>

          {/* Texte */}
          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            Rejoignez des milliers de donateurs qui font confiance à Help Funds
            pour transformer chaque euro en impact réel sur le terrain.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/don"
              className="inline-flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold px-10 py-5 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <Heart className="w-5 h-5 fill-white" />
              Faire un don
            </Link>
            <Link
              href="/projets"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-10 py-5 rounded-2xl text-lg transition-all hover:-translate-y-1"
            >
              Nos projets
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6">
            {trustItems.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/50 text-sm">
                <Icon className="w-4 h-4 text-secondary-400" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}