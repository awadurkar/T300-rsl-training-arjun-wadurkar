"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/settings", label: "Settings" }
];

export function Topbar() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("project-explorer-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, []);

  function toggleTheme() {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    window.localStorage.setItem("project-explorer-theme", nextDark ? "dark" : "light");
  }

  return (
    <header className="sticky top-0 z-20 flex min-h-[72px] items-center justify-between border-b border-line bg-surface px-5 md:px-[5.2vw]">
      <Link className="flex items-center gap-2.5 font-display text-[17px] font-extrabold tracking-[-.7px]" href="/" aria-label="Project Explorer home">
        <span className="grid size-[30px] place-items-center rounded-[10px] bg-accent text-xl font-extrabold text-white">p</span>
        <span>project<span className="font-medium text-muted">space</span></span>
      </Link>
      <nav className="order-3 flex h-[42px] w-full items-center justify-around border-t border-line px-3 md:order-none md:h-full md:w-auto md:gap-1 md:border-0" aria-label="Main navigation">
        {links.map(({ href, label }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link className={`flex h-full items-center px-2 text-[10px] font-semibold transition-colors hover:text-accent-strong md:relative md:px-3.5 md:text-[13px] ${active ? "text-accent-strong md:after:absolute md:after:inset-x-3.5 md:after:bottom-0 md:after:h-0.5 md:after:rounded-t md:after:bg-accent" : "text-muted"}`} href={href} key={href}>
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="flex items-center gap-2 md:gap-[18px]">
        <button className="rounded-lg p-2 text-xl text-muted hover:bg-accent-soft hover:text-accent" onClick={toggleTheme} aria-label="Toggle color theme">
          {dark ? "☀" : "◐"}
        </button>
        <div className="flex items-center gap-2 text-xs font-semibold"><span className="grid size-[29px] place-items-center rounded-full border-2 border-surface bg-[#e9e6ff] text-[10px] font-bold text-[#5549bb]">AW</span><span className="hidden md:inline">Arjun Wadurkar</span></div>
      </div>
    </header>
  );
}
