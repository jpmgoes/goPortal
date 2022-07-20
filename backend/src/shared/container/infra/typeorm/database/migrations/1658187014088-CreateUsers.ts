import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1658187014088 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "users",
				columns: [
					{
						name: "id",
						type: "uuid",
					},
					{
						name: "name",
						type: "varchar",
					},
					{
						name: "password",
						type: "varchar",
					},
					{
						name: "email",
						type: "varchar",
					},
					{
						name: "birthday",
						type: "varchar",
					},
					{
						name: "age",
						type: "varchar",
					},
					{
						name: "cpf",
						type: "varchar",
					},
					{
						name: "fone_number",
						type: "varchar",
					},
					{
						name: "profession",
						type: "varchar",
					},
					{
						name: "salary",
						type: "varchar",
					},
					{
						name: "avatar",
						type: "varchar",
					},
					{
						name: "created_at",
						type: "timestamp",
						default: "now()",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable("users");
	}
}
