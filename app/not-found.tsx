import Link from "next/link";

export default function NotFound() {
  return <div className="mx-auto flex min-h-[calc(100vh-72px)] w-[calc(100%-36px)] max-w-[1120px] flex-col items-center justify-center pb-16 pt-9 text-center md:w-[calc(100%-64px)]"><div className="mb-5 grid size-12 place-items-center rounded-2xl bg-orange-100 font-display text-[17px] font-bold text-orange-700">404</div><p className="mb-2 text-[10px] font-bold tracking-[1.3px] text-accent">THIS PATH TOOK A DETOUR</p><h1 className="max-w-[510px] font-display text-3xl font-bold tracking-tight">We can't find that page.</h1><p className="mb-6 mt-3 max-w-[440px] text-xs leading-6 text-muted">Let's get you back to the projects and people you were looking for.</p><Link className="inline-flex min-h-[42px] items-center gap-3 rounded-lg bg-accent px-4 text-xs font-bold text-white hover:bg-accent-strong" href="/">Back home <span>→</span></Link></div>;
}
