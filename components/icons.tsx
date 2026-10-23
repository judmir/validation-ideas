import type { ReactNode, SVGProps } from "react";

// Minimal 1.6px-stroke line icons (lucide-style), inlined so there are no runtime requests.
type P = SVGProps<SVGSVGElement> & { size?: number };
const make = (paths: ReactNode) =>
  function Icon({ size = 16, ...rest }: P) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...rest}>
        {paths}
      </svg>
    );
  };

export const IconArrowLeft = make(<><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>);
export const IconExternal = make(<><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>);
export const IconCheck = make(<path d="M20 6 9 17l-5-5" />);
export const IconX = make(<><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>);
export const IconLock = make(<><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>);
export const IconClock = make(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
export const IconChevronRight = make(<path d="m9 18 6-6-6-6" />);
export const IconPlus = make(<><path d="M12 5v14" /><path d="M5 12h14" /></>);
export const IconLink = make(<><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></>);
export const IconSearch = make(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>);
export const IconSparkle = make(<><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="m6.3 6.3 2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1" /></>);
/** Square "stop" glyph for the end-of-test control. */
export function IconStop({ size = 12 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden><rect x="1" y="1" width="10" height="10" rx="2.5" fill="currentColor" /></svg>;
}

/** Brand mark: four dots on a diagonal cross — two warm, two light — echoing the reference logo. */
export function LogoMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className="shrink-0">
      <path d="M6 6l12 12M18 6 6 18" stroke="#f4f4f5" strokeWidth="2.4" strokeLinecap="round" opacity=".9" />
      <circle cx="6" cy="6" r="4" fill="#fb923c" />
      <circle cx="18" cy="18" r="4" fill="#fb923c" />
      <circle cx="18" cy="6" r="3.4" fill="#f4f4f5" />
      <circle cx="6" cy="18" r="3.4" fill="#f4f4f5" />
    </svg>
  );
}
