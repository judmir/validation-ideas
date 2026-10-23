import { notFound } from "next/navigation";
import { ALL_IDEAS, findIdea } from "@/lib/data";
import IdeaFlow from "@/components/IdeaFlow";

export const dynamicParams = false;
export function generateStaticParams() {
  return ALL_IDEAS.filter((x) => x.rank === 1).map((x) => ({ id: x.idea.id }));
}

export default async function IdeaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = findIdea(id);
  if (!found || found.rank !== 1) notFound();
  return <IdeaFlow id={id} />;
}
