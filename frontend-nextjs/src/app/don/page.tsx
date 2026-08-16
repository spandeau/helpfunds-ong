import DonationForm from "@/components/sections/DonationForm";

export const metadata = {
  title: "Faire un don — Help Funds",
  description: "Soutenez nos projets humanitaires. Chaque don compte.",
};

interface CampaignInfo {
  slug: string;
  title: string;
  goalAmount: number;
  raisedAmount: number;
}

async function getCampaignBySlug(slug: string): Promise<CampaignInfo | null> {
  try {
    const strapiUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const response = await fetch(
      strapiUrl + "/api/donation-campaigns?filters[slug][$eq]=" + encodeURIComponent(slug)
    );
    if (!response.ok) return null;
    const result = (await response.json()) as { data: CampaignInfo[] };
    return result?.data?.[0] || null;
  } catch {
    return null;
  }
}

export default async function DonPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const rawCampaign = params.campaign;
  const campaignSlug = Array.isArray(rawCampaign) ? rawCampaign[0] : rawCampaign;

  const campaign = campaignSlug ? await getCampaignBySlug(campaignSlug) : null;

  return <DonationForm campaign={campaign} />;
}