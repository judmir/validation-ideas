"use client";
import { useState } from "react";
import { resetAll } from "@/lib/store";

export default function ResetButton() {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => {
        if (!confirm("Reset all demo state (validations, queued ideas)?")) return;
        resetAll();
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
      className="rounded-lg border border-line-strong px-2.5 py-1 font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-zinc-100"
    >
      {done ? "Demo reset ✓" : "Reset demo"}
    </button>
  );
}
