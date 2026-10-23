"use client";
import Link from "next/link";
import { useState } from "react";
import { findIdea, formatDate } from "@/lib/data";
import { useQueue } from "@/lib/store";
import { Badge, Bar, Card, ScorePill, Spinner, btn } from "./ui";

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
    <div className="space-y-4">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-800">← Scout log</Link>
      <Card>
        <div className="flex items-start gap-3">
          <ScorePill score={idea.score} />
          <div className="min-w-0 flex-1">
            <div className="text-xs text-slate-500">#{rank} of 3 · {formatDate(run.date)}</div>
            <h1 className="text-xl font-bold leading-tight">{idea.name}</h1>
            <p className="text-sm text-slate-600">{idea.pitch}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
          <Bar label="Demand" value={idea.subScores.demand} />
          <Bar label="Competition" value={idea.subScores.competition} />
          <Bar label="Build effort" value={idea.subScores.buildEffort} />
          <Bar label="Monetization" value={idea.subScores.monetization} />
        </div>
        <details className="mt-3 text-sm">
          <summary className="cursor-pointer text-xs font-medium text-slate-500">Scoring rationale & signals</summary>
          <p className="mt-2 text-slate-700">{idea.rationale}</p>
          <ul className="mt-2 space-y-1 text-xs">
            {idea.signals.map((s) => (
              <li key={s.url}><a className="text-indigo-700 hover:underline" href={s.url} target="_blank" rel="noreferrer">{s.label}</a> <span className="text-slate-400">· {s.source}</span></li>
            ))}
          </ul>
        </details>
      </Card>

      <Card className="text-center">
        {!loaded ? (
          <div className="h-24" />
        ) : q.status === "queued" ? (
          <div className="space-y-2 py-2">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blue-100 text-xl">⏳</div>
            <Badge color="blue">Queued</Badge>
            <p className="font-semibold">Queued with App Ideas bot — demo and validation page in progress</p>
            <p className="text-xs text-slate-500">Queued {new Date(q.at).toLocaleString("en-GB")}. You&apos;ll see the links here once they&apos;re ready.</p>
            <div className="pt-2"><Link href="/" className={btn.ghost}>Back to scout log</Link></div>
          </div>
        ) : busy ? (
          <div className="flex flex-col items-center gap-3 py-6 text-indigo-700">
            <Spinner />
            <p className="text-sm font-medium">Handing off to App Ideas bot…</p>
          </div>
        ) : (
          <div className="space-y-3 py-2">
            <p className="text-sm text-slate-600">This idea has <span className="font-medium text-slate-800">no demo or validation page yet</span>. Only the day&apos;s top pick (<Link className="text-indigo-700 hover:underline" href={`/idea/${top.id}/`}>{top.name}</Link>) gets one automatically.</p>
            <button onClick={create} className={btn.primary}>Create demo and validation page</button>
          </div>
        )}
      </Card>
    </div>
  );
}
