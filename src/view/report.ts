import { Report } from '@models/Report'
import { renderCostumer } from './costumer'
import { renderManyReportItem } from './reportItem'

export const renderReport = (report:Report) => {
	return {
		id: report.id,
		title: report.title,
		costumer: renderCostumer(report.costumer),
		requester: report.requester,
		reference: report.reference,
		location: report.location,
		startText: report.startText,
		endText: report.endText,
		reportItem: renderManyReportItem(report.reportItem),
		createdAt: report.createdAt,
		updatedAt: report.updatedAt
	}
}

export const renderManyReport = (reports:Report[]) => {
	return reports.map(report => {
		return {
			id: report.id,
			title: report.title,
			costumer: report.costumer.name,
			requester: report.requester,
			reference: report.reference,
			location: report.location,
			startText: report.startText,
			endText: report.endText
		}
	})
}
