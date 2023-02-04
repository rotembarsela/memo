"use client";

import { Memory } from "@prisma/client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type MemoriesProps = {
  memories: Memory[];
};

export default function Memories({ memories }: MemoriesProps) {
  const router = useRouter();
  async function handleDeleteMemory(memoryId: number) {
    const data = await fetch(`/api/memories/deleteMemory`, {
      method: "DELETE",
      body: JSON.stringify(memoryId),
    });

    router.refresh();
  }

  return (
    <div className="">
      <div className="grid grid-cols-1 md:gird-cols-5 xl:grid-cols-7 gap-5">
        {memories.map((memory) => (
          <motion.div
            whileHover={{ scale: 1.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={memory.id}
            className="border-2 border-gray-100 px-3 py-2 shadow-sm bg-white cursor-pointer"
            onClick={() => handleDeleteMemory(memory.id)}
          >
            <h2>{memory.title}</h2>
            <p>{memory.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
