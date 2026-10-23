import Link from "next/link";
import type { BoardRow } from "@/lib/mock";
import { shortDate } from "@/lib/format";
import { PlcChip, ScoreMini, StreamBadge, WowChip } from "./ui";
import { IconChevronRight } from "./icons";

/** One idea in a list: name/pitch, provenance + PLC + week-over-week chips, x/25 score with the 18 tick. */
export function IdeaRow({ row, showDate = true }: { row: BoardRow; showDate?: boolean }) {
  const body = (
    <>
      <div className="min-w-0 flex-1">
        <div className={`line-clamp-2 text-[14px] font-semibold leading-snug ${row.named ? "text-zinc-50" : "text-zinc-200"}`}>{row.title}</div>
        <div className="mt-0.5 line-clamp-1 text-[12px] text-zinc-400">{row.sub}</div>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold tabular-nums text-zinc-400">{row.painId}</span>
          {row.demo && <span className="rounded-full bg-accent-pale px-2 text-[11px] font-semibold leading-[18px] text-[#2a1f6b]">Demo</span>}
          {row.pitched && <span className="rounded-full bg-warm px-2 text-[11px] font-semibold leading-[18px] text-[#431407]">Pitched</span>}
          <StreamBadge source={row.source} />
          <PlcChip stage={row.plc} />
          {row.wow && <WowChip now={row.wow.now} prev={row.wow.prev} nowIso={row.wow.nowIso} prevIso={row.wow.prevIso} />}
          {showDate && <span className="whitespace-nowrap text-[11px] font-medium text-zinc-400">{row.market === "DE" ? "DE · " : ""}{shortDate(row.night)}</span>}
        </div>
        {row.note && <p className={`mt-1.5 line-clamp-2 text-[12px] leading-snug ${row.noteTone === "red" ? "text-[#fca5a5]" : "text-[#fcd34d]"}`}>{row.note}</p>}
      </div>
      <ScoreMini score={row.score} verdict={row.verdict} />
      {row.linkable ? <IconChevronRight size={14} className="mt-1 shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-100" /> : <span className="w-[14px] shrink-0" />}
    </>
  );
  const cls = "group flex items-start gap-3 px-4 py-3";
  return row.linkable ? (
    <Link href={`/idea/${row.painId}/`} className={`${cls} transition-colors hover:bg-white/[0.04] focus-visible:bg-white/[0.04] focus-visible:outline-none`}>{body}</Link>
  ) : (
    <div className={cls} title="Legacy Germany pain: detail page not ported">{body}</div>
  );
}

export function RowList({ rows, showDate }: { rows: BoardRow[]; showDate?: boolean }) {
  return (
    <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.07]">
      {rows.map((r) => <li key={r.painId}><IdeaRow row={r} showDate={showDate} /></li>)}
    </ul>
  );
}
