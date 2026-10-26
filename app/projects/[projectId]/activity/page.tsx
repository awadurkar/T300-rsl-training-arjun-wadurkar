import { notFound } from "next/navigation";
import { loadProject } from "@/lib/projects";

export default async function ProjectActivityPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = await loadProject(projectId);
  if (!project) notFound();
  const events = [
    { title: `Project progress updated to ${project.progress}%`, description: `${project.owner} shared a progress update.`, time: "Today · 10:24 AM", color: "bg-emerald-500" },
    { title: `${project.tasks.find((task) => task.done)?.title ?? "Project kickoff"} completed`, description: "A key milestone was marked complete.", time: "Yesterday · 3:16 PM", color: "bg-blue-400" },
    { title: "Project workspace created", description: "The team is ready to make something great.", time: "Oct 16 · 9:00 AM", color: "bg-violet-400" }
  ];
  return <section className="min-h-[260px] rounded-xl border border-line bg-surface p-5"><div className="mb-5"><h2 className="font-display text-sm font-bold">Project activity</h2><p className="mt-1 text-[10px] text-muted">A timeline of updates from {project.name}.</p></div><div className="ml-1 border-l border-line">{events.map((event) => <div className="relative flex gap-4 pb-6 pl-5 last:pb-0" key={event.title}><span className={`absolute -left-[5px] top-0.5 size-[9px] rounded-full border-2 border-surface ${event.color}`} /><div><strong className="text-[10px]">{event.title}</strong><p className="my-1 text-[9px] text-muted">{event.description}</p><small className="text-[8px] text-muted">{event.time}</small></div></div>)}</div></section>;
}
