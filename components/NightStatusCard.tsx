import Link from "next/link";
import type { NightRun } from "@/lib/types";
import { formatDate, shortDate } from "@/lib/format";
import { BlockedChip, SourceBars, StepPills } from "./NightParts";
import { IconChevronRight } from "./icons";

/** "Last night" card: steps, counts by source, blocked sources, nights since the last winner. */
export default function NightStatusCard({ night, winnerName, sinceWinner, lastWinner, usNights }: {
  night: NightRun; winnerName: string | null; sinceWinner: number; lastWinner: { date: string; name: string }; usNights: number;
}) {
  // Winner night + every night since (calendar days; Germany and US runs share nights).
  const streak = Array.from({ length: sinceWinner + 1 }, (_, i) => {
    const d = new Date(lastWinner.date + "T12:00:00Z");
    d.setUTCDate(d.getUTCDate() + i);
    return d.toISOString().slice(0, 10);
  });
  return (
    <section aria-labelledby="last-night" className="grid gap-3 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
      <div className="min-w-0 rounded-[22px] bg-tile p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="label">Last night · US</div>
            <h2 id="last-night" className="mt-1 text-[22px] font-semibold leading-tight tracking-tight text-zinc-50">{winnerName ? <>Winner: {winnerName}</> : "No winner tonight"}</h2>
            <p className="mt-1 text-[13px] text-zinc-400">{formatDate(night.date)} · {night.niches.join(" + ")}</p>
          </div>
          <Link href="/nights/" className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-white/[0.08] px-3.5 py-1.5 text-[12px] font-semibold text-zinc-100 transition-colors hover:bg-white/[0.14]">All nights <IconChevronRight size={12} /></Link>
        </div>
        <div className="mt-4"><StepPills steps={night.steps} /></div>
        <div className="mt-5 grid gap-5 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="flex gap-3 sm:flex-col">
            <Count n={night.scout.complaints} label="complaints" dot="bg-warm" />
            <Count n={night.scout.provenModels} label="proven models" dot="bg-accent-light" />
            <Count n={night.analyst.newPainIds.length} label="new pains" />
          </div>
          <div className="min-w-0">
            <div className="mb-2 text-[12px] text-zinc-400">Complaints by source</div>
            <SourceBars bySource={night.scout.bySource} />
            <div className="mt-3"><BlockedChip blocked={night.scout.blocked} /></div>
          </div>
        </div>
      </div>
      <div className="flex min-w-0 flex-col rounded-[22px] bg-tile p-5 sm:p-6">
        <div className="text-[13px] text-zinc-400">Nights since last winner</div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[56px] font-medium leading-none tracking-tight tabular-nums text-zinc-50">{sinceWinner}</span>
          <span className="text-[13px] font-medium text-zinc-300">nights</span>
        </div>
        <ol className="mt-4 flex gap-1" aria-label={`${sinceWinner} nights without a winner`}>
          {streak.map((d, i) => (
            <li key={d} className="min-w-0 flex-1">
              <span className={`block h-2.5 rounded-full ${i === 0 ? "bg-warm" : "bg-white/[0.1]"}`} />
              <span className={`mt-1.5 block text-center text-[11px] tabular-nums ${i === 0 ? "font-semibold text-[#fdba74]" : "text-zinc-400"}`}>{shortDate(d)}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[13px] leading-relaxed text-zinc-300">
          Last winner: <b className="font-semibold text-zinc-50">{lastWinner.name}</b>, {shortDate(lastWinner.date)} (Germany run, later killed by its stress test).
        </p>
        <p className="mt-auto pt-3 text-[12px] leading-relaxed text-zinc-400">{night.note ? night.note + ". " : ""}No US run has produced a winner yet ({usNights} of {usNights}). The bar and veto are working as designed.</p>
      </div>
    </section>
  );
}

function Count({ n, label, dot }: { n: number; label: string; dot?: string }) {
  return (
    <div className="min-w-0 flex-1 rounded-2xl bg-tile-2 px-3.5 py-3 sm:flex-none">
      <div className="text-[26px] font-medium leading-none tracking-tight tabular-nums text-zinc-50">{n}</div>
      <div className="mt-1.5 flex items-start gap-1.5 text-[12px] leading-tight text-zinc-400">{dot && <span className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} aria-hidden />}<span>{label}</span></div>
    </div>
  );
}
