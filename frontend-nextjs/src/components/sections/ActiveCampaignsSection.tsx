import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight } from "lucide-react";

interface Campaign {
  id: number;
  title: string;
  slug: string;
  description?: string;
  goalAmount: number;
  raisedAmount: number;
  coverImage?: { url: string };
}

async function getActiveCampaigns(): Promise<Campaign[]> {
  try {
    const strapiUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const response = await fetch(
      strapiUrl + "/api/donation-campaigns?filters[campaignStatus][$eq]=active&populate[coverImage]=true&sort=createdAt:desc&pagination[pageSize]=3"
    );
    if (!response.ok) throw new Error("Strapi status " + response.status);
    const result = (await response.json()) as { data: Campaign[] };
    return result?.data || [];
  } catch (error) {
    console.warn("[ActiveCampaigns] Erreur fetch", error);
    return [];
  }
}

export default async function ActiveCampaignsSection() {
  const campaigns = await getActiveCampaigns();
  if (campaigns.length === 0) return null;

  const strapiUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  return (
    <section className="py-16 bg-neutral-50 border-t border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="section-label">Cagnottes actives</span>
          <h2 className="font-heading font-bold text-neutral-900 text-2xl md:text-3xl">
            Des collectes en cours, votre don compte maintenant
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns.map((campaign) => {
            const progress = campaign.goalAmount > 0
              ? Math.min(Math.round((campaign.raisedAmount / campaign.goalAmount) * 100), 100)
              : 0;
            const imageUrl = campaign.coverImage?.url
              ? campaign.coverImage.url.startsWith("http")
                ? campaign.coverImage.url
                : strapiUrl + campaign.coverImage.url
              : null;

            return (
              <div key={campaign.id} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-md transition-all">
                {imageUrl && (
                  <div className="relative h-36 w-full">
                    <Image src={imageUrl} alt={campaign.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-heading font-bold text-neutral-900 text-base mb-2 line-clamp-2">{campaign.title}</h3>
                  {campaign.description && (
                    <p className="text-neutral-400 text-xs mb-4 line-clamp-2">{campaign.description}</p>
                  )}
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-bold text-primary-600">{campaign.raisedAmount}€</span>
                    <span className="text-sm font-bold text-neutral-700">{progress}%</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <Link href={`/don?campaign=${campaign.slug}`}
                    className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-all">
                    <Heart className="w-4 h-4 fill-white" />Soutenir cette cagnotte
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link href="/projets" className="inline-flex items-center gap-2 text-neutral-500 hover:text-primary-600 text-sm transition-colors">
            Voir tous nos projets<ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}