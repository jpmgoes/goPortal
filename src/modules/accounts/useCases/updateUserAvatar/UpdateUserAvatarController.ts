import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id: user_id } = req.user;
		const avatar_file = req.file.filename;

		const updateUserAvatarUseCase = container.resolve(
			UpdateUserAvatarUseCase
		);

		await updateUserAvatarUseCase.execute({ user_id, avatar_file });
		return res.sendStatus(204);
	}
}
export { UpdateUserAvatarController };
