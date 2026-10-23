import ScoutList from "@/components/ScoutList";

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[32px]">Scouts</h1>
        <p className="mt-1 text-[15px] text-zinc-400">Every idea the App Ideas bot is scouting, testing or has reported on.</p>
      </div>
      <ScoutList />
    </div>
  );
}
