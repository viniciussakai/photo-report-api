import { Column, Entity, OneToMany } from 'typeorm'
import { BaseModel } from './BaseModel'
import { ReportItem } from './ReportItem'

@Entity('reports')
export class Report extends BaseModel {
	@Column()
	public reference:string

	@Column()
	public location:string

	@Column()
	public observation:string

	@Column()
	public recomendation:string

	@Column()
	public consideration:string

	@OneToMany(
		() => ReportItem,
	 reportItem => reportItem.report
	)
	public reportItem:ReportItem[]
}
