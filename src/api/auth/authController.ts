import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import logger from "../../logger";

const router = Router();
const TOKEN_SECRET = process.env.TOKEN_SECRET || "test";

router.get("/getToken", async (req: Request, res: Response) => {
  try {
    logger.info("New token created");
    const payload = {
      id: uuidv4(),
    };
    const token = jwt.sign(payload, TOKEN_SECRET);
    res.json({ token: token });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
