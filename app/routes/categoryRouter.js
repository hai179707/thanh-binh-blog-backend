import { Router } from "express"

const categoryRouter = Router()

import * as categoryController from '../controllers/categoryController.js'

categoryRouter.post("/categories", categoryController.createCategory)

categoryRouter.get("/categories", categoryController.getAllCategory)

categoryRouter.get("/categories/:categoryId", categoryController.getCategory)

categoryRouter.put("/categories/:categoryId", categoryController.updateCategory)

categoryRouter.delete("/categories/:categoryId", categoryController.deleteCategory)

export default categoryRouter