import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../shared/container/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUserTokensRepository";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: {
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
	token: string;
	refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository,

		@inject("UsersTokensRepository")
		private usersTokensRepository: IUsersTokensRepository,

		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider
	) {}

	async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);
		if (!user) throw new AppError("Email or password incorret!");

		const passwordMatch = await compare(password, user.password);
		if (!passwordMatch) throw new AppError("Email or password incorret!");

		const token = sign({}, auth.secret_token, {
			subject: user.id,
			expiresIn: auth.expires_in_token,
		});

		const refresh_token = sign({ email }, auth.secret_refresh_token, {
			subject: user.id,
			expiresIn: auth.expires_in_refresh_token,
		});

		const refresh_token_expires_date = this.dateProvider.addDays(
			auth.expires_refresh_token_days
		);

		await this.usersTokensRepository.create({
			expires_date: refresh_token_expires_date,
			refresh_token,
			user_id: user.id,
		});

		const tokenResponse: IResponse = {
			user: {
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
			token,
			refresh_token,
		};

		return tokenResponse;
	}
}

export { AuthenticateUserUseCase };
