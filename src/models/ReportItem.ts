import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseModel } from './BaseModel'
import { Report } from './Report'

@Entity('reportsItens')
export class ReportItem extends BaseModel {
	@Column()
	public subtitle:string

	@Column()
	public image:string

	@ManyToOne(
		() => Report,
		report => report.reportItem
	)
	@JoinColumn()
	public report:Report
}
