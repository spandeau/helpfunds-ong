import { getAllArticles } from "@/lib/articles";
import { ActualitesClient } from "./page";

export default async function ActualitesPage() {
  const articles = await getAllArticles();
  return <ActualitesClient articles={articles} />;
}