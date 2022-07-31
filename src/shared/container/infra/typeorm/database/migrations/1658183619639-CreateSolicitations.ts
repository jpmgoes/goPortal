import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSolicitations1658183619639 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "solicitations",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
					},
					{
						name: "name",
						type: "varchar",
					},
					{
						name: "description",
						type: "varchar",
					},
					{
						name: "reply",
						type: "varchar",
					},
					{
						name: "is_open",
						type: "boolean",
						default: true,
					},
					{
						name: "user_id",
						type: "varchar",
					},
					{
						name: "create_at",
						type: "timestamp",
						default: "now()",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("solicitations");
	}
}
