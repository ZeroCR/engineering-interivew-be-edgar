import { z } from "zod";

export enum TaskStatus {
  Todo = "To do",
  InProgress = "In Progress",
  Done = "Done",
  Archived = "Archived",
}

export const CreateTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const UpdateTaskSchema = z.object({
  id: z.string().uuidv4(),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  status: z.enum(TaskStatus).optional(),
  isArchived: z.boolean().optional(),
});

export const TaskSchema = z.object({
  id: z.string().uuidv4(),
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(TaskStatus),
  ownerId: z.string().min(1),
  isArchived: z.boolean(),
});

export type Task = z.infer<typeof TaskSchema>;

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;
