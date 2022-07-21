import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

class SendForgotPasswordMailController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { email, link } = req.body;
		const sendForgotPasswordMailUseCase = container.resolve(
			SendForgotPasswordMailUseCase
		);

		await sendForgotPasswordMailUseCase.execute(email, link);

		return res.sendStatus(201);
	}
}
export { SendForgotPasswordMailController };
