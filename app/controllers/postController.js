import mongoose from "mongoose"

import Post from "../models/PostModel.js"
import Category from "../models/CategoryModel.js"

export const createPost = (req, res) => {
    const body = req.body

    if (!body.title || !body.title.trim()) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Post title is not valid'
        })
    }

    if (!body.imageUrl || !body.imageUrl.trim()) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Post imageUrl is not valid'
        })
    }

    if (!body.path || !body.path.trim()) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Post path is not valid'
        })
    }

    if (!mongoose.Types.ObjectId.isValid(body.category)) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Post category is not valid'
        })
    }

    if (body.tags && body.tags.some(tag => !mongoose.Types.ObjectId.isValid(tag))) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Post tag is not valid'
        })
    }

    const newPost = {
        _id: mongoose.Types.ObjectId(),
        title: body.title,
        description: body.description,
        content: body.content,
        imageUrl: body.imageUrl,
        path: body.path,
        public: body.public,
        category: body.category,
        tags: body.tags
    }

    Post.create(newPost, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        res.status(201).json(data)
    })
}

export const getAllPost = (req, res) => {
    const limit = req.query.limit || 20
    const page = req.query.page || 1
    const filter = req.query.filter

    const condition = {}

    if (filter) condition.title = { $regex: filter, $options: 'i' }

    Post.find(condition)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate(["tags", 'category'])
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

export const getSuggestedPosts = (req, res) => {
    const category = req.params.category
    if (mongoose.Types.ObjectId.isValid(category)) {
        Post.find({
            category: category,
            public: true
        })
            .limit(4)
            .populate(["tags", 'category'])
            .exec((error, data) => {
                if (error) {
                    return res.status(500).json({
                        status: "Internal server error",
                        message: error.message
                    })
                }

                res.status(200).json(data)
            })
    } else {
        Category.findOne({
            path: category
        }, (err, data) => {
            if (err) {
                return res.status(500).json({
                    status: "Internal server err",
                    message: err.message
                })
            }

            Post.find({
                category: data._id,
                public: true
            })
                .limit(4)
                .populate(["tags", 'category'])
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
    }
}

export const getPostsOfCategory = (req, res) => {
    const category = req.params.category
    const limit = req.query.limit || 20
    const page = req.query.page || 1

    if (mongoose.Types.ObjectId.isValid(category)) {
        Post.find({
            category: category,
            public: true
        })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate(["tags", 'category'])
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
    else {
        Category.findOne({
            path: category
        }, (err, data) => {
            if (err) {
                return res.status(500).json({
                    status: "Internal server err",
                    message: err.message
                })
            }

            Post.find({
                category: data._id,
                public: true
            })
                .skip((page - 1) * limit)
                .limit(limit)
                .populate(["tags", 'category'])
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
    }
}

export const getPostsByQuery = (req, res) => {
    const query = req.query.q
    const limit = req.query.limit || 20
    const page = req.query.page || 1

    Post.find({
        title: { $regex: query, $options: 'i' },
        public: true
    })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate(["tags", 'category'])
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

export const getPost = (req, res) => {
    const param = req.params.postId

    const condition = {}

    if (mongoose.Types.ObjectId.isValid(param)) {
        condition._id = param
    }
    else {
        condition.path = param
    }

    Post.findOne(condition)
        .populate(["tags", 'category'])
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

export const updatePost = (req, res) => {
    const body = req.body
    const param = req.params.postId

    const condition = {}

    if (mongoose.Types.ObjectId.isValid(param)) {
        condition._id = param
    }
    else {
        condition.path = param
    }

    if (body.title && !body.title.trim()) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Post title is not valid'
        })
    }

    if (body.imageUrl && !body.imageUrl.trim()) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Post imageUrl is not valid'
        })
    }

    if (body.path && !body.path.trim()) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Post path is not valid'
        })
    }

    if (body.category && !mongoose.Types.ObjectId.isValid(body.category)) {
        res.status(400).json({
            status: 'Bad request',
            message: 'Post category is not valid'
        })
    }

    // if (body.tags && body.tags.some(tag => !mongoose.Types.ObjectId.isValid(tag))) {
    //     res.status(400).json({
    //         status: 'Bad request',
    //         message: 'Post tag is not valid'
    //     })
    // }

    const updatePost = {}

    if (body.title) updatePost.title = body.title
    if (body.description) updatePost.description = body.description
    if (body.content) updatePost.content = body.content
    if (body.imageUrl) updatePost.imageUrl = body.imageUrl
    if (body.path) updatePost.path = body.path
    updatePost.public = body.public
    if (body.category) updatePost.category = body.category
    if (body.tags) updatePost.tags = body.tags

    Post.findOneAndUpdate(condition, updatePost, { new: true })
        .populate(['tags', 'category'])
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

export const deletePost = (req, res) => {
    const param = req.params.postId

    const condition = {}

    if (mongoose.Types.ObjectId.isValid(param)) {
        condition._id = param
    }
    else {
        condition.path = param
    }

    Post.findOneAndDelete(condition, error => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }

        res.status(200).json({
            message: 'Delete post successfully!'
        })
    })
}