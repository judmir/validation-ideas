import { EDGES, STATUS_LABEL, nodeById, type ArchNode } from "@/lib/architecture";
import Link from "next/link";
import { Badge } from "@/components/ui";

/** Each node's rules live in one Settings section. */
const SETTINGS_SECTION: Record<string, { id: string; title: string }[]> = {
  "us-scout": [{ id: "scouting", title: "Scouting" }],
  "de-scout": [{ id: "scouting", title: "Scouting" }],
  analyst: [{ id: "scoring", title: "Scoring" }],
  builder: [{ id: "winner", title: "Ideas & winner" }, { id: "poc", title: "POC build" }],
  brief: [{ id: "winner", title: "Ideas & winner" }, { id: "schedule", title: "Schedule" }],
  weekly: [{ id: "schedule", title: "Schedule" }],
  landing: [{ id: "validation", title: "Validation" }],
  meta: [{ id: "validation", title: "Validation" }],
  report: [{ id: "validation", title: "Validation" }, { id: "report", title: "Report / Run video" }],
  "run-video": [{ id: "report", title: "Report / Run video" }],
};

const STATUS_BADGE = { active: "violet", paused: "slate", proposed: "light" } as const;

export default function NodePanel({ node, onPick }: { node: ArchNode; onPick?: (id: string) => void }) {
  const ins = EDGES.filter((e) => e.to === node.id).map((e) => ({ e, n: nodeById(e.from)! }));
  const outs = EDGES.filter((e) => e.from === node.id).map((e) => ({ e, n: nodeById(e.to)! }));
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-[18px] font-semibold tracking-tight text-zinc-50">{node.title}</h3>
        <Badge color={STATUS_BADGE[node.status]}>{STATUS_LABEL[node.status]}{node.statusNote ? ` ${node.statusNote}` : ""}</Badge>
      </div>
      <div className="mt-1 text-[13px] font-semibold text-warm">{node.schedule}</div>
      <p className="mt-2 text-[14px] leading-relaxed text-zinc-200">{node.summary}</p>
      <ul className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-zinc-300">
        {node.details.map((d) => (
          <li key={d} className="flex gap-2"><span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-light/70" />{d}</li>
        ))}
      </ul>
      {node.outputs && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {node.outputs.map((o) => <span key={o} className="rounded-full bg-white/[0.07] px-2.5 py-1 font-mono text-[11.5px] text-zinc-200">{o}</span>)}
        </div>
      )}
      {SETTINGS_SECTION[node.id] && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[12px]">
          <span className="text-zinc-400">Settings:</span>
          {SETTINGS_SECTION[node.id].map((s) => (
            <Link key={s.id} href={`/settings/#${s.id}`} className="rounded-full bg-accent/15 px-2.5 py-1 font-semibold text-accent-light ring-1 ring-inset ring-accent/30 hover:bg-accent/25">{s.title} →</Link>
          ))}
        </div>
      )}
      {(ins.length > 0 || outs.length > 0) && (
        <div className="mt-4 grid grid-cols-2 gap-3 text-[12px]">
          <Links label="From" items={ins} onPick={onPick} />
          <Links label="To" items={outs} onPick={onPick} />
        </div>
      )}
    </div>
  );
}

function Links({ label, items, onPick }: { label: string; items: { e: { id: string; kind: string }; n: ArchNode }[]; onPick?: (id: string) => void }) {
  return (
    <div className="min-w-0">
      <div className="label">{label}</div>
      {items.length === 0 ? <div className="mt-1 text-zinc-500">—</div> : (
        <ul className="mt-1 flex flex-wrap gap-1.5">
          {items.map(({ e, n }) => (
            <li key={e.id}>
              <button onClick={() => onPick?.(n.id)} className={`rounded-full px-2.5 py-1 font-semibold transition-colors hover:bg-white/[0.12] ${e.kind === "proposed" ? "border border-dashed border-accent-deep text-accent-light" : e.kind === "paused" ? "bg-white/[0.04] text-zinc-500" : "bg-white/[0.07] text-zinc-200"}`}>{n.title}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
