"use client";
// Where pipeline settings are read from and saved to.
// - "supabase": NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY (publishable key) set at build time.
//   Reads happen in the browser at runtime (pipeline_settings_latest + pipeline_settings_versions), so the
//   live site shows the latest saved version without a rebuild. Saves insert version+1; RLS allows that only
//   for admins. Sign-in is a Supabase email magic link.
// - "local": NEXT_PUBLIC_SETTINGS_LOCAL=1, dev/test only, never set in the Pages build. Fakes an admin
//   session and keeps versions in localStorage.
// - "offline": no env. Read-only with config/pipeline-settings.json.
// Any read error falls back to the JSON. No service-role key or token is ever used here.
import type { SupabaseClient } from "@supabase/supabase-js";
import { SEED, type PipelineSettings } from "./settings";

export type StoreMode = "supabase" | "local" | "offline";
export type SettingsVersion = { version: number; settings: PipelineSettings; note: string | null; created_at: string };
export type Viewer = { signedIn: false } | { signedIn: true; email: string };
export class SaveError extends Error {
  constructor(public kind: "not-admin" | "conflict" | "signed-out" | "other", message: string) { super(message); }
}

const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const LOCAL = process.env.NEXT_PUBLIC_SETTINGS_LOCAL === "1";
export const MODE: StoreMode = LOCAL ? "local" : URL_ && KEY ? "supabase" : "offline";

/** The offline fallback: config/pipeline-settings.json mirrors live version 4. */
export const SEED_VERSION: SettingsVersion = { version: 4, settings: SEED, note: "Judi 2026-10-25: whole chain ready by 06:00; video is the last step of the final report", created_at: "2026-10-24T22:03:49.657066+00:00" };

let client: Promise<SupabaseClient> | null = null;
function sb() {
  client ??= import("@supabase/supabase-js").then(({ createClient }) => createClient(URL_, KEY, { auth: { persistSession: true, detectSessionInUrl: true } }));
  return client;
}

/* ---------- local test mode ---------- */
const LOCAL_KEY = "vi:settings-local-versions:v1";
function localRead(): SettingsVersion[] {
  try { const v = JSON.parse(localStorage.getItem(LOCAL_KEY) ?? "null"); if (Array.isArray(v) && v.length) return v; } catch { /* reseed */ }
  return [SEED_VERSION];
}
export function resetLocal() { if (MODE === "local") localStorage.removeItem(LOCAL_KEY); }

/** Versions newest first (history list; [0] is current). Falls back to the JSON on any error. */
export async function loadVersions(): Promise<{ versions: SettingsVersion[]; error: string | null }> {
  if (MODE === "offline") return { versions: [SEED_VERSION], error: null };
  if (MODE === "local") return { versions: [...localRead()].sort((a, b) => b.version - a.version), error: null };
  try {
    const s = await sb();
    const [latest, hist] = await Promise.all([
      s.from("pipeline_settings_latest").select("version, settings, note, created_at").maybeSingle(),
      s.from("pipeline_settings_versions").select("version, settings, note, created_at").order("version", { ascending: false }).limit(30),
    ]);
    if (latest.error) throw latest.error;
    if (hist.error) throw hist.error;
    const versions = (hist.data ?? []) as SettingsVersion[];
    const cur = latest.data as SettingsVersion | null;
    if (cur && !versions.some((v) => v.version === cur.version)) versions.unshift(cur);
    return versions.length ? { versions, error: null } : { versions: [SEED_VERSION], error: "No saved versions yet; showing the defaults." };
  } catch (e) {
    return { versions: [SEED_VERSION], error: `Couldn't load saved settings (${e instanceof Error ? e.message : String(e)}). Showing the defaults.` };
  }
}

export async function loadViewer(): Promise<Viewer> {
  if (MODE === "local") return { signedIn: true, email: "local-test@example.invalid" };
  if (MODE === "offline") return { signedIn: false };
  try {
    const { data } = await (await sb()).auth.getSession();
    const u = data.session?.user;
    return u ? { signedIn: true, email: u.email ?? "signed in" } : { signedIn: false };
  } catch { return { signedIn: false }; }
}

/** Magic-link redirect: the Pages URL for the deployed site, the current origin for local builds. */
export function redirectUrl() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return window.location.hostname === "judmir.github.io" ? "https://judmir.github.io/validation-ideas/settings/" : `${window.location.origin}${base}/settings/`;
}
export async function sendMagicLink(email: string) {
  if (MODE !== "supabase") return;
  const { error } = await (await sb()).auth.signInWithOtp({ email, options: { emailRedirectTo: redirectUrl(), shouldCreateUser: true } });
  if (error) throw new Error(error.message);
}
export async function signOut() { if (MODE === "supabase") await (await sb()).auth.signOut(); }

/** Insert version latest+1 with the full settings object and a note. */
export async function saveVersion(settings: PipelineSettings, latest: number, note: string): Promise<void> {
  const version = latest + 1;
  if (MODE === "local") {
    const all = localRead();
    if (all.some((v) => v.version === version)) throw new SaveError("conflict", "Someone saved a newer version.");
    localStorage.setItem(LOCAL_KEY, JSON.stringify([...all, { version, settings, note, created_at: new Date().toISOString() }]));
    return;
  }
  if (MODE !== "supabase") throw new SaveError("other", "Not connected");
  const s = await sb();
  const { data } = await s.auth.getSession();
  if (!data.session) throw new SaveError("signed-out", "Sign in first.");
  const { error } = await s.from("pipeline_settings_versions").insert({ version, settings, note });
  if (!error) return;
  if (error.code === "23505") throw new SaveError("conflict", "A newer version was saved meanwhile.");
  if (error.code === "42501" || /row-level security|permission denied/i.test(error.message)) throw new SaveError("not-admin", "Signed in, but not an admin yet.");
  throw new SaveError("other", error.message);
}
