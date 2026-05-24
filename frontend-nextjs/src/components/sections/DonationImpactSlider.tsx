"use client";

import { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IMPACT_SLIDES = [
  {
    id: 1,
    title: "Aide alimentaire",
    description: "Distribution de repas chauds et de kits alimentaires aux familles vulnerables dans les zones de crise.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    stat: "12 000 repas / mois",
    color: "from-orange-900/80 to-orange-950/90",
    emoji: "🍽️",
    tag: "Alimentation",
  },
  {
    id: 2,
    title: "Acces aux soins",
    description: "Consultations medicales gratuites, vaccinations et suivi sanitaire pour les communautes isolees.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    stat: "1 200 patients / mois",
    color: "from-primary-900/80 to-primary-950/90",
    emoji: "🏥",
    tag: "Sante",
  },
  {
    id: 3,
    title: "Education des enfants",
    description: "Fournitures scolaires, construction d ecoles et programmes de formation pour les enfants defavorises.",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
    stat: "3 500 enfants scolarises",
    color: "from-secondary-900/80 to-secondary-950/90",
    emoji: "📚",
    tag: "Education",
  },
  {
    id: 4,
    title: "Projets communautaires",
    description: "Construction de puits, centres communautaires et projets d agriculture durable pour renforcer les communautes.",
    image: "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=800&q=80",
    stat: "45 villages touches",
    color: "from-blue-900/80 to-blue-950/90",
    emoji: "🤝",
    tag: "Communaute",
  },
  {
    id: 5,
    title: "Aide aux familles",
    description: "Soutien psychologique, aide juridique et accompagnement social pour les familles en situation de detresse.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    stat: "800 familles accompagnees",
    color: "from-purple-900/80 to-purple-950/90",
    emoji: "👨‍👩‍👧‍👦",
    tag: "Famille",
  },
];

export default function DonationImpactSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-neutral-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-secondary-400 font-semibold text-sm uppercase tracking-widest mb-3">
            A quoi servent vos dons
          </p>
          <h2 className="font-heading font-bold text-white text-3xl md:text-4xl mb-3">
            Chaque euro compte
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Decouvrez concretement les actions financees par vos dons sur le terrain.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden rounded-2xl">
            <div className="flex">
              {IMPACT_SLIDES.map((slide) => (
                <div key={slide.id} className="flex-none w-full md:w-1/2 lg:w-1/3 px-3">
                  <div className="relative h-72 rounded-2xl overflow-hidden group cursor-pointer">
                    {/* Image */}
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${slide.color}`} />

                    {/* Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {slide.emoji} {slide.tag}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-1.5 inline-block mb-3">
                        <span className="text-secondary-400 font-bold text-sm">
                          {slide.stat}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-white text-lg mb-1">
                        {slide.title}
                      </h3>
                      <p className="text-white/70 text-xs leading-relaxed line-clamp-2">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fleches */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-neutral-700 hover:bg-primary-600 hover:text-white transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-neutral-700 hover:bg-primary-600 hover:text-white transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {IMPACT_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${
                index === selectedIndex
                  ? "w-8 h-2 bg-secondary-400"
                  : "w-2 h-2 bg-neutral-600 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { value: "12 000", label: "repas distribues / mois", emoji: "🍽️" },
            { value: "3 500", label: "enfants scolarises", emoji: "📚" },
            { value: "45", label: "villages touches", emoji: "🏘️" },
            { value: "800", label: "familles accompagnees", emoji: "👨‍👩‍👧" },
          ].map((stat) => (
            <div key={stat.label} className="bg-neutral-800 rounded-2xl p-5 text-center border border-neutral-700">
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="text-2xl font-heading font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-neutral-400 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}