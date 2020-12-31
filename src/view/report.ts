import { Report } from '@models/Report'
import { renderManyReportItem } from './reportItem'

export const renderReport = (report:Report) => {
	return {
		id: report.id,
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
			constumer: report.costumer?.name,
			reference: report.reference,
			location: report.location,
			observation: report.observation,
			recomendation: report.recomendation,
			consideration: report.consideration
		}
	})
}
