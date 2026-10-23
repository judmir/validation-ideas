import IdeaBoard, { type NightMeta } from "@/components/IdeaBoard";
import NightStatusCard from "@/components/NightStatusCard";
import { StatCell } from "@/components/ui";
import { ALL_IDEAS, LAST_WINNER, LEGACY, LEGACY_NIGHTS, LEGACY_ROWS, NIGHTS, US_ROWS, findIdea } from "@/lib/mock";
import { BEST_THIS_WEEK, NEAR_MISSES, NIGHTS_SINCE_WINNER, US_COMPLAINTS, nightSummary } from "@/lib/mock/derived";

export default function Home() {
  const last = NIGHTS[0];
  const winner = last.builder.winnerPainId ? findIdea(last.builder.winnerPainId) : null;
  const nights: NightMeta[] = [
    ...NIGHTS.map((n) => ({ date: n.date, market: "US" as const, label: n.label ?? "US run", summary: nightSummary(n.date), winnerPainId: n.builder.winnerPainId, note: n.note })),
    ...LEGACY_NIGHTS.map((n) => ({
      date: n.date, market: "DE" as const, label: n.label,
      summary: `${n.complaints != null ? `${n.complaints} complaints → ` : ""}${LEGACY.filter((p) => p.night === n.date).length} pains · ${n.note}`,
      winnerPainId: n.winner,
    })),
  ].sort((a, b) => b.date.localeCompare(a.date) || (a.market === "US" ? -1 : 1));
  const niches = [...new Set(ALL_IDEAS.map((i) => i.niche))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[32px]">Ideas</h1>
        <p className="mt-1 text-[15px] text-zinc-400">Every pain the nightly pipeline scored, grouped by night or by outcome. Scores are out of 25; the bar is 18.</p>
      </div>
      <NightStatusCard night={last} winnerName={winner ? winner.name ?? winner.painId : null} sinceWinner={NIGHTS_SINCE_WINNER} lastWinner={LAST_WINNER} usNights={NIGHTS.length} />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCell label="US complaints" value={US_COMPLAINTS} unit={`in ${NIGHTS.length} runs`} />
        <StatCell label="US pains" value={ALL_IDEAS.length} unit="scored" />
        <StatCell label="Near-misses" value={NEAR_MISSES} unit="15–17" />
        <StatCell label="Best score this week" value={BEST_THIS_WEEK.scores.total} unit={`/25 · ${BEST_THIS_WEEK.painId}`} />
      </div>
      <IdeaBoard rows={US_ROWS} legacyRows={LEGACY_ROWS} nights={nights} niches={niches} sinceWinner={NIGHTS_SINCE_WINNER} lastWinnerDate={LAST_WINNER.date} />
    </div>
  );
}
