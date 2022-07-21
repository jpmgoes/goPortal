import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../../config/upload";
import { CreateUserController } from "../../../../../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserControler } from "../../../../../modules/accounts/useCases/updateUser/updateUserUseCaseController";
import { UpdateUserAvatarController } from "../../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRouter = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const updateUserControler = new UpdateUserControler();
usersRouter.post("/", createUserController.handle);

usersRouter.use(ensureAuthenticated);
usersRouter.patch(
	"/avatar",
	uploadAvatar.single("avatar"),
	updateUserAvatarController.handle
);
usersRouter.post("/update", updateUserControler.handle);
export { usersRouter };
