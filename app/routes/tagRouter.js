import { Router } from "express"

const tagRouter = Router()

import * as tagController from '../controllers/tagController.js'

tagRouter.post("/tags", tagController.createTag)

tagRouter.get("/tags", tagController.getAllTag)

tagRouter.get("/tags/:tagId", tagController.getTag)

tagRouter.put("/tags/:tagId", tagController.updateTag)

tagRouter.delete("/tags/:tagId", tagController.deleteTag)


export default tagRouter