import ScoutTimeline, { type RunMeta } from "@/components/ScoutTimeline";
import { NIGHTS, ideasOfNight } from "@/lib/mock";
import { AVG_TOP, IDEAS_SCOUTED } from "@/lib/mock/derived";
import { TESTS } from "@/lib/mock/tests";

export default function Home() {
  const runs: RunMeta[] = NIGHTS.map((n) => ({
    date: n.date, summary: n.summary,
    ideas: ideasOfNight(n.date).map((i) => ({ id: i.id, name: i.name, pitch: i.pitch, score: i.scores.total, rank: i.rank })),
  }));
  const tests = TESTS.map(({ id, initial, budgetEur }) => ({ id, initial, budgetEur }));
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[32px]">Scouts</h1>
        <p className="mt-1 text-[15px] text-zinc-400">Every idea the App Ideas bot is scouting, testing or has reported on.</p>
      </div>
      <ScoutTimeline runs={runs} tests={tests} ideasScouted={IDEAS_SCOUTED} avgTop={AVG_TOP} />
    </div>
  );
}
