import { MemoryForm } from "@/components/MemoryForm";
import { Memory } from "@prisma/client";

async function getMemories() {
  const res = await fetch(`${process.env.BASE_URL}/api/memories/getMemories`);
  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

export default async function Home() {
  const data: Memory[] = await getMemories();
  console.log(data);

  return (
    <main className="flex gap-10 px-2 py-3">
      <MemoryForm />
      {/*}
      <button className="py-3 px-5 bg-cyan-500 text-white font-medium rounded-md">
        Get Memories
      </button>
  */}
      <div className="py-5">
        <h3 className="uppercase text-xl underline">Memories:</h3>
        {data.map((memory) => (
          <div key={memory.id}>{memory.title}</div>
        ))}
      </div>
    </main>
  );
}