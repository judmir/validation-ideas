"use client";
import type { Idea } from "@/lib/data";
import { useValidation } from "@/lib/store";
import { verdict } from "@/lib/verdict";
import { Badge } from "./ui";

export default function StatusBadge({ idea }: { idea: Idea }) {
  const [v, , loaded] = useValidation(idea);
  if (!loaded) return <span className="h-5 w-20 animate-pulse rounded-full bg-white/[0.06]" />;
  switch (v.status) {
    case "on_hold": return <Badge color="amber">Validation on hold</Badge>;
    case "ready": return <Badge color="blue">Ready to run</Badge>;
    case "running": return <Badge color="green" pulse>Running</Badge>;
    case "finished": {
      const w = verdict(idea, v.result).winner;
      return <Badge color={w ? "green" : "red"}>{w ? "✓ Winning idea" : "✕ Not a winner"}</Badge>;
    }
  }
}
