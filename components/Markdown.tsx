import type { ReactNode } from "react";

/** Tiny, safe markdown for brief excerpts: paragraphs, > quotes, - / 1. lists, **bold**, *em*, [links](url). No HTML. */
export function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|(?<![\w*])\*([^*\n]+)\*(?![\w*])|`([^`]+)`/g;
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<b key={k++} className="font-semibold text-zinc-50"><Inline text={m[1]} /></b>);
    else if (m[2] !== undefined) out.push(<a key={k++} href={m[3]} target="_blank" rel="noreferrer" className="text-zinc-50 underline decoration-accent-light/70 underline-offset-2 hover:decoration-accent-light">{m[2]}</a>);
    else if (m[4] !== undefined) out.push(<em key={k++}>{m[4]}</em>);
    else out.push(<code key={k++} className="rounded bg-white/[0.07] px-1 font-mono text-[12px]">{m[5]}</code>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

export default function Markdown({ md, className = "" }: { md: string; className?: string }) {
  const lines = md.replace(/\r/g, "").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0, k = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim() || /^---+\s*$/.test(l)) { i++; continue; }
    if (/^\s*>/.test(l)) {
      const q: string[] = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) q.push(lines[i++].replace(/^\s*>\s?/, ""));
      blocks.push(<blockquote key={k++} className="rounded-2xl border-l-2 border-accent-light bg-accent/[0.08] px-4 py-3 text-[15px] leading-relaxed text-zinc-100"><Inline text={q.join(" ")} /></blockquote>);
      continue;
    }
    const ol = /^\s*\d+\.\s+/.test(l), ul = /^\s*[-*]\s+/.test(l);
    if (ol || ul) {
      const items: string[] = [];
      const rx = ol ? /^\s*\d+\.\s+/ : /^\s*[-*]\s+/;
      while (i < lines.length && rx.test(lines[i])) {
        let t = lines[i++].replace(rx, "");
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !rx.test(lines[i])) t += " " + lines[i++].trim();
        items.push(t);
      }
      const Tag = ol ? "ol" : "ul";
      blocks.push(<Tag key={k++} className={`space-y-1.5 pl-5 text-[14px] leading-relaxed text-zinc-300 ${ol ? "list-decimal" : "list-disc"} marker:text-zinc-500`}>{items.map((t, j) => <li key={j}><Inline text={t} /></li>)}</Tag>);
      continue;
    }
    const h = /^#{1,6}\s+(.*)$/.exec(l);
    if (h) { blocks.push(<h4 key={k++} className="text-[14px] font-semibold text-zinc-100"><Inline text={h[1]} /></h4>); i++; continue; }
    const p: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^\s*(>|[-*]\s|\d+\.\s|#)/.test(lines[i])) p.push(lines[i++].trim());
    blocks.push(<p key={k++} className="text-[14px] leading-relaxed text-zinc-300"><Inline text={p.join(" ")} /></p>);
  }
  return <div className={`space-y-3 ${className}`}>{blocks}</div>;
}
