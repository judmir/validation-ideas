"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { findIdea, formatDate } from "@/lib/data";
import { useValidation } from "@/lib/store";
import StatusBadge from "./StatusBadge";
import ScoutStage from "./stages/ScoutStage";
import ValidateStage from "./stages/ValidateStage";
import ReportStage from "./stages/ReportStage";
import { btn } from "./ui";
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
    <div className="space-y-5">
      <div>
        <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] text-zinc-500 transition-colors hover:text-zinc-200 lg:hidden"><IconArrowLeft size={14} /> Scout log</Link>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 lg:mt-0">
          <h1 className="text-[22px] font-medium tracking-tight text-zinc-50">{idea.name}</h1>
          <StatusBadge idea={idea} />
        </div>
        <p className="mt-1 text-[13px] text-zinc-400">{idea.pitch}</p>
        <p className="mt-2 text-xs text-zinc-500">Top pick · scout run {formatDate(run.date)}</p>
      </div>

      {/* Stepper */}
      <nav className="sticky top-16 z-10 -mx-4 bg-bg/85 px-4 py-2 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-7 lg:px-7">
        <ol className="grid grid-cols-3 gap-1 rounded-xl border border-line bg-surface p-1 sm:max-w-md">
          {STEPS.map((s, i) => {
            const active = s.key === step;
            const locked = s.key === "report" && reportLocked;
            const done = i < doneUpTo && !active;
            return (
              <li key={s.key}>
                <button
                  onClick={() => go(s.key)}
                  className={`flex h-9 w-full items-center justify-center gap-2 rounded-lg px-2 text-[13px] font-medium transition-colors ${
                    active ? "border border-line-strong bg-surface-3 text-zinc-50" : locked ? "text-zinc-400" : "text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-200"
                  }`}
                >
                  <span className={`grid h-[18px] w-[18px] place-items-center rounded-full text-[10px] font-semibold tabular-nums ${active ? "bg-white text-black" : done ? "bg-[#bbf7d0] text-[#14532d]" : "bg-surface-3 text-zinc-400"}`}>
                    {done ? <IconCheck size={11} strokeWidth={2.5} /> : locked ? <IconLock size={10} strokeWidth={2} /> : i + 1}
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
          <Link href="/" className={btn.ghost}>← Scout log</Link>
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
          <Link href="/" className={btn.primary}>Done · Scout log</Link>
        )}
      </div>
    </div>
  );
}
