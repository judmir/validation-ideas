"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RUNS, findIdea } from "@/lib/data";
import ResetButton from "./ResetButton";
import { IconCopyright, IconGrid, IconStar, LogoMark } from "./icons";

const TOP_PICKS = [...RUNS].sort((a, b) => b.date.localeCompare(a.date)).map((r) => r.ideas[0]);

function NavItem({ href, active, icon, children, count }: { href: string; active?: boolean; icon: React.ReactNode; children: React.ReactNode; count?: number }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-colors ${
        active ? "bg-surface-3 text-zinc-50" : "text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-100"
      }`}
    >
      <span className={active ? "text-zinc-200" : "text-zinc-500"}>{icon}</span>
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {count !== undefined && <span className="grid h-5 min-w-5 place-items-center rounded-md border border-line-strong bg-surface-3 px-1 text-[10px] tabular-nums text-zinc-400">{count}</span>}
    </Link>
  );
}

export function Sidebar() {
  const path = usePathname();
  return (
    <aside className="sticky top-0 hidden h-screen self-start w-[248px] shrink-0 flex-col border-r border-line bg-bg lg:flex">
      <div className="flex h-16 items-center gap-2.5 border-b border-line px-5">
        <LogoMark />
        <Link href="/" className="text-[16px] font-medium tracking-tight text-zinc-50">Validation Ideas</Link>
      </div>

      <nav className="space-y-0.5 border-b border-line p-3">
        <NavItem href="/" active={path === "/"} icon={<IconGrid />} count={RUNS.length}>Scout log</NavItem>
      </nav>

      <nav className="min-h-0 flex-1 overflow-y-auto p-3">
        <div className="label px-3 pb-2 pt-1">Top picks</div>
        <div className="space-y-0.5">
          {TOP_PICKS.map((idea) => (
            <NavItem key={idea.id} href={`/idea/${idea.id}/`} active={path.startsWith(`/idea/${idea.id}/`)} icon={<IconStar />}>{idea.name}</NavItem>
          ))}
        </div>
      </nav>

      <div className="space-y-3 p-3">
        <p className="px-3 text-[11px] leading-relaxed text-zinc-500">Mock data · no real Facebook or bot calls. Demo state lives in this browser.</p>
        <ResetButton block />
      </div>
      <div className="flex h-14 items-center gap-2 border-t border-line px-5 text-[12px] text-zinc-500">
        <IconCopyright size={14} /> 2026 Validation Ideas PoC
      </div>
    </aside>
  );
}

function crumb(path: string) {
  const m = path.match(/^\/idea\/([^/]+)\/(create\/)?/);
  if (!m) return null;
  const f = findIdea(m[1]);
  return f ? { name: f.idea.name, create: !!m[2] } : null;
}

export function Topbar() {
  const path = usePathname();
  const c = crumb(path);
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-7">
        <Link href="/" className="flex items-center gap-2.5 lg:hidden">
          <LogoMark size={24} />
          <span className="text-[15px] font-medium tracking-tight text-zinc-50">Validation Ideas</span>
        </Link>
        <div className="hidden min-w-0 items-center gap-2 text-[13px] lg:flex">
          <Link href="/" className={c ? "text-zinc-500 transition-colors hover:text-zinc-200" : "text-zinc-100"}>Scout log</Link>
          {c && <><span className="text-zinc-700">/</span><span className="truncate text-zinc-100">{c.name}</span></>}
          {c?.create && <><span className="text-zinc-700">/</span><span className="text-zinc-400">Create</span></>}
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-md border border-line-strong bg-surface-2 px-2 py-1 text-[11px] font-medium text-zinc-400">Mock data</span>
          <div className="hidden items-center gap-2.5 border-l border-line pl-4 sm:flex">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-line-strong bg-surface-3 text-[12px] font-semibold text-zinc-200">AI</span>
            <div className="leading-tight">
              <div className="text-[13px] text-zinc-100">App Ideas bot</div>
              <div className="text-[11px] text-zinc-500">Daily scout</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
