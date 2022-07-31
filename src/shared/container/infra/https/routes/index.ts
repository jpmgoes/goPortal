import { Router } from "express";
import { authenticateRouter } from "./authenticate.routes";
import { passwordRouter } from "./password.routes";
import { solicitationsRouter } from "./solicitations.routes";
import { usersRouter } from "./users.routes";

const router = Router();

router.get("/", (req, res) => {
	res.json("Hello World!");
});
router.use("/users", usersRouter);
router.use(authenticateRouter);
router.use("/password", passwordRouter);
router.use("/solicitation", solicitationsRouter);

export { router };
