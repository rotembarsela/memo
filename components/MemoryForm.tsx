"use client";

import { MemoryRequest } from "@/pages/api/memories/createMemory";
import { ChangeEvent, FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedButton } from "@/lib/utils/framer/buttons";
import { useRouter } from "next/navigation";

export function MemoryForm() {
  const router = useRouter();
  const [memoryToCreate, setMemoryToCreate] = useState<MemoryRequest>({
    title: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function submitMemory(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    const data = await fetch(`/api/memories/createMemory`, {
      method: "POST",
      body: JSON.stringify(memoryToCreate),
    });

    const res = await data.json();
    if (!res.ok) console.log(res);

    router.refresh();
    setIsLoading(false);
    setMemoryToCreate({ content: "", title: "" });
  }

  return (
    <form onSubmit={submitMemory}>
      <motion.div className="flex flex-col gap-5 border-2 border-gray-500/10 px-3 py-5">
        <h3 className="uppercase text-xl">Create a new Memory</h3>
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="memoryTitle">Memory Title</label>
          <input
            id="memoryTitle"
            name="title"
            value={memoryToCreate.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMemoryToCreate({ ...memoryToCreate, title: e.target.value })
            }
            className="border-2 border-gray-500 outline-none px-3 py-2 w-full"
          />
        </div>
        {/* Content */}
        <div className="flex flex-col">
          <label htmlFor="memoryContent">Memory Content</label>
          <textarea
            cols={2}
            name="content"
            value={memoryToCreate.content}
            id="memoryContent"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setMemoryToCreate({ ...memoryToCreate, content: e.target.value })
            }
            className="border-2 border-gray-500 outline-none px-3 py-2 w-full"
          />
        </div>
        <AnimatedButton
          type="submit"
          disabled={
            memoryToCreate.title.length < 1 ||
            memoryToCreate.content.length < 1 ||
            isLoading
          }
        >
          Create
        </AnimatedButton>
      </motion.div>
    </form>
  );
}
