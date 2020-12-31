import express from 'express'
import database from './database'
import { handleError } from '@errors/errorHandler'
import costumer from '@routes/costumer'
import report from '@routes/report'

class App {
    public express:express.Application

    /*
        Construcor
    */
    public constructor () {
    	this.express = express()
    	this.initializeDatabase()
    	this.middleware()
    	this.routes()
    	this.error()
    }

    private middleware (): void {
    	this.express.use(express.json())
    }

    private routes ():void {
    	this.express.use('/costumer', costumer)
    	this.express.use('/report', report)
    }

    private error (): void {
    	this.express.use((err, req, res, next) => {
    		if (!err) next()

    		// if (err instanceof ValidationError) {
    		// 	return handleValidation(err, res)
    		// }
    		return handleError(err, res)
    	})
    }

    private async initializeDatabase (): Promise<void> {
    	return database.getConnection()
    }
}

export default new App().express
