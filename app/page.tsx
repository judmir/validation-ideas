import RunList from "@/components/RunList";

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <div className="label">Dashboard</div>
        <h1 className="mt-1.5 text-[26px] font-semibold tracking-tight text-zinc-50">Scout log</h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
          One entry per day from the <span className="font-medium text-zinc-200">App Ideas bot</span>, three scored ideas each. The top pick gets a demo, a validation page and the full <span className="font-medium text-zinc-200">Scout → Validate → Report</span> flow.
        </p>
      </div>
      <RunList />
    </div>
  );
}
