import { Repository } from "typeorm";
import { AppDataSource } from "../../../../shared/container/infra/typeorm/database";
import { ICreateUserTokensDTO } from "../../repositories/dtos/ICreateUserTokensDTO";
import { IUsersTokensRepository } from "../../repositories/IUserTokensRepository";
import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
	private repository: Repository<UserTokens>;

	constructor() {
		this.repository = AppDataSource.getRepository(UserTokens);
	}

	async create({
		user_id,
		refresh_token,
		expires_date,
	}: ICreateUserTokensDTO): Promise<UserTokens> {
		const userTokens = this.repository.create({
			user_id,
			refresh_token,
			expires_date,
		});
		return await this.repository.save(userTokens);
	}

	async findByUserIdAndRefreshToken(
		user_id: string,
		refresh_token: string
	): Promise<UserTokens> {
		return await this.repository.findOne({
			where: { user_id, refresh_token },
		});
	}

	async deleteById(id: string): Promise<void> {
		await this.repository.delete(id);
	}
	
	async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
		return await this.repository.findOne({ where: { refresh_token } });
	}
}

export { UsersTokensRepository };
