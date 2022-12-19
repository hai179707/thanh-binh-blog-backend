import * as dotenv from 'dotenv'
dotenv.config()
import express, { json, urlencoded } from "express"
import cors from 'cors'
import path from "path"
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { connect } from "mongoose"
import categoryRouter from "./app/routes/categoryRouter.js"
import imageRouter from "./app/routes/imageRouter.js"
import postRouter from "./app/routes/postRouter.js"
import tagRouter from "./app/routes/tagRouter.js"
import aboutRouter from "./app/routes/aboutRouter.js"
import contactRouter from "./app/routes/contactRouter.js"
import messageRouter from "./app/routes/messageRouter.js"
import totalRouter from "./app/routes/totalRouter.js"

const PORT = process.env.PORT || 8080

const app = express()

app.use(json())
app.use(urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/public', express.static('public'))
app.use(cors())

app.get("/", (req, res) => {
    res.json({
        message: 'Thanh Binh Blog'
    })
})

app.use('/api', postRouter)
app.use('/api', tagRouter)
app.use('/api', categoryRouter)
app.use('/api', imageRouter)
app.use('/api', aboutRouter)
app.use('/api', contactRouter)
app.use('/api', messageRouter)
app.use('/api', totalRouter)

connect("mongodb+srv://thanhhai108:Mcgeesp1@cluster0.hhghloz.mongodb.net/thanhbinhblog", (error) => {
    if(error) throw error
    console.log("Connect MongoDB successfully!")
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})