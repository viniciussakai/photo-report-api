import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createReport1609286876191 implements MigrationInterface {
	public async up (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'reports',
			columns: [
				{
					name: 'id',
					type: 'integer',
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				}, {
					name: 'costumerId',
					type: 'int'
				}, {
					name: 'title',
					type: 'varchar'
				}, {
					name: 'requester',
					type: 'varchar'
				}, {
					name: 'reference',
					type: 'varchar'
				}, {
					name: 'location',
					type: 'varchar'
				}, {
					name: 'startText',
					type: 'text',
					isNullable: true
				}, {
					name: 'endText',
					type: 'text',
					isNullable: true
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

		return await queryRunner.createForeignKey('reports', new TableForeignKey({
			columnNames: ['costumerId'],
			referencedColumnNames: ['id'],
			referencedTableName: 'costumers',
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		}))
	}

	public async down (queryRunner: QueryRunner): Promise<void> {
		return await queryRunner.dropTable('reports')
	}
}
