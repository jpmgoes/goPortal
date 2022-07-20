import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../repositories/dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { hash } from "bcrypt";
import { AppError } from "../../../../shared/container/errors/AppError";

@injectable()
class CreateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}
	async execute(data: ICreateUserDTO): Promise<void> {
		const userAlredyExist = await this.usersRepository.findByEmail(
			data.email
		);

		if (userAlredyExist) throw new AppError("User Alredy Exist");

		const passwordHash = await hash(data.password, 8);
		data.password = passwordHash;
		await this.usersRepository.create(data);
	}
}

export { CreateUserUseCase };
