import mongoose from "mongoose"

const Post = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    imageUrl: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true,
        unique: true
    },
    public: {
        type: Boolean,
        default: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    tags: [{
        type: mongoose.Types.ObjectId,
        ref: 'Tag'
    }]
},
{
    timestamps: true
})

export default mongoose.model('Post', Post)