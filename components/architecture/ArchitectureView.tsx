"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { NIGHT_STEPS, nodeById } from "@/lib/architecture";
import { IconX } from "@/components/icons";
import Diagram from "./Diagram";
import NodePanel from "./NodePanel";

const STEP_MS = 3600;

export default function ArchitectureView() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [motion, setMotion] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [sheet, setSheet] = useState(false);
  const desk = useRef<SVGSVGElement>(null);
  const mob = useRef<SVGSVGElement>(null);

  // Respect reduced motion: no moving packets, no autoplay.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => { setMotion(!mq.matches); if (mq.matches) setPlaying(false); };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Step through the night while playing.
  useEffect(() => {
    if (!playing) return;
    const t = window.setInterval(() => setStep((s) => (s + 1) % NIGHT_STEPS.length), STEP_MS);
    return () => window.clearInterval(t);
  }, [playing, step]);

  // Freeze / resume the SVG packet animations with play/pause.
  useEffect(() => {
    for (const s of [desk.current, mob.current]) {
      if (!s) continue;
      if (playing) s.unpauseAnimations(); else s.pauseAnimations();
    }
  }, [playing, step]);

  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSheet(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheet]);

  const select = useCallback((id: string) => {
    setSelected((cur) => (cur === id && !window.matchMedia("(max-width: 767px)").matches ? null : id));
    setSheet(true);
  }, []);

  const cur = NIGHT_STEPS[step];
  const panelNode = nodeById(selected ?? cur.node)!;
  const diagramProps = { activeNode: cur.node, activeEdges: cur.edges, selected, motion, onSelect: select };

  return (
    <>
      <section className="overflow-hidden rounded-[24px] bg-tile" aria-labelledby="night-h">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4 sm:px-6 sm:pt-5">
          <div className="min-w-0">
            <h2 id="night-h" className="text-[17px] font-semibold tracking-tight text-zinc-50">One night, step by step</h2>
            <p className="mt-0.5 text-[13px] text-zinc-400">Tap a step or a box. Orange dots are data moving.</p>
          </div>
        </div>

        {/* Play/pause + night timeline */}
        <div className="mt-4 flex items-stretch gap-2.5 px-4 sm:gap-3 sm:px-6">
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause" : "Play"}
            className="grid w-12 shrink-0 place-items-center rounded-2xl bg-accent text-accent-ink transition-colors hover:bg-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-pale sm:w-14"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <ol className="grid min-w-0 flex-1 grid-cols-4 gap-1.5 sm:gap-2">
            {NIGHT_STEPS.map((s, i) => {
              const on = i === step;
              return (
                <li key={s.time} className="min-w-0">
                  <button
                    onClick={() => { setStep(i); setSelected(null); }}
                    aria-current={on ? "step" : undefined}
                    className={`relative w-full overflow-hidden rounded-2xl px-2 py-2 text-left transition-colors sm:px-3 sm:py-2.5 ${on ? "bg-accent-deep/45" : "bg-tile-2 hover:bg-white/[0.09]"}`}
                  >
                    <div className={`text-[17px] font-semibold leading-none tabular-nums sm:text-[22px] ${on ? "text-warm" : i < step ? "text-zinc-300" : "text-zinc-400"}`}>{s.time}</div>
                    <div className={`mt-1 truncate text-[11px] font-semibold sm:text-[12px] ${on ? "text-zinc-50" : "text-zinc-400"}`}><span className="sm:hidden">{s.short}</span><span className="hidden sm:inline">{s.title}</span></div>
                    {on && (
                      <span
                        key={step}
                        className="step-progress absolute inset-x-0 bottom-0 h-[3px] origin-left bg-accent-light"
                        style={{ animationDuration: `${STEP_MS}ms`, animationPlayState: playing ? "running" : "paused" }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <p className="mt-3 px-4 text-[13px] leading-relaxed text-zinc-300 sm:px-6" aria-live="polite">
          <span className="font-semibold tabular-nums text-warm">{cur.time}</span> <span className="font-semibold text-zinc-50">{cur.title}.</span> {cur.caption}
        </p>

        {/* Diagram: portrait layout on phones, landscape on md+ */}
        <div className="mt-2 px-2 pb-2 sm:px-4 md:hidden"><Diagram ref={mob} layout="mob" {...diagramProps} /></div>
        <div className="mt-2 hidden px-4 pb-2 md:block lg:px-6"><Diagram ref={desk} layout="desk" {...diagramProps} /></div>

        <Legend />
      </section>

      {/* Desktop detail panel */}
      <section className="mt-4 hidden rounded-[24px] bg-tile p-6 md:block" aria-label="Node details">
        <div className="flex items-start justify-between gap-4">
          <div className="label">{selected ? "Selected" : `Now · ${cur.time}`}</div>
          {selected && <button onClick={() => setSelected(null)} className="text-[12px] font-semibold text-zinc-400 hover:text-zinc-100">Follow the night</button>}
        </div>
        <div className="mt-2"><NodePanel node={panelNode} onPick={(id) => setSelected(id)} /></div>
      </section>

      {/* Mobile bottom sheet */}
      {sheet && selected && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true" aria-label={`${panelNode.title} details`}>
          <button className="absolute inset-0 bg-black/55" aria-label="Close details" onClick={() => setSheet(false)} />
          <div className="sheet-up absolute inset-x-0 bottom-0 max-h-[78vh] overflow-y-auto rounded-t-[26px] bg-tile-2 px-5 pb-8 pt-3 shadow-2xl">
            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-white/20" />
            <button onClick={() => setSheet(false)} aria-label="Close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/[0.08] text-zinc-200"><IconX size={16} /></button>
            <NodePanel node={panelNode} onPick={(id) => setSelected(id)} />
          </div>
        </div>
      )}
    </>
  );
}

function Legend() {
  const item = "flex items-center gap-1.5";
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5 border-t border-white/[0.06] px-4 py-3 text-[11.5px] text-zinc-400 sm:px-6">
      <span className={item}><span className="h-2.5 w-2.5 rounded-full bg-warm" />data packet</span>
      <span className={item}><svg width="22" height="6" aria-hidden><path d="M1 3h20" stroke="#8a8a93" strokeWidth="2" /></svg>nightly run</span>
      <span className={item}><svg width="22" height="6" aria-hidden><path d="M1 3h20" stroke="#8a8a93" strokeWidth="2" strokeDasharray="2 5" strokeLinecap="round" /></svg>filing</span>
      <span className={item}><svg width="22" height="6" aria-hidden><path d="M1 3h20" stroke="#8b7cf6" strokeWidth="2" strokeDasharray="6 5" /></svg>proposed</span>
      <span className={item}><svg width="22" height="6" aria-hidden><path d="M1 3h20" stroke="#52525b" strokeWidth="2" strokeDasharray="3 5" /></svg>paused</span>
    </div>
  );
}

function PlayIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5Z" fill="currentColor" /></svg>;
}
function PauseIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden><rect x="6" y="4.5" width="4" height="15" rx="1.3" fill="currentColor" /><rect x="14" y="4.5" width="4" height="15" rx="1.3" fill="currentColor" /></svg>;
}
