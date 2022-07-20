import { UserTokens } from "../infra/entities/UserTokens";
import { ICreateUserTokensDTO } from "./dtos/ICreateUserTokensDTO";

interface IUsersTokensRepository {
	create({
		user_id,
		refresh_token,
		expires_date,
	}: ICreateUserTokensDTO): Promise<UserTokens>;
	findByUserIdAndRefreshToken(
		user_id: string,
		refresh_token: string
	): Promise<UserTokens>;
	deleteById(id: string): Promise<void>;
	findByRefreshToken(token: string): Promise<UserTokens>;
}
export { IUsersTokensRepository };
