export type PostType = "article" | "evenement" | "photo";

export interface BlogPost {
  id: number;
  slug: string;
  type: PostType;
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
  tags: string[];
  featured: boolean;
  eventDate?: string;
  eventLocation?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "vaccination-togo-bilan-2024",
    type: "article",
    title: "Bilan 2024 : 1 240 enfants vaccines au Togo",
    excerpt: "Notre campagne de vaccination au nord du Togo a depasse ses objectifs intermediaires. Retour sur une aventure humaine exceptionnelle.",
    content: "Depuis le lancement de notre programme de vaccination en mars 2024, nos equipes terrain ont parcouru des centaines de kilometres pour atteindre les villages les plus isoles du nord du Togo.\n\nGrace a la mobilisation de nos donateurs et de nos partenaires locaux, nous avons pu vacciner 1 240 enfants contre la rougeole et la polio, soit 49% de notre objectif total de 2 500 enfants.\n\nLes resultats sont deja visibles : le taux de maladies evitables par la vaccination a chute de 40% dans les zones couvertes. Les familles expriment leur gratitude et leur confiance renouvelee dans le systeme de sante.\n\nNous continuons notre travail et visons l atteinte de l objectif complet d ici aout 2024.",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    ],
    author: "Dr. Kodjo Mensah",
    authorAvatar: "KM",
    publishedAt: "2024-05-15",
    category: "sante",
    country: "Togo",
    tags: ["vaccination", "sante", "togo", "enfants"],
    featured: true,
  },
  {
    id: 2,
    slug: "inauguration-ecole-kano-nigeria",
    type: "evenement",
    title: "Inauguration de l ecole primaire de Kano",
    excerpt: "Une journee historique pour le village de Kano au Nigeria. 250 enfants ont rejoint leurs nouvelles salles de classe.",
    content: "Le 10 mars 2024 restera grave dans la memoire du village de Kano. Ce jour-la, 250 enfants ont franchi pour la premiere fois les portes de leur nouvelle ecole, construite grace aux genereux dons de notre communaute.\n\nL inauguration s est deroulee en presence des autorites locales, des parents d eleves et de notre equipe terrain. Les discours etaient empreints d emotion et d espoir pour l avenir de ces enfants.\n\nLa construction a necessite 3 mois de travaux intenses. Les 4 premieres salles de classe sont maintenant equipees de mobilier neuf, de manuels scolaires et d un tableau interactif.",
    coverImage: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    ],
    author: "Sophie Martin",
    authorAvatar: "SM",
    publishedAt: "2024-03-12",
    category: "education",
    country: "Nigeria",
    tags: ["education", "ecole", "nigeria", "inauguration"],
    featured: true,
    eventDate: "2024-03-10",
    eventLocation: "Kano, Nigeria",
  },
  {
    id: 3,
    slug: "galerie-terrain-sahel-mali",
    type: "photo",
    title: "Galerie : Installation des forages au Sahel",
    excerpt: "Decouvrez en images le quotidien de nos equipes terrain lors de l installation des points d eau au Mali.",
    content: "Ces photos racontent l histoire de femmes et d hommes engages pour apporter l eau potable dans les villages isoles du Sahel malien. Chaque image capture un moment de ce projet extraordinaire.",
    coverImage: "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    ],
    author: "Marie Dubois",
    authorAvatar: "MD",
    publishedAt: "2024-04-20",
    category: "eau",
    country: "Mali",
    tags: ["eau", "mali", "sahel", "terrain", "galerie"],
    featured: false,
  },
  {
    id: 4,
    slug: "microfinance-femmes-benin-succes",
    type: "article",
    title: "200 femmes entrepreneures au Benin : un succes exemplaire",
    excerpt: "Le programme de microfinance au Benin a transforme la vie de 200 femmes. Leur revenu a augmente de 65% en moyenne.",
    content: "Le programme de microfinance que nous avons lance au Benin en juin 2023 vient de se cloturer avec des resultats qui depassent toutes nos esperances.\n\n200 femmes ont recu un financement pour lancer ou developper leur activite entrepreneuriale. Aujourd hui, ces femmes ont cree 512 emplois indirects et augmente leur revenu moyen de 65%.\n\nPlus qu une reussite economique, c est une transformation sociale profonde. Ces femmes sont devenues des modeles dans leurs communautes et inspirent d autres femmes a se lancer.",
    coverImage: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
    ],
    author: "Celestine Agbo",
    authorAvatar: "CA",
    publishedAt: "2024-02-01",
    category: "economie",
    country: "Benin",
    tags: ["microfinance", "femmes", "benin", "entrepreneuriat"],
    featured: false,
  },
  {
    id: 5,
    slug: "evenement-gala-solidarite-paris",
    type: "evenement",
    title: "Gala de solidarite Paris 2024",
    excerpt: "Rejoignez-nous pour notre grand gala annuel de solidarite a Paris. Une soiree exceptionnelle pour soutenir nos projets.",
    content: "Help Funds organise son grand gala annuel de solidarite le 15 juin 2024 a Paris. Cette soiree exceptionnelle reunira donateurs, partenaires et equipes terrain autour d une cause commune.\n\nAu programme : temoignages poignants de beneficiaires, presentation des projets en cours, diner gastronomique et vente aux encheres caritative.\n\nChaque billet vendu finance directement nos projets sur le terrain. Rejoignez-nous pour cette soiree inoubliable.",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    ],
    author: "Equipe Help Funds",
    authorAvatar: "HF",
    publishedAt: "2024-05-01",
    category: "evenement",
    country: "France",
    tags: ["gala", "paris", "evenement", "solidarite"],
    featured: true,
    eventDate: "2024-06-15",
    eventLocation: "Paris, France",
  },
  {
    id: 6,
    slug: "galerie-nutrition-ghana",
    type: "photo",
    title: "Galerie : Programme nutrition au Ghana",
    excerpt: "Images du programme de nutrition infantile dans le nord du Ghana. Des visages qui racontent l espoir.",
    content: "Ces photographies capturent la realite du programme de nutrition infantile que nous menons dans le nord du Ghana. Chaque visage raconte une histoire de resilience et d espoir.",
    coverImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
    ],
    author: "Jean-Pierre Kouame",
    authorAvatar: "JK",
    publishedAt: "2024-05-10",
    category: "alimentation",
    country: "Ghana",
    tags: ["nutrition", "ghana", "enfants", "galerie"],
    featured: false,
  },
];

export const BLOG_CATEGORIES = [
  { value: "tous", label: "Tout" },
  { value: "article", label: "Articles" },
  { value: "evenement", label: "Evenements" },
  { value: "photo", label: "Galeries photos" },
];

export const BLOG_THEMES = [
  { value: "tous", label: "Tous les themes" },
  { value: "sante", label: "Sante" },
  { value: "education", label: "Education" },
  { value: "eau", label: "Eau" },
  { value: "alimentation", label: "Nutrition" },
  { value: "economie", label: "Economie" },
  { value: "evenement", label: "Evenements" },
];

export const BLOG_COUNTRIES = [
  "tous", "Togo", "Nigeria", "Mali", "Benin", "Ghana", "France",
];