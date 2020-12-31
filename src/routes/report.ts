import reportController from '@controllers/reportController'
import { Router } from 'express'

const routes = Router()

routes.get('/', reportController.index)

export default routes
