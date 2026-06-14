"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, BookOpen, Camera, Search, X } from "lucide-react";

interface BlogPost {
  id: number;
  slug: string;
  type: "article" | "evenement" | "photo";
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  images?: string[];
  author: string;
  authorAvatar: string;
  publishedAt: string;
  category: string;
  country?: string;
  tags?: string[];
  featured?: boolean;
  eventDate?: string;
  eventLocation?: string;
}

const TYPE_CONFIG = {
  article: { label: "Article", icon: BookOpen, color: "bg-primary-100 text-primary-700" },
  evenement: { label: "Evenement", icon: Calendar, color: "bg-secondary-100 text-secondary-700" },
  photo: { label: "Galerie", icon: Camera, color: "bg-amber-100 text-amber-700" },
} as const;

export default function ActualitesClient({ articles }: { articles: BlogPost[] }) {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState<string>("tous");

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchSearch =
        search === "" ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        (a.country && a.country.toLowerCase().includes(search.toLowerCase()));
      const matchType = activeType === "tous" || a.type === activeType;
      return matchSearch && matchType;
    });
  }, [articles, search, activeType]);

  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a.id !== featured?.id);
  const showGrid = search !== "" || activeType !== "tous";

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="bg-white border-b border-neutral-100 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Actualites
            </span>
            <h1 className="font-heading font-bold text-neutral-900 text-4xl md:text-5xl leading-tight">
              Nos dernieres nouvelles
            </h1>
            <p className="mt-4 text-neutral-500 text-lg">
              Articles, evenements et reportages photos sur nos actions dans le monde.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un article, un pays..."
                className="w-full pl-10 pr-10 py-2.5 bg-neutral-100 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              {["tous", "article", "evenement", "photo"].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeType === type ? "bg-primary-600 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {type === "tous" ? "Tous" : type === "article" ? "Articles" : type === "evenement" ? "Evenements" : "Galeries"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-neutral-400 text-lg">Aucun article trouve pour cette recherche.</p>
              <button
                onClick={() => { setSearch(""); setActiveType("tous"); }}
                className="mt-4 text-primary-600 font-semibold hover:underline"
              >
                Reinitialiser les filtres
              </button>
            </div>
          ) : (
            <>
              {featured && !showGrid && (
                <Link href={`/actualites/${featured.slug}`} className="group block mb-10">
                  <div className="bg-white rounded-3xl overflow-hidden border border-neutral-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 grid md:grid-cols-2">
                    <div className="relative h-64 md:h-auto min-h-[280px]">
                      <Image src={featured.coverImage} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" priority />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1 rounded-full">A la une</span>
                        {(() => {
                          const cfg = TYPE_CONFIG[featured.type] || TYPE_CONFIG.article;
                          const Icon = cfg.icon;
                          return (
                            <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${cfg.color}`}>
                              <Icon className="w-3 h-3" />{cfg.label}
                            </span>
                          );
                        })()}
                      </div>
                      <h2 className="font-heading font-bold text-neutral-900 text-2xl md:text-3xl leading-tight group-hover:text-primary-600 transition-colors mb-3">{featured.title}</h2>
                      <p className="text-neutral-500 leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
                      <div className="flex items-center gap-3 text-sm text-neutral-400">
                        <div className="w-7 h-7 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{featured.authorAvatar}</div>
                        <span className="font-medium text-neutral-600">{featured.author}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(featured.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(showGrid ? filtered : rest).map((article) => {
                  const cfg = TYPE_CONFIG[article.type] || TYPE_CONFIG.article;
                  const Icon = cfg.icon;
                  return (
                    <Link key={article.id} href={`/actualites/${article.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <Image src={article.coverImage} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${cfg.color}`}>
                            <Icon className="w-3 h-3" />{cfg.label}
                          </span>
                          {article.country && (
                            <span className="inline-flex items-center gap-1 bg-white/90 text-neutral-700 text-xs font-bold px-2.5 py-1 rounded-full">
                              <MapPin className="w-3 h-3" />{article.country}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h2 className="font-heading font-bold text-neutral-900 text-base leading-snug group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">{article.title}</h2>
                        <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">{article.excerpt}</p>
                        <div className="flex items-center gap-2 text-xs text-neutral-400 pt-3 border-t border-neutral-100">
                          <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0">{article.authorAvatar}</div>
                          <span>{article.author}</span>
                          <span>·</span>
                          <span>{new Date(article.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
