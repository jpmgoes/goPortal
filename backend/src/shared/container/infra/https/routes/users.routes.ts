import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../../config/upload";
import { CreateUserController } from "../../../../../modules/accounts/useCases/createUser/CreateUserController";
import { GetUserInfosByTokenController } from "../../../../../modules/accounts/useCases/getUserInfosByToken/GetUserInfosByTokenController";
import { UpdateUserController } from "../../../../../modules/accounts/useCases/updateUser/UpdateUserController";
import { UpdateUserAvatarController } from "../../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRouter = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const updateUserControler = new UpdateUserController();
const getUserInfosByTokenController = new GetUserInfosByTokenController();

usersRouter.post("/", createUserController.handle);

usersRouter.use(ensureAuthenticated);
usersRouter.patch(
	"/avatar",
	uploadAvatar.single("avatar"),
	updateUserAvatarController.handle
);
usersRouter.put("/update", updateUserControler.handle);

usersRouter.get("/", getUserInfosByTokenController.handle);
export { usersRouter };
