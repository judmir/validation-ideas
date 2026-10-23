"use client";
import Link from "next/link";
import { useState } from "react";
import { findIdea, formatDate } from "@/lib/data";
import { useQueue } from "@/lib/store";
import { Badge, Bar, Card, Ring, Spinner, Tag, btn, linkCls } from "./ui";
import { IconArrowLeft, IconChevronRight, IconClock, IconPlus } from "./icons";

export default function CreateIdea({ id }: { id: string }) {
  const { idea, run, rank } = findIdea(id)!;
  const [q, setQ, loaded] = useQueue(id);
  const [busy, setBusy] = useState(false);
  const top = run.ideas[0];

  const create = () => {
    setBusy(true);
    setTimeout(() => {
      setQ({ status: "queued", at: Date.now() });
      setBusy(false);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-zinc-300 transition-colors hover:text-white"><IconArrowLeft size={14} /> All scouts</Link>
      <Card>
        <div className="flex items-start gap-4">
          <Ring size={72} stroke={8} rings={[{ value: idea.score, color: "var(--color-accent-light)" }]} label={`Score ${idea.score} of 100`}>
            <span className="text-[18px] font-bold tabular-nums text-zinc-50">{idea.score}</span>
          </Ring>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5"><Tag>#{rank} of 3</Tag><Tag>{formatDate(run.date)}</Tag></div>
            <h1 className="mt-2 text-[24px] font-semibold leading-tight tracking-tight text-zinc-50">{idea.name}</h1>
            <p className="mt-1 text-[14px] text-zinc-400">{idea.pitch}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 rounded-2xl bg-tile-2 p-5 sm:grid-cols-4">
          <Bar label="Demand" value={idea.subScores.demand} />
          <Bar label="Competition" value={idea.subScores.competition} />
          <Bar label="Build effort" value={idea.subScores.buildEffort} />
          <Bar label="Monetization" value={idea.subScores.monetization} />
        </div>
        <details className="group mt-5 text-sm">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-xs font-semibold text-zinc-400 transition-colors hover:text-zinc-200"><IconChevronRight size={12} className="transition group-open:rotate-90" /> Scoring rationale & signals</summary>
          <p className="mt-2 text-[13px] leading-relaxed text-zinc-300">{idea.rationale}</p>
          <ul className="mt-2 space-y-1 text-xs">
            {idea.signals.map((s) => (
              <li key={s.url}><a className={linkCls} href={s.url} target="_blank" rel="noreferrer">{s.label}</a> <span className="text-zinc-400">· {s.source}</span></li>
            ))}
          </ul>
        </details>
      </Card>

      <Card className="text-center">
        {!loaded ? (
          <div className="h-24" />
        ) : q.status === "queued" ? (
          <div className="space-y-2.5 py-2">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-ink"><IconClock size={22} /></div>
            <Badge color="violet">Queued</Badge>
            <p className="font-semibold text-zinc-50">Queued with App Ideas bot — demo and validation page in progress</p>
            <p className="text-xs text-zinc-400">Queued {new Date(q.at).toLocaleString("en-GB")}. You&apos;ll see the links here once they&apos;re ready.</p>
            <div className="pt-2"><Link href="/" className={btn.ghost}>Back to all scouts</Link></div>
          </div>
        ) : busy ? (
          <div className="flex flex-col items-center gap-3 py-6 text-zinc-200">
            <Spinner />
            <p className="text-sm font-semibold">Handing off to App Ideas bot…</p>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-tile-2 text-zinc-200"><IconPlus size={22} /></div>
            <p className="mx-auto max-w-md text-[13px] leading-relaxed text-zinc-400">This idea has <span className="font-semibold text-zinc-100">no demo or validation page yet</span>. Only the day&apos;s top pick (<Link className={linkCls} href={`/idea/${top.id}/`}>{top.name}</Link>) gets one automatically.</p>
            <button onClick={create} className={btn.primary}><IconPlus size={14} /> Create demo and validation page</button>
          </div>
        )}
      </Card>
    </div>
  );
}
