import { EDGES, NODES, edgeById, nodeById } from "@/lib/architecture";
import { CHANGELOG, LATEST, highlightsFor, type ChangeEntry, type ChangeStatus, type ChangeType } from "@/lib/architecture-changelog";
import { shortDate } from "@/lib/format";
import { HL_COLOR } from "./Diagram";

export const TYPE_LABEL: Record<ChangeType, string> = { added: "Added", changed: "Changed", removed: "Removed", paused: "Paused", proposed: "Proposed" };
const STATUS: Record<ChangeStatus, { label: string; cls: string }> = {
  live: { label: "Live", cls: "bg-[#bbf7d0] text-[#14532d]" },
  proposed: { label: "Proposed", cls: "bg-accent-pale text-[#2a1f6b]" },
  "awaiting-ok": { label: "Awaiting OK", cls: "bg-[#fdba74] text-[#431407]" },
};

const idLabel = (id: string) => {
  const n = nodeById(id);
  if (n) return n.title;
  const e = edgeById(id);
  return e ? `${nodeById(e.from)?.title} → ${nodeById(e.to)?.title}` : id;
};

/** Horizontal timeline of dated chips, oldest → newest, then "Latest". */
export function VersionPicker({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  return (
    <div className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6" ref={(el) => { if (el && !el.dataset.init) { el.dataset.init = "1"; el.scrollLeft = el.scrollWidth; } }}>
      <ol className="flex w-max items-center gap-1.5 pb-1" aria-label="Versions">
        {CHANGELOG.map((c, i) => (
          <li key={c.id} className="flex items-center gap-1.5">
            {i > 0 && <span className="h-px w-3 bg-white/15" aria-hidden />}
            <Chip on={value === c.id} onClick={() => onChange(c.id)} top={shortDate(c.date)} bottom={c.version} dot={HL_COLOR[c.type]} dashed={c.status !== "live"} />
          </li>
        ))}
        <li className="flex items-center gap-1.5">
          <span className="h-px w-3 bg-white/15" aria-hidden />
          <Chip on={value === "latest"} onClick={() => onChange("latest")} top="Latest" bottom={LATEST.version} />
        </li>
      </ol>
    </div>
  );
}

function Chip({ on, onClick, top, bottom, dot, dashed }: { on: boolean; onClick: () => void; top: string; bottom: string; dot?: string; dashed?: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={`whitespace-nowrap rounded-2xl px-3 py-2 text-left transition-colors ${on ? "bg-accent text-accent-ink" : `bg-tile-2 text-zinc-200 hover:bg-white/[0.1] ${dashed ? "outline-1 -outline-offset-1 outline-dashed outline-accent-deep" : ""}`}`}
    >
      <div className="text-[14px] font-semibold leading-none tabular-nums">{top}</div>
      <div className={`mt-1 flex items-center gap-1.5 text-[11px] font-semibold ${on ? "text-accent-ink/80" : "text-zinc-400"}`}>
        {dot && <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot }} />}
        {bottom}
      </div>
    </button>
  );
}

export function ChangePanel({ entry, diff, onDiff, onPick }: { entry: ChangeEntry | null; diff: boolean; onDiff: (v: boolean) => void; onPick: (id: string) => void }) {
  if (!entry) {
    const live = CHANGELOG.filter((c) => c.status === "live").length;
    const prop = CHANGELOG.filter((c) => c.status !== "live").length;
    return (
      <div className="rounded-[20px] bg-tile-2 p-4 sm:p-5">
        <div className="label">Latest · {shortDate(LATEST.date)} · {LATEST.version}</div>
        <h3 className="mt-1.5 text-[17px] font-semibold tracking-tight text-zinc-50">Current architecture</h3>
        <p className="mt-1.5 text-[14px] leading-relaxed text-zinc-300">
          {NODES.filter((n) => n.status === "active").length} active, {NODES.filter((n) => n.status === "paused").length} paused and {NODES.filter((n) => n.status === "proposed").length} proposed pieces, {EDGES.length} connections. The validation loop (page, Meta ads, report) is a proposal and not live yet.
        </p>
        <div className="mt-3 flex gap-6">
          <Num n={CHANGELOG.length} label="changes" />
          <Num n={live} label="live" />
          <Num n={prop} label="proposed" warm />
        </div>
        <p className="mt-3 text-[12px] text-zinc-400">Pick a date above to see what changed.</p>
      </div>
    );
  }
  const hl = highlightsFor(entry);
  const st = STATUS[entry.status];
  return (
    <div className="rounded-[20px] bg-tile-2 p-4 sm:p-5" aria-live="polite">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[13px] font-semibold tabular-nums text-warm">{shortDate(entry.date)} · {entry.version}</span>
        <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold leading-[18px] text-ink" style={{ background: HL_COLOR[entry.type] }}>{TYPE_LABEL[entry.type]}</span>
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold leading-[18px] ${st.cls}`}>{st.label}</span>
        {entry.commit && <span className="rounded-full bg-white/[0.07] px-2.5 py-0.5 font-mono text-[11px] leading-[18px] text-zinc-300">{entry.commit}</span>}
      </div>
      <h3 className="mt-2 text-[17px] font-semibold tracking-tight text-zinc-50">{entry.title}</h3>
      <p className="mt-1.5 text-[14px] leading-relaxed text-zinc-300">{entry.description}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Affected">
        {entry.affected.map((id) => {
          const n = nodeById(id);
          return (
            <li key={id}>
              <button
                onClick={() => n && onPick(id)}
                disabled={!n}
                className="flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-1 text-[12px] font-semibold text-zinc-200 enabled:hover:bg-white/[0.12]"
              >
                <span className="h-2 w-2 rounded-full" style={{ background: HL_COLOR[hl[id]] }} />
                {idLabel(id)}
                <span className="font-medium text-zinc-400">{TYPE_LABEL[hl[id]].toLowerCase()}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <label className="mt-4 flex w-fit cursor-pointer items-center gap-2.5 text-[13px] font-semibold text-zinc-200">
        <input type="checkbox" checked={diff} onChange={(e) => onDiff(e.target.checked)} className="peer sr-only" />
        <span className="relative h-6 w-10 rounded-full bg-white/[0.12] transition-colors peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent-pale after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-zinc-100 after:transition-transform peer-checked:after:translate-x-4" aria-hidden />
        Diff from previous version
      </label>
      {diff && (entry.before || entry.after) && (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <DiffCol title="Before" items={entry.before ?? ["—"]} sign="−" cls="text-[#fca5a5]" />
          <DiffCol title="After" items={entry.after ?? ["—"]} sign="+" cls="text-[#86efac]" />
        </div>
      )}
    </div>
  );
}

function DiffCol({ title, items, sign, cls }: { title: string; items: string[]; sign: string; cls: string }) {
  return (
    <div className="rounded-2xl bg-black/20 p-3">
      <div className="label">{title}</div>
      <ul className="mt-1.5 space-y-1 text-[13px] leading-snug text-zinc-200">
        {items.map((t) => <li key={t} className="flex gap-2"><span className={`w-3 shrink-0 font-semibold ${cls}`}>{sign}</span><span className="min-w-0">{t}</span></li>)}
      </ul>
    </div>
  );
}

function Num({ n, label, warm }: { n: number; label: string; warm?: boolean }) {
  return (
    <div>
      <div className={`text-[28px] font-medium leading-none tabular-nums ${warm ? "text-warm" : "text-zinc-50"}`}>{n}</div>
      <div className="mt-1 text-[12px] text-zinc-400">{label}</div>
    </div>
  );
}
