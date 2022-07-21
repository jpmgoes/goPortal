import { injectable, inject } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { resolve } from "path";
import { IUsersTokensRepository } from "../../repositories/IUserTokensRepository";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/Mail/IMailProvider";
import { v4 as uuid } from "uuid";

@injectable()
class SendChangeUserMailUseCase {
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
	async execute(user_id: string, link: string): Promise<void> {
		const user = await this.usersRepository.findById(user_id);
		const token = uuid();
		await this.usersTokensRepository.create({
			refresh_token: token,
			user_id,
			expires_date: this.dateProvider.addHours(3),
		});

		const templatePath = resolve(
			__dirname,
			"..",
			"..",
			"views",
			"emails",
			"changeEmail.hbs"
		);

		const variables = {
			name: user.name,
			link: `${link}/?token=${token}`,
		};

		await this.mailtrapMailProvider.sendMail(
			user.email,
			"Mudar Email",
			variables,
			templatePath
		);
	}
}
export { SendChangeUserMailUseCase };
