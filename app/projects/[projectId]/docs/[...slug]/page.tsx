import { notFound } from "next/navigation";
import { loadProject } from "@/lib/projects";

export default async function ProjectDocsPage({ params }: { params: Promise<{ projectId: string; slug: string[] }> }) {
  const { projectId, slug } = await params;
  const project = await loadProject(projectId);
  if (!project) notFound();
  const path = slug.join("/");
  return <article className="min-h-[260px] rounded-xl border border-line bg-surface p-5"><p className="mb-3 text-[10px] font-bold tracking-[1.3px] text-accent">PROJECT DOCUMENTATION</p><h2 className="font-display text-xl font-bold capitalize">{slug.at(-1)?.replaceAll("-", " ")}</h2><p className="mt-3 text-[11px] leading-6 text-muted">You are viewing <strong className="text-ink">{project.name}</strong> documentation at <code className="rounded bg-surface-soft px-1.5 py-0.5 text-[10px] text-accent">{`/docs/${path}`}</code>.</p><div className="my-6 flex gap-3 rounded-lg bg-accent-soft p-4 text-accent-strong"><span>✦</span><div><strong className="text-[11px]">Keep the context close</strong><p className="mt-1 text-[10px] leading-5 text-muted">Project guides, decisions, and resources live alongside the work they support.</p></div></div><div className="grid gap-2 border-t border-line pt-4"><span className="text-[9px] text-muted">Full documentation path</span><strong className="text-[10px]">{`/projects/${projectId}/docs/${path}`}</strong></div></article>;
}
