import Link from "next/link";
import RunList from "@/components/RunList";
import { ALL_IDEAS, RUNS } from "@/lib/data";
import { StatCard, btn } from "@/components/ui";
import { IconArrowRight, IconBulb, IconCalendar, IconChart, IconLayers } from "@/components/icons";

export default function Home() {
  const latest = [...RUNS].sort((a, b) => b.date.localeCompare(a.date))[0];
  const tops = RUNS.map((r) => r.ideas[0].score);
  const avgTop = Math.round(tops.reduce((a, b) => a + b, 0) / tops.length);
  const short = new Date(latest.date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-[22px] font-medium tracking-tight text-zinc-50">Scout log</h1>
          <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-zinc-400">
            One entry per day from the <span className="text-zinc-200">App Ideas bot</span>, three scored ideas each. The top pick gets a demo, a validation page and the full <span className="text-zinc-200">Scout → Validate → Report</span> flow.
          </p>
        </div>
        <Link href={`/idea/${latest.ideas[0].id}/`} className={btn.ghost}>Latest top pick <IconArrowRight size={14} /></Link>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <StatCard icon={<IconCalendar size={20} />} label="Scout runs" value={RUNS.length} />
        <StatCard icon={<IconLayers size={20} />} label="Ideas scored" value={ALL_IDEAS.length} />
        <StatCard icon={<IconChart size={20} />} label="Avg. top score" value={avgTop} />
        <StatCard icon={<IconBulb size={20} />} label="Latest run" value={short} />
      </div>

      <RunList />
    </div>
  );
}
