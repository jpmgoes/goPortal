import { inject, injectable } from "tsyringe";
import { ISolicitationsRepository } from "../../repositories/ISolicitationsRepository";

interface IRequest {
	name: string;
	description: string;
	user_id: string;
}

@injectable()
class CreateSolicitationUseCase {
	constructor(
		@inject("SolicitationsRepository")
		private solicitationsRepository: ISolicitationsRepository
	) {}

	async execute({ name, description, user_id }: IRequest): Promise<void> {
		this.solicitationsRepository.create({ name, description, user_id });
	}
}

export { CreateSolicitationUseCase };
