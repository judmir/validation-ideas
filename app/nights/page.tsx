import Link from "next/link";
import NightCard from "@/components/NightCard";
import { TestListLive } from "@/components/TestListLive";
import { Timeline, TimelineNode } from "@/components/Timeline";
import { NIGHTS, TOP_PICKS, findIdea, ideasOfNight } from "@/lib/mock";
import { TESTS } from "@/lib/mock/tests";
import { shortDate, weekday, wk } from "@/lib/format";

export const metadata = { title: "Nights · Validation Ideas" };

export default function NightsPage() {
  const withWow = TOP_PICKS.filter((i) => i.week_over_week);
  const growth = withWow.map((i) => ({ i, w: i.week_over_week!, d: i.week_over_week!.this_week - i.week_over_week!.last_week })).sort((a, b) => b.d - a.d || b.w.this_week - a.w.this_week);
  const w = growth[0]?.w;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[32px]">Nights</h1>
        <p className="mt-1 text-[15px] text-zinc-400">Each scout run: scout 00:30, analyst 03:00, builder 04:30, brief 07:30.</p>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start">
        <section className="min-w-0 rounded-[22px] bg-tile p-5 sm:p-6" aria-labelledby="tests">
          <h2 id="tests" className="text-[17px] font-semibold tracking-tight text-zinc-50">Top picks &amp; tests</h2>
          <p className="mt-1 text-[12px] text-zinc-400">Only each run&apos;s top pick gets a landing page and a fake-door test.</p>
          <div className="mt-4"><TestListLive tests={TESTS} /></div>
        </section>
        {w && (
          <section className="min-w-0 rounded-[22px] bg-tile p-5 sm:p-6" aria-labelledby="wow">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="wow" className="text-[17px] font-semibold tracking-tight text-zinc-50">Week-over-week signal growth</h2>
              <span className="text-[12px] text-zinc-400">matching posts · {wk(w.last_week_iso)} → {wk(w.this_week_iso)}</span>
            </div>
            <div className="mt-3 overflow-hidden rounded-2xl bg-tile-2">
              <table className="w-full table-fixed text-left text-[13px]">
                <thead className="bg-tile-2 text-[11px] uppercase tracking-[0.06em] text-zinc-400">
                  <tr><th className="px-4 py-2 font-semibold">Idea</th><th className="w-[92px] px-2 py-2 text-right font-semibold">{wk(w.last_week_iso)}→{wk(w.this_week_iso)}</th><th className="w-[72px] px-4 py-2 text-right font-semibold">Δ</th></tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {growth.map(({ i, w: x, d }) => (
                    <tr key={i.id}>
                      <td className="px-4 py-2"><Link href={`/idea/${i.id}/`} className="line-clamp-2 leading-5 text-zinc-200 hover:text-zinc-50">{i.name}</Link></td>
                      <td className="whitespace-nowrap px-2 py-2 text-right tabular-nums text-zinc-300">{x.last_week} → {x.this_week}</td>
                      <td className={`whitespace-nowrap px-4 py-2 text-right font-semibold tabular-nums ${d > 0 ? "text-[#fdba74]" : "text-zinc-400"}`}>{d > 0 ? `↑ +${d}` : d < 0 ? `↓ ${d}` : "→ 0"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-zinc-400">Mock counts of posts matching each top pick&apos;s pain, by post date.</p>
          </section>
        )}
      </div>

      <section aria-labelledby="runs">
        <div className="mb-5 flex items-baseline justify-between gap-3 px-1">
          <h2 id="runs" className="text-[18px] font-semibold tracking-tight text-zinc-50">Scout runs <span className="font-medium tabular-nums text-zinc-400">{NIGHTS.length}</span></h2>
          <span className="text-[12px] text-zinc-400">Newest first</span>
        </div>
        <Timeline>
          {NIGHTS.map((n, i) => {
            const winner = n.builder.winnerId ? findIdea(n.builder.winnerId) ?? null : null;
            return (
              <TimelineNode key={n.date} date={shortDate(n.date)} sub={weekday(n.date)} dot={i === 0 ? "latest" : "past"} last={i === NIGHTS.length - 1}>
                <NightCard night={n} ideas={ideasOfNight(n.date)} winner={winner} />
              </TimelineNode>
            );
          })}
        </Timeline>
      </section>
    </div>
  );
}
