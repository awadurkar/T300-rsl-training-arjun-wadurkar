import { Suspense } from "react";
import Link from "next/link";
import { getProjects, type ProjectStatus } from "@/lib/projects";

export const dynamic = "force-dynamic";

async function RecentActivity() {
  await new Promise((resolve) => setTimeout(resolve, 1800));
  const activity = [
    { initials: "MC", name: "Maya Chen", action: "shipped new color tokens", project: "Atlas Design System", time: "12 minutes ago", type: "SHIP", color: "bg-rose-100 text-rose-700", badge: "bg-emerald-50 text-emerald-700" },
    { initials: "JL", name: "Jordan Lee", action: "added a project update", project: "Customer Portal", time: "1 hour ago", type: "UPDATE", color: "bg-blue-100 text-blue-700", badge: "bg-blue-50 text-blue-700" },
    { initials: "PS", name: "Priya Shah", action: "completed the launch checklist", project: "Insight Analytics", time: "Yesterday", type: "MILESTONE", color: "bg-purple-100 text-purple-700", badge: "bg-violet-50 text-violet-700" }
  ];
  return <div>{activity.map((item) => <div className="flex items-center gap-2.5 border-t border-line py-3" key={item.name}><span className={`grid size-[30px] shrink-0 place-items-center rounded-full text-[8px] font-bold ${item.color}`}>{item.initials}</span><p className="m-0 flex-1 text-[9px]"><strong>{item.name}</strong> {item.action} <span className="text-muted">to {item.project}</span><small className="mt-1 block text-[8px] text-muted">{item.time}</small></p><span className={`rounded-full px-2 py-1 text-[7px] font-bold ${item.badge}`}>{item.type}</span></div>)}</div>;
}

function ActivitySkeleton() {
  return <div aria-label="Loading recent activity">{[1, 2, 3].map((item) => <div className="h-12 animate-[shimmer_1.5s_infinite] border-t border-line bg-[linear-gradient(90deg,var(--surface-soft),var(--surface),var(--surface-soft))] bg-[length:200%_100%]" key={item} />)}</div>;
}

const iconColors = ["bg-violet-100 text-violet-700", "bg-blue-100 text-blue-700", "bg-emerald-100 text-emerald-700", "bg-orange-100 text-orange-700"];
const statusColors: Record<ProjectStatus, string> = { active: "bg-emerald-50 text-emerald-700", completed: "bg-indigo-50 text-indigo-700", planning: "bg-amber-50 text-amber-700" };

export default function DashboardPage() {
  const projects = getProjects();
  const activeCount = projects.filter((project) => project.status === "active").length;
  return (
    <div className="mx-auto max-w-[950px]">
      <div className="mb-7 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"><div><p className="mb-2 text-[10px] font-bold tracking-[1.3px] text-accent">FRIDAY, OCTOBER 23, 2026</p><h1 className="font-display text-2xl font-bold tracking-tight">Good afternoon, Arjun</h1><p className="mt-2 text-[11px] text-muted">Here's what's happening across your workspace.</p></div></div>
      <div className="mb-[18px] grid grid-cols-3 gap-2.5">
        {[{ icon: "◈", label: "Active projects", value: activeCount.toString().padStart(2, "0"), foot: "↗ 2 from last month", color: "bg-violet-100 text-violet-700" }, { icon: "✓", label: "Tasks completed", value: "24 / 32", foot: "75% completion rate", color: "bg-blue-100 text-blue-700" }, { icon: "♧", label: "Team members", value: "12", foot: "Across 4 teams", color: "bg-emerald-100 text-emerald-700" }].map((stat) => <article className="relative min-h-[132px] rounded-xl border border-line bg-surface p-3.5 md:p-[17px]" key={stat.label}><span className={`mb-3 grid size-7 place-items-center rounded-lg text-sm ${stat.color}`}>{stat.icon}</span><span className="block text-[8px] text-muted md:text-[10px]">{stat.label}</span><strong className="absolute right-3 top-5 font-display text-lg font-bold md:right-4 md:text-2xl">{stat.value}</strong><small className="mt-1 block text-[8px] text-emerald-600 md:text-[9px]">{stat.foot}</small></article>)}
      </div>
      <section className="mb-4 rounded-xl border border-line bg-surface p-4 md:p-5"><div className="mb-4 flex items-center justify-between"><div><h2 className="font-display text-sm font-bold">Your projects</h2><p className="mt-1 text-[10px] text-muted">A quick pulse on the work in progress.</p></div><Link className="text-[11px] font-bold text-accent" href="/projects">View all →</Link></div>
        {projects.slice(0, 3).map((project) => <Link href={`/projects/${project.id}`} className="flex items-center gap-2 border-t border-line py-3" key={project.id}><span className={`grid size-8 shrink-0 place-items-center rounded-lg text-[11px] font-bold ${iconColors[projects.indexOf(project) % iconColors.length]}`}>{project.initials.slice(0, 1)}</span><span className="min-w-0 flex-1"><strong className="block truncate text-[10px]">{project.name}</strong><small className="mt-1 block text-[9px] text-muted">{project.category}</small></span><span className="hidden w-28 items-center gap-2 sm:flex"><span className="h-[5px] flex-1 overflow-hidden rounded-full bg-surface-soft"><i className="block h-full rounded-full bg-accent" style={{ width: `${project.progress}%` }} /></span><small className="text-[9px] text-muted">{project.progress}%</small></span><span className={`hidden rounded-full px-2 py-1 text-[8px] font-bold capitalize sm:inline ${statusColors[project.status]}`}>{project.status}</span><span className="text-xs text-muted">→</span></Link>)}
      </section>
      <section className="min-h-[185px] rounded-xl border border-line bg-surface p-4 md:p-5"><div className="mb-4 flex items-center justify-between"><div><h2 className="font-display text-sm font-bold">Recent activity</h2><p className="mt-1 text-[10px] text-muted">Little wins from around the workspace.</p></div><button className="rounded-lg p-2 text-xs text-muted hover:bg-accent-soft hover:text-accent" aria-label="More activity options">•••</button></div><Suspense fallback={<ActivitySkeleton />}><RecentActivity /></Suspense></section>
    </div>
  );
}
