import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendChangeUserMailUseCase } from "./SendChangeUserMailUseCase";

class SendChangeUserMailController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { link } = req.body;
		const updateUserUseCase = container.resolve(SendChangeUserMailUseCase);
		await updateUserUseCase.execute(req.user.id, link);
		return res.sendStatus(201);
	}
}
export { SendChangeUserMailController };
