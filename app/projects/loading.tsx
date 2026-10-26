export default function ProjectsLoading() {
  return <div className="mx-auto w-[calc(100%-36px)] max-w-[1120px] pt-14 md:w-[calc(100%-64px)]"><div className="h-3 w-32 animate-pulse rounded bg-line" /><div className="mb-7 mt-4 h-9 w-60 animate-pulse rounded bg-line" /><div className="grid gap-4 md:grid-cols-2">{[1, 2, 3, 4].map((item) => <div className="h-56 animate-pulse rounded-xl border border-line bg-surface" key={item} />)}</div></div>;
}
