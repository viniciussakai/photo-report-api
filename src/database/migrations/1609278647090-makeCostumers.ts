import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class makeCostumers1609278647090 implements MigrationInterface {
	public async up (queryRunner: QueryRunner): Promise<void> {
		return	await queryRunner.createTable(new Table({
			name: 'costumers',
			columns: [
				{
					name: 'id',
					type: 'integer',
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				}, {
					name: 'name',
					type: 'varchar'
				}, {
					name: 'documentType',
					type: 'varchar'
				}, {
					name: 'document',
					type: 'varchar'
				}, {
					name: 'fantasyName',
					type: 'varchar'
				}, {
					name: 'phone',
					type: 'varchar'
				}, {
					name: 'email',
					type: 'varchar'
				}, {
					default: 'now()',
					name: 'createdAt',
					type: 'timestamp'
				}, {
					default: 'now()',
					name: 'updatedAt',
					type: 'timestamp'
				}
			]
		}))
	}

	public async down (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('costumers')
	}
}
