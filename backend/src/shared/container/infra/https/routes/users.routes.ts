import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../../config/upload";
import { CreateUserController } from "../../../../../modules/accounts/useCases/createUser/CreateUserController";
import { ResetMailUserController } from "../../../../../modules/accounts/useCases/resetMailUser/ResetMailUserController";
import { SendChangeUserMailController } from "../../../../../modules/accounts/useCases/sendChangeUserMail/SendChangeUserMailController";
import { UpdateUserController } from "../../../../../modules/accounts/useCases/updateUser/UpdateUserController";
import { UpdateUserAvatarController } from "../../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRouter = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const updateUserControler = new UpdateUserController();
const sendChangeUserMailController = new SendChangeUserMailController();
const resetMailUserController = new ResetMailUserController();

usersRouter.post("/", createUserController.handle);

usersRouter.use(ensureAuthenticated);
usersRouter.patch(
	"/avatar",
	uploadAvatar.single("avatar"),
	updateUserAvatarController.handle
);
usersRouter.post("/update", updateUserControler.handle);

usersRouter.post("/update/email", sendChangeUserMailController.handle);
usersRouter.post("/update/email/reset", sendChangeUserMailController.handle);

export { usersRouter };
