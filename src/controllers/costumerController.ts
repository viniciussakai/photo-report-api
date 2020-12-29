import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Costumer } from '@models/Costumer'
import { Address } from '@models/Address'
import ErrorHandler from '@errors/errorHandler'

class CostumerController {
	public async index (
		req: Request,
		res: Response,
		next: NextFunction
	):Promise<Response | void> {
		const costumerRepository = getRepository(Costumer)
		try {
			const costumers = await costumerRepository.find()
			return res.send({ costumers })
		} catch {
			return next(new ErrorHandler())
		}
	}

	public async store (
		req: Request,
		res: Response,
		next: NextFunction
	):Promise<Response | void> {
		const costumerRepository = getRepository(Costumer)
		const {
			name,
			documentType,
			document,
			fantasyName,
			phone,
			email,
			address
		} = req.body

		const data = {
			name,
			documentType,
			document,
			fantasyName,
			phone,
			email,
			address
		}
		try {
			const costumer = await costumerRepository.save(data)

			return res
				.status(201)
				.send({ costumer })
		} catch {
			return next(new ErrorHandler())
		}
	}

	public async show (
		req: Request,
		res: Response,
		next: NextFunction
	):Promise<Response | void> {
		const costumerRepository = getRepository(Costumer)
		const { id } = req.params
		try {
			const costumer = await costumerRepository.findOne(id, {
				relations: ['address']
			})

			return res.send({ costumer })
		} catch {
			return next(new ErrorHandler())
		}
	}

	public async update (
		req: Request,
		res: Response,
		next: NextFunction
	):Promise<Response | void> {
		const costumerRepository = getRepository(Costumer)
		const addressRepository = getRepository(Address)
		const { id: costumerId } = req.params
		const {
			name,
			documentType,
			document,
			fantasyName,
			phone,
			email,
			address
		} = req.body

		const data = {
			name,
			documentType,
			document,
			fantasyName,
			phone,
			email,
			address
		}
		try {
			const costumerExists = await costumerRepository.findOne(costumerId)
			if (!costumerExists) {
				return next(new ErrorHandler(400, 'Costumer does not exist'))
			}

			await addressRepository.delete({
				costumer: { id: parseInt(costumerId) }
			 })
			 const costumer = await costumerRepository.save({
				 id: parseInt(costumerId),
				 ...data
			 })

			return res.send({ costumer })
		} catch {
			return next(new ErrorHandler())
		}
	}

	public async delete (
		req: Request,
		res: Response,
		next: NextFunction
	):Promise<Response | void> {
		const costumerRepository = getRepository(Costumer)
		const { id } = req.params
		try {
			await costumerRepository.delete({
				id: parseInt(id)
			})

			return res.sendStatus(200)
		} catch {
			return next(new ErrorHandler())
		}
	}
}

export default new CostumerController()
