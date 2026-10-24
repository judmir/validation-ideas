/** Small amber "Mocked" pill. Put it on every section, card and tab that shows non-real data. */
export default function MockedPill({ label = "Mocked", className = "" }: { label?: string; className?: string }) {
  return (
    <span
      title="Mocked: made-up demo data, not a real result"
      className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-[#fbbf24]/15 px-2 py-px align-middle text-[11px] font-semibold leading-[18px] text-[#fcd34d] ring-1 ring-inset ring-[#fbbf24]/35 ${className}`}
      data-mocked
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24]" aria-hidden />
      {label}
    </span>
  );
}
