"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSearch } from "./Search";
import { IconSearch, IconX, LogoMark } from "./icons";


export default function TopBar() {
  const path = usePathname();
  const router = useRouter();
  const { q, setQ } = useSearch();
  const [mobileSearch, setMobileSearch] = useState(false);
  const desk = useRef<HTMLInputElement>(null);
  const mob = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K focuses whichever search field is visible.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) return;
      e.preventDefault();
      if (desk.current?.offsetParent) desk.current.focus();
      else setMobileSearch(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => { if (mobileSearch) mob.current?.focus(); }, [mobileSearch]);

  const search = (val: string) => {
    setQ(val);
    if (path !== "/") router.push("/");
  };
  const field = "min-w-0 flex-1 bg-transparent text-[14px] text-zinc-100 placeholder:text-zinc-400 focus:outline-none";

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-panel/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1040px] items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light">
          <LogoMark size={24} />
          <span className="truncate text-[15px] font-semibold tracking-tight text-zinc-50">Validation Ideas</span>
        </Link>
        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <Link href="/nights/" aria-current={path.startsWith("/nights") ? "page" : undefined} className={`rounded-full px-2.5 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light sm:px-3 ${path.startsWith("/nights") ? "text-zinc-50" : "text-zinc-400 hover:text-zinc-100"}`}>Nights</Link>
          <Link href="/architecture/" aria-current={path.startsWith("/architecture") ? "page" : undefined} className={`rounded-full px-2.5 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light sm:px-3 ${path.startsWith("/architecture") ? "text-zinc-50" : "text-zinc-400 hover:text-zinc-100"}`}>Architecture</Link>
          <label className="hidden h-10 w-56 items-center gap-2 rounded-full bg-tile pl-3.5 pr-1.5 text-zinc-400 focus-within:ring-2 focus-within:ring-accent/60 sm:flex lg:w-64">
            <IconSearch size={15} className="shrink-0" />
            <input ref={desk} value={q} onChange={(e) => search(e.target.value)} placeholder="Search scouts" aria-label="Search scouts" className={field + " text-[13px]"} />
            <kbd className="hidden shrink-0 rounded-full bg-tile-2 px-2 py-0.5 font-sans text-[11px] font-semibold text-zinc-300 md:block">⌘K</kbd>
          </label>
          <button
            onClick={() => setMobileSearch((o) => !o)}
            aria-label={mobileSearch ? "Close search" : "Search scouts"}
            aria-expanded={mobileSearch}
            className="grid h-10 w-10 place-items-center rounded-full bg-tile text-zinc-200 transition-colors hover:bg-tile-2 sm:hidden"
          >
            {mobileSearch ? <IconX size={16} /> : <IconSearch size={16} />}
          </button>
        </div>
      </div>
      {mobileSearch && (
        <div className="px-4 pb-3 sm:hidden">
          <label className="flex h-11 items-center gap-2.5 rounded-full bg-tile px-4 text-zinc-400 focus-within:ring-2 focus-within:ring-accent/60">
            <IconSearch size={15} className="shrink-0" />
            <input ref={mob} value={q} onChange={(e) => search(e.target.value)} placeholder="Search scouts" aria-label="Search scouts" className={field} />
          </label>
        </div>
      )}
    </header>
  );
}
