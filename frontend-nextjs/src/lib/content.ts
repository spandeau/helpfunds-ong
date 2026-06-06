import { getSlides, getStats, getTestimonials } from "@/lib/api";
import { FALLBACK_SLIDES, FALLBACK_STATS, FALLBACK_TESTIMONIALS } from "@/lib/fallbacks";
import type { StrapiSlide, StrapiStat, StrapiTestimonial } from "@/lib/api";

export async function getHeroSlides(): Promise<StrapiSlide[]> {
  try {
    const strapiSlides = await getSlides();
    if (strapiSlides && strapiSlides.length > 0) {
      return strapiSlides;
    }
  } catch {
    console.warn("[Content] Fallback slides utilise");
  }
  return FALLBACK_SLIDES;
}

export async function getHomeStats(): Promise<StrapiStat[]> {
  try {
    const strapiStats = await getStats();
    if (strapiStats && strapiStats.length > 0) {
      return strapiStats;
    }
  } catch {
    console.warn("[Content] Fallback stats utilise");
  }
  return FALLBACK_STATS;
}

export async function getHomeTestimonials(): Promise<StrapiTestimonial[]> {
  try {
    const strapiTestimonials = await getTestimonials();
    if (strapiTestimonials && strapiTestimonials.length > 0) {
      return strapiTestimonials;
    }
  } catch {
    console.warn("[Content] Fallback testimonials utilise");
  }
  return FALLBACK_TESTIMONIALS;
}

export function getStrapiImageUrl(imageData?: { url?: string }): string | null {
  if (!imageData?.url) return null;
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  if (imageData.url.startsWith("http")) return imageData.url;
  return `${STRAPI_URL}${imageData.url}`;
}