import { hash } from "bcrypt";
import { injectable, inject } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUserRepository";

interface IRequest {
	user_id: string;
	name: string;
	password: string;
	fone_number: string;
	profession: string;
	salary: string;
}

@injectable()
class UpdateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}
	async execute(data: IRequest): Promise<void> {
		const user = await this.usersRepository.findById(data.user_id);
		for (let key in user) {
			for (let reqKey in data) {
				if (key === reqKey) {
					if (data[reqKey]) {
						if (key === "password") {
							user.password = await hash(data[reqKey], 8);
						} else user[key] = data[reqKey];
					}
				}
			}
		}
		await this.usersRepository.create(user);
	}
}
export { UpdateUserUseCase };
