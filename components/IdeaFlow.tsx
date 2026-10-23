"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { findIdea, formatDate } from "@/lib/data";
import { useValidation } from "@/lib/store";
import StatusBadge from "./StatusBadge";
import ScoutStage from "./stages/ScoutStage";
import ValidateStage from "./stages/ValidateStage";
import ReportStage from "./stages/ReportStage";
import { Tag, btn } from "./ui";
import { IconArrowLeft, IconCheck, IconLock } from "./icons";

const STEPS = [
  { key: "scout", label: "Scout" },
  { key: "validate", label: "Validate" },
  { key: "report", label: "Report" },
] as const;
type StepKey = (typeof STEPS)[number]["key"];

export default function IdeaFlow({ id }: { id: string }) {
  const { idea, run } = findIdea(id)!;
  const [v, setV, loaded] = useValidation(idea);
  const [step, setStepState] = useState<StepKey>("scout");
  const finished = v.status === "finished";

  // Deep-link via #scout / #validate / #report
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.replace("#", "") as StepKey;
      if (STEPS.some((s) => s.key === h)) setStepState(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const go = (k: StepKey) => {
    setStepState(k);
    history.replaceState(null, "", "#" + k);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const idx = STEPS.findIndex((s) => s.key === step);
  const reportLocked = loaded && !finished;
  const doneUpTo = finished ? 2 : 1;

  return (
    <div className="space-y-6">
      <div>
        <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-zinc-400 transition-colors hover:text-zinc-100"><IconArrowLeft size={14} /> Overview</Link>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[34px]">{idea.name}</h1>
          <StatusBadge idea={idea} />
        </div>
        <p className="mt-1 text-[15px] text-zinc-400">{idea.pitch}</p>
        <div className="mt-3 flex flex-wrap gap-1.5"><Tag warm>Top pick</Tag><Tag>Scout run {formatDate(run.date)}</Tag></div>
      </div>

      {/* Calm segmented tabs */}
      <nav className="sticky top-[68px] z-10 lg:top-3" aria-label="Flow steps">
        <ol className="grid grid-cols-3 gap-1 rounded-full bg-tile p-1 shadow-[0_10px_24px_-12px_rgb(0_0_0/0.7)] sm:max-w-md">
          {STEPS.map((s, i) => {
            const active = s.key === step;
            const locked = s.key === "report" && reportLocked;
            const done = i < doneUpTo && !active;
            return (
              <li key={s.key}>
                <button
                  onClick={() => go(s.key)}
                  aria-current={active ? "step" : undefined}
                  className={`flex h-10 w-full items-center justify-center gap-2 rounded-full px-2 text-[13px] font-semibold transition-colors ${
                    active ? "bg-white text-ink" : "text-zinc-300 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold tabular-nums ${active ? "bg-accent text-accent-ink" : done ? "bg-accent-pale text-accent-ink" : "bg-tile-2 text-zinc-300"}`}>
                    {done ? <IconCheck size={11} strokeWidth={2.6} /> : locked ? <IconLock size={10} strokeWidth={2} /> : i + 1}
                  </span>
                  <span>{s.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div key={step} className="animate-[fadein_.25s_ease-out]">
        {step === "scout" && <ScoutStage idea={idea} run={run} />}
        {step === "validate" && <ValidateStage idea={idea} v={v} setV={setV} loaded={loaded} onFinished={() => go("report")} />}
        {step === "report" && <ReportStage idea={idea} v={v} setV={setV} loaded={loaded} goValidate={() => go("validate")} />}
      </div>

      {/* Back / Next */}
      <div className="flex items-center justify-between gap-3 border-t border-line pt-5">
        {idx === 0 ? (
          <Link href="/" className={btn.ghost}>← Overview</Link>
        ) : (
          <button className={btn.ghost} onClick={() => go(STEPS[idx - 1].key)}>← {STEPS[idx - 1].label}</button>
        )}
        {idx < 2 ? (
          <button
            className={btn.primary}
            disabled={STEPS[idx + 1].key === "report" && reportLocked}
            title={STEPS[idx + 1].key === "report" && reportLocked ? "Finish the validation test first" : undefined}
            onClick={() => go(STEPS[idx + 1].key)}
          >
            {STEPS[idx + 1].key === "report" && reportLocked ? "Report 🔒" : `Next: ${STEPS[idx + 1].label} →`}
          </button>
        ) : (
          <Link href="/" className={btn.primary}>Done · Overview</Link>
        )}
      </div>
    </div>
  );
}
