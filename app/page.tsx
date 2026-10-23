import RunList from "@/components/RunList";

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Scout log</h1>
        <p className="mt-1 text-sm text-slate-600">
          One entry per day from the <span className="font-medium text-slate-800">App Ideas bot</span>, three scored ideas each. The top pick gets a demo, a validation page and the full <span className="font-medium">Scout → Validate → Report</span> flow.
        </p>
      </div>
      <RunList />
    </div>
  );
}
