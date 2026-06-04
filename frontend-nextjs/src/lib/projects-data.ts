export interface ProjectMilestone {
  date: string;
  title: string;
  description: string;
  done: boolean;
}

export interface ProjectUpdate {
  date: string;
  title: string;
  content: string;
}

export interface ProjectTestimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface BudgetItem {
  label: string;
  percentage: number;
  color: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  country: string;
  region: string;
  status: "en-cours" | "urgent" | "termine" | "nouveau";
  featured: boolean;
  goalAmount: number;
  raisedAmount: number;
  beneficiaries: number;
  beneficiariesTarget: number;
  images: string[];
  startDate: string;
  endDate?: string;
  objectives: string[];
  results: string[];
  remaining: string[];
  milestones: ProjectMilestone[];
  updates: ProjectUpdate[];
  testimonials: ProjectTestimonial[];
  budgetBreakdown: BudgetItem[];
  team: number;
  villages: number;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "vaccination-infantile-togo",
    title: "Campagne de vaccination infantile",
    shortDescription: "Vacciner des enfants dans des zones rurales defavorisees du nord Togo.",
    description: "Depuis le lancement du projet, notre equipe intervient dans plusieurs villages du nord du Togo afin d ameliorer l acces aux vaccins essentiels et reduire les risques sanitaires pour les enfants de moins de 5 ans.\n\nNous travaillons avec les autorites sanitaires locales et les chefs de village pour organiser des campagnes de vaccination regulieres. Chaque session mobilise des medecins benevoles, des infirmiers locaux et des agents communautaires formes par nos equipes.\n\nGrace aux dons collectes, nous avons pu acheter les vaccins, le materiel medical et financer le transport des equipes dans des zones difficiles d acces.",
    category: "sante",
    country: "Togo",
    region: "Nord",
    status: "urgent",
    featured: true,
    goalAmount: 50000,
    raisedAmount: 36000,
    beneficiaries: 1240,
    beneficiariesTarget: 2500,
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    ],
    startDate: "2024-03-01",
    objectives: [
      "Vacciner 2 500 enfants contre rougeole et polio",
      "Couvrir 19 villages isoles",
      "Former 15 agents de sante communautaires",
      "Realiser 30 campagnes de vaccination",
      "Distribuer 2 500 carnets de sante",
    ],
    results: [
      "1 240 enfants vaccines",
      "12 villages couverts",
      "8 equipes mobilisees",
      "15 campagnes realisees",
      "1 240 carnets de sante distribues",
    ],
    remaining: [
      "1 260 enfants a vacciner",
      "7 villages restants a couvrir",
      "Achat de materiel medical supplementaire",
      "15 campagnes supplementaires a organiser",
    ],
    milestones: [
      { date: "Mars 2024", title: "Lancement du projet", description: "Premiere campagne dans 3 villages pilotes.", done: true },
      { date: "Avril 2024", title: "Extension du programme", description: "Couverture etendue a 9 villages supplementaires.", done: true },
      { date: "Mai 2024", title: "Formation des agents", description: "Formation de 8 agents de sante locaux.", done: true },
      { date: "Juin 2024", title: "Phase 2", description: "Lancement de la deuxieme phase.", done: false },
      { date: "Aout 2024", title: "Objectif final", description: "Atteindre les 2 500 enfants vaccines.", done: false },
    ],
    updates: [
      { date: "15 Mai 2024", title: "Bilan a mi-parcours", content: "Nous avons depasse notre objectif intermediaire avec 1 240 enfants vaccines. Les equipes terrain font un travail remarquable." },
      { date: "1 Mars 2024", title: "C est parti !", content: "Le projet est officiellement lance. La premiere campagne dans le village de Kande s est parfaitement deroulee avec 85 enfants vaccines." },
    ],
    testimonials: [
      { name: "Ama Koffi", role: "Mere de famille, village de Kande", text: "Avant cette aide, nous devions parcourir 45 kilometres pour acceder aux vaccins. Maintenant, les medecins viennent a nous. Mes trois enfants sont enfin proteges.", avatar: "AK" },
      { name: "Dr. Kodjo Mensah", role: "Medecin coordinateur", text: "Ce projet change vraiment les choses. On voit des enfants qui n avaient jamais ete vaccines. La confiance des familles grandit a chaque campagne.", avatar: "KM" },
    ],
    budgetBreakdown: [
      { label: "Vaccins et medicaments", percentage: 40, color: "#2563eb" },
      { label: "Transport et logistique", percentage: 25, color: "#16a34a" },
      { label: "Personnel terrain", percentage: 20, color: "#f97316" },
      { label: "Formation", percentage: 10, color: "#8b5cf6" },
      { label: "Administration", percentage: 5, color: "#94a3b8" },
    ],
    team: 8,
    villages: 12,
  },
  {
    id: 2,
    slug: "ecole-primaire-kano",
    title: "Ecole primaire de Kano",
    shortDescription: "Construction et equipement d une ecole primaire pour 300 enfants.",
    description: "Ce projet vise a construire et equiper une ecole primaire complete pour accueillir 300 enfants dans la region de Kano au Nigeria. La region souffre d un manque criant d infrastructures scolaires.\n\nGrace aux fonds collectes, nous avons pu construire 4 salles de classe sur les 6 prevues, une bibliotheque partielle, et des sanitaires separes. Nous avons egalement forme 8 enseignants.\n\nL impact de ce projet depasse la simple construction : c est toute une communaute qui se transforme quand ses enfants ont acces a l education.",
    category: "education",
    country: "Nigeria",
    region: "Kano",
    status: "en-cours",
    featured: true,
    goalAmount: 45000,
    raisedAmount: 31500,
    beneficiaries: 250,
    beneficiariesTarget: 300,
    images: [
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    ],
    startDate: "2024-01-15",
    objectives: [
      "Construire 6 salles de classe equipees",
      "Former 12 enseignants",
      "Fournir les manuels scolaires",
      "Installer une cantine scolaire",
      "Amenager des sanitaires adaptes",
    ],
    results: [
      "4 salles de classe construites",
      "8 enseignants formes",
      "250 enfants inscrits",
      "Cantine fonctionnelle depuis mars",
    ],
    remaining: [
      "2 salles de classe restantes",
      "4 enseignants supplementaires a former",
      "Bibliotheque a completer",
    ],
    milestones: [
      { date: "Janvier 2024", title: "Debut des travaux", description: "Pose de la premiere pierre.", done: true },
      { date: "Mars 2024", title: "Premiere inauguration", description: "Ouverture des 4 premieres salles.", done: true },
      { date: "Juin 2024", title: "Fin de construction", description: "Achevement des 2 salles restantes.", done: false },
      { date: "Septembre 2024", title: "Rentree complete", description: "300 enfants inscrits.", done: false },
    ],
    updates: [
      { date: "10 Mars 2024", title: "Premiere rentree reussie", content: "250 enfants ont rejoint leurs nouvelles salles de classe. La joie des familles etait palpable." },
    ],
    testimonials: [
      { name: "Ibrahim Musa", role: "Parent d eleve, Kano", text: "Ma fille peut enfin aller a l ecole pres de chez nous. Elle apprend a lire et a ecrire. Je n aurais jamais cru voir ca de mon vivant.", avatar: "IM" },
    ],
    budgetBreakdown: [
      { label: "Construction", percentage: 50, color: "#2563eb" },
      { label: "Mobilier scolaire", percentage: 20, color: "#16a34a" },
      { label: "Formation enseignants", percentage: 15, color: "#f97316" },
      { label: "Manuels scolaires", percentage: 10, color: "#8b5cf6" },
      { label: "Administration", percentage: 5, color: "#94a3b8" },
    ],
    team: 12,
    villages: 1,
  },
  {
    id: 3,
    slug: "eau-potable-sahel",
    title: "Eau potable — Sahel",
    shortDescription: "Installation de 12 points d eau potable pour 5 villages isoles au Mali.",
    description: "Dans la region du Sahel au Mali, l acces a l eau potable reste un defi majeur. Des millions de personnes dependent de sources d eau non securisees.\n\nNotre projet consiste a installer 12 points d eau equipes de pompes manuelles dans 5 villages isoles, beneficiant ainsi a plus de 2 500 personnes.",
    category: "eau",
    country: "Mali",
    region: "Sahel",
    status: "en-cours",
    featured: true,
    goalAmount: 28000,
    raisedAmount: 22400,
    beneficiaries: 1800,
    beneficiariesTarget: 2500,
    images: [
      "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    startDate: "2024-02-01",
    objectives: [
      "Installer 12 forages equipes de pompes",
      "Former des comites de gestion de l eau",
      "Sensibiliser 2 500 personnes a l hygiene",
      "Assurer la maintenance sur 5 ans",
    ],
    results: [
      "8 forages installes et fonctionnels",
      "3 comites de gestion formes",
      "1 800 personnes beneficiaires",
      "Taux de maladies hydriques reduit de 40%",
    ],
    remaining: [
      "4 forages supplementaires a installer",
      "2 villages restants a couvrir",
      "Formation hygiene pour 700 personnes",
    ],
    milestones: [
      { date: "Fevrier 2024", title: "Debut des forages", description: "Installation des 3 premiers points d eau.", done: true },
      { date: "Avril 2024", title: "Mi-parcours", description: "8 forages installes, 1 800 beneficiaires.", done: true },
      { date: "Juillet 2024", title: "Fin du projet", description: "12 forages et 2 500 beneficiaires.", done: false },
    ],
    updates: [
      { date: "5 Avril 2024", title: "Mi-parcours excellent", content: "Avec 8 forages installes, nous avons deja depasse la moitie de nos objectifs." },
    ],
    testimonials: [
      { name: "Fatoumata Diallo", role: "Habitante du village de Gao", text: "Avant, je marchais 3 heures chaque jour pour chercher de l eau. Maintenant, la pompe est a 5 minutes.", avatar: "FD" },
    ],
    budgetBreakdown: [
      { label: "Forage et installation", percentage: 55, color: "#2563eb" },
      { label: "Pompes et materiel", percentage: 25, color: "#16a34a" },
      { label: "Formation comites", percentage: 10, color: "#f97316" },
      { label: "Sensibilisation hygiene", percentage: 7, color: "#8b5cf6" },
      { label: "Suivi et evaluation", percentage: 3, color: "#94a3b8" },
    ],
    team: 6,
    villages: 5,
  },
  {
    id: 4,
    slug: "nutrition-enfants-ghana",
    title: "Nutrition infantile — Ghana",
    shortDescription: "Programme de nutrition pour 500 enfants en situation de malnutrition au Ghana.",
    description: "Ce programme vise a lutter contre la malnutrition infantile dans les regions rurales du Ghana. Nous distribuons des supplements nutritionnels et formons les meres sur l alimentation saine.",
    category: "alimentation",
    country: "Ghana",
    region: "Northern Region",
    status: "nouveau",
    featured: false,
    goalAmount: 35000,
    raisedAmount: 8000,
    beneficiaries: 120,
    beneficiariesTarget: 500,
    images: ["https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80"],
    startDate: "2024-05-01",
    objectives: [
      "Distribuer des supplements nutritionnels a 500 enfants",
      "Former 100 meres a l alimentation saine",
      "Installer 5 jardins communautaires",
    ],
    results: [
      "120 enfants beneficiaires",
      "45 meres formees",
      "2 jardins communautaires installes",
    ],
    remaining: [
      "380 enfants supplementaires",
      "55 meres a former",
      "3 jardins a installer",
    ],
    milestones: [
      { date: "Mai 2024", title: "Lancement", description: "Demarrage du programme dans 2 villages.", done: true },
      { date: "Aout 2024", title: "Extension", description: "Extension a 5 villages supplementaires.", done: false },
    ],
    updates: [],
    testimonials: [],
    budgetBreakdown: [
      { label: "Supplements nutritionnels", percentage: 45, color: "#2563eb" },
      { label: "Formation meres", percentage: 25, color: "#16a34a" },
      { label: "Jardins communautaires", percentage: 20, color: "#f97316" },
      { label: "Suivi medical", percentage: 10, color: "#8b5cf6" },
    ],
    team: 5,
    villages: 3,
  },
  {
    id: 5,
    slug: "microfinance-femmes-benin",
    title: "Microfinance femmes — Benin",
    shortDescription: "Programme de microfinancement pour 200 femmes entrepreneures au Benin.",
    description: "Ce programme soutient les femmes entrepreneures dans les zones rurales du Benin en leur fournissant un acces au credit et une formation en gestion d entreprise.",
    category: "economie",
    country: "Benin",
    region: "Borgou",
    status: "termine",
    featured: false,
    goalAmount: 25000,
    raisedAmount: 25000,
    beneficiaries: 200,
    beneficiariesTarget: 200,
    images: ["https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&q=80"],
    startDate: "2023-06-01",
    endDate: "2024-01-31",
    objectives: [
      "Financer 200 projets entrepreneuriaux",
      "Former 200 femmes en gestion",
      "Creer 200 micro-entreprises",
    ],
    results: [
      "200 femmes financees",
      "200 micro-entreprises creees",
      "512 emplois indirects generes",
      "Revenu moyen augmente de 65%",
    ],
    remaining: [],
    milestones: [
      { date: "Juin 2023", title: "Lancement", description: "Selection et formation des 200 beneficiaires.", done: true },
      { date: "Septembre 2023", title: "Premiers credits", description: "Distribution des premiers credits.", done: true },
      { date: "Janvier 2024", title: "Cloture", description: "Projet termine avec succes.", done: true },
    ],
    updates: [
      { date: "31 Janvier 2024", title: "Projet termine avec succes !", content: "200 femmes ont recu leur financement et ont cree leur entreprise. Le revenu moyen a augmente de 65%." },
    ],
    testimonials: [
      { name: "Celestine Agbo", role: "Beneficiaire, vendeuse de tissus", text: "Avant le projet, je vendais au marche sans capital. Maintenant j ai mon propre commerce.", avatar: "CA" },
    ],
    budgetBreakdown: [
      { label: "Credits aux femmes", percentage: 60, color: "#2563eb" },
      { label: "Formation gestion", percentage: 20, color: "#16a34a" },
      { label: "Accompagnement", percentage: 15, color: "#f97316" },
      { label: "Administration", percentage: 5, color: "#94a3b8" },
    ],
    team: 4,
    villages: 8,
  },
  {
    id: 6,
    slug: "sante-maternelle-cote-ivoire",
    title: "Sante maternelle — Cote d Ivoire",
    shortDescription: "Programme de sante maternelle pour 800 femmes enceintes en zone rurale.",
    description: "Ce programme vise a reduire la mortalite maternelle et infantile dans les zones rurales de Cote d Ivoire en ameliorant l acces aux soins prenataux.",
    category: "sante",
    country: "Cote d Ivoire",
    region: "Centre-Nord",
    status: "en-cours",
    featured: false,
    goalAmount: 40000,
    raisedAmount: 15000,
    beneficiaries: 320,
    beneficiariesTarget: 800,
    images: ["https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&q=80"],
    startDate: "2024-04-01",
    objectives: [
      "Assurer le suivi prenatal de 800 femmes",
      "Former 20 accoucheuses traditionnelles",
      "Equiper 5 maternites rurales",
    ],
    results: [
      "320 femmes suivies",
      "12 accoucheuses formees",
      "3 maternites equipees",
    ],
    remaining: [
      "480 femmes supplementaires a suivre",
      "8 accoucheuses a former",
      "2 maternites a equiper",
    ],
    milestones: [
      { date: "Avril 2024", title: "Demarrage", description: "Formation des premieres accoucheuses.", done: true },
      { date: "Juin 2024", title: "Equipement", description: "Equipement des 3 premieres maternites.", done: true },
      { date: "Decembre 2024", title: "Objectif final", description: "800 femmes suivies.", done: false },
    ],
    updates: [],
    testimonials: [],
    budgetBreakdown: [
      { label: "Equipement medical", percentage: 40, color: "#2563eb" },
      { label: "Formation personnels", percentage: 25, color: "#16a34a" },
      { label: "Suivi prenatal", percentage: 20, color: "#f97316" },
      { label: "Sensibilisation", percentage: 15, color: "#8b5cf6" },
    ],
    team: 8,
    villages: 5,
  },
];

export const COUNTRIES = [...new Set(PROJECTS.map((p) => p.country))].sort();
export const CATEGORIES = [...new Set(PROJECTS.map((p) => p.category))].sort();