import Post from "../models/PostModel.js"
import Category from "../models/CategoryModel.js"
import Tag from "../models/TagModel.js"
import Message from "../models/MessageModel.js"

export const getTotal = async (req, res) => {
    const postTotal = Post.count()
    const categoryTotal = Category.count()
    const tagTotal = Tag.count()
    const messageTotal =  Message.count()

    const total = await Promise.all([
        postTotal,
        categoryTotal,
        tagTotal,
        messageTotal
    ])

    res.status(200).json({
        post: total[0],
        category: total[1],
        tag: total[2],
        message: total[3]
    })

}
