import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class makeAddresses1609278700653 implements MigrationInterface {
	public async up (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'addresses',
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
					name: 'street',
					type: 'varchar'
				}, {
					name: 'number',
					type: 'varchar'
				}, {
					name: 'complement',
					type: 'varchar',
					isNullable: true
				}, {
					name: 'neighborhood',
					type: 'varchar'
				}, {
					name: 'city',
					type: 'varchar'
				}, {
					name: 'state',
					type: 'varchar'
				}, {
					name: 'cep',
					type: 'varchar',
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

		return await queryRunner.createForeignKey('addresses', new TableForeignKey({
			columnNames: ['costumerId'],
			referencedColumnNames: ['id'],
			referencedTableName: 'costumers',
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		}))
	}

	public async down (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('addresses')
	}
}
