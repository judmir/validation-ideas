import { notFound } from "next/navigation";
import { ALL_IDEAS, findIdea } from "@/lib/mock";
import IdeaPage from "@/components/IdeaPage";

export const dynamicParams = false;
export function generateStaticParams() {
  return ALL_IDEAS.map((x) => ({ id: x.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idea = findIdea(id);
  if (!idea) notFound();
  return <IdeaPage idea={idea} />;
}
