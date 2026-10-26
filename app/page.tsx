import Link from "next/link";
import { getProjects } from "@/lib/projects";

const projectColors: Record<string, string> = {
  violet: "bg-violet-100 text-violet-700",
  blue: "bg-blue-100 text-blue-700",
  mint: "bg-emerald-100 text-emerald-700",
  orange: "bg-orange-100 text-orange-700"
};

export default function HomePage() {
  const projects = getProjects();
  return (
    <div className="mx-auto w-[calc(100%-36px)] max-w-[1120px] pb-20 pt-7 md:w-[calc(100%-64px)] md:pt-[52px]">
      <section className="grid items-center gap-5 md:min-h-[440px] md:grid-cols-[1.05fr_.95fr] md:gap-10">
        <div className="py-6">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-bold tracking-[1.3px] text-accent"><span className="size-[7px] rounded-full bg-emerald-400 ring-4 ring-emerald-100" />YOUR WORK, IN ONE PLACE</div>
          <h1 className="font-display text-[clamp(34px,8vw,51px)] font-bold leading-[1.15] tracking-[-2px]">Good work happens<br />when teams <span className="text-accent">find their flow.</span></h1>
          <p className="mb-6 mt-5 max-w-[470px] text-[13px] leading-7 text-muted md:text-[15px]">Make space for the work that matters. Explore projects, stay close to your team, and turn your next big idea into progress.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/projects" className="inline-flex min-h-[42px] items-center gap-4 rounded-lg bg-accent px-4 text-xs font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-accent-strong">Explore projects <span>→</span></Link>
            <Link href="/dashboard" className="inline-flex min-h-[42px] items-center gap-4 rounded-lg border border-line bg-surface px-4 text-xs font-bold transition hover:-translate-y-0.5 hover:border-accent">Go to dashboard <span>↗</span></Link>
          </div>
          <div className="mt-9 flex items-center gap-3 text-[11px] text-muted"><div className="flex -space-x-1"><span className="grid size-8 place-items-center rounded-full border-2 border-surface bg-rose-100 text-[10px] font-bold text-rose-700">MC</span><span className="grid size-8 place-items-center rounded-full border-2 border-surface bg-blue-100 text-[10px] font-bold text-blue-700">JL</span><span className="grid size-8 place-items-center rounded-full border-2 border-surface bg-emerald-100 text-[10px] font-bold text-emerald-700">PS</span><span className="grid size-8 place-items-center rounded-full border-2 border-surface bg-purple-100 text-[10px] font-bold text-purple-700">+8</span></div>Teams move better, together.</div>
        </div>
      </section>
      <section className="mt-10 border-t border-line pt-8 md:mt-4 md:pt-10">
        <div className="mb-5 flex items-end justify-between"><div><p className="mb-1.5 text-[10px] font-bold tracking-[1.3px] text-accent">A LITTLE MOMENTUM</p><h2 className="font-display text-xl font-bold tracking-tight md:text-[22px]">Projects in motion</h2></div><Link href="/projects" className="text-[11px] font-bold text-accent">All projects <span className="ml-1">→</span></Link></div>
        <div className="grid gap-4 md:grid-cols-3">{projects.slice(0, 3).map((project) => (
          <Link href={`/projects/${project.id}`} className="rounded-xl border border-line bg-surface p-5 transition hover:-translate-y-1 hover:shadow-lg" key={project.id}>
            <span className={`grid size-10 place-items-center rounded-xl font-display text-sm font-extrabold ${projectColors[project.color]}`}>{project.initials.slice(0, 1)}</span>
            <span className="mt-3 block font-display text-[13px] font-bold">{project.name}</span><span className="mt-1 block text-[10px] text-muted">{project.category}</span>
            <span className="mt-4 block h-[5px] overflow-hidden rounded-full bg-surface-soft"><span className="block h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-300" style={{ width: `${project.progress}%` }} /></span>
            <span className="mt-2 flex justify-between text-[10px] text-muted">{project.progress}% complete <span>{project.dueDate}</span></span>
          </Link>
        ))}</div>
      </section>
    </div>
  );
}
