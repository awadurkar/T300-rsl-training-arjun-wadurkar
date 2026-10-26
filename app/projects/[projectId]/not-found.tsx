import Link from "next/link";

export default function ProjectNotFound() {
  return <div className="flex min-h-[340px] flex-col items-center justify-center text-center"><span className="mb-3 grid size-10 place-items-center rounded-xl bg-orange-100 font-display font-bold text-orange-700">?</span><h2 className="font-display text-[17px] font-bold">Project not found</h2><p className="mb-4 mt-1 text-[11px] text-muted">This project may have moved, or the link may be out of date.</p><Link className="inline-flex min-h-10 items-center rounded-lg bg-accent px-4 text-xs font-bold text-white hover:bg-accent-strong" href="/projects">Back to projects</Link></div>;
}
