"use client";

import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight, ChevronLeft, ChevronRight, Users, BookOpen, Droplets, Home, Stethoscope, Globe } from "lucide-react";
import { HOME_STATS } from "@/constants";

const SLIDES = [
  { id: 1, badge: "Education - Nigeria", title: "300 enfants ont", titleAccent: "retrouve le chemin", titleEnd: "de l ecole", description: "Construction d une ecole primaire complete dans la region de Kano.", image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1920&q=80", accentColor: "text-secondary-400", stat: { value: "300", label: "enfants scolarises" }, cta: "Voir le projet", ctaHref: "/projets" },
  { id: 2, badge: "Eau Potable - Mali", title: "2 500 personnes ont", titleAccent: "acces a l eau", titleEnd: "potable", description: "Installation de 12 points d eau dans 5 villages isoles du Sahel.", image: "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=1920&q=80", accentColor: "text-blue-300", stat: { value: "12", label: "points d eau installes" }, cta: "Voir le projet", ctaHref: "/projets" },
  { id: 3, badge: "Sante - RD Congo", title: "1 200 patients", titleAccent: "soignes chaque", titleEnd: "mois", description: "Rehabilitation d un centre de sante au Kivu.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80", accentColor: "text-secondary-400", stat: { value: "1 200", label: "patients par mois" }, cta: "Voir le projet", ctaHref: "/projets" },
  { id: 4, badge: "Logement - Haiti", title: "150 familles ont", titleAccent: "un toit sur", titleEnd: "aujourd hui", description: "Programme de reconstruction de logements durables en Haiti.", image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&q=80", accentColor: "text-accent-400", stat: { value: "150", label: "familles relogees" }, cta: "Voir le projet", ctaHref: "/projets" },
  { id: 5, badge: "Impact Global", title: "35 pays,", titleAccent: "une seule", titleEnd: "mission", description: "Help Funds opere dans 35 pays pour apporter une aide concrete.", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80", accentColor: "text-secondary-400", stat: { value: "35", label: "pays d intervention" }, cta: "Notre impact", ctaHref: "/projets" },
  { id: 6, badge: "Ensemble", title: "Chaque don", titleAccent: "change une vie", titleEnd: "reelle", description: "98% de chaque don va directement sur le terrain.", image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&q=80", accentColor: "text-secondary-400", stat: { value: "98%", label: "des dons sur le terrain" }, cta: "Faire un don", ctaHref: "/don" },
];

const iconMap = {
  users: Users,
  folder: BookOpen,
  globe: Globe,
  heart: Heart,
};

export default function HeroSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 60 }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const onSelect = useCallback(() => { if (!emblaApi) return; setSelectedIndex(emblaApi.selectedScrollSnap()); }, [emblaApi]);
  useEffect(() => { if (!emblaApi) return; onSelect(); emblaApi.on("select", onSelect); return () => { emblaApi.off("select", onSelect); }; }, [emblaApi, onSelect]);

  return (
    <div className="flex flex-col">
      <section className="relative h-screen overflow-hidden">
        <div ref={emblaRef} className="overflow-hidden h-full">
          <div className="flex h-full touch-pan-y">
            {SLIDES.map((slide) => (
              <div key={slide.id} className="flex-none w-full h-full relative">
                <Image src={slide.image} alt={slide.badge} fill className="object-cover" priority={slide.id === 1} sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-2 text-white text-sm font-medium mb-6">
                        <span className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" />
                        {slide.badge}
                      </div>
                      <h1 className="font-heading font-bold text-white mb-5 leading-tight drop-shadow-lg">
                        {slide.title} <span className={slide.accentColor}>{slide.titleAccent}</span> {slide.titleEnd}
                      </h1>
                      <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-lg">{slide.description}</p>
                      <div className="inline-flex items-center gap-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 mb-10">
                        <div>
                          <div className="text-4xl font-heading font-bold text-white leading-none">{slide.stat.value}</div>
                          <div className="text-sm text-white/60 mt-1">{slide.stat.label}</div>
                        </div>
                        <div className="w-px h-10 bg-white/20" />
                        <div className="text-sm text-white/70 max-w-[130px] leading-tight">Impact direct sur le terrain</div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/don" className="inline-flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-2xl transition-all hover:-translate-y-1">
                          <Heart className="w-5 h-5 fill-white" />Faire un don
                        </Link>
                        <Link href={slide.ctaHref} className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all hover:-translate-y-1">
                          {slide.cta}<ArrowRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={scrollPrev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 shadow-xl">
          <ChevronLeft className="w-7 h-7" />
        </button>
        <button onClick={scrollNext} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 shadow-xl">
          <ChevronRight className="w-7 h-7" />
        </button>

        <div className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            {SLIDES.map((_, index) => (
              <button key={index} onClick={() => emblaApi?.scrollTo(index)} className={`transition-all duration-300 rounded-full ${index === selectedIndex ? "w-10 h-2.5 bg-white shadow-lg" : "w-2.5 h-2.5 bg-white/35 hover:bg-white/60"}`} />
            ))}
          </div>
          <span className="text-white/40 text-xs">{selectedIndex + 1} / {SLIDES.length}</span>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {HOME_STATS.map((stat, index) => {
              const Icon = iconMap[stat.icon as keyof typeof iconMap] || Heart;
              return (
                <div key={stat.label} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors border border-white/10">
                    <Icon className="w-6 h-6 text-secondary-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-heading font-bold text-white leading-none">{stat.value}</div>
                    <div className="text-xs text-white/50 mt-1 leading-tight">{stat.label}</div>
                  </div>
                  {index < HOME_STATS.length - 1 && <div className="hidden md:block w-px h-10 bg-white/10 ml-auto" />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-2">Agissez maintenant</p>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-neutral-900 mb-2">Votre soutien fait la <span className="text-secondary-600">difference</span></h2>
              <p className="text-neutral-500 text-sm max-w-md">Chaque contribution, aussi petite soit-elle, change concretement des vies sur le terrain.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link href="/don" className="inline-flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold px-8 py-4 rounded-2xl text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <Heart className="w-5 h-5 fill-white" />Faire un don
              </Link>
              <Link href="/projets" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-primary-50 text-primary-600 font-bold px-8 py-4 rounded-2xl text-base border-2 border-primary-200 hover:border-primary-400 transition-all hover:-translate-y-1">
                Voir nos projets<ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-neutral-100 flex flex-wrap justify-center md:justify-start gap-6">
            {[{ icon: "🔒", text: "Paiement 100% securise" }, { icon: "📋", text: "Recu fiscal immediat" }, { icon: "✅", text: "98% des fonds sur le terrain" }, { icon: "🌍", text: "35 pays d intervention" }].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-neutral-500">
                <span>{item.icon}</span><span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
