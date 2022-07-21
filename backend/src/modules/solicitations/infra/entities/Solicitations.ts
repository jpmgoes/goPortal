import { v4 as uuid } from "uuid";
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
} from "typeorm";

@Entity("specifications")
class Solicitations {
	@PrimaryColumn()
	public id?: string;

	@Column()
	public name: string;

	@Column()
	public description: string;

	@Column()
	public reply: string;

	@Column()
	public is_open: boolean;

	@Column()
	public user_id: string;

	@CreateDateColumn()
	public created_at?: Date;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { Solicitations };
