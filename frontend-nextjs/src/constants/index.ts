export const SITE_NAME = "Help Funds";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
export const SITE_DESCRIPTION = "Help Funds est une ONG internationale.";

export interface NavLinkChild {
  label: string;
  href: string;
}

export interface NavLinkItem {
  label: string;
  href: string;
  children?: NavLinkChild[];
}

export const NAV_LINKS: NavLinkItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Nos Projets",
    href: "/projets",
    children: [
      { label: "Projets en cours", href: "/projets" },
      { label: "Projets termines", href: "/projets/termines" },
    ],
  },
  {
    label: "A propos",
    href: "/a-propos",
    children: [
      { label: "Notre mission", href: "/a-propos" },
      { label: "Notre equipe", href: "/equipe" },
      { label: "Nos valeurs", href: "/valeurs" },
    ],
  },
  { label: "Actualites", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

export const PROJECT_CATEGORIES = [
  { value: "education", label: "Education", icon: "book" },
  { value: "sante", label: "Sante", icon: "heart" },
  { value: "eau", label: "Eau potable", icon: "droplets" },
  { value: "alimentation", label: "Alimentation", icon: "leaf" },
  { value: "logement", label: "Logement", icon: "home" },
  { value: "economie", label: "Economie", icon: "briefcase" },
] as const;

export const PROJECT_STATUSES = [
  { value: "en-cours", label: "En cours", color: "success" },
  { value: "termine", label: "Termine", color: "neutral" },
  { value: "a-venir", label: "A venir", color: "primary" },
] as const;

export const DONATION_AMOUNTS = [10, 25, 50, 100, 250, 500];

export const HOME_STATS = [
  { value: "50 000+", label: "Beneficiaires aides", description: "Personnes ayant recu une aide directe", icon: "users" },
  { value: "120+", label: "Projets realises", description: "Dans 35 pays a travers le monde", icon: "folder" },
  { value: "35", label: "Pays d intervention", description: "Une presence mondiale et locale", icon: "globe" },
  { value: "98%", label: "Fonds sur le terrain", description: "De chaque don utilise directement", icon: "heart" },
];

export const HOME_TESTIMONIALS = [
  { name: "Marie Dubois", role: "Donatrice reguliere", country: "France", text: "Help Funds m a permis de voir l impact de mes dons. Les rapports transparents me donnent confiance.", avatar: "MD", color: "bg-primary-600" },
  { name: "James Okonkwo", role: "Beneficiaire programme education", country: "Nigeria", text: "Grace a Help Funds, notre ecole a recu du materiel. Nos enfants ont un vrai avenir.", avatar: "JO", color: "bg-secondary-600" },
  { name: "Sophie Martin", role: "Benevole internationale", country: "Belgique", text: "Travailler avec Help Funds a ete l experience la plus enrichissante de ma vie.", avatar: "SM", color: "bg-primary-800" },
];

export const FOOTER_LINKS = {
  organisation: [
    { label: "A propos", href: "/a-propos" },
    { label: "Notre equipe", href: "/equipe" },
    { label: "Nos valeurs", href: "/valeurs" },
    { label: "Rapports annuels", href: "/rapports" },
  ],
  projets: [
    { label: "Projets en cours", href: "/projets" },
    { label: "Projets termines", href: "/projets/termines" },
    { label: "Impact", href: "/impact" },
    { label: "Partenaires", href: "/partenaires" },
  ],
  impliquer: [
    { label: "Faire un don", href: "/don" },
    { label: "Devenir benevole", href: "/benevole" },
    { label: "Partenariat", href: "/partenariat" },
    { label: "Contact", href: "/contact" },
  ],
};

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", letter: "FB" },
  { label: "Twitter", href: "#", letter: "TW" },
  { label: "Instagram", href: "#", letter: "IG" },
  { label: "Youtube", href: "#", letter: "YT" },
];

export const CONTACT_INFO = {
  email: "contact@helpfunds.org",
  phone: "+33 1 23 45 67 89",
  address: "Paris, France",
};

export const ITEMS_PER_PAGE = 9;
export const REVALIDATE_TIME = 60;
