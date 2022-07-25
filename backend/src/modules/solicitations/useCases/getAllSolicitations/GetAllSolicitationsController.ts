import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAllSolicitationsUseCases } from "./GetAllSolicitationsUseCases";

class GetAllSolicitationsController {
	async handle(req: Request, res: Response): Promise<Response> {
		const createCateogryUseCase = container.resolve(
			GetAllSolicitationsUseCases
		);
		const list = await createCateogryUseCase.execute();
		return res.json(list);
	}
}

export { GetAllSolicitationsController };
