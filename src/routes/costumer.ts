import costumerController from '@controllers/costumerController'
import { Router } from 'express'

const routes = Router()

routes.get('/', costumerController.index)
routes.post('/', costumerController.store)
routes.get('/:id', costumerController.show)
routes.put('/:id', costumerController.update)
routes.delete('/:id', costumerController.delete)

export default routes
