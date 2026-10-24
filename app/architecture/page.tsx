import ArchitectureView from "@/components/architecture/ArchitectureView";
import { StatCell } from "@/components/ui";
import { NODES } from "@/lib/architecture";

export const metadata = { title: "Architecture · Validation Ideas" };

export default function ArchitecturePage() {
  const count = (s: string) => NODES.filter((n) => n.status === s).length;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[32px]">Architecture</h1>
        <p className="mt-1 text-[15px] text-zinc-400">How the nightly pipeline fits together, and how it has changed.</p>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCell label="Active" value={count("active")} unit="running" />
        <StatCell label="Paused" value={count("paused")} unit="German scout" />
        <StatCell label="Proposed" value={count("proposed")} unit="validation loop" />
        <StatCell label="Winning bar" value={18} unit="/ 25" />
      </div>
      <ArchitectureView />
    </div>
  );
}
