import mongoose from "mongoose"

import Tag from "../models/TagModel.js"

export const createTag = (req, res) => {
    const body = req.body

    for (const tag of body) {
        if(!tag.name || !tag.name.trim()) {
            res.status(400).json({
                status: 'Bad request',
                message: 'Tag name is not valid'
            })
        }
    
        if(!tag.path || !tag.path.trim()) {
            res.status(400).json({
                status: 'Bad request',
                message: 'Tag path is not valid'
            })
        }
    }

    Tag.insertMany(body, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        
        res.status(201).json(data)
    })
}

export const getAllTag = (req, res) => {
    Tag.find()
        .sort({createdAt: 'desc'})
        .exec((error, data) => {
            if (error) {
                return res.status(500).json({
                    status: "Internal server error",
                    message: error.message
                })
            }
            
            res.status(200).json(data)
        })
}

export const getTag = (req, res) => {
    const tagId = req.params.tagId

    if(!mongoose.Types.ObjectId.isValid(tagId)) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Tag id is not valid'
        })
    }

    Tag.findById(tagId, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        
        res.status(200).json(data)
    })
}

export const updateTag = (req, res) => {
    const tagId = req.params.tagId
    const body = req.body

    if(!mongoose.Types.ObjectId.isValid(tagId)) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Tag id is not valid'
        })
    }

    if(body.name && !body.name.trim()) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Tag name is not valid'
        })
    }

    if(body.path && !body.path.trim()) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Tag path is not valid'
        })
    }

    const updateTag = {}

    if(body.name) updateTag.name = body.name
    if(body.path) updateTag.path = body.path

    Tag.findByIdAndUpdate(tagId, updateTag, {new: true}, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        
        res.status(200).json(data)
    })
}

export const deleteTag = (req, res) => {
    const tagId = req.params.tagId

    if(!mongoose.Types.ObjectId.isValid(tagId)) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Tag id is not valid'
        })
    }

    Tag.findByIdAndDelete(tagId, error => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        
        res.status(200).json({
            message: 'Delete tag successfully!'
        })
    })
}