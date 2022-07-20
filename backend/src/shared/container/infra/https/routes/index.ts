import { Router } from "express";
import { authenticateRouter } from "./authenticate.routes";
import { usersRouter } from "./users.routes";

const router = Router();

router.use("/users", usersRouter);
router.use(authenticateRouter);

export { router };
