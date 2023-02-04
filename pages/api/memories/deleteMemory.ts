import { prisma } from "@/prisma/db";
import type { NextApiRequest, NextApiResponse } from "next";

export type MemoryDeleteRequest = {
  memoryId: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const memoryRequest: MemoryDeleteRequest = JSON.parse(req.body);
    console.log(memoryRequest);
    if (req.method === "DELETE") {
      try {
        const memoryToDelete = await prisma.$transaction([
          prisma.memory.deleteMany({
            where: {
              id: memoryRequest.memoryId,
            },
          }),
        ]);
        console.log({ memoryToDelete });

        return res.status(204).json(memoryToDelete);
      } catch (err) {
        return res
          .status(500)
          .json({ message: "Failed to delete that memory" });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
