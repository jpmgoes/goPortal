import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/container/errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { IUsersTokensRepository } from "../../repositories/IUserTokensRepository";

interface IRequest {
	token: string;
	email: string;
}

@injectable()
class ResetMailUserUseCase {
	constructor(
		@inject("UsersTokensRepository")
		private usersTokensRepository: IUsersTokensRepository,

		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider,

		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}
	async execute({ token, email }: IRequest) {
		const userToken = await this.usersTokensRepository.findByRefreshToken(
			token
		);
		if (!userToken) throw new AppError("Token invalid!");

		const start_date = userToken.expires_date;
		const end_date = this.dateProvider.dateNow();
		if (this.dateProvider.compareIfBefore(start_date, end_date))
			throw new AppError("Token expired!");

		const user = await this.usersRepository.findById(userToken.user_id);
		user.email = email;

		await this.usersRepository.create(user);
		await this.usersTokensRepository.deleteById(userToken.id);
	}
}
export { ResetMailUserUseCase };
