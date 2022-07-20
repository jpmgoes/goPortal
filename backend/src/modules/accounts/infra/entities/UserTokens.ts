import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users_tokens")
class UserTokens {
	@PrimaryColumn()
	id: string;

	@Column()
	refresh_token: string;

	@Column()
	user_id: string;

	@CreateDateColumn()
	expires_date: Date;

	@CreateDateColumn()
	created_at: Date;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { UserTokens };
