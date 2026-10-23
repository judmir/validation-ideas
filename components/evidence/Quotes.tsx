import type { Complaint } from "@/lib/types";
import { shortDate } from "@/lib/format";
import { IconExternal } from "../icons";

/** Verbatim quotes. Never rendered without a link; show 3, expand to all. */
export default function Quotes({ quotes }: { quotes: Complaint[] }) {
  const linked = quotes.filter((q) => /^https?:\/\//.test(q.link));
  if (!linked.length) return <p className="text-[13px] text-zinc-400">No linked quotes for this pain.</p>;
  const head = linked.slice(0, 3), rest = linked.slice(3);
  return (
    <div>
      <ul className="space-y-2">{head.map((q) => <Quote key={q.id} q={q} />)}</ul>
      {rest.length > 0 && (
        <details className="group mt-2">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1 rounded-full px-1 text-[12px] font-semibold text-zinc-300 hover:text-zinc-50">
            <span className="transition group-open:rotate-90" aria-hidden>›</span>
            <span className="group-open:hidden">Show all {linked.length} quotes</span><span className="hidden group-open:inline">Hide {rest.length} quotes</span>
          </summary>
          <ul className="mt-2 space-y-2">{rest.map((q) => <Quote key={q.id} q={q} />)}</ul>
        </details>
      )}
    </div>
  );
}

function Quote({ q }: { q: Complaint }) {
  return (
    <li className="rounded-2xl bg-tile-2 p-4">
      <blockquote className="text-[14px] leading-relaxed text-zinc-100">“{q.quote}”</blockquote>
      <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-zinc-400">
        <span className="font-semibold text-zinc-300">{q.source}</span>
        <span>· {shortDate(q.post_date)}</span>
        <span className="min-w-0 break-words">· {q.engagement}</span>
      </div>
      <div className="mt-2 flex items-center justify-between gap-3 text-[12px]">
        <a href={q.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-accent-light hover:text-accent-pale">Open source <IconExternal size={12} /></a>
        <span className="font-mono text-[11px] text-zinc-400">{q.id}</span>
      </div>
    </li>
  );
}
