import ScoutTimeline, { type LegacyNight, type NightMeta } from "@/components/ScoutTimeline";
import { ALL_IDEAS, LAST_WINNER, LEGACY, LEGACY_NIGHTS, NIGHTS, ideasOfNight } from "@/lib/mock";
import { BEST_THIS_WEEK, NIGHTS_SINCE_WINNER, US_COMPLAINTS, US_WINNER_NOTE } from "@/lib/mock/derived";
import { TESTS } from "@/lib/mock/tests";
import { shortDate } from "@/lib/format";
import { GATE_LABEL, failedGates } from "@/lib/verdict";

const shortDesc = (s: string) => {
  const first = s.replace(/\s*\([^)]*\)/g, "").split(/[:;]|\.\s/)[0].replace(/\.$/, "").trim();
  return first.length > 70 ? first.slice(0, 67).trimEnd() + "…" : first;
};

export default function Home() {
  const nights: NightMeta[] = NIGHTS.map((n) => {
    const ideas = ideasOfNight(n.date);
    // DinnerList (simulated winner) leads its night so its demo is the top card.
    const ordered = [...ideas.filter((i) => i.demo || i.verdict === "winner"), ...ideas.filter((i) => !i.demo && i.verdict !== "winner")];
    return {
      date: n.date, label: n.label ?? null,
      line: `${n.scout.complaints} complaints + ${n.scout.provenModels} proven models · ${n.niches.join(" + ")}${n.builder.winnerPainId ? "" : " · no winner"}.`,
      pains: ordered.map((i, k) => ({
        id: i.painId, title: i.name ?? i.label ?? shortDesc(i.description), sub: i.pitch ?? i.who,
        score: i.scores.total, verdict: i.verdict, veto: i.competitor_veto, demo: !!i.demo, rank: k + 1, linkable: true,
        failedGates: failedGates(i).map((g) => ({ label: GATE_LABEL[g], text: i.gates[g].text })),
      })),
    };
  });
  const legacy: LegacyNight[] = LEGACY_NIGHTS.map((n) => ({
    date: n.date, label: n.label, note: n.note,
    // The pitched winner (Fristly) leads its night; then by score.
    pains: LEGACY.filter((p) => p.night === n.date).sort((a, b) => Number(b.pitched) - Number(a.pitched) || b.scores.total - a.scores.total).map((p, k) => ({
      id: p.painId, title: p.name ?? shortDesc(p.description), sub: p.who, score: p.scores.total, verdict: p.verdict,
      veto: false, demo: false, rank: k + 1, linkable: false, pitched: p.pitched, failedGates: [],
    })),
  }));
  const dates = [...new Set([...NIGHTS.map((n) => n.date), ...LEGACY_NIGHTS.map((n) => n.date)])].sort();
  const chart = dates.map((d) => {
    const us = ideasOfNight(d)[0];
    const de = LEGACY.filter((p) => p.night === d).sort((a, b) => b.scores.total - a.scores.total)[0];
    const useUs = us && (!de || us.scores.total >= de.scores.total);
    return { date: d, score: useUs ? us.scores.total : de.scores.total, id: useUs ? us.painId : null };
  });
  const stats = {
    pains: ALL_IDEAS.length, runs: NIGHTS.length, sinceWinner: NIGHTS_SINCE_WINNER, usWinnerNote: US_WINNER_NOTE, complaints: US_COMPLAINTS,
    best: { score: BEST_THIS_WEEK.scores.total, id: BEST_THIS_WEEK.painId }, lastWinner: `${LAST_WINNER.name}, ${shortDate(LAST_WINNER.date)}`,
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[32px]">Scouts</h1>
        <p className="mt-1 text-[15px] text-zinc-400">Every pain the nightly pipeline scored. Scores are out of 25; the bar is 18.</p>
      </div>
      <ScoutTimeline nights={nights} legacy={legacy} tests={TESTS} stats={stats} chart={chart} />
    </div>
  );
}
