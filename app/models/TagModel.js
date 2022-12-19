import mongoose from "mongoose"

const Tag = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    path: {
        type: String,
        required: true,
        unique: true
    }
},
{
    timestamps: true
})

export default mongoose.model('Tag', Tag)