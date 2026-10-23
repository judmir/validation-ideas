import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import ResetButton from "@/components/ResetButton";

export const metadata: Metadata = { title: "Validation Ideas", description: "Scout → Validate → Report (mock PoC)" };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-600 text-sm text-white">V</span>
              Validation Ideas
            </Link>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800">Mock data</span>
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">{children}</main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 text-xs text-slate-500">
            <span>PoC · no real Facebook or bot calls</span>
            <ResetButton />
          </div>
        </footer>
      </body>
    </html>
  );
}
