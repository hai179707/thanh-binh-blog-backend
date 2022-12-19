import { Router } from "express"

const messageRouter = Router()

import * as messageController from '../controllers/messageController.js'

messageRouter.post("/messages", messageController.createMessage)

messageRouter.get("/messages", messageController.getMessage)

export default messageRouter