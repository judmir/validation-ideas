"use client";
import { useEffect, useState, type ReactNode } from "react";

export type TabDef = { id: string; label: string; badge?: ReactNode };
/** Old hashes from the previous layout map onto the new tabs. */
const ALIAS: Record<string, string> = { scout: "evidence", page: "validate" };

/** Hash-driven tabs (#evidence | #validate | #report). Returns the active id plus a setter. */
export function useHashTab(ids: string[], fallback: string) {
  const [tab, setTab] = useState(fallback);
  const [anchor, setAnchor] = useState<string | null>(null);
  useEffect(() => {
    const read = () => {
      const raw = window.location.hash.slice(1);
      const id = ALIAS[raw] ?? raw;
      const next = ids.includes(id) ? id : fallback;
      setTab(next);
      if (raw === "page") setAnchor("landing");
      if (raw && raw !== next) history.replaceState(null, "", "#" + next);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const go = (id: string) => {
    history.replaceState(null, "", "#" + id);
    setTab(id);
  };
  return { tab, go, anchor, clearAnchor: () => setAnchor(null) };
}

export function TabBar({ tabs, active, onSelect }: { tabs: TabDef[]; active: string; onSelect: (id: string) => void }) {
  return (
    <div role="tablist" aria-label="Idea sections" className="sticky top-16 z-10 -mx-4 bg-panel/90 px-4 py-2 backdrop-blur-md sm:-mx-6 sm:px-6">
      <div className="flex gap-1 rounded-full bg-tile p-1">
        {tabs.map((t) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={on}
              aria-controls={`panel-${t.id}`}
              onClick={() => onSelect(t.id)}
              className={`flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light ${on ? "bg-accent-pale text-[#2a1f6b]" : "text-zinc-300 hover:text-zinc-50"}`}
            >
              <span className="truncate">{t.label}</span>{t.badge}
            </button>
          );
        })}
      </div>
    </div>
  );
}
