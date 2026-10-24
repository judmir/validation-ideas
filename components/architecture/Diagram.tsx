"use client";
import { forwardRef, type KeyboardEvent } from "react";
import { EDGES, LAYOUT, NODES, STATUS_LABEL, edgePath, type ArchEdge, type ArchNode } from "@/lib/architecture";

export type HighlightKind = "added" | "changed" | "removed" | "paused" | "proposed";
export const HL_COLOR: Record<HighlightKind, string> = {
  added: "#4ade80",
  changed: "#fbbf24",
  removed: "#f87171",
  paused: "#f87171",
  proposed: "#b9aefb",
};

export interface DiagramProps {
  layout: "desk" | "mob";
  /** Node lit by the night timeline. */
  activeNode?: string;
  /** Edges carrying packets right now. */
  activeEdges: string[];
  selected?: string | null;
  /** id → highlight colour kind (version picker). */
  highlights?: Record<string, HighlightKind>;
  /** Ids drawn very faint (did not exist yet in the selected version). */
  ghost?: Set<string>;
  /** Ids drawn dimmed (diff mode: unchanged). */
  dim?: Set<string>;
  motion: boolean;
  onSelect: (id: string) => void;
}

const EDGE_STYLE: Record<ArchEdge["kind"], { stroke: string; dash?: string; on: string }> = {
  run: { stroke: "#4a4a52", on: "#b9aefb" },
  filing: { stroke: "#4a4a52", dash: "2 6", on: "#b9aefb" },
  paused: { stroke: "#38383e", dash: "4 7", on: "#38383e" },
  proposed: { stroke: "#5e5491", dash: "7 7", on: "#8b7cf6" },
};

const Diagram = forwardRef<SVGSVGElement, DiagramProps>(function Diagram(
  { layout, activeNode, activeEdges, selected, highlights = {}, ghost, dim, motion, onSelect },
  ref,
) {
  const L = LAYOUT[layout];
  const op = (id: string) => (ghost?.has(id) ? 0.14 : dim?.has(id) ? 0.3 : 1);
  return (
    <svg ref={ref} viewBox={`0 0 ${L.w} ${L.h}`} className="block h-auto w-full select-none" role="group" aria-label="Pipeline architecture diagram">
      <defs>
        {(["off", "on", "prop"] as const).map((k) => (
          <marker key={k} id={`arw-${layout}-${k}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M1,1.5 L8.5,5 L1,8.5" fill="none" stroke={k === "on" ? "#b9aefb" : k === "prop" ? "#8b7cf6" : "#55555e"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        ))}
      </defs>

      {/* Proposed validation loop lane */}
      <ProposedLane layout={layout} />

      {/* Edges */}
      {EDGES.map((e) => {
        const d = edgePath(e, layout);
        const st = EDGE_STYLE[e.kind];
        const on = activeEdges.includes(e.id) && e.kind !== "paused";
        const hl = highlights[e.id];
        const marker = on ? (e.kind === "proposed" ? "prop" : "on") : e.kind === "proposed" ? "prop" : "off";
        return (
          <g key={e.id} opacity={op(e.id)} style={{ transition: "opacity .4s" }}>
            {hl && <path d={d} fill="none" stroke={HL_COLOR[hl]} strokeWidth={7} strokeLinecap="round" strokeDasharray={hl === "proposed" ? "8 8" : undefined} className="hl-pulse" />}
            <path
              d={d}
              fill="none"
              stroke={on ? st.on : st.stroke}
              strokeWidth={on ? 2.4 : 1.8}
              strokeDasharray={st.dash}
              strokeLinecap="round"
              markerEnd={e.kind === "paused" ? undefined : `url(#arw-${layout}-${marker})`}
              style={{ transition: "stroke .4s" }}
              className={on && st.dash ? "dash-flow" : undefined}
            />
            {on && motion && <Packets d={d} proposed={e.kind === "proposed"} id={e.id} />}
          </g>
        );
      })}

      {/* Nodes */}
      {NODES.map((n) => (
        <Node
          key={n.id}
          n={n}
          layout={layout}
          active={n.id === activeNode}
          selected={n.id === selected}
          hl={highlights[n.id]}
          opacity={op(n.id)}
          onSelect={onSelect}
        />
      ))}
    </svg>
  );
});
export default Diagram;

function Packets({ d, proposed, id }: { d: string; proposed: boolean; id: string }) {
  // Two packets per edge, half a cycle apart, so data reads as a steady flow in run direction.
  const dur = proposed ? 2.4 : 1.8;
  return (
    <g data-packet={id}>
      {[0, 1].map((i) => (
        <circle key={i} r={proposed ? 3.5 : 4.5} fill={proposed ? "#dcd6fe" : "#fb923c"} opacity={proposed ? 0.85 : 1}>
          <animateMotion dur={`${dur}s`} begin={`${-i * (dur / 2)}s`} repeatCount="indefinite" path={d} />
        </circle>
      ))}
    </g>
  );
}

function ProposedLane({ layout }: { layout: "desk" | "mob" }) {
  const ids = ["landing", "meta", "report"];
  const L = LAYOUT[layout];
  const ns = NODES.filter((n) => ids.includes(n.id)).map((n) => n[layout]);
  const pad = 12;
  const x1 = Math.min(...ns.map((p) => p.x)) - L.nodeW / 2 - pad;
  const x2 = Math.max(...ns.map((p) => p.x)) + L.nodeW / 2 + pad;
  const y1 = Math.min(...ns.map((p) => p.y)) - L.nodeH / 2 - pad;
  const y2 = Math.max(...ns.map((p) => p.y)) + L.nodeH / 2 + pad;
  return (
    <g aria-hidden>
      <rect x={x1} y={y1} width={x2 - x1} height={y2 - y1} rx={22} fill="rgb(139 124 246 / 0.04)" stroke="rgb(139 124 246 / 0.25)" strokeDasharray="5 7" />
      <text x={x2 - 8} y={y2 + 17} textAnchor="end" fontSize={10.5} fontWeight={600} letterSpacing="0.08em" fill="#8b7cf6">PROPOSED · VALIDATION LOOP</text>
    </g>
  );
}

function Node({ n, layout, active, selected, hl, opacity, onSelect }: {
  n: ArchNode;
  layout: "desk" | "mob";
  active: boolean;
  selected: boolean;
  hl?: HighlightKind;
  opacity: number;
  onSelect: (id: string) => void;
}) {
  const { nodeW: w, nodeH: h } = LAYOUT[layout];
  const p = n[layout];
  const paused = n.status === "paused";
  const proposed = n.status === "proposed";
  const fill = active ? "#33303f" : paused ? "#1f1f22" : proposed ? "#211f2a" : "#26262b";
  const stroke = active ? "#b9aefb" : selected ? "rgb(255 255 255 / 0.55)" : proposed ? "#5e5491" : paused ? "#34343a" : "rgb(255 255 255 / 0.07)";
  const statusColor = n.status === "active" ? "#b9aefb" : proposed ? "#8b7cf6" : "#71717a";
  const left = n.time ?? n.statusNote?.replace("since ", "") ?? "";
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(n.id); }
  };
  return (
    <g
      transform={`translate(${p.x - w / 2} ${p.y - h / 2})`}
      opacity={paused ? Math.min(opacity, 0.55) : opacity}
      role="button"
      tabIndex={0}
      aria-label={`${n.title}, ${STATUS_LABEL[n.status]}${n.time ? `, ${n.time}` : ""}. Show details`}
      aria-pressed={selected}
      onClick={() => onSelect(n.id)}
      onKeyDown={onKey}
      className="arch-node cursor-pointer"
      style={{ transition: "opacity .4s" }}
      data-node={n.id}
    >
      {hl && <rect x={-5} y={-5} width={w + 10} height={h + 10} rx={21} fill="none" stroke={HL_COLOR[hl]} strokeWidth={2.5} strokeDasharray={hl === "proposed" ? "6 5" : undefined} className="hl-pulse" />}
      <rect width={w} height={h} rx={16} fill={fill} stroke={stroke} strokeWidth={active || selected ? 2 : 1.2} strokeDasharray={proposed && !active ? "5 5" : paused ? "3 5" : undefined} className={`base ${active ? "arch-glow" : ""}`} style={{ transition: "fill .4s, stroke .4s" }} />
      <text x={14} y={h / 2 - 5} fontSize={13.5} fontWeight={650} fill={paused ? "#a1a1aa" : "#fafafa"}>{n.title}</text>
      <text x={14} y={h / 2 + 15} fontSize={12} fontWeight={600} fill={active ? "#fb923c" : "#a1a1aa"} style={{ fontVariantNumeric: "tabular-nums" }}>{left}</text>
      <circle cx={w - 14 - statusWidth(n) - 7} cy={h / 2 + 11} r={3} fill={statusColor} />
      <text x={w - 14} y={h / 2 + 15} textAnchor="end" fontSize={11} fontWeight={600} fill={statusColor}>{STATUS_LABEL[n.status]}</text>
    </g>
  );
}

// Rough text width for the status label so the dot sits just before it (11px Manrope, semibold).
const statusWidth = (n: ArchNode) => STATUS_LABEL[n.status].length * 6.3;
