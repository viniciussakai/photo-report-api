import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'
import { Report } from '@models/Report'
import ErrorHandler from '@errors/errorHandler'

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
}

export default new ReportController()
