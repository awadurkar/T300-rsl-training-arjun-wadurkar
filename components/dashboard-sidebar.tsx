import Link from "next/link";

const dashboardLinks = [
  { href: "/dashboard", label: "Overview", icon: "⌂" },
  { href: "/dashboard/analytics", label: "Analytics", icon: "◷" },
  { href: "/dashboard/team", label: "Team", icon: "♧" }
];

export function DashboardSidebar() {
  return (
    <aside className="flex items-center gap-1 overflow-x-auto border-b border-line bg-surface p-2.5 md:block md:border-r md:border-b-0 md:px-4 md:py-8">
      <p className="mb-2 ml-2.5 hidden text-[9px] font-bold tracking-[1.1px] text-muted md:block">WORKSPACE</p>
      {dashboardLinks.map((item) => (
        <Link className="flex min-h-[39px] shrink-0 items-center gap-2.5 rounded-lg px-2.5 text-[10px] font-semibold text-muted hover:bg-accent-soft hover:text-accent md:text-[11px]" href={item.href} key={item.href}>
          <span aria-hidden="true" className="w-[17px] text-center text-[15px]">{item.icon}</span>{item.label}
        </Link>
      ))}
      <div className="hidden md:mt-8 md:block">
        <p className="mb-2 ml-2.5 text-[9px] font-bold tracking-[1.1px] text-muted">YOUR PROJECTS</p>
        <Link className="flex min-h-[39px] items-center gap-2.5 rounded-lg px-2.5 text-[11px] font-semibold text-muted hover:bg-accent-soft hover:text-accent" href="/projects/1"><span className="size-2 rounded-full bg-violet-400" />Atlas Design System</Link>
        <Link className="flex min-h-[39px] items-center gap-2.5 rounded-lg px-2.5 text-[11px] font-semibold text-muted hover:bg-accent-soft hover:text-accent" href="/projects/2"><span className="size-2 rounded-full bg-blue-400" />Customer Portal</Link>
        <Link className="flex min-h-[39px] items-center gap-2.5 rounded-lg px-2.5 text-[11px] font-semibold text-muted hover:bg-accent-soft hover:text-accent" href="/projects/4"><span className="size-2 rounded-full bg-orange-400" />Mobile Onboarding</Link>
      </div>
    </aside>
  );
}
