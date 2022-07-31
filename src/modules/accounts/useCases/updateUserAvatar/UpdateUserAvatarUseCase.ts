import { IUsersRepository } from "../../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/file";

interface IRequest {
	user_id: string;
	avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
	constructor(
		@inject("UsersRepository")
		private userRespository: IUsersRepository
	) {}
	async execute({ user_id, avatar_file }: IRequest): Promise<void> {
		const user = await this.userRespository.findById(user_id);
		if (user.avatar) await deleteFile(`./tmp/avatar/${user.avatar}`);
		user.avatar = avatar_file;
		// update
		await this.userRespository.create(user);
	}
}
export { UpdateUserAvatarUseCase };
