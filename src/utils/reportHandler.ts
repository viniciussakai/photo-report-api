import { ReportItem } from '@models/ReportItem'
import { Express } from 'express'

export const handleItems = (
	subtitle: Array<string>,
	images: Express.Multer.File[]
): ReportItem[] => {
	const reportItems: ReportItem[] = []

	images.forEach((file, index) => {
		const item = new ReportItem()
		item.image = file.filename
		item.subtitle = subtitle[index]

		reportItems.push(item)
	})
	return reportItems
}
