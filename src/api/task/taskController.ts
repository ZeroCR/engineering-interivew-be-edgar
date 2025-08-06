"use strict";
import { Router, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import validate from "express-zod-safe";
import { z } from "zod";
import logger from "../../logger";

import { CreateTaskSchema, UpdateTaskSchema } from "./taskSchemas";
import {
  getAllTasks,
  createTask,
  updateTask,
  getTaskById,
} from "./taskService";

const router = Router();

router.get(
  "/",
  validate({ query: { includeArchived: z.string().optional() } }),
  (req: JWTRequest<{ id: string }>, res: Response) => {
    try {
      logger.info(`Getting all tasks`);
      const users = getAllTasks(
        req.auth!.id,
        req.query.includeArchived === "true",
      );
      res.json(users);
    } catch (err) {
      logger.error(`${req.path} - ${err}`);
      res.status(500).json({ error: err });
    }
  },
);

router.post(
  "/",
  validate({ body: CreateTaskSchema }),
  (req: JWTRequest<{ id: string }>, res: Response) => {
    try {
      logger.info(`Creating task`);
      const taskCreated = createTask(req.auth!.id, req.body);
      res.json(taskCreated);
    } catch (err) {
      logger.error(`${req.path} - ${err}`);
      res.status(500).json({ error: err });
    }
  },
);

router.get(
  "/:taskId",
  validate({ params: { taskId: z.string() } }),
  (req: JWTRequest<{ id: string }>, res: Response) => {
    try {
      logger.info(`Getting task ${req.params.taskId}`);
      const task = getTaskById(req.auth!.id, req.params.taskId);
      if (!task) {
        throw Error("Not Found");
      }
      res.json(task);
    } catch (err) {
      logger.error(`${req.path} - ${err}`);
      res.status(404).json({ error: err });
    }
  },
);

router.put(
  "/:taskId",
  validate({ body: UpdateTaskSchema, params: { taskId: z.string() } }),
  (req: JWTRequest<{ id: string }>, res: Response) => {
    try {
      logger.info(`Updating task ${req.body.id}`);
      const task = updateTask(req.auth!.id, req.body);
      res.json(task);
    } catch (err) {
      logger.error(`${req.path} - ${err}`);
      res.status(404).json({ error: err });
    }
  },
);

export default router;
