import { Router } from "express"

const totalRouter = Router()

import * as totalController from '../controllers/totalController.js'

totalRouter.get("/total", totalController.getTotal)

export default totalRouter