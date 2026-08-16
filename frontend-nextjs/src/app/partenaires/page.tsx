import type { Metadata } from "next";
import Image from "next/image";
import { Handshake, Megaphone, TrendingUp, Users, ExternalLink } from "lucide-react";
import PartnershipForm from "@/components/sections/PartnershipForm";

export const metadata: Metadata = {
  title: "Nos Partenaires — Help Funds",
  description: "Decouvrez nos partenaires et rejoignez-nous pour amplifier notre impact humanitaire.",
};

interface Partner {
  id: number;
  name: string;
  website?: string;
  description?: string;
  logo?: { url: string };
}

async function getPartners(): Promise<Partner[]> {
  try {
    const strapiUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const response = await fetch(strapiUrl + "/api/partners?populate[logo]=true&sort=order:asc&pagination[pageSize]=50");
    if (!response.ok) throw new Error("Strapi status " + response.status);
    const result = (await response.json()) as { data: Partner[] };
    return result?.data || [];
  } catch (error) {
    console.warn("[Partenaires] Erreur fetch", error);
    return [];
  }
}

const BENEFITS = [
  { icon: Megaphone, title: "Visibilite", text: "Votre logo et votre engagement mis en avant aupres de notre communaute de donateurs." },
  { icon: TrendingUp, title: "Impact mesurable", text: "Des rapports reguliers sur les resultats concrets de votre soutien sur le terrain." },
  { icon: Users, title: "Reseau", text: "Rejoignez un reseau d organisations engagees dans l aide humanitaire internationale." },
  { icon: Handshake, title: "Sur-mesure", text: "Des formes de partenariat adaptees a vos objectifs : financier, materiel, ou de competences." },
];

export default async function PartenairesPage() {
  const partners = await getPartners();
  const strapiUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="bg-white border-b border-neutral-100 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Nos Partenaires
            </span>
            <h1 className="font-heading font-bold text-neutral-900 text-4xl md:text-5xl leading-tight">
              Ensemble, on va plus loin
            </h1>
            <p className="mt-4 text-neutral-500 text-lg">
              Help Funds collabore avec des organisations et entreprises engagees pour amplifier son impact sur le terrain.
            </p>
          </div>
        </div>
      </section>

      {partners.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading font-bold text-neutral-900 text-2xl text-center mb-10">Ils nous font confiance</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {partners.map((partner) => {
                const logoUrl = partner.logo?.url
                  ? partner.logo.url.startsWith("http")
                    ? partner.logo.url
                    : strapiUrl + partner.logo.url
                  : null;

                const content = (
                  <div className="bg-white rounded-2xl border border-neutral-100 hover:border-primary-200 hover:shadow-md transition-all h-full flex flex-col items-center justify-center gap-2 p-5 text-center">
                    {logoUrl ? (
                      <Image src={logoUrl} alt={partner.name} width={120} height={60} className="h-12 w-auto object-contain" />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center">
                        <span className="text-primary-400 font-bold text-lg">{partner.name[0]}</span>
                      </div>
                    )}
                    <span className="text-neutral-700 text-sm font-semibold">{partner.name}</span>
                    {partner.description && (
                      <span className="text-neutral-400 text-xs leading-snug line-clamp-2">{partner.description}</span>
                    )}
                    {partner.website && (
                      <span className="inline-flex items-center gap-1 text-primary-600 text-[11px] font-medium mt-1">
                        Visiter le site<ExternalLink className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                );

                return partner.website ? (
                  <a key={partner.id} href={partner.website} target="_blank" rel="noopener noreferrer">{content}</a>
                ) : (
                  <div key={partner.id}>{content}</div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white border-y border-neutral-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-neutral-900 text-2xl md:text-3xl mb-3">Pourquoi devenir partenaire ?</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">Un partenariat avec Help Funds, c est rejoindre une mission concrete et mesurable.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 text-center">
                <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <b.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-neutral-900 text-sm mb-2">{b.title}</h3>
                <p className="text-neutral-500 text-xs leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading font-bold text-neutral-900 text-2xl md:text-3xl mb-3">Devenir partenaire</h2>
            <p className="text-neutral-500">Remplissez ce formulaire, notre equipe vous recontactera sous peu.</p>
          </div>
          <PartnershipForm />
        </div>
      </section>
    </main>
  );
}