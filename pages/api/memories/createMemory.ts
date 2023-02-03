import { prisma } from "@/prisma/db";
import { Memory, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export type MemoryRequest = {
  title: string;
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const memoryRequest: MemoryRequest = JSON.parse(req.body);
    if (req.method === "POST") {
      try {
        // admin user
        const adminUser: User = {
          id: 1,
          email: "rotem.barsela95@gmail.com",
          name: "admin",
        };
        const memoryToCreate: Memory = await prisma.memory.create({
          data: {
            ...memoryRequest,
            userId: adminUser.id,
          },
        });

        return res.status(200).json(memoryToCreate);
      } catch (err) {
        return res
          .status(500)
          .json({ message: "Failed to create a new Memory" });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
