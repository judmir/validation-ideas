"use client";
import Link from "next/link";
import type { NightRun } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { usePersistedMany, valKey } from "@/lib/store";
import { testNumbers } from "@/lib/status";
import type { TestMeta } from "./IdeaBoard";
import { TestList } from "./TestList";
import { BlockedChip, SourceBars, StepPills } from "./NightParts";
import { IconChevronRight } from "./icons";

export type TestRow = TestMeta & { name: string; night: string };

/** "Last night" card: steps, counts, posts by source; right tile = validation tests won/lost/open. */
export default function NightStatusCard({ night, winnerName, tests }: {
  night: NightRun; winnerName: string | null; tests: TestRow[];
}) {
  const [vals, loaded] = usePersistedMany(tests.map((t) => valKey(t.id)), tests.map((t) => t.initial));
  const rows = tests.map((t, i) => ({ t, v: vals[i], n: testNumbers(vals[i]) }));
  const won = rows.filter((r) => r.v.status === "finished" && r.n.call === "strong");
  return (
    <section aria-labelledby="last-night" className="grid gap-3 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
      <div className="min-w-0 rounded-[22px] bg-tile p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="label">Last night</div>
            <h2 id="last-night" className="mt-1 text-[22px] font-semibold leading-tight tracking-tight text-zinc-50">{winnerName ? <>Top pick: {winnerName}</> : "No top pick tonight"}</h2>
            <p className="mt-1 text-[13px] text-zinc-400">{formatDate(night.date)} · {night.niches.join(" + ")}</p>
          </div>
          <Link href="/nights/" className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-white/[0.08] px-3.5 py-1.5 text-[12px] font-semibold text-zinc-100 transition-colors hover:bg-white/[0.14]">All nights <IconChevronRight size={12} /></Link>
        </div>
        <div className="mt-4"><StepPills steps={night.steps} /></div>
        <div className="mt-5 grid gap-5 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="flex gap-3 sm:flex-col">
            <Count n={night.scout.scanned} label="posts scanned" dot="bg-warm" />
            <Count n={night.scout.candidates} label="candidates" dot="bg-accent-light" />
            <Count n={night.scout.deepScored} label="deep-scored" />
          </div>
          <div className="min-w-0">
            <div className="mb-2 text-[12px] text-zinc-400">Posts by source</div>
            <SourceBars bySource={night.scout.bySource} />
            <div className="mt-3"><BlockedChip blocked={night.scout.blocked} /></div>
          </div>
        </div>
      </div>
      <div className="flex min-w-0 flex-col rounded-[22px] bg-tile p-5 sm:p-6">
        <div className="text-[13px] text-zinc-400">Validated winners</div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[56px] font-medium leading-none tracking-tight tabular-nums text-zinc-50">{loaded ? won.length : "–"}</span>
          <span className="text-[13px] font-medium text-zinc-300">of {tests.length} top picks</span>
        </div>
        <div className="mt-4"><TestList rows={rows} loaded={loaded} /></div>
        <p className="mt-auto pt-3 text-[12px] leading-relaxed text-zinc-400">A test wins when more than 3% of visitors click the price; under 1% kills it.</p>
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
