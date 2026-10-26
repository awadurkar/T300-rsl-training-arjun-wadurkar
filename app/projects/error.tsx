"use client";

export default function ProjectsError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="mx-auto flex min-h-[calc(100vh-72px)] w-[calc(100%-36px)] max-w-[1120px] flex-col items-center justify-center pb-16 pt-9 text-center md:w-[calc(100%-64px)]"><div className="mb-5 grid size-12 place-items-center rounded-2xl bg-orange-100 font-display font-bold text-orange-700">!</div><p className="mb-2 text-[10px] font-bold tracking-[1.3px] text-accent">A SMALL SETBACK</p><h1 className="max-w-[510px] font-display text-3xl font-bold tracking-tight">We couldn't load this project.</h1><p className="mb-6 mt-3 max-w-[440px] text-xs leading-6 text-muted">The project service may be taking a breather. Your workspace is safe—try again in a moment.</p><button className="inline-flex min-h-[42px] items-center gap-3 rounded-lg bg-accent px-4 text-xs font-bold text-white hover:bg-accent-strong" onClick={reset}>Try again <span>↻</span></button></div>;
}
