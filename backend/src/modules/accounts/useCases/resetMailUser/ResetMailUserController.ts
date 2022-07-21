import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetMailUserUseCase } from "./ResetMailUserUseCase";

class ResetMailUserController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { token } = req.query;
		const { email } = req.body;
		const resetPasswordUserUseCase = container.resolve(
			ResetMailUserUseCase
		);
		await resetPasswordUserUseCase.execute({
			token: String(token),
			email,
		});
		return res.send();
	}
}
export { ResetMailUserController };
