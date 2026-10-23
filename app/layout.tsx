import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ResetButton from "@/components/ResetButton";
import { Sidebar, Topbar } from "@/components/Shell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = { title: "Validation Ideas", description: "Scout → Validate → Report (mock PoC)" };
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0a0a0a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen font-sans">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-7">{children}</main>
          <footer className="border-t border-line lg:hidden">
            <div className="flex items-center justify-between px-4 py-4 text-xs text-zinc-500 sm:px-6">
              <span>PoC · no real Facebook or bot calls</span>
              <ResetButton />
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
