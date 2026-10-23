import type { Idea } from "@/lib/data";
import { Card, btn } from "../ui";
import { IconExternal } from "../icons";

const host = (url?: string) => url?.replace(/^https?:\/\//, "").split("/")[0] ?? "";

/** The bot-built landing page (mock browser frame) plus links to the page and the demo. */
export default function PageStage({ idea }: { idea: Idea }) {
  const path = idea.validationUrl?.replace(/^https?:\/\//, "") ?? "";
  return (
    <Card>
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-center">
        <div className="overflow-hidden rounded-2xl bg-paper text-ink" aria-hidden>
          <div className="flex items-center gap-2 border-b border-[#e7e5ec] px-3.5 py-2.5">
            <span className="flex gap-1"><span className="h-2 w-2 rounded-full bg-[#d4d1da]" /><span className="h-2 w-2 rounded-full bg-[#d4d1da]" /><span className="h-2 w-2 rounded-full bg-[#d4d1da]" /></span>
            <span className="min-w-0 flex-1 truncate rounded-full bg-[#ebe9f0] px-3 py-1 text-[11px] font-medium text-ink-soft">{path}</span>
          </div>
          <div className="p-5 sm:p-6">
            <span className="rounded-full bg-accent-pale px-2.5 py-0.5 text-[11px] font-bold text-[#2a1f6b]">Early access</span>
            <h3 className="mt-3 text-[20px] font-bold leading-tight tracking-tight">{idea.ad?.headline ?? idea.name}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{idea.pitch}</p>
            <div className="mt-4 flex gap-2">
              <span className="h-10 min-w-0 flex-1 rounded-full bg-[#ebe9f0] px-4 text-[13px] leading-10 text-ink-soft">you@email.com</span>
              <span className="h-10 shrink-0 rounded-full bg-ink px-4 text-[13px] font-semibold leading-10 text-white">Join waitlist</span>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-[14px] leading-relaxed text-zinc-300">The App Ideas bot built a landing page and a clickable demo for <b className="font-semibold text-zinc-50">{idea.name}</b>. Every waitlist signup on the page counts toward the live test.</p>
          <dl className="mt-4 space-y-2 text-[13px]">
            <div className="flex gap-3"><dt className="w-20 shrink-0 text-zinc-400">Page</dt><dd className="min-w-0 truncate text-zinc-100">{host(idea.validationUrl)}</dd></div>
            <div className="flex gap-3"><dt className="w-20 shrink-0 text-zinc-400">Demo</dt><dd className="min-w-0 truncate text-zinc-100">{host(idea.demoUrl)}</dd></div>
            <div className="flex gap-3"><dt className="w-20 shrink-0 text-zinc-400">Goal</dt><dd className="text-zinc-100">Waitlist signups</dd></div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={idea.validationUrl} target="_blank" rel="noreferrer" className={btn.primary}>Validation page <IconExternal size={13} /></a>
            <a href={idea.demoUrl} target="_blank" rel="noreferrer" className={btn.ghost}>Demo <IconExternal size={13} /></a>
          </div>
        </div>
      </div>
    </Card>
  );
}
