import { strapiClient } from "@/services/strapi";

export interface StrapiSlide {
  id: number;
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  image?: { url: string; alternativeText?: string };
  statValue?: string;
  statLabel?: string;
  order?: number;
}

export interface StrapiStat {
  id: number;
  value: string;
  label: string;
  icon?: string;
  order?: number;
}

export interface StrapiTestimonial {
  id: number;
  name: string;
  role?: string;
  text: string;
  avatar?: string;
  featured?: boolean;
}

export interface StrapiPartner {
  id: number;
  name: string;
  website?: string;
  logo?: { url: string; alternativeText?: string };
  order?: number;
}

export interface StrapiGlobal {
  id: number;
  siteName?: string;
  siteDescription?: string;
  urgencyBannerText?: string;
  urgencyBannerActive?: boolean;
}

export async function getSlides(): Promise<StrapiSlide[] | null> {
  return strapiClient.getMany<StrapiSlide>(
    "sliders",
    "populate=image&sort=order:asc"
  );
}

export async function getStats(): Promise<StrapiStat[] | null> {
  return strapiClient.getMany<StrapiStat>(
    "impact-stats",
    "sort=order:asc"
  );
}

export async function getTestimonials(): Promise<StrapiTestimonial[] | null> {
  return strapiClient.getMany<StrapiTestimonial>(
    "testimonials",
    "populate=avatar&filters[featured][$eq]=true"
  );
}

export async function getPartners(): Promise<StrapiPartner[] | null> {
  return strapiClient.getMany<StrapiPartner>(
    "partners",
    "populate=logo&sort=order:asc"
  );
}

export async function getGlobal(): Promise<StrapiGlobal | null> {
  return strapiClient.getOne<StrapiGlobal>("global");
}