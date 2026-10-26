import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

const values = [
  ["01", "Clarity over clutter", "See the work, the people, and the next step without hunting across tools."],
  ["02", "Progress you can feel", "Turn big goals into visible milestones and keep momentum moving."],
  ["03", "Better, together", "Keep collaboration close to the work, where good ideas can grow."]
];

export default function AboutPage() {
  return (
    <div className="mx-auto min-h-[calc(100vh-72px)] w-[calc(100%-36px)] max-w-[1120px] py-12 md:w-[calc(100%-64px)] md:py-[70px]">
      <p className="mb-3 text-[10px] font-bold tracking-[1.3px] text-accent">A BETTER WAY TO WORK</p>
      <h1 className="font-display text-4xl font-bold leading-tight tracking-[-2px] md:text-[44px]">Projects feel lighter<br />when everything <span className="text-accent">has a place.</span></h1>
      <p className="mb-10 mt-5 max-w-[650px] text-[13px] leading-7 text-muted md:text-[15px]">ProjectSpace brings people, plans, and progress together in one thoughtful workspace—so every team can focus on what they do best.</p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">{values.map(([number, title, description]) => <article className="min-h-[180px] rounded-xl border border-line bg-surface p-6" key={number}><span className="text-[11px] font-bold tracking-widest text-accent">{number}</span><h2 className="mb-2 mt-7 font-display text-base font-bold">{title}</h2><p className="text-xs leading-6 text-muted">{description}</p></article>)}</div>
    </div>
  );
}
