import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/container/errors/AppError";
import { ISolicitationsRepository } from "../../repositories/ISolicitationsRepository";

interface IRequest {
	id: string;
}

@injectable()
class CloseSolicitationUseCases {
	constructor(
		@inject("SolicitationsRepository")
		private solicitationsRepository: ISolicitationsRepository
	) {}

	async execute({ id }: IRequest): Promise<void> {
		const solicitation = await this.solicitationsRepository.findById(id);
		if (!solicitation) throw new AppError("Solicitation does not exist!");

		solicitation.is_open = false;
		this.solicitationsRepository.create(solicitation);
	}
}

export { CloseSolicitationUseCases };
