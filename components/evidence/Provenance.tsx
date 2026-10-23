import type { Idea } from "@/lib/types";
import { StreamBadge } from "../ui";

/** Stream badge, one-line evidence summary, complaint + people counts, one card per proven model. */
export default function Provenance({ idea }: { idea: Idea }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <StreamBadge source={idea.source} />
        <span className="text-[12px] text-zinc-400">{idea.source.includes("+") ? "Complaints + proven model" : idea.source === "proven-model" ? "Proven model only" : "Complaints only"}</span>
      </div>
      <p className="text-[15px] leading-relaxed text-zinc-100">{idea.evidenceSummary}</p>
      <div className="flex flex-wrap gap-2">
        <Num n={idea.complaint_ids.length} k="complaints" />
        <Num n={idea.distinct_people} k="distinct people" tip={idea.distinct_people_note} />
        <Num n={idea.proven_models.length} k="proven models" />
      </div>
      {idea.proven_models.length > 0 && (
        <ul className="grid gap-2 md:grid-cols-2">
          {idea.proven_models.map((m) => (
            <li key={m.id} className="min-w-0 rounded-2xl bg-tile-2 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 text-[14px] font-semibold leading-snug text-zinc-50">{m.app}</div>
                <span className="shrink-0 rounded-md bg-white/[0.08] px-2 py-0.5 text-[11px] font-semibold text-zinc-300">{m.country}</span>
              </div>
              <div className="mt-0.5 text-[11px] text-zinc-400">{m.id}</div>
              <dl className="mt-3 space-y-2 text-[12px] leading-relaxed">
                <Field k="Model & price" v={m.model_and_price} />
                <Field k="Traction" v={m.traction_evidence} />
                <Field k="US status" v={m.us_status} />
                <Field k="Entry point" v={m.entry_point} />
                <Field k="Why not done yet" v={m.why_not_done_yet} />
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Num({ n, k, tip }: { n: number; k: string; tip?: string }) {
  return (
    <span title={tip} className={`inline-flex items-baseline gap-1.5 rounded-full bg-tile-2 px-3 py-1 text-[12px] text-zinc-300 ${tip ? "cursor-help underline decoration-dotted decoration-zinc-500 underline-offset-4" : ""}`}>
      <b className="font-semibold tabular-nums text-zinc-50">{n}</b>{k}
    </span>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  if (!v) return null;
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.06em] text-zinc-400">{k}</dt>
      <dd className="mt-0.5 line-clamp-4 break-words text-zinc-200" title={v}>{v}</dd>
    </div>
  );
}
