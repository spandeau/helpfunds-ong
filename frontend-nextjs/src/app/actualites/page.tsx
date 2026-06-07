import { getAllArticles } from "@/lib/articles";
import ActualitesClient from "@/components/sections/ActualitesClient";

export const metadata = {
  title: "Actualites — Help Funds",
  description: "Articles, evenements et galeries photos de Help Funds.",
};

export default async function ActualitesPage() {
  const posts = await getAllArticles();
  return <ActualitesClient posts={posts} />;
}