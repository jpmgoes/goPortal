import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSolicitationUseCase } from "./CreateSolicitationUseCase";

class CreateSolicitationController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { name, description } = req.body;
		const user_id = req.user.id;

		const createSolicitationUseCase = container.resolve(
			CreateSolicitationUseCase
		);

		await createSolicitationUseCase.execute({ name, description, user_id });
		return res.send();
	}
}

export { CreateSolicitationController };
