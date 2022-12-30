import { Router } from 'express'
import ProductController from './Controller'

const controller = new ProductController
const router = Router()

router.route('/product')
    .get(controller.get)
    .post(controller.post)

router.route('/product/:id')
    .get(controller.getOne)
    .put(controller.update)
    .delete(controller.delete)


export default router