import { Router } from "express"
import multer from "multer"
import { v4 as uuidv4 } from 'uuid'
import mongoose from "mongoose"
import Image from "../models/ImageModel.js"

const imageRouter = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-')
        cb(null, uuidv4() + '-' + fileName)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

imageRouter.post('/upload', upload.single('uploadImage'), (req, res) => {
    const url = req.protocol + '://' + req.get('host')

    const newImage = {
        _id: mongoose.Types.ObjectId(),
        name: req.file.filename,
        url: url + '/public/uploads/' + req.file.filename
    }

    Image.create(newImage, function (error, data) {
        if (error) {
            res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        else {
            res.status(201).json(data)
        }
    })
})

imageRouter.get('/images', (req, res) => {
    const limit = req.query.limit || 20
    const page = req.query.page || 1

    const filter = req.query.filter

    const condition = {}

    if (filter) condition.name = { $regex: filter, $options: 'i' }

    Image.find(condition)
        .sort({ updatedAt: 'desc' })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec((error, data) => {
            if (error) {
                return res.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }

            res.status(200).json(data)
        })
})

imageRouter.delete('/images/:imageId', (req, res) => {
    const imageId = req.params.imageId

    if (!mongoose.Types.ObjectId.isValid(imageId)) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Image id is not valid'
        })
    }

    Image.findByIdAndDelete(imageId, error => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        res.status(200).json({
            message: 'Delete image successfully!'
        })
    })
})


export default imageRouter