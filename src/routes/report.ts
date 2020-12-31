import reportController from '@controllers/reportController'
import { Router } from 'express'
import multer from 'multer'
import multerConfig from '@config/multer'

const routes = Router()

routes.get('/', reportController.index)
routes.post(
	'/', multer(multerConfig).array('files'),
	reportController.store
)

export default routes
