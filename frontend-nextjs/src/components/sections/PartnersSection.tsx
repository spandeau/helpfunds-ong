"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Partner {
  id: number;
  name: string;
  website?: string;
  logo?: { url: string } | null;
  order?: number;
}

const FALLBACK_PARTNERS: Partner[] = [
  { id: 1, name: "UNICEF", logo: null },
  { id: 2, name: "OMS", logo: null },
  { id: 3, name: "PNUD", logo: null },
  { id: 4, name: "Croix-Rouge", logo: null },
  { id: 5, name: "UNESCO", logo: null },
  { id: 6, name: "FAO", logo: null },
  { id: 7, name: "ONU Femmes", logo: null },
  { id: 8, name: "UNHCR", logo: null },
];

function PartnerLogo({ partner, strapiUrl }: { partner: Partner; strapiUrl: string }) {
  const logoUrl = partner.logo?.url
    ? partner.logo.url.startsWith("http")
      ? partner.logo.url
      : `${strapiUrl}${partner.logo.url}`
    : null;

  return (
    <div className="flex-shrink-0 mx-8 flex items-center justify-center h-16 px-6 bg-white rounded-2xl border border-neutral-100 hover:border-primary-200 hover:shadow-md transition-all duration-300 group">
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={partner.name}
          width={120}
          height={48}
          className="h-10 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        />
      ) : (
        <span className="text-neutral-400 font-heading font-bold text-sm group-hover:text-primary-500 transition-colors whitespace-nowrap">
          {partner.name}
        </span>
      )}
    </div>
  );
}

export default function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>(FALLBACK_PARTNERS);
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  useEffect(() => {
    fetch(`${STRAPI_URL}/api/partners?populate[logo]=true&sort=order:asc&pagination[pageSize]=20`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.data && data.data.length > 0) {
          setPartners(data.data);
        }
      })
      .catch(() => {});
  }, [STRAPI_URL]);

  const doubled = [...partners, ...partners];

  return (
    <section className="py-16 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <span className="section-label">Nos partenaires</span>
        <h2 className="font-heading font-bold text-neutral-900 text-2xl md:text-3xl">
          Ils nous font confiance
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex partners-scroll">
          {doubled.map((partner, i) => (
            <PartnerLogo
              key={`${partner.id}-${i}`}
              partner={partner}
              strapiUrl={STRAPI_URL}
            />
          ))}
        </div>
      </div>
    </section>
  );
}