import type { Validation } from "@/lib/types";

/** The one shared landing template: headline, subhead, "Start for €X/month" fake door + soft "Join waitlist" link. Preview only. */
export default function LandingPreview({ landing, name }: { landing: Validation["landing"]; name: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-paper text-ink">
      <div className="flex items-center gap-2 border-b border-[#e7e5ec] px-3.5 py-2.5" aria-hidden>
        <span className="flex gap-1"><span className="h-2 w-2 rounded-full bg-[#d4d1da]" /><span className="h-2 w-2 rounded-full bg-[#d4d1da]" /><span className="h-2 w-2 rounded-full bg-[#d4d1da]" /></span>
        <span className="min-w-0 flex-1 truncate rounded-full bg-[#ebe9f0] px-3 py-1 text-[11px] font-medium text-ink-soft">/v/{landing.slug}/ · preview, not deployed</span>
      </div>
      <div className="p-5 sm:p-7">
        <div className="flex items-center gap-2 text-[13px] font-bold"><span className="grid h-6 w-6 place-items-center rounded-lg bg-ink text-[12px] text-white">{name[0]}</span>{name}</div>
        <h3 className="mt-4 text-[24px] font-bold leading-tight tracking-tight sm:text-[28px]">{landing.headline}</h3>
        <p className="mt-2 max-w-md text-[14px] leading-relaxed text-ink-soft">{landing.subhead}</p>
        <ul className="mt-4 space-y-1.5 text-[13px]">
          {landing.bullets.map((b) => <li key={b} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />{b}</li>)}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <span role="img" aria-label={`Fake-door button: ${landing.primaryCta} (preview)`} className="inline-flex h-11 items-center rounded-full bg-ink px-5 text-[14px] font-semibold text-white">{landing.primaryCta}</span>
          <span className="text-[13px] font-semibold text-ink-soft underline decoration-[#c9c5d3] underline-offset-4">{landing.secondaryCta}</span>
        </div>
        <p className="mt-3 text-[11px] text-ink-soft">Price button = fake-door checkout: it records the click and shows “Not open yet, join the waitlist”. No payment is taken.</p>
      </div>
    </div>
  );
}
