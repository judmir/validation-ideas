import { notFound } from "next/navigation";
import { ALL_IDEAS, NIGHTS, briefOf, findIdea, homeNight, nightIdeas } from "@/lib/mock";
import IdeaPage, { type RunInfo } from "@/components/IdeaPage";

export const dynamicParams = false;
export function generateStaticParams() {
  return ALL_IDEAS.map((x) => ({ id: x.painId }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idea = findIdea(id);
  if (!idea) notFound();
  // A pain pitched again on a later night (p-073: ReelRecipe 22 Oct → Cardbox 25 Oct) is shown as of that night.
  const n = NIGHTS.find((x) => x.date === homeNight(idea)) ?? NIGHTS.find((x) => x.date === idea.night)!;
  const b = briefOf(n.date);
  const run: RunInfo = {
    date: n.date, label: n.label ?? null, note: n.note ?? null,
    // The night's winner, including a "Fallback (below bar)" winner. The mocked DinnerList demo is not a real winner.
    winner: !idea.demo && (n.builder.winnerPainId === idea.painId || idea.verdict === "winner" || idea.fallback),
    line: `${n.scout.complaints} complaints + ${n.scout.provenModels} proven models · ${n.niches.join(" + ")} · ${n.analyst.survivors} survivors${n.builder.winnerPainId ? "" : ", no winner"}.`,
    ideas: nightIdeas(n.date).map((i) => ({ id: i.painId, title: i.name ?? i.label ?? i.painId, score: i.scores.total })),
    actions: b?.winnerPainId === idea.painId ? { date: n.date, demo: !!b.demo, validation: !!b.validation } : null,
    role: b?.ideas.find((x) => x.painId === idea.painId)?.role ?? null,
  };
  return <IdeaPage idea={idea} run={run} />;
}
