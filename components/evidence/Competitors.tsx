import type { Competitor, QuoteRef } from "@/lib/types";
import { IconExternal } from "../icons";

const isUrl = (s: string | null | undefined): s is string => !!s && /^https?:\/\//.test(s);

/** Table on desktop, cards on mobile: name→url, price (+ source), loved / hated quote → link, funding. */
export default function Competitors({ list }: { list: Competitor[] }) {
  if (!list.length) return <p className="text-[13px] text-zinc-400">No competitors researched (below the bar).</p>;
  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl bg-tile-2 lg:block">
        <table className="w-full table-fixed text-left text-[12px]">
          <thead className="text-[11px] uppercase tracking-[0.06em] text-zinc-400">
            <tr className="border-b border-white/[0.06]">
              <th className="w-[17%] px-4 py-2.5 font-semibold">Competitor</th>
              <th className="w-[19%] px-3 py-2.5 font-semibold">Price</th>
              <th className="w-[25%] px-3 py-2.5 font-semibold">Loved</th>
              <th className="w-[25%] px-3 py-2.5 font-semibold">Hated</th>
              <th className="w-[14%] px-3 py-2.5 font-semibold">Funding</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06] align-top">
            {list.map((c) => (
              <tr key={c.name}>
                <td className="px-4 py-3"><Name c={c} /></td>
                <td className="px-3 py-3 text-zinc-200"><Price c={c} /></td>
                <td className="px-3 py-3"><Q list={c.loves} note={c.loves_hates_note} /></td>
                <td className="px-3 py-3"><Q list={c.hates} /></td>
                <td className="break-words px-3 py-3 text-zinc-400">{c.funding}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="space-y-2 lg:hidden">
        {list.map((c) => (
          <li key={c.name} className="rounded-2xl bg-tile-2 p-4 text-[12px]">
            <Name c={c} />
            <div className="mt-2 text-zinc-200"><Price c={c} /></div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div><div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#86efac]">Loved</div><Q list={c.loves} note={c.loves_hates_note} /></div>
              <div><div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#fca5a5]">Hated</div><Q list={c.hates} /></div>
            </div>
            <div className="mt-3 text-zinc-400">Funding: {c.funding}</div>
          </li>
        ))}
      </ul>
    </>
  );
}

function Name({ c }: { c: Competitor }) {
  return isUrl(c.url) ? (
    <a href={c.url} target="_blank" rel="noreferrer" className="inline-flex items-start gap-1 text-[13px] font-semibold leading-snug text-zinc-50 hover:text-accent-light">{c.name} <IconExternal size={11} className="mt-1 shrink-0" /></a>
  ) : <span className="text-[13px] font-semibold leading-snug text-zinc-50">{c.name}</span>;
}

function Price({ c }: { c: Competitor }) {
  return (
    <span className="break-words">
      {c.price}
      {isUrl(c.price_source) ? <a href={c.price_source} target="_blank" rel="noreferrer" className="mt-0.5 block w-fit font-semibold text-accent-light hover:text-accent-pale">Price source ↗</a> : c.price_source ? <span className="block text-[11px] text-zinc-400">source: {c.price_source}</span> : null}
    </span>
  );
}

function Q({ list, note }: { list: QuoteRef[]; note?: string }) {
  if (!list.length) return <span className="text-zinc-400">{note ?? "—"}</span>;
  return (
    <ul className="space-y-2">
      {list.map((x) => (
        <li key={x.link + x.quote.slice(0, 20)} className="leading-snug">
          {isUrl(x.link) ? (
            <a href={x.link} target="_blank" rel="noreferrer" className="text-zinc-200 hover:text-zinc-50">“{x.quote}”</a>
          ) : <span className="text-zinc-200">“{x.quote}”</span>}
          <span className="block text-[11px] text-zinc-400">{x.who}</span>
        </li>
      ))}
    </ul>
  );
}
