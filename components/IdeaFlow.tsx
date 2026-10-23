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
        <Link href="/" className="text-sm text-slate-500 hover:text-slate-800">← Scout log</Link>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">{idea.name}</h1>
          <StatusBadge idea={idea} />
        </div>
        <p className="text-sm text-slate-600">{idea.pitch}</p>
        <p className="mt-1 text-xs text-slate-400">Top pick · scout run {formatDate(run.date)}</p>
      </div>

      {/* Stepper */}
      <nav className="sticky top-[57px] z-10 -mx-4 bg-slate-50/95 px-4 py-2 backdrop-blur">
        <ol className="grid grid-cols-3 gap-1 rounded-2xl bg-slate-200/70 p-1">
          {STEPS.map((s, i) => {
            const active = s.key === step;
            const locked = s.key === "report" && reportLocked;
            const done = i < doneUpTo && !active;
            return (
              <li key={s.key}>
                <button
                  onClick={() => go(s.key)}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-2 py-2 text-sm font-medium transition ${
                    active ? "bg-white text-indigo-700 shadow-sm" : locked ? "text-slate-400" : "text-slate-600 hover:bg-white/60"
                  }`}
                >
                  <span className={`grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold ${active ? "bg-indigo-600 text-white" : done ? "bg-emerald-500 text-white" : "bg-slate-300 text-slate-600"}`}>
                    {done ? "✓" : locked ? "🔒" : i + 1}
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
      <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
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
