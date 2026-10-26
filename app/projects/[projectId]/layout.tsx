import Link from "next/link";
import { ProjectTabs } from "@/components/project-tabs";
import { findProject } from "@/lib/projects";

export default async function ProjectLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ projectId: string }> }>) {
  const { projectId } = await params;
  const project = findProject(projectId);
  return (
    <div className="mx-auto w-[calc(100%-36px)] max-w-[1120px] pb-[70px] pt-6 md:w-[calc(100%-64px)] md:pt-7">
      <div className="mb-6 flex items-center gap-2.5 text-[10px] text-muted"><Link className="hover:text-accent" href="/projects">Projects</Link><span className="text-line">/</span><span>{project?.name ?? "Service demo"}</span></div>
      <div className="mb-5 flex items-center justify-between"><div className="flex items-center gap-3"><span className={`grid size-11 place-items-center rounded-xl font-display text-sm font-extrabold ${project?.color === "blue" ? "bg-blue-100 text-blue-700" : project?.color === "mint" ? "bg-emerald-100 text-emerald-700" : project?.color === "orange" ? "bg-orange-100 text-orange-700" : "bg-violet-100 text-violet-700"}`}>{project?.initials.slice(0, 1) ?? "!"}</span><div><p className="mb-1 text-[9px] font-bold tracking-wider text-accent">{project?.category ?? "DEMO SCENARIO"}</p><h1 className="font-display text-xl font-bold tracking-tight md:text-[23px]">{project?.name ?? "Service demo"}</h1></div></div>{project && <span className={`rounded-full px-2 py-1 text-[9px] font-bold capitalize ${project.status === "active" ? "bg-emerald-50 text-emerald-700" : project.status === "completed" ? "bg-indigo-50 text-indigo-700" : "bg-amber-50 text-amber-700"}`}>{project.status}</span>}</div>
      <ProjectTabs projectId={projectId} />
      <div className="pt-5">{children}</div>
    </div>
  );
}
