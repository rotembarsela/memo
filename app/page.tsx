import Memories from "@/components/Memories";
import { MemoryForm } from "@/components/MemoryForm";
import { Memory } from "@prisma/client";
import { notFound } from "next/navigation";

async function getMemories() {
  const res = await fetch(`${process.env.BASE_URL}/api/memories/getMemories`);
  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

export default async function Home() {
  const data: Memory[] = await getMemories();

  if (!data) {
    notFound();
  }

  return (
    <main className="flex gap-10 px-2 py-3">
      <MemoryForm />
      <Memories memories={data} />
    </main>
  );
}
