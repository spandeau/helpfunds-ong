import ProjectCard from "./ProjectCard";
import { projects, Project } from "@/data/projects";

export default function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {projects.map((item: Project) => (
        <ProjectCard
          key={item.id}
          project={item}
        />
      ))}
    </div>
  );
}