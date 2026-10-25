import Link from "next/link";
import { notFound } from "next/navigation";
import { BRIEFS, briefOf, findIdea } from "@/lib/mock";
import { RULES } from "@/lib/types";
import { formatDate, shortDate } from "@/lib/format";
import { proposalParts } from "@/lib/proposal";
import Markdown from "@/components/Markdown";
import { IconArrowLeft } from "@/components/icons";

export const dynamicParams = false;
export function generateStaticParams() {
  const dates = BRIEFS.filter((b) => b.validation).map((b) => ({ date: b.date }));
  return dates.length ? dates : [{ date: "none" }];
}
export async function generateMetadata({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const w = briefOf(date)?.winnerPainId;
  return { title: `${(w && findIdea(w)?.name) || "Validation"} validation page (proposal), ${date} · Validation Ideas` };
}

function Tile({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl bg-tile-2 px-4 py-3.5">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-1 text-[22px] font-semibold leading-none tracking-tight tabular-nums text-zinc-50">{value}</div>
      <div className="mt-1.5 text-[11.5px] text-zinc-400">{note}</div>
    </div>
  );
}

export default async function ValidationPage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const b = briefOf(date);
  if (!b?.validation || !b.winnerPainId) notFound();
  const v = b.validation;
  const idea = findIdea(b.winnerPainId);
  const name = idea?.name ?? b.winnerPainId;
  const p = proposalParts(v.markdown);
  const budget = v.budgetEur ?? { min: 30, max: 50 };
  const kill = v.killPct ?? RULES.killPriceClickRate * 100;
  const strong = v.strongPct ?? RULES.strongPriceClickRate * 100;
  return (
    <div className="space-y-6">
      <div>
        <Link href={`/idea/${b.winnerPainId}/`} className="inline-flex items-center gap-1.5 rounded-full text-[13px] font-semibold text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"><IconArrowLeft size={14} /> {name}</Link>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[34px]">{name} validation page</h1>
          <span data-proposal-state className="inline-flex items-center gap-1.5 rounded-full bg-warm/15 px-3 py-1 text-[12.5px] font-semibold text-[#fdba74] ring-1 ring-inset ring-warm/35"><span className="h-1.5 w-1.5 rounded-full bg-warm" aria-hidden />Proposal, not built</span>
        </div>
        <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-zinc-300">
          The two-button test page the {formatDate(date)} brief proposes for {name}. It is content only: no page is built, no ad runs, no signup or checkout exists, and nothing here is live.
        </p>
      </div>

      <section aria-label="Proposed test" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Tile label="Ad budget" value={`€${budget.min}–${budget.max}`} note="proposed, not spent" />
        <Tile label="Visitors" value={`${v.minVisitors ?? RULES.minVisitors}+`} note="before any call" />
        <Tile label="Kill" value={`< ${kill}%`} note="price-button clicks" />
        <Tile label="Strong" value={`≥ ${strong}%`} note="price-button clicks" />
      </section>

      {v.test && (
        <section className="rounded-[20px] bg-tile p-4 sm:p-5">
          <h2 className="text-[16px] font-semibold tracking-tight text-zinc-50">Cheapest test this week</h2>
          <Markdown md={v.test} className="mt-2" />
        </section>
      )}

      {p.headline && (
        <section aria-labelledby="preview" className="rounded-[22px] bg-tile p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="preview" className="text-[16px] font-semibold tracking-tight text-zinc-50">Proposed page copy</h2>
            <span className="text-[12px] text-zinc-400">Preview of the proposal · buttons do nothing</span>
          </div>
          <div className="mt-4 rounded-[18px] bg-panel p-5 ring-1 ring-inset ring-white/[0.06] sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-light">{name}</p>
            <h3 className="mt-2 max-w-2xl text-[22px] font-semibold leading-snug tracking-tight text-zinc-50 sm:text-[26px]">“{p.headline}”</h3>
            {p.subhead && <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-zinc-300">{p.subhead}</p>}
            {p.benefits.length > 0 && (
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-3">
                {p.benefits.map((x) => <li key={x.title} className="rounded-2xl bg-tile p-3.5"><div className="text-[13.5px] font-semibold text-zinc-50">{x.title}</div>{x.text && <div className="mt-1 text-[12.5px] leading-snug text-zinc-400">{x.text}</div>}</li>)}
              </ul>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span aria-disabled="true" title="Proposal only: not built" className="inline-flex h-11 cursor-not-allowed items-center rounded-full bg-accent px-5 text-[14px] font-semibold text-accent-ink opacity-90">{p.primary ?? "Start"}</span>
              {p.secondary && <span aria-disabled="true" title="Proposal only: not built" className="inline-flex h-11 cursor-not-allowed items-center rounded-full bg-white/[0.08] px-5 text-[14px] font-semibold text-zinc-100">{p.secondary}</span>}
            </div>
            {p.note && <p className="mt-2 text-[12px] text-zinc-400">{p.note}</p>}
            {p.price && <p className="mt-4 text-[12px] text-zinc-400">Price: {p.price}</p>}
          </div>
        </section>
      )}

      <section className="rounded-[20px] bg-tile p-4 sm:p-5">
        <h2 className="text-[16px] font-semibold tracking-tight text-zinc-50">Full proposal from the brief</h2>
        <p className="mt-0.5 text-[12px] text-zinc-400">{b.briefPath} · “{v.heading}”</p>
        <Markdown md={v.markdown} className="mt-3" />
      </section>

      <p className="px-1 text-[12px] text-zinc-400">Night {shortDate(date)} · {b.demo ? <Link href={`/demo/${date}/`} className="font-semibold text-zinc-200 underline decoration-accent-light/70 underline-offset-2">Open the demo</Link> : "no demo"}</p>
    </div>
  );
}
