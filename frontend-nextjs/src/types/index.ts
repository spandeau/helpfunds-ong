export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  country: string;
  text: string;
  featured: boolean;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  slug: string;
  category: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface DonationFormData {
  amount: number | string;
  donorFirstName: string;
  donorLastName: string;
  donorEmail: string;
  message?: string;
  anonymous: boolean;
  projectId?: number;
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface StrapiResponse<T> {
  data: StrapiData<T> | StrapiData<T>[];
  meta: StrapiMeta;
}

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "donate"
  | "outline"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

export type BadgeVariant = "primary" | "success" | "accent" | "neutral";