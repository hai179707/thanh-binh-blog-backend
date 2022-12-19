import { Router } from "express"

const aboutRouter = Router()

import * as aboutController from '../controllers/aboutController.js'

aboutRouter.put("/about", aboutController.updateAbout)

aboutRouter.get("/about", aboutController.getAbout)

export default aboutRouter