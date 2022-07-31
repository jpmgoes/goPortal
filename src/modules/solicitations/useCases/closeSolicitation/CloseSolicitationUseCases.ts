import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/container/errors/AppError";
import { IUsersRepository } from "../../../accounts/repositories/IUserRepository";
import { ISolicitationsRepository } from "../../repositories/ISolicitationsRepository";
import { resolve } from "path";
import { IMailProvider } from "../../../../shared/container/providers/Mail/IMailProvider";

interface IRequest {
	id: string;
	link: string;
	reply: string;
}

@injectable()
class CloseSolicitationUseCases {
	constructor(
		@inject("SolicitationsRepository")
		private solicitationsRepository: ISolicitationsRepository,

		@inject("UsersRepository")
		private usersRepository: IUsersRepository,

		@inject("MailtrapMailProvider")
		private mailtrapMailProvider: IMailProvider
	) {}

	async execute({ id, link, reply }: IRequest): Promise<void> {
		if (reply.length == 0)
			throw new AppError("Reply need to contain something");

		const solicitation = await this.solicitationsRepository.findById(id);
		if (!solicitation) throw new AppError("Solicitation does not exist!");

		const { email, name } = await this.usersRepository.findById(
			solicitation.user_id
		);

		if (solicitation.is_open === false)
			throw new AppError("Solicitation alredy closed!");

		const templatePath = resolve(
			__dirname,
			"..",
			"..",
			"views",
			"emails",
			"solicitationWasClosed.hbs"
		);

		const variables = {
			name: name,
			title: solicitation.name,
			reply,
			link: `${link}/?token=${solicitation.id}`,
		};

		solicitation.is_open = false;
		solicitation.reply = reply;
		this.solicitationsRepository.create(solicitation);

		await this.mailtrapMailProvider.sendMail(
			email,
			"Sua solicitação foi finalizada",
			variables,
			templatePath
		);
	}
}

export { CloseSolicitationUseCases };
