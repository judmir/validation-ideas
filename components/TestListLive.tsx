"use client";
import { usePersistedMany, valKey } from "@/lib/store";
import { testNumbers } from "@/lib/status";
import { TestList, type TestRow } from "./TestList";

export function TestListLive({ tests }: { tests: TestRow[] }) {
  const [vals, loaded] = usePersistedMany(tests.map((t) => valKey(t.id)), tests.map((t) => t.initial));
  return <TestList rows={tests.map((t, i) => ({ t, v: vals[i], n: testNumbers(vals[i]) }))} loaded={loaded} />;
}
