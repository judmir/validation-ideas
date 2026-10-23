"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { RUNS } from "@/lib/data";
import ResetButton from "./ResetButton";
import { useSearch } from "./Search";
import { IconBars, IconGrid, IconLayers, IconSearch, IconStar, LogoMark } from "./icons";

const TOP_PICKS = [...RUNS].sort((a, b) => b.date.localeCompare(a.date)).map((r) => r.ideas[0]);
const LATEST = TOP_PICKS[0];

function NavItem({ href, active, icon, children }: { href: string; active?: boolean; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-[14px] font-medium transition-colors ${
        active ? "bg-tile-2 text-zinc-50" : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100"
      }`}
    >
      <span className={active ? "text-zinc-50" : "text-zinc-400"}>{icon}</span>
      <span className="min-w-0 flex-1 truncate">{children}</span>
    </Link>
  );
}

export function Sidebar() {
  const path = usePathname();
  return (
    <aside className="sticky top-3 hidden h-[calc(100vh-24px)] self-start w-[236px] shrink-0 flex-col rounded-[24px] bg-panel lg:flex">
      <Link href="/" className="flex items-center gap-2.5 px-6 pb-6 pt-6">
        <LogoMark />
        <span className="text-[17px] font-semibold tracking-tight text-zinc-50">Validation Ideas</span>
      </Link>

      <nav className="min-h-0 flex-1 space-y-6 overflow-y-auto px-3">
        <div>
          <div className="label px-3.5 pb-2">Main</div>
          <div className="space-y-0.5">
            <NavItem href="/" active={path === "/"} icon={<IconGrid />}>Overview</NavItem>
            {TOP_PICKS.map((idea) => (
              <NavItem key={idea.id} href={`/idea/${idea.id}/`} active={path.startsWith(`/idea/${idea.id}/`)} icon={<IconStar />}>{idea.name}</NavItem>
            ))}
          </div>
        </div>
        <div>
          <div className="label px-3.5 pb-2">Tools</div>
          <div className="space-y-0.5">
            <NavItem href="/#trends" icon={<IconBars />}>Score trends</NavItem>
            <NavItem href="/#log" icon={<IconLayers />}>Scout log</NavItem>
          </div>
        </div>
      </nav>

      <div className="mx-3 mb-3 border-t border-line pt-3">
        <p className="px-3.5 pb-2 text-[11px] leading-relaxed text-faint">Mock data · demo state lives in this browser.</p>
        <ResetButton nav />
      </div>
    </aside>
  );
}

export function Topbar() {
  const path = usePathname();
  const router = useRouter();
  const { q, setQ } = useSearch();
  const input = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K focuses the search pill.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); input.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-panel/90 backdrop-blur-md lg:static lg:rounded-[24px] lg:bg-panel lg:backdrop-blur-none">
      <div className="flex h-[60px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-[76px] lg:px-4">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 lg:hidden">
          <LogoMark size={24} />
          <span className="truncate text-[15px] font-semibold tracking-tight text-zinc-50">Validation Ideas</span>
        </Link>
        <label className="hidden h-11 w-full min-w-0 max-w-[340px] items-center gap-2.5 rounded-full bg-tile pl-4 pr-1.5 text-zinc-400 focus-within:ring-2 focus-within:ring-accent/60 sm:flex">
          <IconSearch size={16} className="shrink-0" />
          <input
            ref={input}
            value={q}
            onChange={(e) => { setQ(e.target.value); if (path !== "/") router.push("/"); }}
            placeholder="Search ideas"
            aria-label="Search ideas in the scout log"
            className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-100 placeholder:text-zinc-400 focus:outline-none"
          />
          <kbd className="hidden shrink-0 rounded-full bg-tile-2 px-2.5 py-1 font-sans text-[11px] font-semibold text-zinc-300 md:block">⌘ K</kbd>
        </label>
        <div className="flex shrink-0 items-center gap-2.5">
          <Link href={`/idea/${LATEST.id}/`} className="hidden h-11 items-center gap-2 rounded-full bg-white px-5 text-[13px] font-semibold text-ink transition-colors hover:bg-zinc-200 md:inline-flex">
            <IconStar size={15} /> Latest top pick
          </Link>
          <span className="relative grid h-10 w-10 place-items-center rounded-full bg-[linear-gradient(140deg,#dcd6fe,#8b7cf6)] text-[14px] font-bold text-accent-ink lg:h-11 lg:w-11" title="Judi" aria-label="Judi">
            J
            <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-warm ring-2 ring-panel" aria-hidden />
          </span>
        </div>
      </div>
    </header>
  );
}
