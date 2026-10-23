"use client";
import Link from "next/link";
import { useState } from "react";
import { findIdea, formatDate } from "@/lib/data";
import { useQueue } from "@/lib/store";
import { Badge, Bar, Card, ScorePill, Spinner, btn, linkCls } from "./ui";
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
      <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] text-zinc-500 transition-colors hover:text-zinc-200"><IconArrowLeft size={14} /> Scout log</Link>
      <Card>
        <div className="flex items-start gap-3">
          <ScorePill score={idea.score} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2"><Badge>#{rank} of 3</Badge><span className="text-xs text-zinc-500">{formatDate(run.date)}</span></div>
            <h1 className="mt-1.5 text-xl font-medium leading-tight tracking-tight text-zinc-50">{idea.name}</h1>
            <p className="mt-0.5 text-[13px] text-zinc-400">{idea.pitch}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 rounded-lg border border-line bg-surface-2 p-4 sm:grid-cols-4">
          <Bar label="Demand" value={idea.subScores.demand} />
          <Bar label="Competition" value={idea.subScores.competition} />
          <Bar label="Build effort" value={idea.subScores.buildEffort} />
          <Bar label="Monetization" value={idea.subScores.monetization} />
        </div>
        <details className="group mt-5 text-sm">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-200"><IconChevronRight size={12} className="transition group-open:rotate-90" /> Scoring rationale & signals</summary>
          <p className="mt-2 text-[13px] leading-relaxed text-zinc-300">{idea.rationale}</p>
          <ul className="mt-2 space-y-1 text-xs">
            {idea.signals.map((s) => (
              <li key={s.url}><a className={linkCls} href={s.url} target="_blank" rel="noreferrer">{s.label}</a> <span className="text-zinc-500">· {s.source}</span></li>
            ))}
          </ul>
        </details>
      </Card>

      <Card className="text-center">
        {!loaded ? (
          <div className="h-24" />
        ) : q.status === "queued" ? (
          <div className="space-y-2 py-2">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg border border-line-strong bg-surface-3 text-zinc-200"><IconClock size={22} /></div>
            <Badge color="blue">Queued</Badge>
            <p className="font-medium text-zinc-100">Queued with App Ideas bot — demo and validation page in progress</p>
            <p className="text-xs text-zinc-500">Queued {new Date(q.at).toLocaleString("en-GB")}. You&apos;ll see the links here once they&apos;re ready.</p>
            <div className="pt-2"><Link href="/" className={btn.ghost}>Back to scout log</Link></div>
          </div>
        ) : busy ? (
          <div className="flex flex-col items-center gap-3 py-6 text-zinc-200">
            <Spinner />
            <p className="text-sm font-medium">Handing off to App Ideas bot…</p>
          </div>
        ) : (
          <div className="space-y-3 py-2">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg border border-line-strong bg-surface-3 text-zinc-300"><IconPlus size={22} /></div>
            <p className="mx-auto max-w-md text-[13px] leading-relaxed text-zinc-400">This idea has <span className="font-medium text-zinc-200">no demo or validation page yet</span>. Only the day&apos;s top pick (<Link className={linkCls} href={`/idea/${top.id}/`}>{top.name}</Link>) gets one automatically.</p>
            <button onClick={create} className={btn.primary}><IconPlus size={14} /> Create demo and validation page</button>
          </div>
        )}
      </Card>
    </div>
  );
}
