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
      className="rounded-md border border-slate-300 px-2 py-1 font-medium text-slate-600 hover:bg-slate-100"
    >
      {done ? "Demo reset ✓" : "Reset demo"}
    </button>
  );
}
