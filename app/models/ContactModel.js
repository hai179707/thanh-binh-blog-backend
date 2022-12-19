import mongoose from "mongoose"

const Contact = new mongoose.Schema({
        phone: {
            type: String,
            required: true
        },
        facebook: {
            type: String,
            required: true
        },
        messenger: {
            type: String,
            required: true
        },
        instagram: String,
        tiktok: String
    },
    {
        timestamps: true
    })

export default mongoose.model('Contact', Contact)