// Pulls the landing-page copy out of a brief's "Validation page proposal" markdown (builder template, 25 Oct 2026 on).
// Anything not found stays null; the page then shows only the full proposal text.
const plain = (s: string) => s.replace(/\*\*|__/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();

export function proposalParts(md: string) {
  const lines = md.split("\n");
  const quote = lines.filter((l) => /^\s*>/.test(l)).map((l) => l.replace(/^\s*>\s?/, ""));
  const headline = quote.length ? plain(quote.join(" ")).replace(/^["“]|["”]$/g, "") : null;
  const field = (label: string) => {
    const m = new RegExp(`\\*\\*${label}[^*]*:\\*\\*\\s*(.+)`, "i").exec(md);
    return m ? plain(m[1]) : null;
  };
  const listAfter = (label: RegExp) => {
    const i = lines.findIndex((l) => label.test(l));
    if (i < 0) return [];
    const out: string[] = [];
    for (let j = i + 1; j < lines.length && (/^\s*(\d+\.|[-*])\s+/.test(lines[j]) || (!lines[j].trim() && !out.length)); j++) if (lines[j].trim()) out.push(lines[j].replace(/^\s*(\d+\.|[-*])\s+/, ""));
    return out;
  };
  const benefits = listAfter(/^\*\*\d+ benefits\*\*/i).map((b) => {
    const m = /^\*\*(.+?)\*\*\s*(.*)$/.exec(b);
    return m ? { title: plain(m[1]), text: plain(m[2]) } : { title: plain(b), text: "" };
  });
  const buttons = listAfter(/^\*\*Buttons\*\*/i);
  const btn = (re: RegExp) => { const b = buttons.find((x) => re.test(x)); const m = b && /\*\*["“]?(.+?)["”]?\*\*/.exec(b); return m ? m[1] : null; };
  return { headline, subhead: field("Subhead"), price: field("Price"), benefits, primary: btn(/^main/i), secondary: btn(/^soft/i), note: btn(/^note/i) };
}
