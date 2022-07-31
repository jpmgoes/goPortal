import { NextFunction, request, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import auth from "../../../../../config/auth";
import { UsersTokensRepository } from "../../../../../modules/accounts/infra/repositories/UsersTokensRepository";

interface IPayLoad {
	sub: string;
}

export async function ensureAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authHeader = req.headers.authorization;
	const usersTokensRepository = new UsersTokensRepository();

	if (!authHeader) throw new AppError("Token Missing", 401);

	const token = authHeader.split(" ")[1];
	try {
		const { sub: user_id } = verify(
			token,
			auth.secret_refresh_token
		) as IPayLoad;

		const user = await usersTokensRepository.findByUserIdAndRefreshToken(
			user_id,
			token
		);
		if (!user) throw new AppError("User does not exist!", 401);
		request.user = { id: user_id };
		next();
	} catch {
		throw new AppError("Invalid Token!", 401);
	}
}
