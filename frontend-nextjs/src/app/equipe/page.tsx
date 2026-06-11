import type { Metadata } from "next";
import Image from "next/image";
import { strapiClient } from "@/services/strapi";

export const metadata: Metadata = {
  title: "Notre Equipe — Help Funds",
  description: "Decouvrez l equipe passionnee qui porte les valeurs de Help Funds chaque jour.",
};

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  order: number;
  department?: string;
  photo?: { url: string };
}

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
  </svg>
);

const FALLBACK_MEMBERS: TeamMember[] = [
  { id: 1, name: "Marie Kofi", role: "Directrice Generale", bio: "Pionniere du developpement durable en Afrique de l Ouest avec plus de 15 ans d experience dans le secteur humanitaire.", email: "helpfunds17@gmail.com", linkedin: "https://linkedin.com", order: 1, department: "Direction" },
  { id: 2, name: "Jean-Baptiste Mensah", role: "Directeur des Operations", bio: "Expert en logistique humanitaire et coordination de projets multi-pays.", email: "helpfunds17@gmail.com", linkedin: "https://linkedin.com", order: 2, department: "Direction" },
  { id: 3, name: "Amina Diallo", role: "Responsable Communication", bio: "Specialiste en communication digitale et fundraising. Passionnee par la narration d impact social.", email: "helpfunds17@gmail.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com", order: 3, department: "Communication" },
  { id: 4, name: "Samuel Tetteh", role: "Responsable Financier", bio: "Comptable certifie avec une expertise en gestion de fonds pour organisations a but non lucratif.", email: "helpfunds17@gmail.com", linkedin: "https://linkedin.com", order: 4, department: "Finance" },
  { id: 5, name: "Fatou Diarra", role: "Coordinatrice Terrain", bio: "Coordinatrice de projets humanitaires en zones rurales depuis 8 ans.", email: "helpfunds17@gmail.com", order: 5, department: "Terrain" },
  { id: 6, name: "Kwame Asante", role: "Responsable Technique", bio: "Ingenieur specialise dans les infrastructures d eau et d assainissement.", email: "helpfunds17@gmail.com", linkedin: "https://linkedin.com", order: 6, department: "Technique" },
];

async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const result = await strapiClient.fetch<{ data: TeamMember[] }>(
      "/team-members?populate[photo]=true&sort=order:asc&pagination[pageSize]=50"
    );
    if (result?.data && result.data.length > 0) return result.data;
  } catch (error) {
    console.warn("[Equipe] Fallback utilise", error);
  }
  return FALLBACK_MEMBERS;
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export default async function EquipePage() {
  const members = await getTeamMembers();
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

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
            {members.map((member) => {
              const photoUrl = member.photo?.url
                ? member.photo.url.startsWith("http") ? member.photo.url : `${STRAPI_URL}${member.photo.url}`
                : null;
              return (
                <div key={member.id} className="group bg-white rounded-2xl p-6 border border-neutral-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 text-center">
                  <div className="relative mx-auto mb-4 w-20 h-20 rounded-full overflow-hidden ring-2 ring-neutral-100 group-hover:ring-primary-200 transition-all">
                    {photoUrl ? (
                      <Image src={photoUrl} alt={member.name} fill className="object-cover" sizes="80px" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{getInitials(member.name)}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-neutral-900">{member.name}</h3>
                  <p className="text-primary-600 text-sm font-medium mt-1">{member.role}</p>
                  {member.department && (
                    <span className="inline-block mt-2 text-xs bg-neutral-100 text-neutral-500 px-2.5 py-0.5 rounded-full">
                      {member.department}
                    </span>
                  )}
                  {member.bio && (
                    <p className="mt-3 text-neutral-400 text-xs leading-relaxed line-clamp-3">{member.bio}</p>
                  )}
                  <div className="mt-4 flex items-center justify-center gap-2">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" aria-label={`LinkedIn de ${member.name}`}>
                        <LinkedinIcon />
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors" aria-label={`X de ${member.name}`}>
                        <TwitterIcon />
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="p-2 text-neutral-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" aria-label={`Email de ${member.name}`}>
                        <MailIcon />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-900 to-primary-950 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="font-heading font-bold text-white text-2xl md:text-3xl mb-3">Rejoignez notre equipe</h2>
            <p className="text-white/70 mb-6 max-w-lg mx-auto">
              Vous partagez nos valeurs ? Nous sommes toujours a la recherche de talents engages pour renforcer notre impact.
            </p>
            <a href="mailto:helpfunds17@gmail.com?subject=Candidature spontanee — Help Funds" className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white px-8 py-3 rounded-full font-bold transition-colors">
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}