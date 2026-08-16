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

function PartnerLogo({ partner, strapiUrl }: { partner: Partner; strapiUrl: string }) {
  const logoUrl = partner.logo?.url
    ? partner.logo.url.startsWith("http")
      ? partner.logo.url
      : `${strapiUrl}${partner.logo.url}`
    : null;

  return (
    <div className="flex-shrink-0 mx-4 flex flex-col items-center justify-center gap-2 w-36 h-28 px-4 py-3 bg-white rounded-2xl border border-neutral-100 hover:border-primary-200 hover:shadow-md transition-all duration-300 group">
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={partner.name}
          width={100}
          height={40}
          className="h-9 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        />
      ) : (
        <div className="h-9 w-9 rounded-full bg-primary-50 flex items-center justify-center">
          <span className="text-primary-400 font-bold text-sm">{partner.name[0]}</span>
        </div>
      )}
      <span className="text-neutral-500 text-xs font-medium text-center group-hover:text-primary-600 transition-colors truncate w-full">
        {partner.name}
      </span>
    </div>
  );
}

export default function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loaded, setLoaded] = useState(false);
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  useEffect(() => {
    fetch(`${STRAPI_URL}/api/partners?populate[logo]=true&sort=order:asc&pagination[pageSize]=20`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.data && data.data.length > 0) {
          setPartners(data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [STRAPI_URL]);

  if (loaded && partners.length === 0) {
    return null;
  }

  const doubled = [...partners, ...partners];

  return (
    <section className="py-16 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <span className="section-label">Nos partenaires</span>
        <h2 className="font-heading font-bold text-neutral-900 text-2xl md:text-3xl">
          Ils nous font confiance
        </h2>
      </div>

      {partners.length > 0 && (
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex partners-scroll">
            {doubled.map((partner, i) => (
              <PartnerLogo key={`${partner.id}-${i}`} partner={partner} strapiUrl={STRAPI_URL} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}