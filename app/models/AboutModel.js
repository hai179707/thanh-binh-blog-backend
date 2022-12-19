import mongoose from "mongoose"

const About = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Thanh Bình'
    },
    selfIntroduce: {
        type: String,
        required: true
    },
    maxim: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

export default mongoose.model('About', About)