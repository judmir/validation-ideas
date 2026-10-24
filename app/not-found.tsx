import Link from "next/link";

export const metadata = { title: "Not found · Validation Ideas" };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <div className="text-[56px] font-medium leading-none tracking-tight tabular-nums text-zinc-50">404</div>
      <h1 className="mt-4 text-[20px] font-semibold tracking-tight text-zinc-50">This page doesn&apos;t exist</h1>
      <p className="mt-2 text-[14px] leading-relaxed text-zinc-400">Old Germany pains (p-001 to p-071) are archived and have no detail pages. US ideas are listed on the home page.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-accent px-4 py-2 text-[13px] font-semibold text-accent-ink hover:bg-accent-light">All scouts</Link>
    </div>
  );
}
