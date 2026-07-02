"use client";

import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import Container from "@/components/layout/Container";
import { HOME_TESTIMONIALS } from "@/constants";

interface Testimonial {
  id?: number;
  name: string;
  role: string;
  country?: string;
  text: string;
  avatar: string;
  color: string;
  featured?: boolean;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(HOME_TESTIMONIALS);

  useEffect(() => {
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    fetch(`${STRAPI_URL}/api/testimonials?filters[featured][$eq]=true&pagination[pageSize]=6`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.data && data.data.length > 0) {
          setTestimonials(data.data.map((t: Testimonial) => ({
            name: t.name,
            role: t.role,
            country: t.country || "",
            text: t.text,
            avatar: t.name.substring(0, 2).toUpperCase(),
            color: "bg-primary-500",
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 md:py-28 bg-neutral-50 overflow-hidden">
      <Container>
        <div className="text-center mb-16">
          <span className="section-label">Temoignages</span>
          <h2 className="section-title">Ils nous font confiance</h2>
          <div className="divider" />
          <p className="section-subtitle mx-auto">
            Donateurs, beneficiaires et benevoles partagent leur experience avec Help Funds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`relative bg-white rounded-3xl p-8 border border-neutral-100 hover:border-primary-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col ${
                i === 1 ? "md:-translate-y-4 border-primary-100 shadow-lg" : ""
              }`}
            >
              {/* Badge vedette */}
              {i === 1 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  Temoignage vedette
                </div>
              )}

              {/* Icone citation */}
              <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center mb-5 flex-shrink-0">
                <Quote className="w-6 h-6 text-primary-500" />
              </div>

              {/* Etoiles */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Texte */}
              <p className="text-neutral-600 leading-relaxed flex-1 mb-6 italic text-[15px]">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Auteur */}
              <div className="flex items-center gap-4 pt-5 border-t border-neutral-100">
                <div className={`w-12 h-12 ${t.color} rounded-full flex items-center justify-center text-white font-heading font-bold text-sm flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <div className="font-heading font-bold text-neutral-900 text-sm truncate">
                    {t.name}
                  </div>
                  <div className="text-xs text-primary-500 font-medium mt-0.5">{t.role}</div>
                  {t.country && (
                    <div className="text-xs text-neutral-400 mt-0.5">{t.country}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}