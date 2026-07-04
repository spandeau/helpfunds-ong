"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  Users, Globe, FolderOpen, Heart,
  Droplets, BookOpen, Home, Apple,
  TrendingUp, Award, Shield, Target
} from "lucide-react";

function useCountUp(target: number, trigger: boolean, duration = 2000) {
  const [val, setVal] = useState(0);
  const played = useRef(false);
  useEffect(() => {
    if (!trigger || played.current || target === 0) return;
    played.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(e * target));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [trigger, target, duration]);
  return val;
}

function ImpactCard({ value, suffix, label, icon: Icon, color, description, progress }: {
  value: number; suffix: string; label: string;
  icon: React.ElementType; color: string; description: string; progress: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, visible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-white rounded-3xl p-8 border border-neutral-100 hover:border-primary-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-6`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="text-5xl font-heading font-black text-neutral-900 mb-1 tabular-nums">
        {count.toLocaleString("fr-FR")}{suffix}
      </div>
      <div className="font-bold text-neutral-700 mb-2">{label}</div>
      <div className="text-sm text-neutral-400 mb-4">{description}</div>
      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000`}
          style={{ width: visible ? `${progress}%` : "0%" }}
        />
      </div>
      <div className="text-xs text-neutral-400 mt-1">{progress}% de l objectif atteint</div>
    </div>
  );
}

const STATS = [
  { value: 50000, suffix: "+", label: "Beneficiaires aides", icon: Users, color: "bg-primary-500", description: "personnes ayant beneficie directement de nos programmes", progress: 83 },
  { value: 35, suffix: "", label: "Pays d intervention", icon: Globe, color: "bg-secondary-600", description: "pays ou nous menons des actions humanitaires actives", progress: 70 },
  { value: 120, suffix: "+", label: "Projets realises", icon: FolderOpen, color: "bg-accent-500", description: "projets termines avec succes depuis notre creation", progress: 92 },
  { value: 2400000, suffix: "", label: "Euros collectes", icon: Heart, color: "bg-primary-700", description: "euros de dons collectes et redistribues sur le terrain", progress: 60 },
];

const DOMAINS = [
  { icon: Droplets, label: "Eau & Assainissement", value: "32%", description: "Acces a l eau potable et construction de puits", color: "bg-blue-100 text-blue-600" },
  { icon: BookOpen, label: "Education", value: "28%", description: "Construction d ecoles et bourses scolaires", color: "bg-green-100 text-green-600" },
  { icon: Heart, label: "Sante", value: "22%", description: "Cliniques mobiles et vaccination", color: "bg-red-100 text-red-600" },
  { icon: Apple, label: "Nutrition", value: "10%", description: "Lutte contre la malnutrition infantile", color: "bg-orange-100 text-orange-600" },
  { icon: Home, label: "Logement", value: "8%", description: "Reconstruction apres catastrophes", color: "bg-purple-100 text-purple-600" },
];

const CERTIFS = [
  { icon: Award, label: "Certifiee d utilite publique", desc: "Statut officiel reconnu par les autorites" },
  { icon: Shield, label: "Audit independant annuel", desc: "Transparence totale des comptes" },
  { icon: Target, label: "98% sur le terrain", desc: "Seulement 2% de frais de gestion" },
  { icon: TrendingUp, label: "Impact mesure", desc: "Evaluation rigoureuse de chaque projet" },
];

export default function ImpactPage() {
  return (
    <main className="bg-neutral-50 min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            Notre Impact
          </span>
          <h1 className="font-heading font-bold text-white text-4xl md:text-6xl mb-6 leading-tight">
            Des resultats <span className="text-secondary-400">concrets</span> sur le terrain
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Chaque euro donne est trace, audite et transforme en impact reel pour les communautes vulnerables.
          </p>
          <Link href="/don" className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4">
            <Heart className="w-5 h-5 fill-white" />
            Contribuer maintenant
          </Link>
        </div>
      </section>

      {/* Chiffres cles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label">Chiffres cles</span>
            <h2 className="section-title">L impact en chiffres</h2>
            <div className="divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s) => <ImpactCard key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* Repartition par domaine */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label">Nos domaines</span>
            <h2 className="section-title">Repartition de nos actions</h2>
            <div className="divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {DOMAINS.map((d) => (
              <div key={d.label} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 text-center group">
                <div className={`w-14 h-14 ${d.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <d.icon className="w-7 h-7" />
                </div>
                <div className="text-3xl font-heading font-black text-neutral-900 mb-1">{d.value}</div>
                <div className="font-bold text-neutral-700 text-sm mb-2">{d.label}</div>
                <div className="text-xs text-neutral-400">{d.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label">Transparence</span>
            <h2 className="section-title">Nos engagements</h2>
            <div className="divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFS.map((c) => (
              <div key={c.label} className="bg-white rounded-2xl p-6 border border-neutral-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 text-center">
                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <c.icon className="w-7 h-7 text-primary-500" />
                </div>
                <div className="font-bold text-neutral-900 mb-2">{c.label}</div>
                <div className="text-sm text-neutral-400">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-primary-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-white text-3xl md:text-4xl mb-4">
            Faites partie de l aventure
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Votre soutien nous permet de continuer a agir. Chaque don compte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/don" className="btn-secondary inline-flex items-center gap-2 px-8 py-4 text-lg">
              <Heart className="w-5 h-5 fill-white" />Faire un don
            </Link>
            <Link href="/projets" className="btn-outline inline-flex items-center gap-2 px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-primary-900">
              Voir nos projets
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}