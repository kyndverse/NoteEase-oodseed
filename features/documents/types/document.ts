import { PartialBlock } from "@blocknote/core";

export type Document = {
  id: string;
  title: string;
  content: PartialBlock[];
  createdAt: string;
  updatedAt: string;
};
