"use client";
import { useState } from "react";
import { resetAll } from "@/lib/store";
import { IconRefresh } from "./icons";

export default function ResetButton({ nav }: { nav?: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => {
        if (!confirm("Reset all demo state (validations, queued ideas)?")) return;
        resetAll();
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
      className={
        nav
          ? "flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-[14px] font-medium text-zinc-300 transition-colors hover:bg-white/[0.04] hover:text-white"
          : "inline-flex items-center gap-2 rounded-full bg-tile px-3.5 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:bg-tile-2 hover:text-white"
      }
    >
      <IconRefresh size={nav ? 16 : 13} className="text-zinc-400" />
      {done ? "Demo reset ✓" : "Reset demo"}
    </button>
  );
}
