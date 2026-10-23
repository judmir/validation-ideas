import Link from "next/link";
import NightCard from "@/components/NightCard";
import { Timeline, TimelineNode } from "@/components/Timeline";
import { ALL_IDEAS, LAST_WINNER, LEGACY_NIGHTS, NIGHTS, PITCHED, findIdea, ideasOfNight } from "@/lib/mock";
import { NIGHTS_SINCE_WINNER } from "@/lib/mock/derived";
import { formatDate, shortDate, weekday, wk } from "@/lib/format";

export const metadata = { title: "Nights · Validation Ideas" };

export default function NightsPage() {
  const growth = ALL_IDEAS.map((i) => ({ i, d: i.week_over_week.this_week - i.week_over_week.last_week })).sort((a, b) => b.d - a.d || b.i.week_over_week.this_week - a.i.week_over_week.this_week);
  const w = ALL_IDEAS[0].week_over_week;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[32px]">Nights</h1>
        <p className="mt-1 text-[15px] text-zinc-400">Each night&apos;s run: scout 00:30, analyst 03:00, builder 04:30, brief 07:30.</p>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <section className="flex flex-col rounded-[22px] bg-tile p-5 sm:p-6">
          <div className="text-[13px] text-zinc-400">Nights since last winner</div>
          <div className="mt-2 flex items-baseline gap-2"><span className="text-[56px] font-medium leading-none tracking-tight tabular-nums text-zinc-50">{NIGHTS_SINCE_WINNER}</span><span className="text-[13px] font-medium text-zinc-300">nights</span></div>
          <p className="mt-3 text-[13px] leading-relaxed text-zinc-300">Last winner: <b className="font-semibold text-zinc-50">{LAST_WINNER.name}</b> ({LAST_WINNER.painId}), {shortDate(LAST_WINNER.date)}, Germany run, later killed by its stress test.</p>
          <p className="mt-auto pt-3 text-[12px] text-zinc-400">US runs: {NIGHTS.length}, winners: 0.</p>
        </section>
        <section className="min-w-0 rounded-[22px] bg-tile p-5 sm:p-6" aria-labelledby="wow">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="wow" className="text-[17px] font-semibold tracking-tight text-zinc-50">Week-over-week cluster growth</h2>
            <span className="text-[12px] text-zinc-400">complaints by post date · {wk(w.last_week_iso)} → {wk(w.this_week_iso)}</span>
          </div>
          <div className="mt-3 max-h-[300px] overflow-y-auto rounded-2xl bg-tile-2">
            <table className="w-full table-fixed text-left text-[13px]">
              <thead className="sticky top-0 bg-tile-2 text-[11px] uppercase tracking-[0.06em] text-zinc-400">
                <tr><th className="px-4 py-2 font-semibold">Pain</th><th className="w-[92px] px-2 py-2 text-right font-semibold">{wk(w.last_week_iso)}→{wk(w.this_week_iso)}</th><th className="w-[72px] px-4 py-2 text-right font-semibold">Δ</th></tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {growth.map(({ i, d }) => (
                  <tr key={i.painId}>
                    <td className="px-4 py-2"><Link href={`/idea/${i.painId}/`} className="flex min-w-0 gap-2 hover:text-zinc-50"><span className="shrink-0 text-[11px] font-semibold tabular-nums leading-5 text-zinc-400">{i.painId}</span><span className="line-clamp-2 leading-5 text-zinc-200">{i.name ?? i.label}</span></Link></td>
                    <td className="whitespace-nowrap px-2 py-2 text-right tabular-nums text-zinc-300">{i.week_over_week.last_week} → {i.week_over_week.this_week}</td>
                    <td className={`whitespace-nowrap px-4 py-2 text-right font-semibold tabular-nums ${d > 0 ? "text-[#fdba74]" : "text-zinc-400"}`}>{d > 0 ? `↑ +${d}` : d < 0 ? `↓ ${d}` : "→ 0"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-zinc-400">First US runs for these niches, so growth reflects one night&apos;s scouting, not the market.</p>
        </section>
      </div>

      <section aria-labelledby="runs">
        <div className="mb-5 flex items-baseline justify-between gap-3 px-1">
          <h2 id="runs" className="text-[18px] font-semibold tracking-tight text-zinc-50">Night runs <span className="font-medium tabular-nums text-zinc-400">{NIGHTS.length} US</span></h2>
          <span className="text-[12px] text-zinc-400">Newest first</span>
        </div>
        <Timeline>
          {NIGHTS.map((n, i) => {
            const winner = n.builder.winnerPainId ? findIdea(n.builder.winnerPainId) ?? null : null;
            return (
              <TimelineNode key={n.date} date={shortDate(n.date)} sub={<>{weekday(n.date)} · US</>} dot={winner ? "winner" : i === 0 ? "latest" : "past"} last={false}>
                <NightCard night={n} ideas={ideasOfNight(n.date)} winner={winner} />
              </TimelineNode>
            );
          })}
          <TimelineNode date="19–22 Oct" sub="Germany" dot="legacy" last>
            <div className="rounded-[20px] border border-dashed border-white/[0.12] p-4 text-[13px] text-zinc-400">
              <div className="font-semibold text-zinc-200">Earlier Germany runs</div>
              <ul className="mt-2 space-y-1">
                {LEGACY_NIGHTS.map((l) => <li key={l.date}><span className="tabular-nums text-zinc-300">{formatDate(l.date)}</span> · {l.note} <span className="font-mono text-[11px]">{l.briefPath}</span></li>)}
              </ul>
              <p className="mt-2 text-[12px]">Their pains (p-001–p-071) are on the Ideas board behind the “Old Germany pains” filter.</p>
            </div>
          </TimelineNode>
        </Timeline>
      </section>

      <section aria-labelledby="pitched" className="rounded-[22px] bg-tile p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="pitched" className="text-[17px] font-semibold tracking-tight text-zinc-50">Pitched ideas</h2>
          <span className="text-[12px] text-zinc-400">From pitched.json · Never re-pitched.</span>
        </div>
        <ul className="mt-4 space-y-2">
          {PITCHED.map((p) => (
            <li key={p.pain_id} className="rounded-2xl bg-tile-2 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[15px] font-semibold text-zinc-50">{p.name}</span>
                <span className="text-[12px] font-semibold tabular-nums text-zinc-400">{p.pain_id}</span>
                <span className="rounded-full bg-warm px-2.5 py-0.5 text-[11px] font-semibold text-[#431407]">Winner {shortDate(p.date)}</span>
                {p.laterStatus && <span className="rounded-full bg-[#fecaca] px-2.5 py-0.5 text-[11px] font-semibold text-[#7f1d1d]">pitched {shortDate(p.date)} → {p.laterStatus.split(" (")[0]}</span>}
              </div>
              <dl className="mt-3 grid gap-2 text-[12px] sm:grid-cols-[110px_minmax(0,1fr)]">
                <dt className="text-zinc-400">Core feature</dt><dd className="text-zinc-200">{p.core_feature}</dd>
                <dt className="text-zinc-400">User</dt><dd className="text-zinc-200">{p.user}</dd>
                <dt className="text-zinc-400">POC</dt><dd className="font-mono text-zinc-300">{p.poc}</dd>
                <dt className="text-zinc-400">Status</dt><dd className="text-zinc-200">{p.laterStatus ?? "pitched"}</dd>
              </dl>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
