import RunList from "@/components/RunList";
import { ALL_IDEAS, RUNS } from "@/lib/data";
import { StatTile } from "@/components/ui";
import { InsightCard, ScoreTrends, TopPickTile, ValidationsTile } from "@/components/Overview";
import { IconCalendar, IconHourglass, IconLayers } from "@/components/icons";

export default function Home() {
  const tops = RUNS.map((r) => r.ideas[0].score);
  const avgTop = Math.round(tops.reduce((a, b) => a + b, 0) / tops.length);
  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-[30px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[36px]">Hello, Judi!</h1>
        <p className="mt-1 text-[15px] text-zinc-400">Here&apos;s your weekly scout overview</p>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_272px] lg:gap-4 xl:grid-cols-[minmax(0,1fr)_288px]">
        <div className="grid min-w-0 content-start gap-3 lg:gap-4">
          <div className="grid grid-cols-2 gap-3 lg:gap-4 xl:grid-cols-4">
            <StatTile icon={<IconCalendar size={18} />} tone="light" value={RUNS.length} unit="runs" label="Scout runs" />
            <StatTile icon={<IconLayers size={18} />} value={ALL_IDEAS.length} unit="ideas" label="Ideas scored" />
            <StatTile icon={<IconHourglass size={18} />} value={avgTop} unit="pts" label="Avg. top score" />
            <ValidationsTile />
          </div>
          <ScoreTrends />
        </div>
        <div className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4">
          <TopPickTile />
          <InsightCard />
        </div>
      </div>

      <section id="log" className="scroll-mt-20">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-[20px] font-semibold tracking-tight text-zinc-50">Daily scout log</h2>
            <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-zinc-400">One entry per day from the App Ideas bot, three scored ideas each. The top pick gets a demo, a validation page and the full Scout → Validate → Report flow.</p>
          </div>
        </div>
        <RunList />
      </section>
    </div>
  );
}
