import mongoose from "mongoose"

const Image = new mongoose.Schema({
    name: {
        type: String
    },
    url: {
        type: String
    }
},
{
    timestamps: true
})

export default mongoose.model('Image', Image)