"use client";

import { useEffect, useState, useRef } from "react";
import { Users, FolderOpen, Globe, Heart } from "lucide-react";

interface Stat {
  value: string;
  label: string;
  description?: string;
  icon?: string;
}

const DEFAULT_STATS: Stat[] = [
  { value: "50000", label: "Beneficiaires aides", description: "personnes soutenues", icon: "users" },
  { value: "120", label: "Projets realises", description: "sur le terrain", icon: "folder" },
  { value: "18", label: "Pays touches", description: "a travers le monde", icon: "globe" },
  { value: "10", label: "Annees d impact", description: "d experience humanitaire", icon: "heart" },
];

const ICONS: Record<string, React.ElementType> = {
  users: Users,
  folder: FolderOpen,
  globe: Globe,
  heart: Heart,
};

const COLORS = [
  { bg: "bg-primary-500", light: "bg-primary-50", text: "text-primary-500", border: "border-primary-100" },
  { bg: "bg-secondary-600", light: "bg-secondary-50", text: "text-secondary-600", border: "border-secondary-100" },
  { bg: "bg-accent-500", light: "bg-accent-50", text: "text-accent-500", border: "border-accent-100" },
  { bg: "bg-primary-700", light: "bg-primary-50", text: "text-primary-700", border: "border-primary-100" },
];

function parseNumber(value: string): number {
  return parseInt(value.replace(/\D/g, ""), 10) || 0;
}

function formatNumber(n: number, original: string): string {
  const suffix = original.replace(/[\d\s]/g, "");
  if (n >= 1000) return n.toLocaleString("fr-FR") + suffix;
  return n + suffix;
}

function useCountUp(target: number, original: string, trigger: boolean, duration = 2200) {
  const [display, setDisplay] = useState(formatNumber(0, original));
  const playedRef = useRef(false);

  useEffect(() => {
    if (!trigger || playedRef.current || target === 0) return;
    playedRef.current = true;

    const start = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(formatNumber(current, original));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplay(formatNumber(target, original));
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [trigger, target, original, duration]);

  return display;
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const target = parseNumber(stat.value);
  const display = useCountUp(target, stat.value, visible);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Verifie immediatement si deja dans le viewport
    const checkVisible = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setVisible(true);
      }
    };

    checkVisible();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0 }
    );
    observer.observe(el);

    window.addEventListener("scroll", checkVisible, { passive: true });
    window.addEventListener("resize", checkVisible);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkVisible);
      window.removeEventListener("resize", checkVisible);
    };
  }, []);

  const Icon = ICONS[stat.icon || "heart"] || Heart;
  const color = COLORS[index % COLORS.length];

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden bg-white rounded-3xl p-8 text-center border ${color.border} shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500 group`}
    >
      <div className={`absolute -top-6 -right-6 w-24 h-24 ${color.light} rounded-full opacity-60 group-hover:scale-150 transition-transform duration-700`} />

      <div className={`relative w-14 h-14 ${color.light} ${color.border} border rounded-2xl flex items-center justify-center mx-auto mb-5`}>
        <Icon className={`w-7 h-7 ${color.text}`} />
      </div>

      <div className={`relative text-4xl md:text-5xl font-heading font-black ${color.text} mb-2 tabular-nums`}>
        {display}
      </div>

      <div className="relative font-bold text-neutral-800 text-sm mb-1">
        {stat.label}
      </div>

      {stat.description && (
        <div className="relative text-xs text-neutral-400 leading-relaxed">
          {stat.description}
        </div>
      )}

      <div className="relative mt-4 h-1 bg-neutral-100 rounded-full overflow-hidden">
        <div className={`h-full ${color.bg} rounded-full transition-all duration-1000`} style={{ width: visible ? "75%" : "0%" }} />
      </div>
    </div>
  );
}

export default function StatsSection() {
  const [stats, setStats] = useState<Stat[]>(DEFAULT_STATS);

  useEffect(() => {
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    fetch(`${STRAPI_URL}/api/impact-stats?sort=order:asc&pagination[pageSize]=8`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.data && data.data.length > 0) {
          setStats(data.data.map((s: Stat) => ({
            value: s.value,
            label: s.label,
            description: s.description || "",
            icon: s.icon || "heart",
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Notre impact</span>
          <h2 className="section-title">Des resultats concrets sur le terrain</h2>
          <div className="divider" />
          <p className="section-subtitle mx-auto">
            Chaque euro donne est trace, audite et utilise directement
            pour maximiser l&apos;impact sur les communautes que nous soutenons.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        <div className="mt-14 bg-neutral-50 rounded-3xl border border-neutral-100 p-6 flex flex-wrap justify-center gap-6 md:gap-10 text-sm">
          {[
            { icon: "✅", text: "Comptes audites annuellement" },
            { icon: "🔒", text: "Dons 100% securises" },
            { icon: "📋", text: "Rapports publics disponibles" },
            { icon: "🏆", text: "ONG certifiee d utilite publique" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-neutral-600 font-medium">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}