import { getAllProjects } from "@/lib/projects";
import ProjectsClient from "@/components/sections/ProjectsClient";

export const metadata = {
  title: "Nos Projets — Help Funds",
  description: "Decouvrez tous les projets humanitaires soutenus par Help Funds.",
};

export default async function ProjetsPage() {
  const projects = await getAllProjects();
  return <ProjectsClient projects={projects} />;
}