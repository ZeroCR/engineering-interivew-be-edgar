import { v4 as uuidv4 } from "uuid";

import {
  CreateTaskInput,
  UpdateTaskInput,
  Task,
  TaskStatus,
} from "./taskSchemas";
import logger from "../../logger";

let tasks: Task[] = [];

export const createTask = (userId: string, task: CreateTaskInput): Task => {
  const newTask = {
    id: uuidv4(),
    status: TaskStatus.Todo,
    ownerId: userId,
    isArchived: false,
    ...task,
  };

  tasks.push(newTask);

  return newTask;
};

export const getAllTasks = (
  userId: string,
  includeArchived: boolean = false,
) => {
  return tasks.filter(
    (task) => task.ownerId === userId && task.isArchived === includeArchived,
  );
};

export const getTaskById = (userId: string, taskId: string) => {
  return tasks.find((task) => task.id === taskId && task.ownerId === userId);
};

export const updateTask = (userId: string, taskToUpdate: UpdateTaskInput) => {
  logger.info(`updateTask: ${userId} - ${taskToUpdate.id}`);
  const currentIndex = tasks.findIndex(
    (task) => task.id === taskToUpdate.id && task.ownerId === userId,
  );
  if (currentIndex === -1) {
    throw Error("Not Found");
  }
  const currentTask = tasks[currentIndex];
  tasks = [
    ...tasks.slice(0, currentIndex),
    {
      ...currentTask,
      ...taskToUpdate,
    },
    ...tasks.slice(currentIndex + 1, tasks.length),
  ];
  return tasks[currentIndex];
};
