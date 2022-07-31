import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
	async handle(req: Request, res: Response): Promise<Response> {
		const data = req.body;
		const createUserUseCase = container.resolve(CreateUserUseCase);
		await createUserUseCase.execute(data);
		return res.sendStatus(201);
	}
}

export { CreateUserController };
