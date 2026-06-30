"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Users,
  BookOpen,
  Globe,
} from "lucide-react";

import { HOME_STATS } from "@/constants";

const SLIDES = [
  {
    id: 1,
    badge: "Education — Nigeria",
    title: "300 enfants ont",
    titleAccent: "retrouve le chemin",
    titleEnd: "de l ecole",
    description: "Construction d une ecole primaire complete dans la region de Kano.",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1920&q=80",
    cta: "Voir le projet",
    ctaHref: "/projets",
    stat: { value: "300", label: "enfants scolarises" },
    accent: "text-secondary-400",
  },
  {
    id: 2,
    badge: "Eau — Mali",
    title: "2 500 personnes ont",
    titleAccent: "acces a l eau",
    titleEnd: "potable",
    description: "Installation de 12 points d eau dans plusieurs villages.",
    image: "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=1920&q=80",
    cta: "Decouvrir",
    ctaHref: "/projets",
    stat: { value: "12", label: "points installes" },
    accent: "text-blue-300",
  },
  {
    id: 3,
    badge: "Impact Global",
    title: "35 pays",
    titleAccent: "une seule",
    titleEnd: "mission",
    description: "Nous agissons pour creer un changement durable.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80",
    cta: "Notre impact",
    ctaHref: "/projets",
    stat: { value: "35", label: "pays" },
    accent: "text-secondary-400",
  },
];

const iconMap = {
  users: Users,
  folder: BookOpen,
  globe: Globe,
  heart: Heart,
};

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5500, stopOnInteraction: false })]
  );

  const previous = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  const select = useCallback(() => {
    if (!embla) return;
    setIndex(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    select();
    embla.on("select", select);
    return () => {
      embla.off("select", select);
    };
  }, [embla, select]);

  // Effet parallaxe au scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      if (rect.bottom > 0) {
        setOffsetY(window.scrollY * 0.35);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <section ref={heroRef} className="relative h-[90vh] md:h-screen overflow-hidden">
        <div ref={emblaRef} className="overflow-hidden h-full">
          <div className="flex h-full">
            {SLIDES.map((slide) => (
              <div key={slide.id} className="relative min-w-0 flex-[0_0_100%] h-full">
                <div
                  className="absolute inset-0 hero-parallax"
                  style={{ transform: `translateY(${offsetY}px)`, height: "130%" }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-primary-950/70 via-primary-950/60 to-primary-950/85" />

                {/* Logo watermark en arriere-plan */}
                <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none">
                  <Image
                    src="/logo.png"
                    alt=""
                    width={900}
                    height={900}
                    className="opacity-[0.06] object-contain translate-x-1/4 -translate-y-4"
                    aria-hidden="true"
                  />
                </div>

                <div className="absolute inset-0">
                  <div className="max-w-7xl mx-auto h-full flex items-center px-6">
                    <div className="max-w-3xl pt-24">
                      <div className="inline-flex rounded-full bg-white/10 backdrop-blur px-4 py-2 text-white text-sm mb-6 border border-white/20">
                        {slide.badge}
                      </div>

                      <h1 className="text-white font-heading font-bold leading-tight text-4xl sm:text-5xl lg:text-7xl mb-6">
                        {slide.title}
                        <span className={slide.accent}> {slide.titleAccent}</span> {slide.titleEnd}
                      </h1>

                      <p className="text-white/85 text-base sm:text-xl max-w-2xl mb-8">
                        {slide.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          href="/don"
                          className="px-8 py-4 rounded-2xl bg-secondary-600 text-white font-bold inline-flex items-center gap-2 hover:scale-105 hover:bg-secondary-700 transition-all shadow-xl"
                        >
                          <Heart size={18} className="fill-white" />
                          Faire un don
                        </Link>

                        <Link
                          href={slide.ctaHref}
                          className="px-8 py-4 rounded-2xl bg-white/15 backdrop-blur border border-white/20 text-white inline-flex items-center gap-2 hover:scale-105 hover:bg-white/25 transition-all"
                        >
                          {slide.cta}
                          <ArrowRight size={18} />
                        </Link>
                      </div>

                      <div className="mt-10 inline-flex items-center gap-5 bg-white/10 rounded-2xl px-6 py-4 backdrop-blur border border-white/10">
                        <div>
                          <div className="text-white font-heading text-4xl font-bold tabular-nums">
                            {slide.stat.value}
                          </div>
                          <div className="text-white/70">{slide.stat.label}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={previous}
          aria-label="Slide precedent"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-xl bg-white/15 backdrop-blur text-white hover:bg-white/25 transition-colors flex items-center justify-center"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={next}
          aria-label="Slide suivant"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-xl bg-white/15 backdrop-blur text-white hover:bg-white/25 transition-colors flex items-center justify-center"
        >
          <ChevronRight />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => embla?.scrollTo(i)}
              aria-label={`Aller au slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-12 bg-white" : "w-4 bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="bg-primary-950 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {HOME_STATS.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Heart;
            return (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="text-secondary-400" />
                </div>
                <div>
                  <div className="text-white font-heading font-bold text-3xl tabular-nums">
                    {item.value}
                  </div>
                  <div className="text-white/60 text-sm">{item.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}