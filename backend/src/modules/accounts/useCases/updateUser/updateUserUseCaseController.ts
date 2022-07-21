import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./updateUserUseCase";

class UpdateUserControler {
	async handle(req: Request, res: Response): Promise<Response> {
		const { name, profession, salary, fone_number, password } = req.body;
		const updateUserUseCase = container.resolve(UpdateUserUseCase);

		await updateUserUseCase.execute({
			user_id: req.user.id,
			name,
			password,
			profession,
			salary,
			fone_number,
		});

		return res.sendStatus(201);
	}
}
export { UpdateUserControler };
