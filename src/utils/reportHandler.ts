import { Express } from 'express'
import { ReportItem } from '@models/ReportItem'
import fs from 'fs'
import path from 'path'

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

const deleteArchive = async (archiveName: string) => {
	await	fs.unlink(path.resolve(__dirname, '..', '..', 'uploads', archiveName), () => {
		console.log(`Deletado arquivo ${archiveName}`)
	})
}

export const deleteImages = async (previousItems: ReportItem[]): Promise<void> => {
	return await previousItems.forEach(item => {
		deleteArchive(item.image)
	})
}
