import IdeaBoard, { type NightMeta } from "@/components/IdeaBoard";
import NightStatusCard from "@/components/NightStatusCard";
import { ALL_IDEAS, NIGHTS, ROWS, findIdea, ideasOfNight } from "@/lib/mock";
import { AVG_TOP, IDEAS_SCOUTED, RUN_COUNT, nightSummary } from "@/lib/mock/derived";
import { TESTS } from "@/lib/mock/tests";

export default function Home() {
  const last = NIGHTS[0];
  const winner = last.builder.winnerId ? findIdea(last.builder.winnerId) : null;
  const nights: NightMeta[] = NIGHTS.map((n) => ({ date: n.date, label: n.label, headline: nightSummary(n.date), summary: n.summary, winnerId: n.builder.winnerId }));
  const niches = [...new Set(ALL_IDEAS.map((i) => i.niche))];
  const topScores = [...NIGHTS].reverse().map((n) => { const t = ideasOfNight(n.date)[0]; return { date: n.date, id: t.id, name: t.name, score: t.scores.total }; });
  const tests = TESTS.map(({ id, initial, budgetEur }) => ({ id, initial, budgetEur }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[32px]">Ideas</h1>
        <p className="mt-1 text-[15px] text-zinc-400">Every idea the nightly scout scored, grouped by night or by outcome. Scores are out of 100; the bar is 75.</p>
      </div>
      <NightStatusCard night={last} winnerName={winner?.name ?? null} tests={TESTS} />
      <IdeaBoard rows={ROWS} nights={nights} niches={niches} tests={tests} ideasScouted={IDEAS_SCOUTED} runCount={RUN_COUNT} avgTop={AVG_TOP} topScores={topScores} />
    </div>
  );
}
