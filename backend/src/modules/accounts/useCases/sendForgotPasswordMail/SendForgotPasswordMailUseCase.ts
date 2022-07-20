import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../shared/container/errors/AppError";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { IUsersTokensRepository } from "../../repositories/IUserTokensRepository";
import { v4 as uuid } from "uuid";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { resolve } from "path";
import { IMailProvider } from "../../../../shared/container/providers/Mail/IMailProvider";

@injectable()
class SendForgotPasswordMailUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository,

		@inject("UsersTokensRepository")
		private usersTokensRepository: IUsersTokensRepository,

		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider,

		@inject("MailtrapMailProvider")
		private mailtrapMailProvider: IMailProvider
	) {}
	async execute(email: string): Promise<void> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) throw new AppError("User does not exist!");
		const token = uuid();

		await this.usersTokensRepository.create({
			refresh_token: token,
			user_id: user.id,
			expires_date: this.dateProvider.addHours(3),
		});

		const templatePath = resolve(
			__dirname,
			"..",
			"..",
			"views",
			"emails",
			"forgotPassword.hbs"
		);

		const variables = {
			name: user.name,
			link: `http://localhost:3333/password/reset?token=${token}`,
		};

		await this.mailtrapMailProvider.sendMail(
			email,
			"Recuperação de senha",
			variables,
			templatePath
		);
	}
}
export { SendForgotPasswordMailUseCase };
