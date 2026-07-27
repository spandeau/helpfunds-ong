import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Mail, Heart, Shield, Target, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Notre Equipe — Help Funds",
  description: "Decouvrez l equipe passionnee qui porte les valeurs de Help Funds chaque jour.",
};

interface TeamMember {
  id: number;
  name: string;
  slug: string;
  role: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  order: number;
  department?: string;
  active?: boolean;
  photo?: { url: string };
}

const DEPT_LABELS: Record<string, string> = {
  direction: "Direction",
  terrain: "Terrain",
  communication: "Communication",
  finance: "Finance",
  technique: "Technique",
};

const FALLBACK_MEMBERS: TeamMember[] = [
  { id: 1, name: "Marie Kofi", slug: "marie-kofi", role: "Directrice Generale", bio: "Pionniere du developpement durable en Afrique de l Ouest avec plus de 15 ans d experience.", email: "helpfunds17@gmail.com", linkedin: "https://linkedin.com", order: 1, department: "direction" },
  { id: 2, name: "Jean-Baptiste Mensah", slug: "jean-baptiste-mensah", role: "Directeur des Operations", bio: "Expert en logistique humanitaire et coordination de projets multi-pays.", email: "helpfunds17@gmail.com", linkedin: "https://linkedin.com", order: 2, department: "direction" },
  { id: 3, name: "Amina Diallo", slug: "amina-diallo", role: "Responsable Communication", bio: "Specialiste en communication digitale et fundraising.", email: "helpfunds17@gmail.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com", order: 3, department: "communication" },
  { id: 4, name: "Samuel Tetteh", slug: "samuel-tetteh", role: "Responsable Financier", bio: "Comptable certifie avec une expertise en gestion de fonds pour organisations a but non lucratif.", email: "helpfunds17@gmail.com", linkedin: "https://linkedin.com", order: 4, department: "finance" },
  { id: 5, name: "Fatou Diarra", slug: "fatou-diarra", role: "Coordinatrice Terrain", bio: "Coordinatrice de projets humanitaires en zones rurales depuis 8 ans.", email: "helpfunds17@gmail.com", order: 5, department: "terrain" },
  { id: 6, name: "Kwame Asante", slug: "kwame-asante", role: "Responsable Technique", bio: "Ingenieur specialise dans les infrastructures d eau et d assainissement.", email: "helpfunds17@gmail.com", linkedin: "https://linkedin.com", order: 6, department: "technique" },
];

async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const strapiUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const response = await fetch(strapiUrl + "/api/team-members?populate[photo]=true&sort=order:asc&pagination[pageSize]=50");
    if (!response.ok) {
      throw new Error("Strapi status " + response.status);
    }
    const result = (await response.json()) as { data: TeamMember[] };
    if (result?.data && result.data.length > 0) {
      return result.data.filter((m) => m.active !== false);
    }
  } catch (error) {
    console.warn("[Equipe] Fallback utilise", error);
  }
  return FALLBACK_MEMBERS;
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

const SOCIAL_ICONS: Record<string, { bg: string; path: string }> = {
  linkedin: { bg: "#0A66C2", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  twitter: { bg: "#000000", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  facebook: { bg: "#1877F2", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  instagram: { bg: "#E1306C", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  whatsapp: { bg: "#25D366", path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" },
};

function SocialIcon({ type, href }: { type: keyof typeof SOCIAL_ICONS; href: string }) {
  const icon = SOCIAL_ICONS[type];
  const finalHref = type === "whatsapp" && !href.startsWith("http") ? "https://wa.me/" + href.replace(/\D/g, "") : href;
  return (<a href={finalHref} target="_blank" rel="noopener noreferrer" aria-label={type} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ backgroundColor: icon.bg }}>
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
        <path d={icon.path} />
      </svg>
    </a>
  );
}

function MemberCard({ member, strapiUrl }: { member: TeamMember; strapiUrl: string }) {
  const photoUrl = member.photo?.url
    ? member.photo.url.startsWith("http")
      ? member.photo.url
      : strapiUrl + member.photo.url
    : null;

  return (
    <div className="group bg-white rounded-2xl p-6 border border-neutral-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 text-center">
      <Link href={"/equipe/" + member.slug} className="block">
        <div className="relative mx-auto mb-4 w-20 h-20 rounded-full overflow-hidden ring-2 ring-neutral-100 group-hover:ring-primary-200 transition-all">
          {photoUrl ? (
            <Image src={photoUrl} alt={member.name} fill className="object-cover" sizes="80px" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <span className="text-xl font-bold text-white">{getInitials(member.name)}</span>
            </div>
          )}
        </div>
        <h3 className="font-heading font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">{member.name}</h3>
        <p className="text-primary-600 text-sm font-medium mt-1">{member.role}</p>
        {member.department && (
          <span className="inline-block mt-2 text-xs bg-neutral-100 text-neutral-500 px-2.5 py-0.5 rounded-full">
            {DEPT_LABELS[member.department] || member.department}
          </span>
        )}
        {member.bio && (
          <p className="mt-3 text-neutral-400 text-xs leading-relaxed line-clamp-3">{member.bio}</p>
        )}
      </Link>
      <div className="mt-4 flex items-center justify-center gap-2">
        {member.linkedin && <SocialIcon type="linkedin" href={member.linkedin} />}
        {member.twitter && <SocialIcon type="twitter" href={member.twitter} />}
        {member.facebook && <SocialIcon type="facebook" href={member.facebook} />}
        {member.instagram && <SocialIcon type="instagram" href={member.instagram} />}
        {member.whatsapp && <SocialIcon type="whatsapp" href={member.whatsapp} />}
        {member.email && (<a href={"mailto:" + member.email} aria-label="Email" className="w-8 h-8 rounded-lg flex items-center justify-center bg-neutral-700 transition-all hover:-translate-y-0.5 hover:shadow-md">
            <Mail className="w-3.5 h-3.5 text-white" />
          </a>
        )}
      </div>
    </div>
  );
}

export default async function EquipePage() {
  const members = await getTeamMembers();
  const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="bg-white border-b border-neutral-100 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Notre Equipe
            </span>
            <h1 className="font-heading font-bold text-neutral-900 text-4xl md:text-5xl leading-tight">
              Des personnes engagees
            </h1>
            <p className="mt-4 text-neutral-500 text-lg">
              Notre equipe pluridisciplinaire porte chaque jour les valeurs de Help Funds avec passion et conviction.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} strapiUrl={STRAPI_URL} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-neutral-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-neutral-900 text-2xl md:text-3xl mb-3">Nos valeurs</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">Les principes qui unissent notre equipe au quotidien sur le terrain.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { icon: Heart, title: "Humanite avant tout", color: "bg-red-50 text-red-600" },
              { icon: Shield, title: "Transparence totale", color: "bg-secondary-50 text-secondary-600" },
              { icon: Target, title: "Impact mesurable", color: "bg-primary-50 text-primary-600" },
              { icon: Users, title: "Partenariat local", color: "bg-purple-50 text-purple-600" },
            ].map((value) => (
              <div key={value.title} className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100 text-center hover:border-primary-200 hover:shadow-sm transition-all">
                <div className={`w-11 h-11 ${value.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <value.icon className="w-5 h-5" />
                </div>
                <p className="font-semibold text-neutral-800 text-sm">{value.title}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/valeurs" className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:underline">
              Voir toutes nos valeurs<ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-900 to-primary-950 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="font-heading font-bold text-white text-2xl md:text-3xl mb-3">
              Rejoignez notre equipe
            </h2>
            <p className="text-white/70 mb-6 max-w-lg mx-auto">
              Vous partagez nos valeurs ? Nous sommes toujours a la recherche de talents engages pour renforcer notre impact.
            </p>
            <a href={"mailto:helpfunds17@gmail.com?subject=Candidature Help Funds"} className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white px-8 py-3 rounded-full font-bold transition-colors">
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}