import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadProject } from "@/lib/projects";

export const metadata: Metadata = { title: "Project overview" };

export default async function ProjectOverviewPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = await loadProject(projectId);
  if (!project) notFound();
  const completedTasks = project.tasks.filter((task) => task.done).length;
  const card = "rounded-xl border border-line bg-surface p-[18px]";
  return <div className="grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(240px,.85fr)]">
    <section className="grid content-start gap-4">
      <article className={card}><div className="mb-4"><h2 className="font-display text-sm font-bold">About this project</h2><p className="mt-1 text-[10px] text-muted">A shared space for great work.</p></div><p className="text-[11px] leading-6 text-muted">{project.description}</p><div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-5 border-t border-line pt-4 text-[10px]">
        <div><span className="mb-2 block text-[9px] text-muted">Project owner</span><strong><span className="mr-2 inline-grid size-6 place-items-center rounded-full bg-violet-100 text-[8px] text-violet-700">{project.initials}</span>{project.owner}</strong></div>
        <div><span className="mb-2 block text-[9px] text-muted">Target date</span><strong>◷ &nbsp;{project.dueDate}</strong></div>
        <div><span className="mb-2 block text-[9px] text-muted">Category</span><strong>{project.category}</strong></div>
        <div><span className="mb-2 block text-[9px] text-muted">Project status</span><span className={`rounded-full px-2 py-1 text-[8px] font-bold capitalize ${project.status === "active" ? "bg-emerald-50 text-emerald-700" : project.status === "completed" ? "bg-indigo-50 text-indigo-700" : "bg-amber-50 text-amber-700"}`}>{project.status}</span></div>
      </div></article>
      <article className={card}><div className="mb-4 flex items-center justify-between"><div><h2 className="font-display text-sm font-bold">Latest update</h2><p className="mt-1 text-[10px] text-muted">From the project team</p></div><span className="rounded-full bg-emerald-50 px-2 py-1 text-[7px] font-bold text-emerald-700">ON TRACK</span></div><p className="text-[11px] leading-6 text-muted">The team is making steady progress. The next milestone is in sight, and all owners have their next steps mapped out.</p><div className="mt-4 flex items-center gap-2"><span className="grid size-[30px] place-items-center rounded-full bg-rose-100 text-[8px] text-rose-700">{project.initials}</span><span><strong className="block text-[9px]">{project.owner}</strong><small className="mt-1 block text-[8px] text-muted">Project owner · 2 hours ago</small></span></div></article>
    </section>
    <aside className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
      <article className={card}><div className="mb-4"><h2 className="font-display text-sm font-bold">Progress</h2><p className="mt-1 text-[10px] text-muted">You're moving right along.</p></div><div className="mb-4 flex items-center justify-between"><strong className="font-display text-4xl">{project.progress}<small className="text-lg">%</small></strong><span className="grid size-[66px] place-items-center rounded-full" style={{ background: `conic-gradient(var(--accent) ${project.progress * 3.6}deg, var(--line) 0deg)` }}><i className="grid size-[53px] place-items-center rounded-full bg-surface font-display text-lg not-italic text-accent">{project.initials.slice(0, 1)}</i></span></div><div className="h-1.5 overflow-hidden rounded-full bg-surface-soft"><span className="block h-full rounded-full bg-accent" style={{ width: `${project.progress}%` }} /></div><p className="mt-2 text-[9px] text-muted">{completedTasks} of {project.tasks.length} key tasks completed</p></article>
      <article className={card}><div className="mb-4"><h2 className="font-display text-sm font-bold">Project team</h2><p className="mt-1 text-[10px] text-muted">{project.team.length} people collaborating</p></div><div className="grid gap-3">{project.team.map((member, index) => <div className="flex items-center gap-2" key={member}><span className={`grid size-[30px] place-items-center rounded-full text-[8px] ${["bg-rose-100 text-rose-700", "bg-blue-100 text-blue-700", "bg-emerald-100 text-emerald-700"][index % 3]}`}>{member.split(" ").map((word) => word[0]).join("")}</span><span><strong className="block text-[9px]">{member}</strong><small className="mt-1 block text-[8px] text-muted">{index === 0 ? "Project lead" : "Team member"}</small></span></div>)}</div><Link className="mt-4 inline-block text-[11px] font-bold text-accent" href={`/projects/${project.id}/team`}>View team →</Link></article>
    </aside>
  </div>;
}
