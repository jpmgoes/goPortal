import { Router } from "express";
import { CloseSolicitationController } from "../../../../../modules/solicitations/useCases/closeSolicitation/CloseSolicitationController";
import { CreateSolicitationController } from "../../../../../modules/solicitations/useCases/createSolicitation/CreateSolicitationController";
import { ListSolicitationsController } from "../../../../../modules/solicitations/useCases/listSolicitations/ListSolicitationsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const solicitationsRouter = Router();

const createUserSpecificationController = new CreateSolicitationController();
const listSpecificationController = new ListSolicitationsController();
const closeSolicitationController = new CloseSolicitationController();

solicitationsRouter.use(ensureAuthenticated);

solicitationsRouter.post("/", createUserSpecificationController.handle);
solicitationsRouter.get("/", listSpecificationController.handle);
solicitationsRouter.post("/close", closeSolicitationController.handle);

export { solicitationsRouter };
