import type { ReactNode, SVGProps } from "react";

// Minimal 1.5px-stroke line icons (lucide-style), inlined so there are no runtime requests.
type P = SVGProps<SVGSVGElement> & { size?: number };
const make = (paths: ReactNode) =>
  function Icon({ size = 16, ...rest }: P) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...rest}>
        {paths}
      </svg>
    );
  };

export const IconGrid = make(<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>);
export const IconBulb = make(<><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z" /></>);
export const IconStar = make(<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />);
export const IconChart = make(<><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 6-6" /></>);
export const IconFlask = make(<><path d="M9 3h6" /><path d="M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3" /><path d="M7 15h10" /></>);
export const IconLayers = make(<><path d="m12 2 10 5-10 5L2 7z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></>);
export const IconCalendar = make(<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>);
export const IconRefresh = make(<><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M8 16H3v5" /></>);
export const IconArrowLeft = make(<><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>);
export const IconArrowRight = make(<><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>);
export const IconExternal = make(<><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>);
export const IconMore = make(<><circle cx="12" cy="5" r=".8" /><circle cx="12" cy="12" r=".8" /><circle cx="12" cy="19" r=".8" /></>);
export const IconCheck = make(<path d="M20 6 9 17l-5-5" />);
export const IconX = make(<><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>);
export const IconLock = make(<><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>);
export const IconClock = make(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
export const IconChevronRight = make(<path d="m9 18 6-6-6-6" />);
export const IconChevronDown = make(<path d="m6 9 6 6 6-6" />);
export const IconMegaphone = make(<><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></>);
export const IconPlus = make(<><path d="M12 5v14" /><path d="M5 12h14" /></>);
export const IconCopyright = make(<><circle cx="12" cy="12" r="9" /><path d="M14.8 9.5a3.5 3.5 0 1 0 0 5" /></>);
export const IconLink = make(<><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></>);

/** Brand mark: a small flame-ish spark in a white tile, echoing the reference logo. */
export function LogoMark({ size = 26 }: { size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center rounded-full bg-white text-black" style={{ width: size, height: size }}>
      <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12.6 2.2c.4 2.6-1 4.1-2.4 5.6C8.7 9.4 7 11.1 7 14a5 5 0 0 0 10 0c0-1.6-.6-3-1.5-4.1-.2 1.3-.9 2.3-2 2.6.6-3.8-.2-7.4-.9-10.3z" />
      </svg>
    </span>
  );
}
