"use client";
import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { RULES, type Idea } from "@/lib/types";
import { eur0, formatDate, int, wk } from "@/lib/format";
import { useValidation, type ValidationState } from "@/lib/store";
import { stageOf, testNumbers } from "@/lib/status";
import { Bar, Card, Metric, Sparkline, StatusPill, Tag } from "./ui";
import { TabBar, useHashTab } from "./Tabs";
import Gates from "./evidence/Gates";
import Competitors from "./evidence/Competitors";
import PlcFit from "./evidence/PlcFit";
import ValidateTab from "./validate/ValidateTab";
import ReportTab from "./validate/ReportTab";
import { IconArrowLeft, IconChevronRight, IconLock } from "./icons";

export type RunInfo = { date: string; summary: string; notes: string[]; ideas: { id: string; name: string; score: number; rationale: string }[] };

const TABS = ["evidence", "validate", "report"];
const VERDICT_WORD = { winner: "Above the bar", "near-miss": "Near-miss", killed: "Killed", "below-bar": "Below the bar" } as const;

export default function IdeaPage({ idea, run }: { idea: Idea; run: RunInfo }) {
  const { tab, go, anchor, clearAnchor } = useHashTab(TABS, "evidence");
  const [v, setV, loaded] = useValidation(idea);
  const validates = !!idea.validation;

  useEffect(() => {
    if (anchor && tab === "validate") {
      requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ block: "start" }));
      clearAnchor();
    }
  }, [anchor, tab, clearAnchor]);
  const select = (id: string) => { go(id); window.scrollTo({ top: 0 }); };
  const lock = !validates ? <IconLock size={12} className="shrink-0 opacity-70" /> : undefined;

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div>
          <Link href="/" className="inline-flex items-center gap-1.5 rounded-full text-[13px] font-semibold text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"><IconArrowLeft size={14} /> All scouts</Link>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[34px]">{idea.name}</h1>
            {validates && (loaded ? <StatusPill stage={stageOf(v)} /> : <span className="h-5 w-16 animate-pulse rounded-full bg-white/[0.06]" />)}
          </div>
          <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-zinc-300">{idea.pitch}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {idea.rank === 1 ? <Tag warm>Top pick</Tag> : <Tag>#{idea.rank} this run</Tag>}
            <Tag>Scouted {formatDate(idea.night)}</Tag>
          </div>
        </div>
        <Metrics idea={idea} run={run} v={v} loaded={loaded} />
      </div>

      <TabBar
        tabs={[{ id: "evidence", label: "Evidence" }, { id: "validate", label: "Validate", badge: lock }, { id: "report", label: "Report", badge: lock }]}
        active={tab}
        onSelect={select}
      />
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="space-y-4">
        {tab === "evidence" && <Evidence idea={idea} run={run} />}
        {tab === "validate" && (validates ? <ValidateTab idea={idea} v={v} setV={setV} loaded={loaded} goReport={() => select("report")} /> : <Locked idea={idea} />)}
        {tab === "report" && (validates ? <ReportTab idea={idea} v={v} loaded={loaded} goValidate={() => select("validate")} /> : <Locked idea={idea} />)}
      </div>
    </div>
  );
}

/** Big-numeral strip, as in d889d85: score, signups, budget spent, test status. Runner-ups only get the score. */
function Metrics({ idea, run, v, loaded }: { idea: Idea; run: RunInfo; v: ValidationState; loaded: boolean }) {
  const t = idea.scores.total;
  const score = (
    <Metric label="Score" value={t} unit="/ 100">
      <div className="relative h-2.5 rounded-full bg-white/[0.08]">
        <div className="h-2.5 rounded-full bg-accent-light" style={{ width: `${t}%` }} />
        <span className="absolute -bottom-1 -top-1 w-[2px] rounded-full bg-zinc-300" style={{ left: `${RULES.passBar}%` }} aria-hidden />
      </div>
      <div className="mt-2 text-[12px] text-zinc-400">{idea.rank === 1 ? `Best of ${run.ideas.length} ideas` : VERDICT_WORD[idea.verdict]} · bar {RULES.passBar}</div>
    </Metric>
  );
  const kit = idea.validation?.adKit;
  if (!kit) return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">{score}</div>;
  const budget = kit.budget.dailyEur * kit.budget.days;
  const n = testNumbers(v);
  const spentPct = budget ? Math.min(100, Math.round((n.spend / budget) * 100)) : 0;
  const status = v.status === "finished" ? (n.call === "strong" ? "Winner" : n.call === "kill" ? "Not a winner" : "Inconclusive") : v.status === "running" ? "Live" : "Ready";
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {score}
      <Metric label="Signups" value={loaded ? int(n.signups) : "–"} unit={v.status === "finished" ? "final" : v.status === "running" ? "live" : undefined}>
        <div className="text-[12px] text-zinc-400">{loaded ? `${int(n.visitors)} visitors · ${int(n.priceClicks)} price clicks` : "\u00a0"}</div>
      </Metric>
      <Metric label="Budget spent" value={loaded ? `${spentPct}%` : "–"}>
        <div className="h-2.5 rounded-full bg-white/[0.08]"><div className={`h-2.5 rounded-full ${v.status === "running" ? "bg-warm" : "bg-accent-light"}`} style={{ width: `${spentPct}%` }} /></div>
        <div className="mt-2 text-[12px] text-zinc-400">{eur0(n.spend)} of {eur0(budget)}</div>
      </Metric>
      <Metric label="Test" value={<span className={`text-[24px] sm:text-[26px] ${status === "Winner" ? "text-[#86efac]" : status === "Not a winner" ? "text-[#fca5a5]" : status === "Live" ? "text-warm" : ""}`}>{loaded ? status : "–"}</span>}>
        <div className="text-[12px] text-zinc-400">€{kit.budget.dailyEur}/day · {kit.budget.days}-day fake-door test</div>
      </Metric>
    </div>
  );
}

function Locked({ idea }: { idea: Idea }) {
  return (
    <Card className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-tile-2 text-zinc-300"><IconLock size={18} /></div>
      <div className="min-w-0 flex-1">
        <h3 className="text-[15px] font-semibold text-zinc-50">Only the run&apos;s top pick gets a demo</h3>
        <p className="mt-0.5 text-[13px] text-zinc-400">This idea ranked #{idea.rank} with {idea.scores.total}/{RULES.maxScore}, so no landing page or test was built for it.</p>
      </div>
    </Card>
  );
}

/** Evidence, in the calm d889d85 layout: score breakdown + rationale + signals beside the run report; the rest collapsed. */
function Evidence({ idea, run }: { idea: Idea; run: RunInfo }) {
  const note = idea.kill_reason ?? idea.borderline_note;
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
        <Card className="min-w-0">
          <h3 className="label">Score breakdown</h3>
          <div className="mt-2.5 grid grid-cols-1 gap-x-6 gap-y-4 rounded-2xl bg-tile-2 p-5 sm:grid-cols-2">
            <Bar label="Demand" value={idea.scores.demand} />
            <Bar label="Competition (higher = less crowded)" value={idea.scores.competition} />
            <Bar label="Build effort (higher = easier)" value={idea.scores.buildEffort} />
            <Bar label="Monetization" value={idea.scores.monetization} />
          </div>
          <h3 className="label mt-7">Scoring rationale</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-zinc-300">{idea.rationale}</p>
          {note && idea.verdict !== "winner" && (
            <>
              <h3 className="label mt-6">{idea.verdict === "killed" ? "Why it was killed" : "Why it missed"}</h3>
              <p className={`mt-2 text-[14px] leading-relaxed ${idea.verdict === "killed" ? "text-[#fca5a5]" : "text-zinc-300"}`}>{note}</p>
            </>
          )}
          <h3 className="label mt-6">Sources &amp; signals</h3>
          <ul className="mt-2.5 space-y-2">
            {idea.signals.map((s) => (
              <li key={s.label} className="flex items-center gap-3 rounded-2xl bg-tile-2 px-4 py-3 text-[13px]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-light" aria-hidden />
                <span className="min-w-0 flex-1 text-zinc-200">{s.label}</span>
                <span className="shrink-0 text-xs text-zinc-400">{s.source}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="min-w-0">
          <h2 className="text-[17px] font-semibold tracking-tight text-zinc-50">Run report</h2>
          <div className="mt-1 text-[13px] text-zinc-400">{formatDate(run.date)}</div>
          <p className="mt-3 text-[13px] leading-relaxed text-zinc-300">{run.summary}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-400">{run.notes.map((n) => <li key={n}>{n}</li>)}</ul>
          <h3 className="label mt-6">All ideas this run</h3>
          <ol className="mt-2.5 space-y-2">
            {run.ideas.map((x) => (
              <li key={x.id}>
                {x.id === idea.id ? (
                  <div className="flex items-center gap-3 rounded-2xl bg-[#2c2840] px-2.5 py-2 text-[13px] ring-1 ring-inset ring-accent/35">
                    <Score n={x.score} top /><span className="min-w-0 truncate font-semibold text-zinc-50">{x.name}</span><span className="ml-auto shrink-0 pr-1 text-xs text-zinc-300">this idea</span>
                  </div>
                ) : (
                  <Link href={`/idea/${x.id}/`} className="group flex items-center gap-3 rounded-2xl bg-tile-2/60 px-2.5 py-2 text-[13px] transition-colors hover:bg-tile-2">
                    <Score n={x.score} />
                    <span className="min-w-0 flex-1"><span className="font-semibold text-zinc-200">{x.name}</span><span className="block truncate text-xs text-zinc-400">{x.rationale}</span></span>
                    <IconChevronRight size={14} className="shrink-0 text-zinc-400 group-hover:text-zinc-200" />
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <Card className="!p-0">
        <div className="px-5 pt-5 sm:px-6 sm:pt-6">
          <h2 className="text-[17px] font-semibold tracking-tight text-zinc-50">More detail</h2>
          <p className="mt-1 text-[13px] text-zinc-400">Rarely needed. Mock values; runner-ups mostly show “Not written”.</p>
        </div>
        <div className="mt-3 divide-y divide-white/[0.06] border-t border-white/[0.06]">
          <More title="Who has the pain">{idea.who ? <P>{idea.who}</P> : <NotWritten />}</More>
          <More title="Gates and competitor veto"><Gates idea={idea} /></More>
          <More title="Competitors and the gap">
            {idea.competitors.length ? <Competitors list={idea.competitors} /> : <NotWritten />}
            {idea.gap && <p className="mt-3 text-[14px] leading-relaxed text-zinc-200"><b className="font-semibold text-zinc-50">Gap:</b> {idea.gap}</p>}
          </More>
          <More title="Price, MVP and kill question">
            <dl className="space-y-3 text-[14px] leading-relaxed">
              <Row k="Price (estimate)" v={idea.price?.text} />
              <Row k="MVP" v={idea.mvp} />
              <Row k="What would kill it" v={idea.killQuestion} />
            </dl>
          </More>
          <More title="Product life cycle"><PlcFit plc={idea.plc} /></More>
          <More title="Signal trend"><Trend idea={idea} /></More>
        </div>
      </Card>
    </>
  );
}

const P = ({ children }: { children: ReactNode }) => <p className="text-[14px] leading-relaxed text-zinc-200">{children}</p>;
const NotWritten = () => <p className="text-[13px] italic text-zinc-400">Not written.</p>;
const Score = ({ n, top }: { n: number; top?: boolean }) => <span className={`inline-flex h-9 min-w-11 shrink-0 items-center justify-center rounded-full px-2.5 text-[14px] font-semibold tabular-nums ${top ? "bg-accent text-accent-ink" : "bg-tile-2 text-zinc-300"}`}>{n}</span>;

function Row({ k, v }: { k: string; v?: string | null }) {
  return (
    <div>
      <dt className="text-[12px] text-zinc-400">{k}</dt>
      <dd className={v ? "mt-0.5 text-zinc-200" : "mt-0.5 text-[13px] italic text-zinc-400"}>{v ?? "Not written."}</dd>
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

function Trend({ idea }: { idea: Idea }) {
  const counts = idea.weekly_counts;
  const wow = idea.week_over_week;
  if (!counts || !wow) return <NotWritten />;
  const weeks = Object.keys(counts).sort();
  return (
    <div>
      <Sparkline points={weeks.map((w) => counts[w])} label="Matching posts per ISO week" className="h-14" />
      <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-zinc-400">{weeks.map((w) => <span key={w}>{wk(w)} · {counts[w]}</span>)}</div>
      <p className="mt-3 text-[12px] leading-relaxed text-zinc-400">{wow.note}</p>
    </div>
  );
}
