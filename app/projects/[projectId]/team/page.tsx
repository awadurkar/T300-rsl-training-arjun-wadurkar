import { notFound } from "next/navigation";
import { loadProject } from "@/lib/projects";

export default async function ProjectTeamPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = await loadProject(projectId);
  if (!project) notFound();
  const colors = ["bg-rose-100 text-rose-700", "bg-blue-100 text-blue-700", "bg-emerald-100 text-emerald-700"];
  return <section className="min-h-[260px] rounded-xl border border-line bg-surface p-5"><div className="mb-5"><h2 className="font-display text-sm font-bold">Meet the team</h2><p className="mt-1 text-[10px] text-muted">{project.team.length} collaborators on {project.name}.</p></div><div className="grid grid-cols-2 gap-3 md:grid-cols-3">{project.team.map((member, index) => <article className="flex flex-col items-center rounded-xl border border-line bg-page px-3 py-5" key={member}><span className={`mb-3 grid size-[43px] place-items-center rounded-full text-[11px] font-bold ${colors[index % colors.length]}`}>{member.split(" ").map((word) => word[0]).join("")}</span><strong className="text-[10px]">{member}</strong><small className="mt-1 text-[9px] text-muted">{index === 0 ? "Project lead" : ["Product design", "Engineering", "Product"][index % 3]}</small><span className="mt-3 text-[8px] text-emerald-700 before:mr-1 before:inline-block before:size-1.5 before:rounded-full before:bg-emerald-400 before:content-['']">Available</span></article>)}</div></section>;
}
