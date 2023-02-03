"use client";

import { MemoryRequest } from "@/pages/api/memories/createMemory";
import { ChangeEvent, FormEvent, useState } from "react";

export function MemoryForm() {
  const [memoryToCreate, setMemoryToCreate] = useState<MemoryRequest>({
    title: "",
    content: "",
  });

  async function submitMemory(e: FormEvent) {
    e.preventDefault();
    const data = await fetch(`/api/memories/createMemory`, {
      method: "POST",
      body: JSON.stringify(memoryToCreate),
    });

    const res = await data.json();
    if (!res.ok) console.log(res);

    setMemoryToCreate({ content: "", title: "" });
  }

  return (
    <form onSubmit={submitMemory}>
      <div className="flex flex-col gap-5 border-2 border-gray-500/10 px-3 py-5">
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
        <pre className="w-full">{JSON.stringify(memoryToCreate, null, 2)}</pre>
        <button
          type="submit"
          className="bg-cyan-500 text-white uppercase px-2 py-3 rounded-md shadow-md disabled:cursor-not-allowed disabled:bg-cyan-800 w-full"
          disabled={
            memoryToCreate.title.length < 1 || memoryToCreate.content.length < 1
          }
        >
          Create
        </button>
      </div>
    </form>
  );
}
