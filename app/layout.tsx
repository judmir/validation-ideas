import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ResetButton from "@/components/ResetButton";
import { SearchProvider } from "@/components/Search";
import { Sidebar, Topbar } from "@/components/Shell";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = { title: "Validation Ideas", description: "Scout → Validate → Report (mock PoC)" };
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#1b1b1e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans">
        <SearchProvider>
          <div className="flex min-h-screen lg:gap-3 lg:p-3">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col lg:gap-3">
              <Topbar />
              <main className="w-full flex-1 px-4 pb-8 pt-4 sm:px-6 lg:rounded-[24px] lg:bg-panel lg:p-7 xl:p-8">
                <div className="mx-auto w-full max-w-[1200px]">{children}</div>
              </main>
              <footer className="border-t border-line lg:hidden">
                <div className="flex items-center justify-between gap-3 px-4 py-4 text-xs text-faint sm:px-6">
                  <span>Mock data · no real Facebook or bot calls</span>
                  <ResetButton />
                </div>
              </footer>
            </div>
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}
