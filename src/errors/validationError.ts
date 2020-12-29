import { Response } from 'express'

type ValidationErrors = {
  [key: string]: string[]
}

export const handleValidation = (error: any, res: Response): Response => {
	const errors: ValidationErrors = {}

	error.inner.forEach((err) => {
		errors[err.path] = err.errors
	})

	return res.send({ message: 'Error in Validation', errors })
}
