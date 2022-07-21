import { inject, injectable } from "tsyringe";
import { Solicitations } from "../../infra/entities/Solicitations";
import { ISolicitationsRepository } from "../../repositories/ISolicitationsRepository";

@injectable()
class ListSolicitationsUseCase {
	constructor(
		@inject("SolicitationsRepository")
		private solicitationsRepository: ISolicitationsRepository
	) {}
	async execute(user_id: string): Promise<Solicitations[]> {
		const solicitations = await this.solicitationsRepository.list(user_id);
		return solicitations;
	}
}

export { ListSolicitationsUseCase };
