import { getAllArticles } from "@/lib/articles";
import ActualitesClient from "./ActualitesClient";

export const metadata = {
  title: "Actualites — Help Funds",
  description: "Suivez les dernieres nouvelles de Help Funds, nos projets humanitaires et notre impact dans le monde.",
};

export default async function ActualitesPage() {
  const articles = await getAllArticles();
  return <ActualitesClient articles={articles} />;
}
