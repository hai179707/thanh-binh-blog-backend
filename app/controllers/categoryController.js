import mongoose from "mongoose"

import Category from "../models/CategoryModel.js"

export const createCategory = (req, res) => {
    const body = req.body

    if(!body.name || !body.name.trim()) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Category name is not valid'
        })
    }

    if(!body.path || !body.path.trim()) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Category path is not valid'
        })
    }

    const newCategory = {
        _id: mongoose.Types.ObjectId(),
        name: body.name,
        path: body.path
    }

    Category.create(newCategory, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        
        res.status(201).json(data)
    })
}

export const getAllCategory = (req, res) => {
    Category.find((error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        
        res.status(200).json(data)
    })
}

export const getCategory = (req, res) => {
    const categoryId = req.params.categoryId

    Category.findOne({path: categoryId}, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        
        res.status(200).json(data)
    })
}

export const updateCategory = (req, res) => {
    const categoryId = req.params.categoryId
    const body = req.body

    if(!mongoose.Types.ObjectId.isValid(categoryId)) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Category id is not valid'
        })
    }

    if(body.name && !body.name.trim()) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Category name is not valid'
        })
    }

    if(body.path && !body.path.trim()) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Category path is not valid'
        })
    }

    const updateCategory = {}

    if(body.name) updateCategory.name = body.name
    if(body.path) updateCategory.path = body.path

    Category.findByIdAndUpdate(categoryId, updateCategory, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        
        res.status(200).json(data)
    })
}

export const deleteCategory = (req, res) => {
    const categoryId = req.params.categoryId

    if(!mongoose.Types.ObjectId.isValid(categoryId)) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Category id is not valid'
        })
    }

    Category.findByIdAndDelete(categoryId, error => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        
        res.status(200).json({
            message: 'Delete category successfully!'
        })
    })
}