import { Router } from "express"

const contactRouter = Router()

import * as contactController from '../controllers/contactController.js'

contactRouter.put("/contacts", contactController.updateContact)

contactRouter.get("/contacts", contactController.getContact)

export default contactRouter