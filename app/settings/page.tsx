"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [weekly, setWeekly] = useState(true);
  const [mentions, setMentions] = useState(true);
  return (
    <div className="mx-auto min-h-[calc(100vh-72px)] w-[calc(100%-36px)] max-w-[820px] py-12 md:w-[calc(100%-64px)] md:py-[70px]">
      <p className="mb-3 text-[10px] font-bold tracking-[1.3px] text-accent">MAKE IT YOURS</p><h1 className="font-display text-4xl font-bold tracking-tight">Settings</h1>
      <p className="mb-9 mt-4 max-w-[650px] text-[13px] leading-7 text-muted">A few small choices to make your workspace feel like yours.</p>
      <section className="rounded-xl border border-line bg-surface p-5 md:p-7"><div><h2 className="font-display text-[17px] font-bold">Notifications</h2><p className="mt-1 text-xs text-muted">Choose what you hear about.</p></div>
        <label className="flex cursor-pointer items-center justify-between gap-4 border-t border-line py-5"><span><strong className="block text-xs">Weekly project digest</strong><small className="mt-1 block text-[11px] text-muted">A Monday recap of progress and what's next.</small></span><input className="size-5 accent-accent" type="checkbox" checked={weekly} onChange={(event) => { setWeekly(event.target.checked); setSaved(false); }} /></label>
        <label className="flex cursor-pointer items-center justify-between gap-4 border-t border-line py-5"><span><strong className="block text-xs">Mentions and updates</strong><small className="mt-1 block text-[11px] text-muted">When someone mentions you or shares an update.</small></span><input className="size-5 accent-accent" type="checkbox" checked={mentions} onChange={(event) => { setMentions(event.target.checked); setSaved(false); }} /></label>
        <div className="flex flex-col items-start justify-between gap-4 border-t border-line pt-4 text-[11px] text-muted sm:flex-row sm:items-center"><span>{saved ? "Your preferences are saved." : "Your preferences are stored for this session."}</span><button className="min-h-[42px] rounded-lg bg-accent px-4 text-xs font-bold text-white hover:bg-accent-strong" onClick={() => setSaved(true)}>Save preferences</button></div>
      </section>
    </div>
  );
}
