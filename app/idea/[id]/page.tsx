import { notFound } from "next/navigation";
import { ALL_IDEAS, NIGHTS, findIdea, ideasOfNight } from "@/lib/mock";
import IdeaPage, { type RunInfo } from "@/components/IdeaPage";

export const dynamicParams = false;
export function generateStaticParams() {
  return ALL_IDEAS.map((x) => ({ id: x.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idea = findIdea(id);
  if (!idea) notFound();
  const n = NIGHTS.find((x) => x.date === idea.night)!;
  const run: RunInfo = { date: n.date, summary: n.summary, notes: n.notes, ideas: ideasOfNight(n.date).map((i) => ({ id: i.id, name: i.name, score: i.scores.total, rationale: i.rationale })) };
  return <IdeaPage idea={idea} run={run} />;
}
