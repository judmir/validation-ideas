import Link from "next/link";
import type { BoardRow } from "@/lib/mock";
import { shortDate } from "@/lib/format";
import { PlcChip, ScoreMini, StreamBadge, WowChip } from "./ui";
import { IconChevronRight } from "./icons";

/** One idea in a list: name/pitch, provenance + PLC + week-over-week chips, score /100 with the pass-bar tick. */
export function IdeaRow({ row, showDate = true, showRank }: { row: BoardRow; showDate?: boolean; showRank?: boolean }) {
  return (
    <Link href={`/idea/${row.id}/`} className="group flex items-start gap-3 px-4 py-3 transition-colors hover:bg-white/[0.04] focus-visible:bg-white/[0.04] focus-visible:outline-none">
      {showRank && <span className="mt-0.5 w-5 shrink-0 text-[12px] font-semibold tabular-nums text-zinc-400">#{row.rank}</span>}
      <div className="min-w-0 flex-1">
        <div className="line-clamp-2 text-[14px] font-semibold leading-snug text-zinc-50">{row.title}</div>
        <div className="mt-0.5 line-clamp-1 text-[12px] text-zinc-400">{row.sub}</div>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <StreamBadge source={row.source} />
          <PlcChip stage={row.plc} />
          {row.wow && <WowChip now={row.wow.now} prev={row.wow.prev} nowIso={row.wow.nowIso} prevIso={row.wow.prevIso} />}
          {showDate && <span className="whitespace-nowrap text-[11px] font-medium text-zinc-400">{shortDate(row.night)}</span>}
        </div>
        {row.note && <p className={`mt-1.5 line-clamp-2 text-[12px] leading-snug ${row.noteTone === "red" ? "text-[#fca5a5]" : "text-[#fcd34d]"}`}>{row.note}</p>}
      </div>
      <ScoreMini score={row.score} verdict={row.verdict} />
      <IconChevronRight size={14} className="mt-1 shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-100" />
    </Link>
  );
}

export function RowList({ rows, showDate, showRank }: { rows: BoardRow[]; showDate?: boolean; showRank?: boolean }) {
  return (
    <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.07]">
      {rows.map((r) => <li key={r.id}><IdeaRow row={r} showDate={showDate} showRank={showRank} /></li>)}
    </ul>
  );
}
