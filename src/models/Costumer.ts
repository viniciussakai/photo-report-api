import { Column, Entity, OneToOne } from 'typeorm'
import { Address } from './Address'
import { BaseModel } from './BaseModel'
import { Report } from './Report'

@Entity('costumers')
export class Costumer extends BaseModel {
	@Column()
	name: string;

	@Column()
	documentType:string;

	@Column()
	document: string;

	@Column()
	fantasyName: string;

	@Column()
	phone: string;

	@Column()
	email: string;

	@OneToOne(
		() => Address,
		address => address.costumer, { cascade: true }
	)
	address?: Address;

	@OneToOne(
		() => Report,
		report => report.costumer, { cascade: true }
	)
	public report?: Report;
}
