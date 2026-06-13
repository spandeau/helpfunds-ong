import { strapiClient } from "@/services/strapi";
import { PROJECTS } from "@/lib/projects-data";
import type { Project } from "@/lib/projects-data";

interface StrapiProject {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  description?: string;
  category: string;
  country: string;
  region?: string;
  status: "en-cours" | "urgent" | "termine" | "nouveau";
  featured: boolean;
  goalAmount: number;
  raisedAmount: number;
  beneficiaries: number;
  beneficiariesTarget: number;
  startDate?: string;
  endDate?: string;
  team?: number;
  villages?: number;
  objectives?: string[];
  results?: string[];
  remaining?: string[];
  milestones?: unknown[];
  updates?: unknown[];
  budgetBreakdown?: unknown[];
  testimonials?: unknown[];
  coverImage?: { url: string };
  gallery?: { url: string }[];
}

function toUrl(url?: string): string {
  if (!url) return "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80";
  const BASE = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  return url.startsWith("http") ? url : `${BASE}${url}`;
}

function strapiProjectToProject(p: StrapiProject): Project {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    shortDescription: p.shortDescription,
    description: p.description || p.shortDescription,
    category: p.category || "sante",
    country: p.country || "",
    region: p.region || "",
    status: p.status || "nouveau",
    featured: p.featured || false,
    goalAmount: p.goalAmount || 0,
    raisedAmount: p.raisedAmount || 0,
    beneficiaries: p.beneficiaries || 0,
    beneficiariesTarget: p.beneficiariesTarget || p.beneficiaries || 0,
    images: [
      toUrl(p.coverImage?.url),
      ...(p.gallery?.map((g) => toUrl(g.url)) || []),
    ],
    startDate: p.startDate || new Date().toISOString().split("T")[0],
    endDate: p.endDate,
    objectives: p.objectives || [],
    results: p.results || [],
    remaining: p.remaining || [],
    milestones: (p.milestones as Project["milestones"]) || [],
    updates: (p.updates as Project["updates"]) || [],
    budgetBreakdown: (p.budgetBreakdown as Project["budgetBreakdown"]) || [],
    testimonials: (p.testimonials as Project["testimonials"]) || [],
    team: p.team || 0,
    villages: p.villages || 0,
  };
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const result = await strapiClient.fetch<{ data: StrapiProject[] }>(
      "/projects?populate[coverImage]=true&populate[gallery]=true&sort=createdAt:desc&pagination[pageSize]=50"
    );
    if (result?.data && result.data.length > 0) {
      console.log(`[Projects] ${result.data.length} projets depuis Strapi`);
      return result.data.map(strapiProjectToProject);
    }
  } catch (error) {
    console.warn("[Projects] Fallback utilise", error);
  }
  return PROJECTS;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const result = await strapiClient.fetch<{ data: StrapiProject[] }>(
      `/projects?filters[slug][$eq]=${slug}&populate[coverImage]=true&populate[gallery]=true`
    );
    if (result?.data && result.data.length > 0) {
      return strapiProjectToProject(result.data[0]);
    }
  } catch (error) {
    console.warn(`[Projects] Fallback pour slug ${slug}`, error);
  }
  return PROJECTS.find((p) => p.slug === slug) || null;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const result = await strapiClient.fetch<{ data: StrapiProject[] }>(
      "/projects?filters[featured][$eq]=true&populate[coverImage]=true&pagination[pageSize]=6"
    );
    if (result?.data && result.data.length > 0) {
      return result.data.map(strapiProjectToProject);
    }
  } catch (error) {
    console.warn("[Projects] Fallback featured", error);
  }
  return PROJECTS.filter((p) => p.featured);
}