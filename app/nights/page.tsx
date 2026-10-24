import Link from "next/link";
import type { ReactNode } from "react";
import NightCard from "@/components/NightCard";
import { Timeline, TimelineNode } from "@/components/Timeline";
import { StatCell } from "@/components/ui";
import { IconChevronRight } from "@/components/icons";
import { ALL_IDEAS, LAST_WINNER, LEGACY, LEGACY_NIGHTS, NIGHTS, PITCHED, findIdea, ideasOfNight } from "@/lib/mock";
import { NIGHTS_SINCE_WINNER, US_COMPLAINTS, US_WINNER_NOTE } from "@/lib/mock/derived";
import { formatDate, shortDate, weekday, wk } from "@/lib/format";

export const metadata = { title: "Nights · Validation Ideas" };

const shortDesc = (s: string) => {
  const first = s.replace(/\s*\([^)]*\)/g, "").split(/[:;]|\.\s/)[0].replace(/\.$/, "").trim();
  return first.length > 70 ? first.slice(0, 67).trimEnd() + "…" : first;
};

export default function NightsPage() {
  const growth = ALL_IDEAS.map((i) => ({ i, d: i.week_over_week.this_week - i.week_over_week.last_week })).sort((a, b) => b.d - a.d || b.i.week_over_week.this_week - a.i.week_over_week.this_week);
  const w = ALL_IDEAS[0].week_over_week;
  const blocked = NIGHTS.reduce((a, n) => a + n.scout.blocked.length, 0);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[32px]">Nights</h1>
        <p className="mt-1 text-[15px] text-zinc-400">Each night&apos;s run: scout 00:30, analyst 03:00, builder 04:30, brief 07:30.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCell label="Nights since winner" value={NIGHTS_SINCE_WINNER} unit={`last: ${LAST_WINNER.name}, ${shortDate(LAST_WINNER.date)}`} note={US_WINNER_NOTE} />
        <StatCell label="US runs" value={NIGHTS.length} unit="0 winners" />
        <StatCell label="US complaints" value={US_COMPLAINTS} unit="scouted" />
        <StatCell label="Blocked sources" value={blocked} unit={`in ${NIGHTS.length} runs`} />
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
              <TimelineNode key={n.date} date={shortDate(n.date)} sub={weekday(n.date)} dot={i === 0 ? "latest" : "past"} last={false}>
                <NightCard night={n} ideas={ideasOfNight(n.date)} winner={winner} />
              </TimelineNode>
            );
          })}
          <TimelineNode date="19–22 Oct" sub="Germany" dot="past" last>
            <div className="rounded-[20px] border border-white/[0.07] p-4">
              <div className="text-[14px] font-semibold text-zinc-200">Earlier Germany runs</div>
              <ul className="mt-2 space-y-1 text-[13px] text-zinc-400">
                {LEGACY_NIGHTS.map((l) => <li key={l.date}><span className="tabular-nums text-zinc-300">{formatDate(l.date)}</span> · {l.note}</li>)}
              </ul>
            </div>
          </TimelineNode>
        </Timeline>
      </section>

      <section className="overflow-hidden rounded-[22px] bg-tile" aria-label="More detail">
        <div className="px-5 pt-5 sm:px-6 sm:pt-6">
          <h2 className="text-[17px] font-semibold tracking-tight text-zinc-50">More detail</h2>
          <p className="mt-1 text-[13px] text-zinc-400">Cluster growth, pitched ideas and the old Germany pains.</p>
        </div>
        <div className="mt-3 divide-y divide-white/[0.06] border-t border-white/[0.06]">
          <More title={`Week-over-week cluster growth · ${wk(w.last_week_iso)} → ${wk(w.this_week_iso)}`}>
            <table className="w-full table-fixed text-left text-[13px]">
              <tbody className="divide-y divide-white/[0.06]">
                {growth.map(({ i, d }) => (
                  <tr key={i.painId}>
                    <td className="py-2 pr-2"><Link href={`/idea/${i.painId}/`} className="line-clamp-1 text-zinc-200 hover:text-zinc-50">{i.name ?? i.label}</Link></td>
                    <td className="w-[72px] whitespace-nowrap py-2 text-right tabular-nums text-zinc-400">{i.week_over_week.last_week} → {i.week_over_week.this_week}</td>
                    <td className={`w-[52px] whitespace-nowrap py-2 text-right font-semibold tabular-nums ${d > 0 ? "text-[#fdba74]" : "text-zinc-400"}`}>{d > 0 ? `+${d}` : d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-[12px] text-zinc-400">Complaints by post date. First US runs for these niches, so growth reflects one night&apos;s scouting, not the market.</p>
          </More>
          <More title={`Pitched ideas (${PITCHED.length})`}>
            <ul className="space-y-3">
              {PITCHED.map((p) => (
                <li key={p.pain_id} className="rounded-2xl bg-tile-2 p-4 text-[13px]">
                  <div className="font-semibold text-zinc-50">{p.name} <span className="font-medium text-zinc-400">· {p.pain_id} · winner {shortDate(p.date)}</span></div>
                  <p className="mt-1.5 leading-relaxed text-zinc-300">{p.core_feature}</p>
                  <p className="mt-1.5 text-zinc-400">{p.user} · <span className="font-mono text-[12px]">{p.poc}</span></p>
                  <p className="mt-1.5 text-[#fca5a5]">{p.laterStatus ?? "pitched"}</p>
                </li>
              ))}
            </ul>
          </More>
          <More title={`Old Germany pains (${LEGACY.length})`}>
            <p className="mb-2 text-[12px] text-zinc-400">Germany, archived · these pains have no detail pages.</p>
            <ul className="divide-y divide-white/[0.05]">
              {[...LEGACY].sort((a, b) => b.night.localeCompare(a.night) || b.scores.total - a.scores.total).map((p) => (
                <li key={p.painId} className="flex items-center gap-3 py-1.5 text-[13px]">
                  <span className="w-11 shrink-0 text-[11px] font-semibold tabular-nums text-zinc-400">{p.painId}</span>
                  <span className="min-w-0 flex-1 truncate text-zinc-300">{p.name ?? shortDesc(p.description)}</span>
                  <span className="shrink-0 text-[11px] text-zinc-400">{shortDate(p.night)}</span>
                  <span className="w-6 shrink-0 text-right font-semibold tabular-nums text-zinc-300">{p.scores.total}</span>
                </li>
              ))}
            </ul>
          </More>
        </div>
      </section>
    </div>
  );
}

function More({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-3.5 text-[14px] font-semibold text-zinc-200 transition-colors hover:text-zinc-50 sm:px-6">
        <span className="min-w-0 flex-1">{title}</span>
        <IconChevronRight size={14} className="shrink-0 text-zinc-400 transition group-open:rotate-90" />
      </summary>
      <div className="px-5 pb-5 sm:px-6">{children}</div>
    </details>
  );
}
