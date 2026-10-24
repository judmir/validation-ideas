import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ResetButton from "@/components/ResetButton";
import { SearchProvider } from "@/components/Search";
import TopBar from "@/components/TopBar";
import MockedPill from "@/components/MockedPill";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = { title: "Validation Ideas", description: "Nightly startup-research pipeline: evidence, validation and reports (mock PoC)" };
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#1b1b1e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans">
        <SearchProvider>
          <div className="flex min-h-screen flex-col">
            <TopBar />
            <main className="mx-auto w-full max-w-[1040px] flex-1 px-4 pb-12 pt-6 sm:px-6 sm:pt-8">{children}</main>
            <footer className="mx-auto flex w-full max-w-[1040px] flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 pb-6 text-[12px] text-zinc-400 sm:px-6">
              <span className="inline-flex flex-wrap items-center gap-1.5"><MockedPill /> marks made-up demo data · no real ads, payments or emails · state lives in this browser</span>
              <ResetButton />
            </footer>
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}
