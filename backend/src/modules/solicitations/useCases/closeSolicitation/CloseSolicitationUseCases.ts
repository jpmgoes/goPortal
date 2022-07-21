import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/container/errors/AppError";
import { IUsersRepository } from "../../../accounts/repositories/IUserRepository";
import { ISolicitationsRepository } from "../../repositories/ISolicitationsRepository";
import { resolve } from "path";

interface IRequest {
	id: string;
	link: string;
}

@injectable()
class CloseSolicitationUseCases {
	constructor(
		@inject("SolicitationsRepository")
		private solicitationsRepository: ISolicitationsRepository,

		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute({ id, link }: IRequest): Promise<void> {
		const solicitation = await this.solicitationsRepository.findById(id);
		if (!solicitation) throw new AppError("Solicitation does not exist!");

		const { email, name } = await this.usersRepository.findById(
			solicitation.user_id
		);

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
			link: `${link}/?token=${2}`,
		};

		if (solicitation.is_open === false) return;
		solicitation.is_open = false;
		this.solicitationsRepository.create(solicitation);
	}
}

export { CloseSolicitationUseCases };
