type Project = {
  id:number;
  title:string;
  country:string;
  goal:number;
  raised:number;
  emoji:string;
  description:string;
};

type Props={
  project:Project;
};

export default function ProjectCard({
  project,
}:Props){

const progress=
(project.raised/project.goal)*100;

return(

<div className="bg-white rounded-3xl shadow-md p-6">

<div className="text-6xl mb-4">
{project.emoji}
</div>

<h3 className="text-2xl font-bold">
{project.title}
</h3>

<p className="text-gray-500 mt-2">
{project.description}
</p>

<div className="mt-6">

<div className="bg-gray-200 h-3 rounded-full">

<div
className="bg-cyan-500 h-3 rounded-full"
style={{
width:`${progress}%`
}}
/>

</div>

<div className="mt-3 text-sm">
{project.raised} € / {project.goal} €
</div>

</div>

</div>

);

}