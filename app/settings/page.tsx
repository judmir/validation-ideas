import SettingsView from "@/components/settings/SettingsView";

export const metadata = { title: "Settings · Validation Ideas" };

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-zinc-50 sm:text-[32px]">Settings</h1>
      <p className="mt-1 text-[15px] text-zinc-400">The rules the nightly pipeline runs by. Edits stay a draft in this browser until an admin saves them as a new version.</p>
      <div className="mt-4"><SettingsView /></div>
    </div>
  );
}
