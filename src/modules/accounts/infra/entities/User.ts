import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {
	@PrimaryColumn()
	id: string;

	@Column()
	name: string;

	@Column()
	email: string;
    
    @Column()
	birthday: string;
    
    @Column()
	age: string;

	@Column()
	password: string;

	@Column()
	cpf: string;

	@Column()
	fone_number: string;

	@Column()
	profession: string;

	@Column()
	salary: string;

	@Column()
	avatar: string;

	@CreateDateColumn()
	created_at: Date;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { User };
