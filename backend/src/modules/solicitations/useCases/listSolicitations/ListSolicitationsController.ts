import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSolicitationsUseCase } from "./ListSolicitationsUseCase";

class ListSolicitationsController {
	async handle(req: Request, res: Response): Promise<Response> {
		const listSolicitationsUseCase = container.resolve(
			ListSolicitationsUseCase
		);
		const user_id = req.user.id;
		const solicitations = await listSolicitationsUseCase.execute(user_id);
		return res.json(solicitations);
	}
}

export { ListSolicitationsController };
