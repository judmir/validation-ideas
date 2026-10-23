import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import ResetButton from "@/components/ResetButton";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = { title: "Validation Ideas", description: "Scout → Validate → Report (mock PoC)" };
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b0b0f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-zinc-100">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-[13px] font-bold text-white">V</span>
              Validation Ideas
            </Link>
            <span className="rounded-full border border-line-strong px-2.5 py-0.5 text-[11px] font-medium text-zinc-400">Mock data</span>
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">{children}</main>
        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 text-xs text-zinc-500">
            <span>PoC · no real Facebook or bot calls</span>
            <ResetButton />
          </div>
        </footer>
      </body>
    </html>
  );
}
