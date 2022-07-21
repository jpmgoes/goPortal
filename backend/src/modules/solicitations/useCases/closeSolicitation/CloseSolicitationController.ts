import { Request, Response } from "express";
import { container } from "tsyringe";
import { CloseSolicitationUseCases } from "./CloseSolicitationUseCases";

class CloseSolicitationController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.body;
		const createCateogryUseCase = container.resolve(
			CloseSolicitationUseCases
		);
		await createCateogryUseCase.execute(id);
		return res.send();
	}
}

export { CloseSolicitationController };
