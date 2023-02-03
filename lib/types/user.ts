import { Memory } from "./memory";

export type User = {
  id: number;
  email: string;
  name: string;
  posts: Memory[];
};
