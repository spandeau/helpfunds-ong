const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: unknown;
}

export class StrapiClient {
  private baseUrl: string;
  private token: string;

  constructor(baseUrl: string = STRAPI_URL, token: string = STRAPI_TOKEN) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T | null> {
    try {
      const url = `${this.baseUrl}/api${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        console.warn(`[Strapi] Erreur ${response.status} pour ${endpoint}`);
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.warn(`[Strapi] Impossible de contacter Strapi: ${endpoint}`, error);
      return null;
    }
  }

  async getOne<T>(
    contentType: string,
    params: string = ""
  ): Promise<T | null> {
    const result = await this.fetch<StrapiResponse<T>>(
      `/${contentType}?${params}`
    );
    return result?.data ?? null;
  }

  async getMany<T>(
    contentType: string,
    params: string = ""
  ): Promise<T[] | null> {
    const result = await this.fetch<StrapiResponse<T[]>>(
      `/${contentType}?${params}`
    );
    return result?.data ?? null;
  }
}

export const strapiClient = new StrapiClient();