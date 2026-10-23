"use client";
import { useState } from "react";
import { resetAll } from "@/lib/store";
import { IconRefresh } from "./icons";

export default function ResetButton({ block }: { block?: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => {
        if (!confirm("Reset all demo state (validations, queued ideas)?")) return;
        resetAll();
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface-2 font-medium text-zinc-200 transition-colors hover:bg-surface-3 hover:text-white ${
        block ? "h-9 w-full text-[13px]" : "px-2.5 py-1.5 text-xs"
      }`}
    >
      <IconRefresh size={block ? 14 : 12} className="text-zinc-400" />
      {done ? "Demo reset ✓" : "Reset demo"}
    </button>
  );
}
