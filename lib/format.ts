const d = (iso: string) => new Date(iso.slice(0, 10) + "T12:00:00");
export const formatDate = (iso: string) => d(iso).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
export const shortDate = (iso: string) => d(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
export const weekday = (iso: string) => d(iso).toLocaleDateString("en-GB", { weekday: "short" });
export const eur = (n: number) => "€" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
/** Whole-euro label for compact UI ("€32"). */
export const eur0 = (n: number) => "€" + Math.round(n).toLocaleString("en-US");
/** Product prices are USD. */
export const usd = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
export const int = (n: number) => Math.round(n).toLocaleString("en-US");
export const pct = (n: number, digits = 1) => (n * 100).toFixed(digits) + "%";
/** "2026-W42" → "W42". */
export const wk = (iso: string) => iso.replace(/^\d{4}-/, "");
export const plural = (n: number, one: string, many = one + "s") => `${n} ${n === 1 ? one : many}`;
