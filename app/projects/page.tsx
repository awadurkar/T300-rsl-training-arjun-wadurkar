import type { Metadata } from "next";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { getProjects, type ProjectStatus } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects" };

type SearchParams = Promise<{ search?: string | string[]; status?: string | string[] }>;

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

const projectColors: Record<string, string> = {
  violet: "bg-violet-100 text-violet-700",
  blue: "bg-blue-100 text-blue-700",
  mint: "bg-emerald-100 text-emerald-700",
  orange: "bg-orange-100 text-orange-700"
};

const statusColors: Record<ProjectStatus, string> = {
  active: "bg-emerald-50 text-emerald-700",
  completed: "bg-indigo-50 text-indigo-700",
  planning: "bg-amber-50 text-amber-700"
};

export default async function ProjectsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const search = first(params.search).trim();
  const status = first(params.status);
  const validStatuses: ProjectStatus[] = ["active", "completed", "planning"];
  const projects = getProjects().filter((project) => {
    const matchesSearch = !search || `${project.name} ${project.description} ${project.category} ${project.owner}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !status || !validStatuses.includes(status as ProjectStatus) || project.status === status;
    return matchesSearch && matchesStatus;
  });
  const query = new URLSearchParams();
  if (search) query.set("search", search);
  if (validStatuses.includes(status as ProjectStatus)) query.set("status", status);
  const preservedQuery = query.toString();

  return (
    <div className="mx-auto w-[calc(100%-36px)] max-w-[1120px] pb-[70px] pt-9 md:w-[calc(100%-64px)] md:pt-[50px]">
      <div className="mb-7 flex items-start justify-between gap-5 md:items-end"><div><p className="mb-2 text-[10px] font-bold tracking-[1.3px] text-accent">YOUR WORKSPACE</p><h1 className="flex items-center gap-3 font-display text-[31px] font-bold tracking-tight md:text-[34px]">Projects <span className="grid size-6 place-items-center rounded-full bg-accent-soft font-sans text-[10px] text-accent">{projects.length}</span></h1><p className="mt-2 text-xs text-muted">All the work your team is moving forward, together.</p></div></div>
      <form className="flex flex-col gap-2 rounded-xl border border-line bg-surface p-3 sm:flex-row sm:items-center" action="/projects" method="get">
        <label className="flex min-w-0 flex-1 items-center gap-2.5 px-1 text-muted"><span aria-hidden="true" className="text-xl">⌕</span><input className="h-[37px] min-w-0 flex-1 border-0 bg-transparent text-xs text-ink outline-none placeholder:text-muted" type="search" name="search" defaultValue={search} placeholder="Search projects, teams, or keywords" aria-label="Search projects" /><button className="rounded-md bg-accent px-3 py-2 text-[11px] font-bold text-white" type="submit">Search</button></label>
        <label className="flex min-h-9 items-center gap-2 border-t border-line pt-2 text-[11px] text-muted sm:min-w-[154px] sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0"><span>Status</span><select className="flex-1 bg-surface py-2 text-[11px] text-ink outline-none" name="status" defaultValue={status}><option value="">All statuses</option><option value="active">Active</option><option value="planning">Planning</option><option value="completed">Completed</option></select></label>
      </form>
      <div className="my-5 flex items-center justify-between text-[11px] text-muted"><span>{projects.length} {projects.length === 1 ? "project" : "projects"}{search ? <> matching <strong className="text-ink">“{search}”</strong></> : ""}</span></div>
      {projects.length ? <div className="grid gap-4 md:grid-cols-2">{projects.map((project) => <article className="rounded-xl border border-line bg-surface p-5 transition hover:-translate-y-1 hover:shadow-lg" key={project.id}>
        <div className="flex items-start justify-between"><span className={`grid size-10 place-items-center rounded-xl font-display text-sm font-extrabold ${projectColors[project.color]}`}>{project.initials.slice(0, 1)}</span><FavoriteButton projectId={project.id} /></div>
        <div className="mt-4 flex items-center justify-between gap-2"><Link href={`/projects/${project.id}${preservedQuery ? `?${preservedQuery}` : ""}`}><h2 className="font-display text-[15px] font-bold hover:text-accent">{project.name}</h2></Link><span className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-bold capitalize ${statusColors[project.status]}`}>{project.status}</span></div>
        <p className="my-2 min-h-[38px] text-[11px] leading-relaxed text-muted">{project.description}</p><div className="text-[10px] text-muted"><span className="mr-1.5 text-violet-400">◉</span>{project.category}</div>
        <div className="my-4"><div className="mb-2 flex justify-between text-[10px] text-muted"><span>Progress</span><strong className="text-ink">{project.progress}%</strong></div><div className="h-1.5 overflow-hidden rounded-full bg-surface-soft"><span className="block h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-300" style={{ width: `${project.progress}%` }} /></div></div>
        <div className="flex items-center border-t border-line pt-3"><span className="mr-2 grid size-6 place-items-center rounded-full bg-violet-100 text-[8px] font-bold text-violet-700">{project.initials}</span><span className="text-[10px]">{project.owner}</span><span className="ml-auto text-[9px] text-muted">◷ &nbsp;{project.dueDate}</span></div>
      </article>)}</div> : <div className="rounded-xl border border-line bg-surface px-5 py-14 text-center"><span className="text-3xl text-accent">⌕</span><h2 className="mt-3 font-display text-[17px] font-bold">No projects found</h2><p className="my-2 text-xs text-muted">Try another search term or clear your filters.</p><Link className="mt-2 inline-flex min-h-10 items-center rounded-lg border border-line px-4 text-xs font-bold hover:border-accent" href="/projects">Clear filters</Link></div>}
      <div className="mt-5 flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-3 text-[11px] text-muted"><span className="text-violet-400">✦</span><span>Want to see error handling in action? <Link className="font-bold text-accent underline underline-offset-2" href="/projects/demo-error">Open the service demo</Link>.</span></div>
    </div>
  );
}
