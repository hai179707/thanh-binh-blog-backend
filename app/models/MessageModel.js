import mongoose from "mongoose"

const Message = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

export default mongoose.model('Message', Message)