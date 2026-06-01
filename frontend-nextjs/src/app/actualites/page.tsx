"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";


import { motion } from "framer-motion";
import { Search, Calendar, MapPin, Camera, BookOpen, Star, ArrowRight, X } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES, BLOG_THEMES, BLOG_COUNTRIES } from "@/lib/blog-data";

const TYPE_CONFIG = {
  article: { label: "Article", icon: BookOpen, color: "bg-primary-100 text-primary-700" },
  evenement: { label: "Evenement", icon: Calendar, color: "bg-secondary-100 text-secondary-700" },
  photo: { label: "Galerie", icon: Camera, color: "bg-accent-100 text-accent-700" },
};

export default function ActualitesPage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("tous");
  const [selectedTheme, setSelectedTheme] = useState("tous");
  const [selectedCountry, setSelectedCountry] = useState("tous");

  const filtered = useMemo(() => {
    return BLOG_POSTS.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        (p.country?.toLowerCase().includes(search.toLowerCase()) ?? false);
      const matchType = selectedType === "tous" || p.type === selectedType;
      const matchTheme = selectedTheme === "tous" || p.category === selectedTheme;
      const matchCountry = selectedCountry === "tous" || p.country === selectedCountry;
      return matchSearch && matchType && matchTheme && matchCountry;
    });
  }, [search, selectedType, selectedTheme, selectedCountry]);

  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);
  const hasFilters = search || selectedType !== "tous" || selectedTheme !== "tous" || selectedCountry !== "tous";

  const resetFilters = () => {
    setSearch("");
    setSelectedType("tous");
    setSelectedTheme("tous");
    setSelectedCountry("tous");
  };

  return (
    <>
      
      <main>

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pt-32 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Articles, evenements et galeries photos
            </div>
            <h1 className="font-heading font-bold text-white mb-4">
              Nos <span className="text-secondary-400">actualites</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Suivez nos actions sur le terrain, nos evenements et
              decouvrez l impact concret de vos dons a travers nos reportages.
            </p>

            {/* Stats rapides */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {[
                { value: BLOG_POSTS.filter(p => p.type === "article").length + "+", label: "Articles" },
                { value: BLOG_POSTS.filter(p => p.type === "evenement").length + "+", label: "Evenements" },
                { value: BLOG_POSTS.filter(p => p.type === "photo").length + "+", label: "Galeries" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur rounded-2xl px-6 py-3 border border-white/20 text-center">
                  <div className="text-2xl font-heading font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filtres sticky */}
        <div className="bg-white border-b border-neutral-100 sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row gap-3">

              {/* Recherche */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Rechercher un article, un pays, un theme..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X className="w-4 h-4 text-neutral-400" />
                  </button>
                )}
              </div>

              {/* Filtres */}
              <div className="flex flex-wrap gap-2">
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm bg-white">
                  {BLOG_CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>

                <select value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm bg-white">
                  {BLOG_THEMES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>

                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm bg-white">
                  {BLOG_COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c === "tous" ? "Tous les pays" : c}</option>
                  ))}
                </select>

                {hasFilters && (
                  <button onClick={resetFilters}
                    className="px-3 py-2.5 rounded-xl border-2 border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <p className="text-sm text-neutral-500 mt-2">
              <span className="font-bold text-neutral-900">{filtered.length}</span> publication{filtered.length > 1 ? "s" : ""} trouvee{filtered.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Contenu */}
        <section className="py-12 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* A la une */}
            {featured.length > 0 && (
              <div className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <h2 className="text-xl font-heading font-bold text-neutral-900">A la une</h2>
                </div>

                {/* Premier article en grand */}
                {featured[0] && (
                  <Link href={`/actualites/${featured[0].slug}`} className="block mb-6 group">
                    <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="relative h-64 md:h-full min-h-[300px]">
                          <Image src={featured[0].coverImage} alt={featured[0].title} fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="50vw" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                          <div className="absolute top-4 left-4">
                            {(() => {
                              const config = TYPE_CONFIG[featured[0].type];
                              const Icon = config.icon;
                              return (
                                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${config.color}`}>
                                  <Icon className="w-3.5 h-3.5" />
                                  {config.label}
                                </span>
                              );
                            })()}
                          </div>
                        </div>
                        <div className="p-8 flex flex-col justify-center">
                          <div className="flex items-center gap-3 text-xs text-neutral-400 mb-3">
                            <span>{new Date(featured[0].publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
                            {featured[0].country && (
                              <>
                                <span>Â·</span>
                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{featured[0].country}</span>
                              </>
                            )}
                          </div>
                          <h2 className="font-heading font-bold text-neutral-900 text-2xl mb-3 leading-tight group-hover:text-primary-600 transition-colors">
                            {featured[0].title}
                          </h2>
                          <p className="text-neutral-500 leading-relaxed mb-5">{featured[0].excerpt}</p>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {featured[0].authorAvatar}
                            </div>
                            <span className="text-sm font-medium text-neutral-700">{featured[0].author}</span>
                          </div>
                          <div className="mt-5 flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all">
                            Lire l article <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Autres Ã  la une */}
                {featured.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featured.slice(1).map((post, index) => (
                      <BlogCard key={post.id} post={post} index={index} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Toutes les publications */}
            {regular.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-neutral-300 rounded-full" />
                  <h2 className="text-xl font-heading font-bold text-neutral-900">
                    {hasFilters ? "Resultats" : "Toutes les publications"}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regular.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              </div>
            )}

            {/* Aucun rÃ©sultat */}
            {filtered.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-neutral-100">
                <div className="text-5xl mb-4">ðŸ“°</div>
                <h3 className="font-heading font-bold text-xl mb-2">Aucune publication trouvee</h3>
                <p className="text-neutral-500 mb-6">Essayez de modifier vos criteres de recherche.</p>
                <button onClick={resetFilters} className="bg-primary-600 text-white font-semibold px-6 py-3 rounded-xl">
                  Voir toutes les publications
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      
    </>
  );
}

function BlogCard({ post, index }: { post: typeof BLOG_POSTS[0]; index: number }) {
  const config = TYPE_CONFIG[post.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link href={`/actualites/${post.slug}`} className="block group">
        <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">

          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <Image src={post.coverImage} alt={post.title} fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            <div className="absolute top-3 left-3">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${config.color}`}>
                <Icon className="w-3 h-3" />
                {config.label}
              </span>
            </div>

            {post.type === "photo" && post.images && (
              <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Camera className="w-3 h-3" />
                {post.images.length} photos
              </div>
            )}

            {post.type === "evenement" && post.eventDate && (
              <div className="absolute bottom-3 left-3 bg-secondary-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.eventDate).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
              </div>
            )}
          </div>

          {/* Contenu */}
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
              <span>{new Date(post.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}</span>
              {post.country && (
                <>
                  <span>Â·</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{post.country}</span>
                </>
              )}
            </div>

            <h3 className="font-heading font-bold text-neutral-900 text-base mb-2 leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed mb-4 flex-1 line-clamp-2">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-primary-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                  {post.authorAvatar}
                </div>
                <span className="text-xs font-medium text-neutral-600">{post.author}</span>
              </div>
              <div className="flex items-center gap-1 text-primary-600 text-xs font-semibold group-hover:gap-2 transition-all">
                Lire <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}