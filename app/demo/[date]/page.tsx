import Link from "next/link";
import { notFound } from "next/navigation";
import { BRIEFS, briefOf, findIdea } from "@/lib/mock";
import { formatDate, shortDate } from "@/lib/format";
import type { ShotStatus } from "@/lib/types";
import DemoShotImg from "@/components/night/DemoShotImg";
import { IconArrowLeft, IconChevronRight } from "@/components/icons";

export const dynamicParams = false;
export function generateStaticParams() {
  const dates = BRIEFS.filter((b) => b.demo).map((b) => ({ date: b.date }));
  return dates.length ? dates : [{ date: "none" }];
}
export async function generateMetadata({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const w = briefOf(date)?.winnerPainId;
  return { title: `${(w && findIdea(w)?.name) || "Demo"} demo, ${date} · Validation Ideas` };
}

const STATUS: Record<ShotStatus, { label: string; cls: string }> = {
  real: { label: "Real", cls: "bg-accent/15 text-accent-light ring-accent/35" },
  mock: { label: "Mocked", cls: "bg-warm/15 text-[#fdba74] ring-warm/35" },
  fake: { label: "Fake (demo)", cls: "bg-warm/15 text-[#fdba74] ring-warm/35" },
  note: { label: "Note only", cls: "bg-white/[0.06] text-zinc-300 ring-white/[0.1]" },
  none: { label: "Not built", cls: "bg-white/[0.06] text-zinc-300 ring-white/[0.1]" },
};
const Chip = ({ s, children }: { s: ShotStatus; children?: React.ReactNode }) => (
  <span className={`inline-flex max-w-full items-center gap-1 rounded-full px-2 py-px text-[11px] font-semibold ring-1 ring-inset ${STATUS[s].cls}`}><span className="shrink-0">{STATUS[s].label}</span>{children ? <span className="truncate font-medium opacity-90">· {children}</span> : null}</span>
);

export default async function DemoPage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const b = briefOf(date);
  if (!b?.demo || !b.winnerPainId) notFound();
  const d = b.demo;
  const idea = findIdea(b.winnerPainId);
  const name = idea?.name ?? b.ideas[0]?.name ?? b.winnerPainId;
  return (
    <div className="space-y-6">
      <div>
        <Link href={`/idea/${b.winnerPainId}/`} className="inline-flex items-center gap-1.5 rounded-full text-[13px] font-semibold text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"><IconArrowLeft size={14} /> {name}</Link>
        <p data-demo-label className="mt-4 flex items-start gap-2.5 rounded-2xl bg-accent/[0.12] px-4 py-3 text-[14px] font-semibold leading-snug text-accent-pale ring-1 ring-inset ring-accent/30">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-warm" aria-hidden />{d.label}
        </p>
        <h1 className="mt-5 text-[28px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[34px]">{name} demo</h1>
        <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-zinc-300">
          The {formatDate(date)} POC as a walkthrough: {d.shots.length} screens, each at 390px (phone) and 1280px (desktop), dark mode.
          {d.private ? (b.apps?.demo_url ? " The full app stays in a private repo; a static, mocked copy is clickable as the demo app (new tab)." : " The app itself is in a private repo and runs only on the build box; it is not launched publicly.") : ""}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {b.apps?.demo_url && <a href={b.apps.demo_url} target="_blank" rel="noopener" data-standalone="demo" className="inline-flex h-8 items-center gap-1.5 rounded-full bg-accent px-3.5 text-[12.5px] font-semibold text-accent-ink transition-colors hover:bg-accent-light">Open the demo app <span aria-hidden className="opacity-70">↗</span></a>}
          <Link href={`/idea/${b.winnerPainId}/`} className="inline-flex h-8 items-center rounded-full bg-white/[0.09] px-3.5 text-[12.5px] font-semibold text-zinc-50 ring-1 ring-inset ring-white/[0.08] transition-colors hover:bg-white/[0.15]">Idea page</Link>
          {b.apps?.landing_url ? <a href={b.apps.landing_url} target="_blank" rel="noopener" className="inline-flex h-8 items-center gap-1.5 rounded-full bg-accent-pale px-3.5 text-[12.5px] font-semibold text-[#2a1f6b] transition-colors hover:bg-white">Validation page <span aria-hidden className="opacity-70">↗</span></a> : b.validation && <Link href={`/validation/${date}/`} className="inline-flex h-8 items-center rounded-full bg-accent-pale px-3.5 text-[12.5px] font-semibold text-[#2a1f6b] transition-colors hover:bg-white">Validation page (proposal)</Link>}
          <span className="inline-flex h-8 items-center rounded-full px-1 text-[12px] text-zinc-400">Night {shortDate(date)} · {d.pocPath}</span>
        </div>
      </div>

      {d.rows.length > 0 && (
        <section className="rounded-[20px] bg-tile p-4 sm:p-5" aria-labelledby="real-mocked">
          <h2 id="real-mocked" className="text-[16px] font-semibold tracking-tight text-zinc-50">Real vs mocked</h2>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {d.rows.filter((r) => r.status !== "real").map((r) => <Chip key={r.piece} s={r.status}>{r.piece}</Chip>)}
            <Chip s="real">{d.rows.filter((r) => r.status === "real").length} other pieces</Chip>
          </div>
          <details className="group mt-3 border-t border-white/[0.06] pt-2.5">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-[13px] font-semibold text-zinc-300 hover:text-zinc-50">
              <span className="min-w-0 flex-1">All {d.rows.length} pieces, from the builder&apos;s POC note ({d.pocPath})</span>
              <IconChevronRight size={14} className="shrink-0 text-zinc-400 transition group-open:rotate-90" />
            </summary>
            <ul className="mt-2 divide-y divide-white/[0.06]">
              {d.rows.map((r) => (
                <li key={r.piece} className="grid gap-1 py-2.5 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:gap-4">
                  <div className="flex flex-wrap items-center gap-2"><Chip s={r.status} /><span className="text-[13px] font-semibold text-zinc-100">{r.piece}</span></div>
                  <p className="text-[13px] leading-relaxed text-zinc-400">{r.text}</p>
                </li>
              ))}
            </ul>
          </details>
        </section>
      )}

      <section aria-labelledby="walkthrough" className="space-y-4">
        <h2 id="walkthrough" className="px-1 text-[18px] font-semibold tracking-tight text-zinc-50">Walkthrough <span className="font-medium tabular-nums text-zinc-400">{d.shots.length} screens</span></h2>
        <ol className="space-y-4">
          {d.shots.map((s) => {
            const tall = /full/.test(s.slug);
            return (
              <li key={s.n} id={`shot-${s.n}`} className="rounded-[20px] bg-tile p-4 sm:p-5" data-shot={s.n}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="grid h-7 min-w-7 place-items-center rounded-full bg-accent px-2 text-[12px] font-semibold tabular-nums text-accent-ink">{s.n}</span>
                  <h3 className="text-[15px] font-semibold tracking-tight text-zinc-50">{s.caption}</h3>
                  {s.pieces.map((p) => <Chip key={p.piece} s={p.status}>{p.piece}</Chip>)}
                </div>
                <div className="mt-3 grid items-start gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,220px)]">
                  <figure className="order-2 min-w-0 sm:order-1">
                    <DemoShotImg src={s.src1280} alt={`${s.caption}, desktop 1280px`} w={1280} h={tall ? 1457 : 860} tall={tall} />
                    <figcaption className="mt-1.5 text-[11px] text-zinc-400">Desktop · 1280px{tall ? " · full page, scroll" : ""}</figcaption>
                  </figure>
                  <figure className="order-1 mx-auto w-full max-w-[240px] sm:order-2 sm:max-w-none">
                    <DemoShotImg src={s.src390} alt={`${s.caption}, phone 390px`} w={390} h={tall ? 1852 : 844} tall={tall} />
                    <figcaption className="mt-1.5 text-[11px] text-zinc-400">Phone · 390px{tall ? " · full page, scroll" : ""}</figcaption>
                  </figure>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
