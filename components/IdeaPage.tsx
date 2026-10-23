"use client";
import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { RULES, type GateKey, type Idea } from "@/lib/types";
import { formatDate, shortDate, wk } from "@/lib/format";
import { useValidation } from "@/lib/store";
import { Callout, Card, Placeholder, PlcChip, Sparkline, Tag, VerdictBadge } from "./ui";
import { TabBar, useHashTab } from "./Tabs";
import Provenance from "./evidence/Provenance";
import ScoreRubric from "./evidence/ScoreRubric";
import Gates, { GATE_SHORT, GateChip, VetoChip } from "./evidence/Gates";
import Competitors from "./evidence/Competitors";
import PlcFit from "./evidence/PlcFit";
import ValidateTab from "./validate/ValidateTab";
import ReportTab from "./validate/ReportTab";
import { IconArrowLeft, IconLock } from "./icons";

const TABS = ["evidence", "validate", "report"];
const VERDICT_WORD = { winner: "the winner", "near-miss": "a near-miss", killed: "killed", "below-bar": "below the bar" } as const;

export default function IdeaPage({ idea }: { idea: Idea }) {
  const { tab, go, anchor, clearAnchor } = useHashTab(TABS, "evidence");
  const [v, setV, loaded] = useValidation(idea);
  const validates = !!idea.validation;
  const title = idea.name;

  useEffect(() => {
    if (anchor && tab === "validate") {
      requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ block: "start" }));
      clearAnchor();
    }
  }, [anchor, tab, clearAnchor]);
  const select = (id: string) => { go(id); window.scrollTo({ top: 0 }); };

  return (
    <div className="space-y-5">
      <Header idea={idea} title={title} />
      <TabBar
        tabs={[
          { id: "evidence", label: "Evidence" },
          { id: "validate", label: "Validate", badge: !validates ? <IconLock size={12} className="shrink-0 opacity-70" /> : undefined },
          { id: "report", label: "Report", badge: !validates ? <IconLock size={12} className="shrink-0 opacity-70" /> : undefined },
        ]}
        active={tab}
        onSelect={select}
      />
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="space-y-4">
        {tab === "evidence" && <Evidence idea={idea} />}
        {tab === "validate" && (validates ? <ValidateTab idea={idea} v={v} setV={setV} loaded={loaded} goReport={() => select("report")} /> : <Locked idea={idea} />)}
        {tab === "report" && (validates ? <ReportTab idea={idea} v={v} loaded={loaded} goValidate={() => select("validate")} /> : <Locked idea={idea} />)}
      </div>
    </div>
  );
}

function Header({ idea, title }: { idea: Idea; title: string }) {
  const t = idea.scores.total;
  return (
    <div>
      <Link href="/" className="inline-flex items-center gap-1.5 rounded-full text-[13px] font-semibold text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"><IconArrowLeft size={14} /> All ideas</Link>
      <div className="mt-4 flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1 className="min-w-0 break-words text-[26px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[34px]">{title}</h1>
            <VerdictBadge verdict={idea.verdict} veto={idea.competitor_veto} />
            {idea.rank === 1 && <span className="rounded-full bg-accent-pale px-2.5 py-0.5 text-[11px] font-semibold text-[#2a1f6b]">Top pick</span>}
          </div>
          <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-zinc-300">{idea.pitch}</p>
        </div>
        <ScoreRing score={t} />
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {(Object.keys(GATE_SHORT) as GateKey[]).map((k) => <GateChip key={k} label={GATE_SHORT[k]} g={idea.gates[k]} />)}
        <VetoChip veto={idea.competitor_veto} />
        <PlcChip stage={idea.plc?.stage ?? null} />
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        <Tag>Market {idea.market}</Tag><Tag>{idea.niche}</Tag><Tag>Run {shortDate(idea.night)}</Tag><Tag>Rank #{idea.rank}</Tag>
      </div>
      {(idea.kill_reason || idea.borderline_note) && (
        <div className="mt-4 space-y-2">
          {idea.verdict === "killed" && idea.kill_reason ? (
            <Callout tone="red" title={idea.competitor_veto ? "Kill reason · competitor veto" : idea.validation?.results ? "Kill reason · validation test" : "Kill reason"} collapsible>{idea.kill_reason}</Callout>
          ) : null}
          {idea.borderline_note && idea.verdict !== "winner" && <Callout tone="amber" title="Borderline note">{idea.borderline_note}</Callout>}
        </div>
      )}
    </div>
  );
}

/** Ring with the score arc and a tick at the pass bar. */
function ScoreRing({ score }: { score: number }) {
  const size = 100, stroke = 9, r = size / 2 - stroke / 2 - 6, c = 2 * Math.PI * r;
  const pass = score >= RULES.passBar;
  const a = (RULES.passBar / RULES.maxScore) * 2 * Math.PI - Math.PI / 2;
  const tick = (k: number) => ({ x: size / 2 + Math.cos(a) * (r + k), y: size / 2 + Math.sin(a) * (r + k) });
  const n1 = tick(-stroke / 2 - 1), n2 = tick(stroke / 2 + 1), o1 = tick(stroke / 2 + 1), o2 = tick(stroke / 2 + 5);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="img" aria-label={`${score} of ${RULES.maxScore}; bar ${RULES.passBar}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={pass ? "#b9aefb" : score >= RULES.nearMissMin ? "#fbbf24" : "#71717a"} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${(score / RULES.maxScore) * c} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
        <line x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke="#1b1b1e" strokeWidth={3} />
        <line x1={o1.x} y1={o1.y} x2={o2.x} y2={o2.y} stroke="#f4f4f5" strokeWidth={2.5} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div><div className="text-[26px] font-medium leading-none tabular-nums text-zinc-50">{score}</div><div className="mt-0.5 text-[11px] leading-tight text-zinc-400">/{RULES.maxScore}<br />bar {RULES.passBar}</div></div>
      </div>
    </div>
  );
}

function Locked({ idea }: { idea: Idea }) {
  return (
    <Card className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-tile-2 text-zinc-300"><IconLock size={18} /></div>
      <div className="min-w-0 flex-1">
        <h3 className="text-[15px] font-semibold text-zinc-50">Only the run&apos;s top pick gets a demo</h3>
        <p className="mt-0.5 text-[13px] text-zinc-400">Only each run&apos;s top pick gets a landing page, ad kit and validation test. This idea is {VERDICT_WORD[idea.verdict]} ({idea.scores.total}/{RULES.maxScore}) and ranked #{idea.rank} on {shortDate(idea.night)}.</p>
      </div>
    </Card>
  );
}

function Section({ n, title, right, children }: { n: number; title: string; right?: ReactNode; children: ReactNode }) {
  return (
    <Card className="min-w-0">
      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-tile-2 text-[11px] font-bold tabular-nums text-zinc-300">{n}</span>
        <h2 className="text-[17px] font-semibold tracking-tight text-zinc-50">{title}</h2>
        {right}
      </div>
      {children}
    </Card>
  );
}

const Text = ({ children }: { children: ReactNode }) => <p className="text-[14px] leading-relaxed text-zinc-200">{children}</p>;
const Label = ({ children }: { children: ReactNode }) => <span className="rounded-md bg-white/[0.08] px-2 py-0.5 text-[11px] font-semibold text-zinc-300">{children}</span>;

function Evidence({ idea }: { idea: Idea }) {
  const counts = idea.weekly_counts;
  const weeks = counts ? Object.keys(counts).sort() : [];
  const wow = idea.week_over_week;
  const d = wow ? wow.this_week - wow.last_week : 0;
  return (
    <>
      <Section n={1} title="Pitch and who has it">
        <Text>{idea.pitch}</Text>
        <div className="mt-4 rounded-2xl bg-tile-2 p-4">
          <div className="label">Who has the pain</div>
          {idea.who ? <p className="mt-1.5 text-[14px] leading-relaxed text-zinc-100">{idea.who}</p> : <div className="mt-1.5"><Placeholder what="Not written" /></div>}
        </div>
      </Section>
      <Section n={2} title="Signals" right={<span className="text-[12px] text-zinc-400">{idea.signals.length} from the scout</span>}><Provenance idea={idea} /></Section>
      <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
        <Section n={3} title="Score"><ScoreRubric idea={idea} /></Section>
        <Section n={4} title="Gates and veto"><Gates idea={idea} /></Section>
      </div>
      <Section n={5} title="Competitors">
        {idea.competitors.length ? <Competitors list={idea.competitors} /> : <Placeholder what="Competitors not researched" />}
        <div className="mt-4 rounded-2xl bg-tile-2 p-4">
          <div className="label">The gap</div>
          {idea.gap ? <p className="mt-1.5 text-[14px] leading-relaxed text-zinc-100">{idea.gap}</p> : <div className="mt-1.5"><Placeholder what="Not written" /></div>}
        </div>
      </Section>
      <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
        <Section n={6} title="Price" right={<Label>Estimate</Label>}>
          {idea.price ? <p className="text-[20px] font-medium leading-snug tracking-tight text-zinc-50">{idea.price.text}</p> : <Placeholder what="No price estimate written" />}
          <p className="mt-2 text-[12px] text-zinc-400">EUR, a mock estimate. Never a measured price.</p>
        </Section>
        <Section n={7} title="PLC fit" right={<Label>Assessment</Label>}><PlcFit plc={idea.plc} /></Section>
      </div>
      <Section n={8} title="MVP">{idea.mvp ? <Text>{idea.mvp}</Text> : <Placeholder what="No MVP written" />}</Section>
      <Section n={9} title="What would kill this idea?">{idea.killQuestion ? <Text>{idea.killQuestion}</Text> : <Placeholder what="Not written" />}</Section>
      <Section n={10} title="Signal trend" right={idea.recurring ? <span className="rounded-full bg-[#fdba74] px-2.5 py-0.5 text-[11px] font-semibold text-[#431407]">Recurring</span> : <Label>Not recurring</Label>}>
        {counts && wow ? (
          <>
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] sm:items-end">
              <div className="min-w-0">
                <Sparkline points={weeks.map((w) => counts[w])} label="Matching posts per ISO week" className="h-16" />
                <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-zinc-400">{weeks.map((w) => <span key={w}>{wk(w)} · {counts[w]}</span>)}</div>
              </div>
              <div className="rounded-2xl bg-tile-2 p-4">
                <div className="text-[12px] text-zinc-400">{wk(wow.last_week_iso)} → {wk(wow.this_week_iso)}</div>
                <div className="mt-1 text-[24px] font-medium tabular-nums text-zinc-50">{wow.last_week} → {wow.this_week} <span className={`text-[14px] ${d > 0 ? "text-[#fdba74]" : "text-zinc-400"}`}>{d > 0 ? `+${d}` : d}</span></div>
              </div>
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-zinc-400">{wow.note}</p>
          </>
        ) : <Placeholder what="No weekly counts" />}
      </Section>
      <p className="px-1 text-[11px] text-zinc-400">Scouted {formatDate(idea.night)}. All data on this page is fictional mock data.</p>
    </>
  );
}
