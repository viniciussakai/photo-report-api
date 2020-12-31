import { Request, Response, NextFunction, Express } from 'express'
import { getRepository } from 'typeorm'
import { Report } from '@models/Report'
import ErrorHandler from '@errors/errorHandler'
import { deleteImages, handleItems } from '@utils/reportHandler'
import { Costumer } from '@models/Costumer'
import { ReportItem } from '@models/ReportItem'
import { renderManyReport, renderReport } from 'src/view/report'

class ReportController {
	public async index (
		req:Request,
		res:Response,
		next:NextFunction
	): Promise<Response | void> {
		const reportRepository = getRepository(Report)

		try {
			const reports = await reportRepository.find({
				relations: ['costumer']
			})

			return res.send(renderManyReport(reports))
		} catch {
			return next(new ErrorHandler())
		}
	}

	public async store (
		req:Request,
		res:Response,
		next:NextFunction
	): Promise<Response | void> {
		const reportRepository = getRepository(Report)
		const costumerRepository = getRepository(Costumer)

		const {
			costumerId,
			reference,
			location,
			observation,
			recomendation,
			consideration,
			subtitles
		} = req.body

		const image = req.files as Express.Multer.File[]
		const reportItem = handleItems(subtitles, image)

		try {
			const costumer = await costumerRepository.findOne(costumerId)

			if (!costumer) {
				return next(new ErrorHandler(400, 'Costumer does not exist'))
			}

			const report = await reportRepository.save({
				reference,
				location,
				observation,
				recomendation,
				consideration,
				reportItem,
				costumer
			})

			return res.send(renderReport(report))
		} catch {
			next(new ErrorHandler())
		}
	}

	public async show (
		req:Request,
		res:Response,
		next:NextFunction
	): Promise<Response | void> {
		const reportRepository = getRepository(Report)
		const { id } = req.params

		try {
			const report = await reportRepository.findOne(id, {
				relations: ['reportItem']
			})

			if (!report) {
				return next(new ErrorHandler(400, 'Report does not exist'))
			}

			return res.send(renderReport(report))
		} catch {
			return next(new ErrorHandler())
		}
	}

	public async update (
		req:Request,
		res:Response,
		next:NextFunction
	): Promise<Response | void> {
		const reportRepository = getRepository(Report)
		const reportItemRepository = getRepository(ReportItem)
		const costumerRepository = getRepository(Costumer)

		const { id } = req.params

		const {
			costumerId,
			reference,
			location,
			observation,
			recomendation,
			consideration,
			subtitles
		} = req.body

		const image = req.files as Express.Multer.File[]
		const reportItem = handleItems(subtitles, image)

		try {
			const previousItems = await reportItemRepository.find({
				report: { id: Number(id) }
			})

			await deleteImages(previousItems)

			await reportItemRepository.delete({
				 report: { id: Number(id) }
		 	})

			const costumer = await costumerRepository.findOne(costumerId)
			if (!costumer) {
				return next(new ErrorHandler(400, 'Costumer does not exist'))
			}

			const data = {
				id: Number(id),
				reference,
				location,
				observation,
				recomendation,
				consideration,
				reportItem,
				costumer
			}

			const report = await reportRepository.save(data)

			return res.send(renderReport(report))
		} catch {
			next(new ErrorHandler())
		}
	}

	public async delete (
		req:Request,
		res:Response,
		next:NextFunction
	): Promise<Response | void> {
		const reportRepository = getRepository(Report)
		const reportItemRepository = getRepository(ReportItem)

		const { id } = req.params

		try {
			const previousItems = await reportItemRepository.find({
				report: { id: Number(id) }
			})
			await deleteImages(previousItems)

			await reportRepository.delete({
				id: Number(id)
			})

			return res.sendStatus(200)
		} catch {
			next(new ErrorHandler())
		}
	}
}

export default new ReportController()
