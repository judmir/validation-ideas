import { notFound } from "next/navigation";
import { ALL_IDEAS, findIdea } from "@/lib/data";
import CreateIdea from "@/components/CreateIdea";

export const dynamicParams = false;
export function generateStaticParams() {
  return ALL_IDEAS.filter((x) => x.rank !== 1).map((x) => ({ id: x.idea.id }));
}

export default async function CreatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = findIdea(id);
  if (!found || found.rank === 1) notFound();
  return <CreateIdea id={id} />;
}
