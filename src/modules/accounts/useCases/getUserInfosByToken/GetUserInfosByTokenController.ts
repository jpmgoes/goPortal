import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUserInfosByTokenUseCase } from "./GetUserInfosByTokenUseCase";

class GetUserInfosByTokenController {
	async handle(req: Request, res: Response): Promise<Response> {
		const getUserInfosByTokenUseCase = container.resolve(
			GetUserInfosByTokenUseCase
		);
		const token = await getUserInfosByTokenUseCase.execute(req.user.id);
		return res.json(token);
	}
}

export { GetUserInfosByTokenController };
