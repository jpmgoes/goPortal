import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { AppError } from "../../../../shared/container/errors/AppError";

interface IResponse {
	user: {
		id: string;
		name: string;
		email: string;
		birthday: string;
		age: string;
		cpf: string;
		fone_number: string;
		profession: string;
		salary: string;
		avatar: string;
	};
}

@injectable()
class GetUserInfosByTokenUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute(user_id: string): Promise<IResponse> {
		const user = await this.usersRepository.findById(user_id);
		if (!user) throw new AppError("User not found!");

		const tokenResponse: IResponse = {
			user: {
				id: user_id,
				name: user.name,
				email: user.email,
				cpf: user.cpf,
				birthday: user.birthday,
				age: user.age,
				profession: user.profession,
				avatar: `http://localhost:3333/tmp/avatar/${user.avatar}`,
				salary: user.salary,
				fone_number: user.fone_number,
			},
		};

		return tokenResponse;
	}
}

export { GetUserInfosByTokenUseCase };
