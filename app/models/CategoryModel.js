import mongoose from "mongoose"

const Category = new mongoose.Schema({
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

export default mongoose.model('Category', Category)