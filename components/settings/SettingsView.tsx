"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { GATES } from "@/lib/gates";
import { BASE_MAX, GATE_SETTING_KEY, SEED, SCORE_KEYS, autoNote, changedPaths, diffLines, getPath, maxScore, scaled, setPath, type PipelineSettings, type SourceId } from "@/lib/settings";
import { MODE, SEED_VERSION, SaveError, loadVersions, loadViewer, resetLocal, saveVersion, sendMagicLink, signOut, type SettingsVersion, type Viewer } from "@/lib/settings-store";
import { IconLock, IconX } from "@/components/icons";
import { shortDate } from "@/lib/format";

const DRAFT_KEY = "vi:settings-draft:v3";

type Ctx = { draft: PipelineSettings; saved: PipelineSettings; changed: Set<string>; editable: boolean; set: (path: string, v: unknown) => void };
const C = createContext<Ctx | null>(null);
const useS = () => useContext(C)!;

const SOURCES: { id: SourceId; label: string }[] = [
  { id: "app_store", label: "App Store" },
  { id: "google_play", label: "Google Play" },
  { id: "reddit_arctic_shift", label: "Reddit (via Arctic Shift archive)" },
  { id: "x", label: "X" },
  { id: "hacker_news", label: "Hacker News" },
  { id: "trustpilot", label: "Trustpilot" },
  { id: "niche_forums", label: "Niche forums" },
];
const CRITERIA: Record<(typeof SCORE_KEYS)[number], string> = {
  frequency: "Frequency / proven demand",
  intensity: "Intensity",
  willingness_to_pay: "Willingness to pay",
  reachability: "Reachability",
  buildability: "Buildability",
};
export const SECTIONS = [
  { id: "scouting", title: "Scouting" },
  { id: "scoring", title: "Scoring" },
  { id: "winner", title: "Ideas & winner" },
  { id: "poc", title: "POC build" },
  { id: "validation", title: "Validation" },
  { id: "schedule", title: "Schedule" },
  { id: "history", title: "History" },
] as const;

type Notice = { tone: "amber" | "red" | "neutral"; text: string } | null;

export default function SettingsView() {
  const [versions, setVersions] = useState<SettingsVersion[]>([SEED_VERSION]);
  const [viewer, setViewer] = useState<Viewer>({ signedIn: false });
  const [draft, setDraft] = useState<PipelineSettings>(SEED);
  const [loaded, setLoaded] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [modal, setModal] = useState(false);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [modalMsg, setModalMsg] = useState<string | null>(null);
  const latest = versions[0];
  const saved = latest.settings;
  const editable = MODE === "local" || (MODE === "supabase" && viewer.signedIn);

  const refresh = useCallback(async () => {
    const [{ versions: v, error }, who] = await Promise.all([loadVersions(), loadViewer()]);
    setVersions(v);
    setViewer(who);
    setNotice(error ? { tone: "neutral", text: error } : null);
    return v;
  }, []);

  useEffect(() => {
    (async () => {
      const v = await refresh();
      try {
        const d = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? "null");
        setDraft(d && d.basis === v[0].version && d.draft ? d.draft : v[0].settings);
      } catch { setDraft(v[0].settings); }
      setLoaded(true);
    })();
  }, [refresh]);

  const changed = useMemo(() => changedPaths(saved, draft), [saved, draft]);
  useEffect(() => {
    if (!loaded) return;
    if (changed.size) localStorage.setItem(DRAFT_KEY, JSON.stringify({ basis: latest.version, draft }));
    else localStorage.removeItem(DRAFT_KEY);
  }, [draft, changed, loaded, latest.version]);

  const set = (path: string, v: unknown) => {
    if (!editable) return;
    setDraft((d) => {
      const next = setPath(d, path, v);
      // max_score is derived from the weights; keep it in sync so the saved object stays consistent.
      return path.startsWith("scoring.criteria.") ? setPath(next, "scoring.max_score", maxScore(next)) : next;
    });
  };
  const reset = () => setDraft(saved);
  const openModal = () => { setNote(""); setModalMsg(null); setModal(true); };
  const confirm = async () => {
    setSaving(true);
    setModalMsg(null);
    try {
      await saveVersion(draft, latest.version, note.trim() || autoNote(saved, draft));
      localStorage.removeItem(DRAFT_KEY);
      const v = await refresh();
      setDraft(v[0].settings);
      setModal(false);
      setNotice({ tone: "neutral", text: `Saved as version ${v[0].version}.` });
    } catch (e) {
      if (e instanceof SaveError && e.kind === "conflict") {
        const v = await refresh();
        setModalMsg(`Version ${v[0].version} was saved meanwhile. Your draft is kept; check the changes below against it and confirm again.`);
      } else if (e instanceof SaveError && e.kind === "not-admin") {
        setModal(false);
        setNotice({ tone: "amber", text: "Signed in, but not an admin yet. Ask App ideas to add you; your draft is kept." });
      } else {
        setModalMsg(`Save failed: ${e instanceof Error ? e.message : String(e)}`);
      }
    } finally {
      setSaving(false);
    }
  };
  const n = changed.size;
  const lines = diffLines(saved, draft);

  return (
    <C.Provider value={{ draft, saved, changed, editable, set }}>
      {/* Status bar */}
      <div className="sticky top-16 z-10 -mx-4 bg-panel/90 px-4 py-2 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex flex-wrap items-center gap-2 rounded-[20px] bg-tile p-2 pl-4">
          <span className="flex min-w-0 flex-1 items-center gap-2 text-[13px] font-semibold" aria-live="polite" data-state={n ? "draft" : "saved"}>
            <span className={`h-2 w-2 shrink-0 rounded-full ${n ? "bg-[#fbbf24]" : "bg-[#4ade80]"}`} />
            {n ? <span className="text-[#fcd34d]">Draft · {n} change{n === 1 ? "" : "s"}</span> : <span className="text-zinc-200">Saved</span>}
            <span className="truncate font-medium text-zinc-400">· v{latest.version}</span>
          </span>
          {editable && (
            <>
              <button onClick={reset} disabled={!n} className="h-9 rounded-full px-3.5 text-[13px] font-semibold text-zinc-200 transition-colors hover:bg-white/[0.08] disabled:opacity-40">Reset to saved</button>
              <button onClick={openModal} disabled={!n} className="h-9 rounded-full bg-accent px-4 text-[13px] font-semibold text-accent-ink transition-colors hover:bg-accent-light disabled:opacity-40">Save…</button>
            </>
          )}
        </div>
      </div>

      <Connection viewer={viewer} loaded={loaded} />
      {notice && (
        <p role="status" className={`mt-2 rounded-2xl px-4 py-2.5 text-[13px] ring-1 ring-inset ${notice.tone === "amber" ? "bg-[#fbbf24]/10 text-[#fcd34d] ring-[#fbbf24]/30" : notice.tone === "red" ? "bg-[#f87171]/10 text-[#fca5a5] ring-[#f87171]/25" : "bg-tile text-zinc-300 ring-white/[0.06]"}`}>{notice.text}</p>
      )}

      <nav aria-label="Sections" className="no-scrollbar -mx-4 mt-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6">
        <ul className="flex w-max gap-1.5">
          {SECTIONS.map((s) => {
            const c = [...changed].filter((p) => p.startsWith(s.id + ".")).length;
            return (
              <li key={s.id}><a href={`#${s.id}`} className="flex items-center gap-1.5 rounded-full bg-tile px-3.5 py-2 text-[13px] font-semibold text-zinc-300 hover:bg-tile-2 hover:text-zinc-50">{s.title}{c > 0 && <span className="rounded-full bg-[#fbbf24]/20 px-1.5 text-[11px] tabular-nums text-[#fcd34d]">{c}</span>}</a></li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-4 space-y-4">
        <Scouting />
        <Scoring />
        <Winner />
        <Poc />
        <Validation />
        <Schedule />
        <History versions={versions} />
      </div>

      {modal && (
        <div className="fixed inset-0 z-40 grid place-items-end sm:place-items-center" role="dialog" aria-modal="true" aria-labelledby="save-h">
          <button className="absolute inset-0 bg-black/60" aria-label="Cancel" onClick={() => !saving && setModal(false)} />
          <div className="sheet-up relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-[26px] bg-tile-2 p-5 shadow-2xl sm:rounded-[26px] sm:p-6" data-diff-modal>
            <button onClick={() => setModal(false)} aria-label="Close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/[0.08] text-zinc-200"><IconX size={16} /></button>
            <h2 id="save-h" className="pr-10 text-[17px] font-semibold tracking-tight text-zinc-50">Save as version {latest.version + 1}?</h2>
            <p className="mt-1 text-[13px] text-zinc-400">{lines.length} change{lines.length === 1 ? "" : "s"} against v{latest.version}. A new version is added; nothing is overwritten.</p>
            {modalMsg && <p className="mt-2 rounded-xl bg-[#fbbf24]/10 px-3 py-2 text-[12.5px] text-[#fcd34d]" role="alert">{modalMsg}</p>}
            <pre className="mt-3 max-h-[36vh] overflow-auto whitespace-pre-wrap break-words rounded-2xl bg-black/30 p-3.5 font-mono text-[12.5px] leading-relaxed text-zinc-100">{lines.join("\n")}</pre>
            <label className="mt-3 block text-[12px] font-semibold text-zinc-300">
              Note
              <input value={note} onChange={(e) => setNote(e.target.value)} placeholder={autoNote(saved, draft)} maxLength={200} className="mt-1 h-10 w-full rounded-xl bg-black/25 px-3 text-[13px] font-medium text-zinc-50 ring-1 ring-inset ring-white/[0.08] placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-accent" />
            </label>
            {MODE === "local" && <p className="mt-2 text-[12px] font-semibold text-[#fcd34d]">Local test mode: saves stay in this browser.</p>}
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setModal(false)} disabled={saving} className="h-10 rounded-full px-4 text-[13px] font-semibold text-zinc-200 hover:bg-white/[0.08]">Cancel</button>
              <button onClick={confirm} disabled={saving || !lines.length} className="h-10 rounded-full bg-accent px-5 text-[13px] font-semibold text-accent-ink hover:bg-accent-light disabled:opacity-50">{saving ? "Saving…" : "Confirm"}</button>
            </div>
          </div>
        </div>
      )}
    </C.Provider>
  );
}

function Connection({ viewer, loaded }: { viewer: Viewer; loaded: boolean }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const box = "mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl bg-tile px-4 py-2.5 text-[13px]";
  if (MODE === "offline")
    return (
      <div className={box} data-connection="offline">
        <span className="flex items-center gap-2 font-semibold text-zinc-200"><span className="h-2 w-2 rounded-full bg-zinc-500" />Not connected</span>
        <span className="text-zinc-400">Read-only: showing the defaults from config/pipeline-settings.json.</span>
      </div>
    );
  if (MODE === "local")
    return (
      <div className={`${box} ring-1 ring-inset ring-[#fbbf24]/35`} data-connection="local">
        <span className="rounded-full bg-[#fbbf24]/15 px-2.5 py-0.5 text-[12px] font-semibold text-[#fcd34d]">Local test mode</span>
        <span className="text-zinc-400">Dev only: a fake admin session; saves stay in this browser. Not connected to Supabase.</span>
        <button onClick={() => { resetLocal(); localStorage.removeItem(DRAFT_KEY); location.reload(); }} className="ml-auto text-[12px] font-semibold text-zinc-300 hover:text-zinc-50">Clear local versions</button>
      </div>
    );
  if (!loaded) return <div className={`${box} h-11 animate-pulse`} />;
  if (viewer.signedIn)
    return (
      <div className={box} data-connection="signed-in">
        <span className="flex items-center gap-2 font-semibold text-zinc-200"><span className="h-2 w-2 rounded-full bg-[#4ade80]" />Signed in as {viewer.email}</span>
        <span className="text-zinc-400">Only admins can save.</span>
        <button onClick={async () => { await signOut(); location.reload(); }} className="ml-auto text-[12px] font-semibold text-zinc-300 hover:text-zinc-50">Sign out</button>
      </div>
    );
  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    try { await sendMagicLink(email.trim()); setSent(email.trim()); } catch (x) { setErr(x instanceof Error ? x.message : String(x)); }
  };
  return (
    <div className={box} data-connection="read-only">
      <span className="flex items-center gap-2 font-semibold text-zinc-200"><span className="h-2 w-2 rounded-full bg-[#4ade80]" />Connected · read-only</span>
      {sent ? (
        <span className="text-zinc-300">Check {sent} for a sign-in link.</span>
      ) : (
        <form onSubmit={send} className="flex min-w-0 flex-1 basis-64 items-center justify-end gap-2">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email for a sign-in link" className="h-8 min-w-0 flex-1 rounded-full bg-black/25 px-3 text-[13px] text-zinc-50 ring-1 ring-inset ring-white/[0.08] placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-accent sm:max-w-60" />
          <button className="h-8 shrink-0 rounded-full bg-white/[0.08] px-3.5 text-[12px] font-semibold text-zinc-100 hover:bg-white/[0.14]">Email me a link</button>
        </form>
      )}
      {err && <span className="basis-full text-[12px] text-[#fca5a5]">{err}</span>}
    </div>
  );
}

function History({ versions }: { versions: SettingsVersion[] }) {
  return (
    <section id="history" aria-labelledby="history-h" className="scroll-mt-36 rounded-[22px] bg-tile p-4 sm:p-6">
      <h2 id="history-h" className="text-[17px] font-semibold tracking-tight text-zinc-50">History</h2>
      <p className="mt-1 text-[13px] text-zinc-400">Every save is a new version; the newest is the one the nightly routines read.</p>
      <ol className="mt-4 space-y-2">
        {versions.map((h, i) => {
          const prev = versions[i + 1];
          const d = prev ? diffLines(prev.settings, h.settings) : [];
          return (
            <li key={h.version} className="rounded-2xl bg-tile-2 px-4 py-3" data-version={h.version}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[20px] font-medium leading-none tabular-nums text-zinc-50">v{h.version}</span>
                <span className="text-[12px] text-zinc-400">{shortDate(h.created_at)}{i === 0 ? " · current" : ""}</span>
                {h.note && <span className="min-w-0 basis-full text-[13px] text-zinc-300 sm:basis-auto">{h.note}</span>}
              </div>
              {prev ? (
                <ul className="mt-2 space-y-0.5 font-mono text-[12px] text-zinc-300">
                  {d.slice(0, 4).map((l) => <li key={l} className="break-words">{l}</li>)}
                  {d.length > 4 && <li className="text-zinc-400">+{d.length - 4} more</li>}
                  {!d.length && <li className="text-zinc-400">no changes</li>}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ---------- sections ---------- */

function Scouting() {
  const { draft } = useS();
  return (
    <Section id="scouting" title="Scouting" line="Where the 00:30 scout looks for complaints and proven models, and how much it collects.">
      <Group label="Markets">
        <Toggle path="scouting.markets.US" label="US" />
        <Toggle path="scouting.markets.DE" label="Germany" help="Paused since 22 Oct" />
      </Group>
      <Num path="scouting.complaint_lookback_days" label="Complaint lookback" min={1} max={365} suffix="days" />
      <RangeNum path="scouting.complaints_per_night" label="Target complaints per night" min={0} max={1000} />
      <Toggle path="scouting.proven_models.enabled" label="Proven-model stream" help="Proven US subscription models, scouted after complaints." />
      {draft.scouting.proven_models.enabled && <RangeNum path="scouting.proven_models" label="Proven models per night" min={0} max={100} indent />}
      <Group label="Sources">
        {SOURCES.map((s) => <Toggle key={s.id} path={`scouting.sources.${s.id}`} label={s.label} />)}
      </Group>
      <Toggle path="scouting.exclude_regulated_finance_medical" label="Exclude regulated finance / medical" />
      <ReadOnly label="Niche rotation" value="from us/search-plan.md" mono />
    </Section>
  );
}

function Scoring() {
  const { draft } = useS();
  const max = maxScore(draft);
  const bar = scaled(draft, draft.scoring.winning_bar);
  const lo = scaled(draft, draft.scoring.near_miss_band.min), hi = scaled(draft, draft.scoring.near_miss_band.max);
  const weighted = max !== BASE_MAX;
  return (
    <Section id="scoring" title="Scoring" line="How the 03:00 analyst scores each US entry, where the bar sits, and which checks can stop an idea.">
      <div className="grid grid-cols-3 gap-2" aria-live="polite">
        <Big label="Max score" value={fmtN(max)} />
        <Big label={weighted ? "Effective bar" : "Winning bar"} value={fmtN(bar)} warm sub={weighted ? `${draft.scoring.winning_bar} of 25, scaled` : "of 25"} />
        <Big label="Near-miss" value={`${fmtN(lo)}–${fmtN(hi)}`} />
      </div>
      <Group label="Five criteria, each 1–5 · weight">
        {SCORE_KEYS.map((k) => <Weight key={k} path={`scoring.criteria.${k}`} label={CRITERIA[k]} />)}
      </Group>
      <Num path="scoring.winning_bar" label="Winning bar (of 25 at 1×)" min={0} max={25} suffix="/ 25" />
      <RangeNum path="scoring.near_miss_band" label="Near-miss band (of 25 at 1×)" min={0} max={25} />
      <Toggle path="scoring.competitor_veto" label="Competitor veto" help="A separate check, not a gate: overlap with an existing app vetoes the idea." />
      <Group label="Gates (from lib/gates.ts)">
        {GATES.map((g) => <Toggle key={g.id} path={`scoring.gates.${GATE_SETTING_KEY[g.id]}`} label={g.label} help={g.id === "plc_fit" ? `${g.description} A PLC “no” (declining market) kills.` : g.description} />)}
      </Group>
      <Group label="Build principle (not a gate)">
        <Toggle path="scoring.gates.simplest_way_flag" label="Simplest way" help="Flag only: open the app and the job is done. Never stops an idea." />
      </Group>
    </Section>
  );
}

function Winner() {
  const { draft, changed } = useS();
  const on = draft.winner.fallback.enabled;
  const hl = changed.has("winner.fallback.enabled");
  return (
    <Section id="winner" title="Ideas & winner" line="How many ideas the brief shows and how the night's winner is picked.">
      <div className={`rounded-2xl p-4 ring-1 ring-inset transition-colors ${hl ? "bg-[#fbbf24]/[0.08] ring-[#fbbf24]/50" : "bg-accent/[0.1] ring-accent/40"}`} data-path="winner.fallback.enabled" data-changed={hl || undefined}>
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2"><span className="text-[15px] font-semibold text-zinc-50">Always build at least one demo</span><span className="rounded-full bg-accent px-2 py-px text-[11px] font-semibold text-accent-ink">New</span>{hl && <Was path="winner.fallback.enabled" />}</div>
            <p className="mt-1 text-[13px] leading-relaxed text-zinc-300">If nothing clears the bar, the builder still picks the best unique idea with real evidence and builds its POC, labelled <b className="font-semibold text-warm">Fallback (below bar)</b>.</p>
          </div>
          <Switch path="winner.fallback.enabled" label="Always build at least one demo" />
        </div>
        {on && (
          <div className="mt-3 space-y-1 border-t border-white/[0.08] pt-3">
            <Num path="winner.fallback.min_score" label="Min fallback score" min={0} max={25} suffix="/ 25" />
            <Toggle path="winner.fallback.allow_vetoed" label="Allow vetoed ideas" />
            <Toggle path="winner.fallback.allow_plc_maybe" label="Allow PLC “maybe”" />
            <LockedRow label="Allow PLC “no”" value="Never: a declining market is a kill." />
          </div>
        )}
      </div>
      <Num path="winner.ideas_per_brief" label="Ideas per brief" min={1} max={10} />
      <Toggle path="winner.no_repeats" label="Never repeat or near-duplicate an earlier idea" locked />
      <Toggle path="winner.prefer_stronger_plc_on_tie" label="Near tie prefers the stronger PLC fit" />
    </Section>
  );
}

function Poc() {
  return (
    <Section id="poc" title="POC build" line="What the 04:30 builder may make each night.">
      <Toggle path="poc.enabled" label="Nightly POC" />
      <Num path="poc.max_per_night" label="Max builds per night" min={0} max={3} />
      <Time path="poc.ready_by" label="Ready by" />
      <Toggle path="poc.private_only" label="Private only" help="No launch, sign-ups, payments or emails." locked />
    </Section>
  );
}

function Validation() {
  return (
    <Section id="validation" title="Validation" line="The proposed fake-door test for a winner. Not active yet." badge={<span className="rounded-full border border-dashed border-accent-light/60 px-2 py-px text-[11px] font-semibold text-accent-light">Proposed</span>}>
      <RangeNum path="validation.ad_budget_eur" label="Ad budget per idea" min={0} max={1000} prefix="€" />
      <Num path="validation.min_visitors" label="Min visitors" min={0} max={100000} />
      <Num path="validation.strong_price_click_pct" label="Strong signal: price clicks above" min={0} max={100} step={0.5} suffix="%" />
      <Num path="validation.kill_price_click_pct" label="Kill: price clicks below" min={0} max={100} step={0.5} suffix="%" />
      <Toggle path="validation.two_button_page" label="Two-button page" help="Priced fake-door checkout + Join waitlist." />
    </Section>
  );
}

function Schedule() {
  const { draft } = useS();
  const s = draft.schedule;
  const rows: [string, string][] = [["Scout", s.us_scout], ["Analyst", s.analyst], ["Builder", s.builder], ["Brief", s.brief], ["Weekly", s.weekly]];
  return (
    <Section id="schedule" title="Schedule" line={`Run times, ${s.timezone}. Read-only here: time changes go through App ideas.`}>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {rows.map(([k, v]) => (
          <div key={k} className="rounded-2xl bg-tile-2 px-3.5 py-3">
            <div className="text-[12px] text-zinc-400">{k}</div>
            <div className="mt-1 text-[22px] font-medium leading-none tabular-nums text-zinc-50">{v}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function LockedRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl px-3 py-2.5">
      <div className="min-w-0 flex-1 basis-48">
        <div className="flex flex-wrap items-center gap-1.5 text-[14px] font-medium text-zinc-100">{label}<span className="inline-flex items-center gap-1 rounded-full bg-white/[0.07] px-2 py-px text-[11px] font-semibold text-zinc-400"><IconLock size={10} /> Locked</span></div>
        <div className="mt-0.5 text-[12px] text-zinc-400">{value}</div>
      </div>
      <span className="relative h-7 w-12 shrink-0 rounded-full bg-white/[0.14] opacity-50" aria-hidden><span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white" /></span>
    </div>
  );
}

/* ---------- building blocks ---------- */

const fmtN = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

function Section({ id, title, line, badge, children }: { id: string; title: string; line: string; badge?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-36 rounded-[22px] bg-tile p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-2"><h2 id={`${id}-h`} className="text-[17px] font-semibold tracking-tight text-zinc-50">{title}</h2>{badge}</div>
      <p className="mt-1 text-[13px] text-zinc-400">{line}</p>
      <div className="mt-4 space-y-2">{children}</div>
    </section>
  );
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-tile-2/60 p-2 pt-3">
      <div className="label px-2 pb-1">{label}</div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function Big({ label, value, sub, warm }: { label: string; value: string; sub?: string; warm?: boolean }) {
  return (
    <div className="min-w-0 rounded-2xl bg-tile-2 px-3.5 py-3">
      <div className="truncate text-[12px] text-zinc-400">{label}</div>
      <div className={`mt-1 text-[26px] font-medium leading-none tracking-tight tabular-nums sm:text-[30px] ${warm ? "text-warm" : "text-zinc-50"}`}>{value}</div>
      {sub && <div className="mt-1 truncate text-[11px] text-zinc-400">{sub}</div>}
    </div>
  );
}

/** One setting row; tinted amber with the saved value when it differs from the JSON. */
function Row({ path, label, help, children, indent, locked }: { path: string | string[]; label: ReactNode; help?: ReactNode; children: ReactNode; indent?: boolean; locked?: boolean }) {
  const { changed } = useS();
  const paths = Array.isArray(path) ? path : [path];
  const hl = paths.some((p) => changed.has(p));
  return (
    <div
      data-path={paths[0]}
      data-changed={hl || undefined}
      className={`flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl px-3 py-2.5 transition-colors ${indent ? "ml-4" : ""} ${hl ? "bg-[#fbbf24]/[0.09] ring-1 ring-inset ring-[#fbbf24]/45" : ""}`}
    >
      <div className="min-w-0 flex-1 basis-48">
        <div className="flex flex-wrap items-center gap-1.5 text-[14px] font-medium text-zinc-100">{label}{locked && <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.07] px-2 py-px text-[11px] font-semibold text-zinc-400"><IconLock size={10} /> Locked</span>}{hl && paths.map((p) => changed.has(p) && <Was key={p} path={p} />)}</div>
        {help && <div className="mt-0.5 text-[12px] leading-snug text-zinc-400">{help}</div>}
      </div>
      <div className="flex shrink-0 items-center gap-2">{children}</div>
    </div>
  );
}

function Was({ path }: { path: string }) {
  const { saved } = useS();
  const v = getPath(saved, path);
  return <span className="rounded-full bg-[#fbbf24]/15 px-2 py-px text-[11px] font-semibold text-[#fcd34d]">was {String(v)}</span>;
}

function Switch({ path, label, locked }: { path: string; label: string; locked?: boolean }) {
  const { draft, set, editable } = useS();
  const on = !!getPath(draft, path);
  return (
    <button role="switch" aria-checked={on} aria-label={label} disabled={locked || !editable} onClick={() => set(path, !on)} className={`relative h-7 w-12 shrink-0 rounded-full transition-colors disabled:cursor-default ${locked ? "opacity-50" : ""} ${on ? "bg-accent" : "bg-white/[0.14]"}`}>
      <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-[left] ${on ? "left-6" : "left-1"}`} />
    </button>
  );
}

function Toggle({ path, label, help, locked }: { path: string; label: string; help?: string; locked?: boolean }) {
  return <Row path={path} label={label} help={help} locked={locked}><Switch path={path} label={label} locked={locked} /></Row>;
}

const inputCls = "h-9 w-20 rounded-xl bg-black/25 px-2.5 text-right text-[14px] font-semibold tabular-nums text-zinc-50 ring-1 ring-inset ring-white/[0.08] focus:outline-none focus:ring-2 focus:ring-accent disabled:cursor-default";

function NumInput({ path, min, max, step = 1, label }: { path: string; min: number; max: number; step?: number; label: string }) {
  const { draft, set, editable } = useS();
  const v = getPath(draft, path) as number;
  return (
    <input
      type="number" inputMode="decimal" aria-label={label} disabled={!editable} min={min} max={max} step={step} value={v}
      onChange={(e) => { const n = e.target.valueAsNumber; if (!Number.isNaN(n)) set(path, Math.min(max, Math.max(min, n))); }}
      className={inputCls}
    />
  );
}

function Num({ path, label, min, max, step, suffix, help, indent }: { path: string; label: string; min: number; max: number; step?: number; suffix?: string; help?: string; indent?: boolean }) {
  return (
    <Row path={path} label={label} help={help} indent={indent}>
      <NumInput path={path} min={min} max={max} step={step} label={label} />
      {suffix && <span className="w-9 text-[12px] text-zinc-400">{suffix}</span>}
    </Row>
  );
}

function RangeNum({ path, label, min, max, prefix, indent }: { path: string; label: string; min: number; max: number; prefix?: string; indent?: boolean }) {
  return (
    <Row path={[`${path}.min`, `${path}.max`]} label={label} indent={indent}>
      {prefix && <span className="text-[12px] text-zinc-400">{prefix}</span>}
      <NumInput path={`${path}.min`} min={min} max={max} label={`${label} minimum`} />
      <span className="text-zinc-400">–</span>
      <NumInput path={`${path}.max`} min={min} max={max} label={`${label} maximum`} />
    </Row>
  );
}

function Weight({ path, label }: { path: string; label: string }) {
  const { draft, set, editable } = useS();
  const v = getPath(draft, path) as number;
  return (
    <Row path={path} label={label}>
      <input type="range" disabled={!editable} min={0} max={3} step={0.5} value={v} aria-label={`${label} weight`} onChange={(e) => set(path, e.target.valueAsNumber)} className="w-28 accent-[#8b7cf6] sm:w-40" />
      <span className="w-9 text-right text-[14px] font-semibold tabular-nums text-zinc-50">{v}×</span>
    </Row>
  );
}

function Time({ path, label }: { path: string; label: string }) {
  const { draft, set, editable } = useS();
  return (
    <Row path={path} label={label}>
      <input type="time" disabled={!editable} aria-label={label} value={getPath(draft, path) as string} onChange={(e) => e.target.value && set(path, e.target.value)} className={`${inputCls} w-28 [color-scheme:dark]`} />
    </Row>
  );
}

function ReadOnly({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl px-3 py-2.5">
      <div className="text-[14px] font-medium text-zinc-100">{label} <span className="ml-1 rounded-full bg-white/[0.07] px-2 py-px text-[11px] font-semibold text-zinc-400">Read-only</span></div>
      <span className={`text-[13px] text-zinc-300 ${mono ? "font-mono text-[12px]" : ""}`}>{value}</span>
    </div>
  );
}
