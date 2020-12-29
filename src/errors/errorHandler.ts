import { Response } from 'express'

class ErrorHandler extends Error {
  public message: string
  public statusCode: number

  constructor (statusCode?: number, message?: string) {
  	super()
  	this.statusCode = statusCode || 500
  	this.message = message || 'Internal Error'
  }
}
export default ErrorHandler

export const handleError = (err: ErrorHandler, res: Response): Response => {
	const { statusCode = 200, message } = err
	return res.status(statusCode)
		.json({
			status: 'error',
			statusCode,
			message
		})
}
