import { Entity, Column, JoinColumn, OneToOne } from 'typeorm'
import { BaseModel } from './BaseModel'
import { Costumer } from './Costumer'

@Entity('addresses')
export class Address extends BaseModel {
	@Column()
	street: string;

	@Column()
	number: number;

	@Column()
	complement?: string;

	@Column()
	neighborhood: string;

	@Column()
	city: string;

	@Column()
	state: string;

	@Column()
	cep?: string

	@OneToOne(
		() => Costumer,
		costumer => costumer.address
	)
  @JoinColumn()
  costumer: Costumer;
}
