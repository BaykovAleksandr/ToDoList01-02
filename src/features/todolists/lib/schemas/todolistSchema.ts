import { z } from "zod/v4";


export const todolistSchema = z.object({
  title: z.string(),
  id: z.string(),
  addedDate: z.iso.datetime({ local: true }),
  order: z.number()
});

export type Todolist = z.infer<typeof todolistSchema>;
