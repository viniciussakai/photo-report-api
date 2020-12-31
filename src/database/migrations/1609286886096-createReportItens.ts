import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createReportItens1609286886096 implements MigrationInterface {
	public async up (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'reportsItens',
			columns: [
				{
					name: 'id',
					type: 'integer',
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				}, {
					name: 'reportId',
					type: 'int'
				}, {
					name: 'subtitle',
					type: 'varchar'
				}, {
					name: 'image',
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

		return await queryRunner.createForeignKey('reportsItens', new TableForeignKey({
			columnNames: ['reportId'],
			referencedColumnNames: ['id'],
			referencedTableName: 'reports',
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		}))
	}

	public async down (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('reportsItens')
	}
}
