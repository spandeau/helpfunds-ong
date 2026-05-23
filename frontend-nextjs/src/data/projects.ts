export type Project = {
  id: number;
  title: string;
  country: string;
  goal: number;
  raised: number;
  emoji: string;
  description: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Éducation pour tous",
    country: "Togo",
    goal: 25000,
    raised: 18000,
    emoji: "📚",
    description: "Soutien scolaire et infrastructures."
  },

  {
    id: 2,
    title: "Accès à l'eau",
    country: "Mali",
    goal: 30000,
    raised: 22000,
    emoji: "💧",
    description: "Construction de forages."
  },

  {
    id: 3,
    title: "Santé communautaire",
    country: "RDC",
    goal: 45000,
    raised: 34000,
    emoji: "🏥",
    description: "Centres médicaux et matériel."
  }
];