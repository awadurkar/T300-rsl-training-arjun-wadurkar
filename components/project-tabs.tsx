"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const sections = [
  { path: "", label: "Overview" },
  { path: "/team", label: "Team" },
  { path: "/tasks", label: "Tasks" },
  { path: "/activity", label: "Activity" },
  { path: "/docs/guide", label: "Docs" }
];

export function ProjectTabs({ projectId }: { projectId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <nav className="flex gap-5 overflow-x-auto border-b border-line md:gap-6" aria-label="Project sections">
      {sections.map(({ path, label }) => {
        const href = `/projects/${projectId}${path}${searchParams.size ? `?${searchParams.toString()}` : ""}`;
        const active = path
          ? pathname.startsWith(`/projects/${projectId}${path.split("/")[1] === "docs" ? "/docs" : path}`)
          : pathname === `/projects/${projectId}`;
        return <Link className={`relative shrink-0 py-3 text-[11px] font-semibold ${active ? "text-accent after:absolute after:inset-x-0 after:bottom-[-1px] after:h-0.5 after:rounded after:bg-accent" : "text-muted hover:text-accent"}`} href={href} key={label}>{label}</Link>;
      })}
    </nav>
  );
}
