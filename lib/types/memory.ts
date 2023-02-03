import { User } from "./user";

export type Memory = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  user: User;
  userId: number;
};
