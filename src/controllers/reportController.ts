import { Request, Response, NextFunction, Express } from 'express'
import { getRepository } from 'typeorm'
import { Report } from '@models/Report'
import ErrorHandler from '@errors/errorHandler'
import { handleItems } from '@utils/reportHandler'
import { Costumer } from '@models/Costumer'

class ReportController {
	public async index (
		req:Request,
		res:Response,
		next:NextFunction
	): Promise<Response | void> {
		const reportRepository = getRepository(Report)
		try {
			const reports = await reportRepository.find()
			return res.send({ reports })
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
				return next(new ErrorHandler(400, 'Costumer not found'))
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

			res.send({ report })
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

			return res.send({ report })
		} catch {
			return next(new ErrorHandler())
		}
	}
}

export default new ReportController()
