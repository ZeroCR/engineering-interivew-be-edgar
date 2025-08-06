// src/index.ts
import express, { Express, Request, Response } from "express";
import "dotenv/config";
import taskRouter from "./api/task/taskController";
import authRouter from "./api/auth/authController";
import { expressjwt, Request as JWTRequest } from "express-jwt";

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
export const app: Express = express();
const port = process.env.PORT || 3000;
const TOKEN_SECRET = process.env.TOKEN_SECRET || "test";

/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(express.json());
app.use(express.urlencoded());
app.use("/api/auth", authRouter);

// Secure endpoints
app.use(
  "/api/task",
  expressjwt({ secret: TOKEN_SECRET, algorithms: ["HS256"] }),
  taskRouter,
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
