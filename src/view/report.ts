import { Report } from '@models/Report'
import { renderCostumer } from './costumer'
import { renderManyReportItem } from './reportItem'

export const renderReport = (report:Report) => {
	return {
		id: report.id,
		costumer: renderCostumer(report.costumer),
		reference: report.reference,
		location: report.location,
		observation: report.observation,
		recomendation: report.recomendation,
		consideration: report.consideration,
		reportItem: renderManyReportItem(report.reportItem),
		createdAt: report.createdAt,
		updatedAt: report.updatedAt
	}
}

export const renderManyReport = (reports:Report[]) => {
	return reports.map(report => {
		return {
			id: report.id,
			costumer: report.costumer.name,
			reference: report.reference,
			location: report.location,
			observation: report.observation,
			recomendation: report.recomendation,
			consideration: report.consideration
		}
	})
}
