import { inject, injectable } from "tsyringe";
import { Solicitations } from "../../infra/entities/Solicitations";
import { ISolicitationsRepository } from "../../repositories/ISolicitationsRepository";

@injectable()
class GetAllSolicitationsUseCases {
	constructor(
		@inject("SolicitationsRepository")
		private solicitationsRepository: ISolicitationsRepository
	) {}

	async execute(): Promise<Solicitations[]> {
		return await this.solicitationsRepository.listAll();
	}
}

export { GetAllSolicitationsUseCases };
