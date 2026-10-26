import { notFound } from "next/navigation";
import { loadProject } from "@/lib/projects";

export default async function ProjectTasksPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = await loadProject(projectId);
  if (!project) notFound();
  return <section className="min-h-[260px] rounded-xl border border-line bg-surface p-5"><div className="mb-4 flex items-center justify-between"><div><h2 className="font-display text-sm font-bold">Key tasks</h2><p className="mt-1 text-[10px] text-muted">{project.tasks.filter((task) => task.done).length} of {project.tasks.length} tasks complete.</p></div><span className="rounded-full bg-accent-soft px-2 py-1 text-[9px] font-bold capitalize text-accent">{project.status}</span></div><div className="border-t border-line">{project.tasks.map((task) => <div className="flex min-h-[49px] items-center gap-3 border-b border-line text-[11px]" key={task.title}><span className={`grid size-[17px] place-items-center rounded border text-[10px] ${task.done ? "border-emerald-400 bg-emerald-400 text-white" : "border-line"}`}>{task.done ? "✓" : ""}</span><span className={task.done ? "text-muted line-through" : ""}>{task.title}</span><span className={`ml-auto text-[9px] ${task.done ? "text-emerald-700" : "text-amber-700"}`}>{task.done ? "Complete" : "In progress"}</span></div>)}</div></section>;
}
