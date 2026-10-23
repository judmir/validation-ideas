"use client";
import { createContext, useContext, useState } from "react";

// Top-bar search pill filters the scout log on the overview page.
const Ctx = createContext<{ q: string; setQ: (q: string) => void }>({ q: "", setQ: () => {} });

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [q, setQ] = useState("");
  return <Ctx.Provider value={{ q, setQ }}>{children}</Ctx.Provider>;
}
export const useSearch = () => useContext(Ctx);
