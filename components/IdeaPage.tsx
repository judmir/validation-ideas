"use client";
import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { RULES, type Complaint, type Idea } from "@/lib/types";
import { eur0, formatDate, int, shortDate, wk } from "@/lib/format";
import { useValidation, type ValidationState } from "@/lib/store";
import { stageOf, testNumbers } from "@/lib/status";
import { Callout, Card, Metric, Sparkline, StatusPill, Tag } from "./ui";
import { TabBar, useHashTab } from "./Tabs";
import Provenance from "./evidence/Provenance";
import Quotes from "./evidence/Quotes";
import ScoreRubric from "./evidence/ScoreRubric";
import Gates from "./evidence/Gates";
import Competitors from "./evidence/Competitors";
import PlcFit from "./evidence/PlcFit";
import ValidateTab from "./validate/ValidateTab";
import ReportTab from "./validate/ReportTab";
import { IconArrowLeft, IconChevronRight, IconExternal, IconLock } from "./icons";

export type RunInfo = { date: string; label: string | null; line: string; note: string | null; ideas: { id: string; title: string; score: number }[] };

const TABS = ["evidence", "validate", "report"];
const VERDICT_WORD = { winner: "Winner", "near-miss": "Near-miss", killed: "Killed", "below-bar": "Below the bar" } as const;

export default function IdeaPage({ idea, run }: { idea: Idea; run: RunInfo }) {
  const { tab, go, anchor, clearAnchor } = useHashTab(TABS, "evidence");
  const [v, setV, loaded] = useValidation(idea);
  const validates = (idea.verdict === "winner" || !!idea.demo) && !!idea.validation;
  const title = idea.name ?? idea.label ?? idea.painId;

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
            <h1 className="min-w-0 break-words text-[28px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[34px]">{title}</h1>
            {validates && (loaded ? <StatusPill stage={stageOf(v)} /> : <span className="h-5 w-16 animate-pulse rounded-full bg-white/[0.06]" />)}
          </div>
          <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-zinc-300">{idea.pitch ?? idea.who}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {idea.demo ? <Tag warm>Simulated winner</Tag> : idea.verdict === "winner" ? <Tag warm>Winner</Tag> : null}
            <Tag>{idea.painId}</Tag>
            <Tag>Night {shortDate(idea.night)}</Tag>
          </div>
        </div>
        <Metrics idea={idea} run={run} v={v} loaded={loaded} validates={validates} />
      </div>

      <TabBar
        tabs={[{ id: "evidence", label: "Evidence" }, { id: "validate", label: "Validate", badge: lock }, { id: "report", label: "Report", badge: lock }]}
        active={tab}
        onSelect={select}
      />
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="space-y-4">
        {tab !== "evidence" && idea.demo && <Callout tone="accent" title="Simulated — this idea was actually killed">{idea.demo.banner.replace(/^Simulated — this idea was actually killed\. /, "")}</Callout>}
        {tab === "evidence" && <Evidence idea={idea} run={run} />}
        {tab === "validate" && (validates ? <ValidateTab idea={idea} v={v} setV={setV} loaded={loaded} goReport={() => select("report")} /> : <Locked idea={idea} />)}
        {tab === "report" && (validates ? <ReportTab idea={idea} v={v} loaded={loaded} goValidate={() => select("validate")} /> : <Locked idea={idea} />)}
      </div>
    </div>
  );
}

/** Big-numeral strip (d889d85 style). Score with the 18 tick, verdict, evidence counts; test numbers for the demo. */
function Metrics({ idea, run, v, loaded, validates }: { idea: Idea; run: RunInfo; v: ValidationState; loaded: boolean; validates: boolean }) {
  const t = idea.scores.total;
  const rank = run.ideas.findIndex((x) => x.id === idea.painId) + 1;
  const score = (
    <Metric label="Score" value={t} unit={`/ ${RULES.maxScore}`}>
      <div className="relative h-2.5 rounded-full bg-white/[0.08]">
        <div className={`h-2.5 rounded-full ${t >= RULES.passBar ? "bg-accent-light" : t >= RULES.nearMissMin ? "bg-[#fbbf24]" : "bg-zinc-500"}`} style={{ width: `${(t / RULES.maxScore) * 100}%` }} />
        <span className="absolute -bottom-1 -top-1 w-[2px] rounded-full bg-zinc-300" style={{ left: `${(RULES.passBar / RULES.maxScore) * 100}%` }} aria-hidden />
      </div>
      <div className="mt-2 text-[12px] text-zinc-400">#{rank} of {run.ideas.length} this night · bar {RULES.passBar}</div>
    </Metric>
  );
  const verdictTone = idea.verdict === "killed" ? "text-[#fca5a5]" : idea.verdict === "near-miss" ? "text-[#fcd34d]" : idea.verdict === "winner" ? "text-[#86efac]" : "";
  const verdict = (
    <Metric label="Pipeline verdict" value={<span className={`text-[24px] sm:text-[26px] ${verdictTone}`}>{VERDICT_WORD[idea.verdict]}</span>}>
      <div className="text-[12px] text-zinc-400">{idea.competitor_veto ? "Competitor veto" : idea.verdict === "near-miss" ? `${RULES.passBar - t} below the bar` : idea.verdict === "below-bar" ? `Under ${RULES.nearMissMin}` : "Score, gates and veto"}</div>
    </Metric>
  );
  if (!validates || !idea.validation) {
    return (
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {score}
        {verdict}
        <Metric label="Complaints" value={idea.complaint_ids.length}><div className="text-[12px] text-zinc-400">{idea.distinct_people} distinct people</div></Metric>
        <Metric label="Proven models" value={idea.proven_models.length}><div className="text-[12px] text-zinc-400">{idea.recurring ? "Recurring cluster" : "Not recurring"}</div></Metric>
      </div>
    );
  }
  const budget = idea.validation.adKit.budgetEur.max;
  const n = testNumbers(v);
  const spentPct = budget ? Math.min(100, Math.round((n.spend / budget) * 100)) : 0;
  const status = v.status === "finished" ? (n.call === "strong" ? "Strong" : n.call === "kill" ? "Kill" : n.call === "inconclusive" ? "Inconclusive" : "Low traffic") : v.status === "running" ? "Live" : "Ready";
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {score}
      <Metric label="Signups" value={loaded ? int(n.signups) : "–"} unit={v.status === "finished" ? "simulated" : v.status === "running" ? "live" : undefined}>
        <div className="text-[12px] text-zinc-400">{loaded ? `${int(n.visitors)} visitors · ${int(n.priceClicks)} price clicks` : "\u00a0"}</div>
      </Metric>
      <Metric label="Budget spent" value={loaded ? `${spentPct}%` : "–"}>
        <div className="h-2.5 rounded-full bg-white/[0.08]"><div className={`h-2.5 rounded-full ${v.status === "running" ? "bg-warm" : "bg-accent-light"}`} style={{ width: `${spentPct}%` }} /></div>
        <div className="mt-2 text-[12px] text-zinc-400">{eur0(n.spend)} of {eur0(budget)}</div>
      </Metric>
      <Metric label="Test" value={<span className={`text-[24px] sm:text-[26px] ${status === "Strong" ? "text-[#86efac]" : status === "Kill" ? "text-[#fca5a5]" : status === "Inconclusive" ? "text-[#fcd34d]" : status === "Live" ? "text-warm" : ""}`}>{loaded ? status : "–"}</span>}>
        <div className="text-[12px] text-zinc-400">Fake-door test · <span className="whitespace-nowrap">€{idea.validation.adKit.budgetEur.min}–{budget}</span></div>
      </Metric>
    </div>
  );
}

function Locked({ idea }: { idea: Idea }) {
  return (
    <Card className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-tile-2 text-zinc-300"><IconLock size={18} /></div>
      <div className="min-w-0 flex-1">
        <h3 className="text-[15px] font-semibold text-zinc-50">Only the night&apos;s winner is validated</h3>
        <p className="mt-0.5 text-[13px] text-zinc-400">This pain is {VERDICT_WORD[idea.verdict].toLowerCase()} ({idea.scores.total}/{RULES.maxScore}). The pipeline never builds a landing page or ad kit for it.</p>
      </div>
    </Card>
  );
}

/** Evidence: verdict, score breakdown and a quotes summary beside the night report; everything else collapsed. */
function Evidence({ idea, run }: { idea: Idea; run: RunInfo }) {
  const note = idea.verdict === "killed" ? idea.kill_reason ?? idea.borderline_note : idea.borderline_note;
  const linked = idea.quotes.filter((q) => /^https?:\/\//.test(q.link));
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
        <Card className="min-w-0">
          <h3 className="label">Verdict</h3>
          <p className={`mt-2 text-[17px] font-semibold ${idea.verdict === "killed" ? "text-[#fca5a5]" : idea.verdict === "near-miss" ? "text-[#fcd34d]" : "text-zinc-50"}`}>
            {VERDICT_WORD[idea.verdict]}{idea.competitor_veto ? " · competitor veto" : ""}
          </p>
          {note ? <p className="mt-1.5 text-[14px] leading-relaxed text-zinc-300">{note}</p> : <p className="mt-1.5 text-[13px] text-zinc-400">Score {idea.scores.total}/{RULES.maxScore}, under the {RULES.nearMissMin}–{RULES.passBar - 1} near-miss band.</p>}

          <h3 className="label mt-7">Score breakdown</h3>
          <div className="mt-2.5"><ScoreRubric idea={idea} /></div>

          <h3 className="label mt-7">What people say</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-zinc-300">{idea.evidenceSummary}</p>
          <p className="mt-1.5 text-[12px] text-zinc-400">{idea.complaint_ids.length} complaints · {idea.distinct_people} distinct people · {idea.proven_models.length} proven model{idea.proven_models.length === 1 ? "" : "s"}</p>
          {linked.length > 0 && <ul className="mt-3 space-y-2">{linked.slice(0, 2).map((q) => <QuoteLine key={q.id} q={q} />)}</ul>}
        </Card>

        <Card className="min-w-0">
          <h2 className="text-[17px] font-semibold tracking-tight text-zinc-50">Night report</h2>
          <div className="mt-1 text-[13px] text-zinc-400">{formatDate(run.date)}{run.label ? ` · ${run.label}` : ""}</div>
          <p className="mt-3 text-[13px] leading-relaxed text-zinc-300">{run.line}</p>
          {run.note && <p className="mt-1 text-xs text-zinc-400">{run.note}.</p>}
          <h3 className="label mt-6">All pains this night</h3>
          <ol className="mt-2.5 space-y-2">
            {run.ideas.map((x) => (
              <li key={x.id}>
                {x.id === idea.painId ? (
                  <div className="flex items-center gap-3 rounded-2xl bg-[#2c2840] px-2.5 py-2 text-[13px] ring-1 ring-inset ring-accent/35">
                    <Score n={x.score} top /><span className="min-w-0 truncate font-semibold text-zinc-50">{x.title}</span><span className="ml-auto shrink-0 pr-1 text-xs text-zinc-300">this pain</span>
                  </div>
                ) : (
                  <Link href={`/idea/${x.id}/`} className="group flex items-center gap-3 rounded-2xl bg-tile-2/60 px-2.5 py-2 text-[13px] transition-colors hover:bg-tile-2">
                    <Score n={x.score} />
                    <span className="min-w-0 flex-1 truncate font-semibold text-zinc-200">{x.title}</span>
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
          <p className="mt-1 text-[13px] text-zinc-400">From pains.json and the morning brief. Brief-only fields are often not written below the bar.</p>
        </div>
        <div className="mt-3 divide-y divide-white/[0.06] border-t border-white/[0.06]">
          <More title="Who has the pain">
            <P>{idea.who}</P>
            <p className="mt-3 text-[13px] leading-relaxed text-zinc-300">{idea.description}</p>
          </More>
          <More title={`All quotes (${linked.length})`}><Quotes quotes={idea.quotes} /></More>
          <More title="Provenance and proven models"><Provenance idea={idea} /></More>
          <More title="Gates and competitor veto"><Gates idea={idea} /></More>
          <More title="Competitors and the gap">
            {idea.competitors.length ? <Competitors list={idea.competitors} /> : <NotWritten />}
            <p className={`mt-3 text-[14px] leading-relaxed ${idea.gap ? "text-zinc-200" : "italic text-zinc-400"}`}>{idea.gap ? <><b className="font-semibold text-zinc-50">Gap:</b> {idea.gap}</> : "Gap not researched."}</p>
          </More>
          <More title="Price, MVP and kill question">
            <dl className="space-y-3 text-[14px] leading-relaxed">
              <Row k="Price (USD estimate, from the brief)" v={idea.price?.text} />
              <Row k="MVP" v={idea.mvp} />
              <Row k="What would kill it" v={idea.killQuestion} />
            </dl>
          </More>
          <More title="Product life cycle (assessment)"><PlcFit plc={idea.plc} /></More>
          <More title="Cluster trend"><Trend idea={idea} /></More>
          <More title="Pipeline metadata">
            <dl className="space-y-3 text-[14px]">
              <Row k="Pain id" v={idea.painId} />
              <Row k="Analyst run" v={idea.analyst_run} />
              <Row k="Niche" v={idea.niche} />
              <Row k="Market" v={idea.market} />
            </dl>
          </More>
        </div>
      </Card>
    </>
  );
}

function QuoteLine({ q }: { q: Complaint }) {
  return (
    <li className="rounded-2xl bg-tile-2 px-4 py-3">
      <blockquote className="line-clamp-3 text-[13px] leading-relaxed text-zinc-100">“{q.quote}”</blockquote>
      <a href={q.link} target="_blank" rel="noreferrer" className="mt-1.5 inline-flex items-center gap-1 text-[12px] font-semibold text-zinc-400 hover:text-accent-light">{q.source} · {shortDate(q.post_date)} <IconExternal size={11} /></a>
    </li>
  );
}

const P = ({ children }: { children: ReactNode }) => <p className="text-[14px] leading-relaxed text-zinc-200">{children}</p>;
const NotWritten = () => <p className="text-[13px] italic text-zinc-400">Not written.</p>;
const Score = ({ n, top }: { n: number; top?: boolean }) => <span className={`inline-flex h-9 min-w-11 shrink-0 items-center justify-center rounded-full px-2.5 text-[14px] font-semibold tabular-nums ${top ? "bg-accent text-accent-ink" : "bg-tile-2 text-zinc-300"}`}>{n}</span>;

function Row({ k, v }: { k: string; v?: string | null }) {
  return (
    <div>
      <dt className="text-[12px] text-zinc-400">{k}</dt>
      <dd className={v ? "mt-0.5 break-words text-zinc-200" : "mt-0.5 text-[13px] italic text-zinc-400"}>{v ?? "Not written."}</dd>
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
  const weeks = Object.keys(counts).sort();
  const d = wow.this_week - wow.last_week;
  return (
    <div>
      <Sparkline points={weeks.map((w) => counts[w])} label="Complaints per ISO week" className="h-14" />
      <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-zinc-400">{weeks.map((w) => <span key={w}>{wk(w)} · {counts[w]}</span>)}</div>
      <p className="mt-3 text-[13px] text-zinc-300">{wk(wow.last_week_iso)} → {wk(wow.this_week_iso)}: <b className="tabular-nums text-zinc-50">{wow.last_week} → {wow.this_week}</b> <span className={d > 0 ? "text-[#fdba74]" : "text-zinc-400"}>({d > 0 ? `+${d}` : d})</span>{wow.partial_week_W43 != null ? ` · W43 so far ${wow.partial_week_W43}` : ""}</p>
      <p className="mt-1 text-[12px] leading-relaxed text-zinc-400">{wow.note}</p>
      {idea.recurring_note && <p className="mt-1 text-[12px] leading-relaxed text-zinc-400">{idea.recurring_note}</p>}
    </div>
  );
}
