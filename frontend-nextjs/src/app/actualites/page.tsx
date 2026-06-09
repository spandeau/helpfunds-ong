import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import { ArrowLeft, Calendar, MapPin, Camera, BookOpen, Share2, Heart, Clock, Tag } from "lucide-react";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  return {
    title: article ? `${article.title} — Help Funds` : "Actualites — Help Funds",
    description: article?.excerpt || "",
  };
}

const TYPE_CONFIG = {
  article: { label: "Article", icon: BookOpen, color: "bg-primary-100 text-primary-700" },
  evenement: { label: "Evenement", icon: Calendar, color: "bg-secondary-100 text-secondary-700" },
  photo: { label: "Galerie photos", icon: Camera, color: "bg-amber-100 text-amber-700" },
};

export default async function ActualiteDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  const config = TYPE_CONFIG[article.type] || TYPE_CONFIG.article;
  const Icon = config.icon;
  const readTime = Math.max(2, Math.ceil(article.content.split(" ").length / 200));
  const allArticles = await getAllArticles();
  const related = allArticles.filter((a) => a.slug !== slug && a.category === article.category).slice(0, 3);

  return (
    <main>
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <Image src={article.coverImage} alt={article.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/actualites" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-5 transition-colors">
              <ArrowLeft className="w-4 h-4" />Retour aux actualites
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${config.color}`}>
                <Icon className="w-3.5 h-3.5" />{config.label}
              </span>
              {article.country && (
                <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  <MapPin className="w-3.5 h-3.5" />{article.country}
                </span>
              )}
            </div>
            <h1 className="font-heading font-bold text-white text-3xl md:text-4xl mb-4 leading-tight">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-white text-xs font-bold">{article.authorAvatar}</div>
                <span className="font-medium text-white/80">{article.author}</span>
              </div>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(article.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              {article.type === "article" && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{readTime} min de lecture</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {article.type === "evenement" && article.eventDate && (
                <div className="bg-secondary-50 border border-secondary-100 rounded-2xl p-5 flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-secondary-600 font-semibold uppercase tracking-wide">Date</p>
                      <p className="font-bold text-neutral-900">
                        {new Date(article.eventDate).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  {article.eventLocation && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-primary-600 font-semibold uppercase tracking-wide">Lieu</p>
                        <p className="font-bold text-neutral-900">{article.eventLocation}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-primary-50 border-l-4 border-primary-600 rounded-r-2xl p-5">
                <p className="text-primary-900 font-medium italic leading-relaxed">{article.excerpt}</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                {article.content.split("\n\n").map((para, i) => (
                  <p key={i} className="text-neutral-700 leading-relaxed mb-4 last:mb-0">{para}</p>
                ))}
              </div>

              {article.images && article.images.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                  <h2 className="font-heading font-bold text-neutral-900 text-xl mb-4 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-primary-600" />Galerie photos
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {article.images.map((img, i) => (
                      <div key={i} className="relative h-32 rounded-xl overflow-hidden">
                        <Image src={img} alt={`Photo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 50vw, 33vw" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {article.tags && article.tags.length > 0 && (
                <div className="bg-white rounded-2xl p-5 border border-neutral-100">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-4 h-4 text-neutral-400" />
                    {article.tags.map((tag) => (
                      <span key={tag} className="text-sm bg-neutral-100 hover:bg-primary-100 hover:text-primary-700 text-neutral-600 px-3 py-1 rounded-full transition-colors cursor-pointer">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1 space-y-5">
              <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm">
                <h3 className="font-heading font-bold text-neutral-900 mb-4">Auteur</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">{article.authorAvatar}</div>
                  <div>
                    <p className="font-bold text-neutral-900">{article.author}</p>
                    <p className="text-xs text-neutral-400">Contributeur Help Funds</p>
                  </div>
                </div>
              </div>

              {related.length > 0 && (
                <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm">
                  <h3 className="font-heading font-bold text-neutral-900 mb-4">A lire aussi</h3>
                  <div className="space-y-4">
                    {related.map((rel) => (
                      <Link key={rel.id} href={`/actualites/${rel.slug}`} className="flex gap-3 group">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={rel.coverImage} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="64px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-neutral-400 mb-1">
                            {new Date(rel.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                          </p>
                          <h4 className="text-sm font-bold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">{rel.title}</h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link href="/actualites" className="mt-4 block text-center text-sm text-primary-600 font-semibold hover:text-primary-700">
                    Voir toutes les actualites
                  </Link>
                </div>
              )}

              <div className="bg-gradient-to-br from-primary-900 to-primary-950 rounded-2xl p-5 text-white">
                <Heart className="w-7 h-7 text-secondary-400 fill-secondary-400 mb-3" />
                <h3 className="font-heading font-bold mb-2">Soutenez nos actions</h3>
                <p className="text-white/70 text-sm mb-4">Chaque don finance directement des projets comme celui-ci.</p>
                <Link href="/don" className="flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-3 rounded-xl transition-all text-sm">
                  <Heart className="w-4 h-4 fill-white" />Faire un don
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm">
                <h3 className="font-heading font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-primary-600" />Partager
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {["Facebook", "Twitter", "LinkedIn", "WhatsApp"].map((network) => (
                    <button key={network} className="py-2 bg-neutral-100 hover:bg-primary-100 hover:text-primary-700 rounded-xl text-xs font-semibold text-neutral-700 transition-all">
                      {network}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}