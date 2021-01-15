import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { BaseModel } from './BaseModel'
import { Costumer } from './Costumer'
import { ReportItem } from './ReportItem'

@Entity('reports')
export class Report extends BaseModel {
	@Column()
	public reference:string

	@Column()
	public location:string

	@Column()
	public title:string

	@Column()
	public requester:string

	@Column()
	public startText:string

	@Column()
	public endText:string

	@OneToMany(
		() => ReportItem,
	 reportItem => reportItem.report, { cascade: true }
	)
	public reportItem:ReportItem[]

	@OneToOne(
		() => Costumer,
		costumer => costumer.report
	)
	@JoinColumn()
	public costumer:Costumer
}
