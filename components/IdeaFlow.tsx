"use client";
import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { findIdea, formatDate, int } from "@/lib/data";
import { useValidation } from "@/lib/store";
import { stageOf, testNumbers } from "@/lib/status";
import ScoutStage from "./stages/ScoutStage";
import PageStage from "./stages/PageStage";
import ValidateStage from "./stages/ValidateStage";
import ReportStage from "./stages/ReportStage";
import { BudgetBar, Metric, Sparkline, StatusPill, Tag } from "./ui";
import { IconArrowLeft } from "./icons";

const jump = (id: string) => {
  history.replaceState(null, "", "#" + id);
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function IdeaFlow({ id }: { id: string }) {
  const { idea, run } = findIdea(id)!;
  const [v, setV, loaded] = useValidation(idea);
  const n = testNumbers(idea, v);
  const used = n.days - n.daysLeft;

  // Sections only reach full height once stored state is read, so re-apply a #hash deep link then.
  useEffect(() => {
    if (!loaded) return;
    const h = window.location.hash.slice(1);
    if (h) document.getElementById(h)?.scrollIntoView({ block: "start" });
  }, [loaded]);

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <div>
          <Link href="/" className="inline-flex items-center gap-1.5 rounded-full text-[13px] font-semibold text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"><IconArrowLeft size={14} /> All scouts</Link>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[34px]">{idea.name}</h1>
            {loaded ? <StatusPill stage={stageOf(v)} /> : <span className="h-5 w-16 animate-pulse rounded-full bg-white/[0.06]" />}
          </div>
          <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-zinc-300">{idea.pitch}</p>
          <div className="mt-3 flex flex-wrap gap-1.5"><Tag warm>Top pick</Tag><Tag>Scouted {formatDate(run.date)}</Tag></div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Metric label="Score" value={idea.score} unit="/ 100">
            <div className="h-2.5 rounded-full bg-white/[0.08]"><div className="h-2.5 rounded-full bg-accent-light" style={{ width: `${idea.score}%` }} /></div>
            <div className="mt-2 text-[12px] text-zinc-400">Best of {run.ideas.length} ideas</div>
          </Metric>
          <Metric label="Signups" value={loaded ? int(n.signups) : "–"} unit={v.status === "finished" ? "final" : v.status === "running" ? "live" : undefined}>
            <Sparkline points={n.trend} className="h-12" label={n.trend.length >= 2 ? `Signups trend, ${v.status === "finished" ? "per day" : "live"}` : v.status === "running" ? "Collecting data…" : "No test yet"} />
          </Metric>
          <Metric label="Budget spent" value={`${n.total ? Math.round((n.spend / n.total) * 100) : 0}%`}>
            <BudgetBar spent={n.spend} total={n.total} />
          </Metric>
          <Metric label="Days left" value={n.daysLeft} unit={v.status === "finished" ? "test done" : v.status === "running" ? `of ${n.days}` : "not started"}>
            <div className="flex gap-1" role="img" aria-label={`${used} of ${n.days} days used`}>
              {Array.from({ length: n.days }, (_, i) => (
                <span key={i} className={`h-2.5 flex-1 rounded-full ${i < used ? "bg-accent-light" : v.status === "running" && i === used ? "animate-pulse bg-warm" : "bg-white/[0.08]"}`} />
              ))}
            </div>
            <div className="mt-2 text-[12px] text-zinc-400">{n.days}-day ad test</div>
          </Metric>
        </div>
      </div>

      <Section id="scout" step={1} title="Scout findings" sub="Why the App Ideas bot picked this idea.">
        <ScoutStage idea={idea} run={run} />
      </Section>
      <Section id="page" step={2} title="Validation page" sub="The landing page and demo the ad test sends people to.">
        <PageStage idea={idea} />
      </Section>
      <Section id="validate" step={3} title="Live test" sub="A small Facebook ad test that measures real signups.">
        <ValidateStage idea={idea} v={v} setV={setV} loaded={loaded} onFinished={() => jump("report")} />
      </Section>
      <Section id="report" step={4} title="Report" sub="The bot's verdict once the test is done.">
        <ReportStage idea={idea} v={v} setV={setV} loaded={loaded} goValidate={() => jump("validate")} />
      </Section>
    </div>
  );
}

function Section({ id, step, title, sub, children }: { id: string; step: number; title: string; sub: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={id + "-title"} className="scroll-mt-20">
      <div className="mb-4 flex items-start gap-3">
        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-tile-2 text-[12px] font-bold tabular-nums text-zinc-200">{step}</span>
        <div className="min-w-0">
          <h2 id={id + "-title"} className="text-[20px] font-semibold leading-tight tracking-tight text-zinc-50">{title}</h2>
          <p className="mt-0.5 text-[13px] text-zinc-400">{sub}</p>
        </div>
      </div>
      {children}
    </section>
  );
}
