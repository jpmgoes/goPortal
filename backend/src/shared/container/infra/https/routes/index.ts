import { Router } from "express";
import { authenticateRouter } from "./authenticate.routes";
import { passwordRouter } from "./password.routes";
import { usersRouter } from "./users.routes";

const router = Router();

router.use("/users", usersRouter);
router.use(authenticateRouter);
router.use("/password", passwordRouter)
router.use("/solicitation", passwordRouter)

export { router };
