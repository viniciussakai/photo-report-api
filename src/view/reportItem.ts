import { ReportItem } from '@models/ReportItem'
import 'dotenv/config'

export const renderReportItem = (reportItem: ReportItem) => {
	return {
		subtitle: reportItem.subtitle,
		image: `http://${process.env.APP_HOST}:${process.env.PORT}/files/uploads/${reportItem.image}`
	 }
}

export const renderManyReportItem = (reportItems: ReportItem[]) => {
	return reportItems.map(item => {
		return renderReportItem(item)
	})
}
