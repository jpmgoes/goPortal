import { Router } from "express";
import { ResetPasswordUserController } from "../../../../../modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "../../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRouter = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRouter.post("/forgot", sendForgotPasswordMailController.handle);
passwordRouter.post("/reset", resetPasswordUserController.handle);

export { passwordRouter };
