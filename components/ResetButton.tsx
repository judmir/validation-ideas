"use client";
import { useState } from "react";
import { resetAll } from "@/lib/store";

export default function ResetButton() {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => {
        if (!confirm("Reset all demo state (validations, queued ideas, new requests)?")) return;
        resetAll();
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
      className="font-semibold text-zinc-300 underline decoration-zinc-500 underline-offset-2 transition-colors hover:text-white hover:decoration-zinc-300"
    >
      {done ? "Demo reset ✓" : "Reset demo"}
    </button>
  );
}
