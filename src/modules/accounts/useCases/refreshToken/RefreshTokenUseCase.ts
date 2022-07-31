import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { AppError } from "../../../../shared/container/errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IUsersTokensRepository } from "../../repositories/IUserTokensRepository";

interface IPayload {
	sub: string;
	email: string;
}

@injectable()
class RefreshTokenUseCase {
	constructor(
		@inject("UsersTokensRepository")
		private usersTokenRepository: IUsersTokensRepository,

		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider
	) {}
	async execute(token: string): Promise<string> {
		const { sub: user_id, email } = verify(
			token,
			auth.secret_refresh_token
		) as IPayload;

		const userToken =
			await this.usersTokenRepository.findByUserIdAndRefreshToken(
				user_id,
				token
			);
		if (!userToken) throw new AppError("Refresh Token does not exists!");

		await this.usersTokenRepository.deleteById(userToken.id);

		const expires_date = this.dateProvider.addDays(
			auth.expires_refresh_token_days
		);

		const refresh_token = sign({ email }, auth.secret_refresh_token, {
			subject: user_id,
			expiresIn: auth.expires_in_refresh_token,
		});

		await this.usersTokenRepository.create({
			user_id,
			refresh_token,
			expires_date,
		});

		return refresh_token;
	}
}

export { RefreshTokenUseCase };
