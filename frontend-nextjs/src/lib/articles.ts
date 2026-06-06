import { strapiClient } from "@/services/strapi";
import { BLOG_POSTS } from "@/lib/blog-data";
import type { BlogPost } from "@/lib/blog-data";

interface StrapiArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  type: "article" | "evenement" | "photo";
  featured: boolean;
  country?: string;
  tags?: string[];
  eventDate?: string;
  eventLocation?: string;
  publishedAt: string;
  coverImage?: { url: string };
  images?: { url: string }[];
  author?: { name: string };
}

function strapiArticleToBlogPost(a: StrapiArticle): BlogPost {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  return {
    id: a.id,
    slug: a.slug,
    type: a.type || "article",
    title: a.title,
    excerpt: a.excerpt,
    content: a.content,
    coverImage: a.coverImage?.url
      ? a.coverImage.url.startsWith("http")
        ? a.coverImage.url
        : `${STRAPI_URL}${a.coverImage.url}`
      : "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
    images: a.images?.map((img) =>
      img.url.startsWith("http") ? img.url : `${STRAPI_URL}${img.url}`
    ),
    author: a.author?.name || "Help Funds",
    authorAvatar: (a.author?.name || "HF").substring(0, 2).toUpperCase(),
    publishedAt: a.publishedAt,
    category: "article",
    country: a.country,
    tags: a.tags || [],
    featured: a.featured || false,
    eventDate: a.eventDate,
    eventLocation: a.eventLocation,
  };
}

export async function getAllArticles(): Promise<BlogPost[]> {
  try {
    const result = await strapiClient.fetch<{ data: StrapiArticle[] }>(
      "/articles?populate=coverImage,images,author&sort=publishedAt:desc&pagination[pageSize]=50"
    );
    if (result?.data && result.data.length > 0) {
      console.log(`[Articles] ${result.data.length} articles depuis Strapi`);
      return result.data.map(strapiArticleToBlogPost);
    }
  } catch (error) {
    console.warn("[Articles] Fallback blog-data utilise", error);
  }
  return BLOG_POSTS;
}

export async function getArticleBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const result = await strapiClient.fetch<{ data: StrapiArticle[] }>(
      `/articles?filters[slug][$eq]=${slug}&populate=coverImage,images,author`
    );
    if (result?.data && result.data.length > 0) {
      return strapiArticleToBlogPost(result.data[0]);
    }
  } catch (error) {
    console.warn(`[Articles] Fallback pour slug ${slug}`, error);
  }
  return BLOG_POSTS.find((p) => p.slug === slug) || null;
}