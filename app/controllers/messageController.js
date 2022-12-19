import Message from "../models/MessageModel.js"

export const getMessage = (req, res) => {
    const limit = req.query.limit || 20
    const page = req.query.page || 1
    const filter = req.query.filter

    const condition = {}

    if(filter) condition.name = {$regex: filter, $options: 'i'}

    Message.find(condition)
        .sort({updatedAt: 'desc'})
        .skip((page - 1) * limit)
        .limit(limit)
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

export const createMessage = (req, res) => {
    const body = req.body

    Message.create({
        name: body.name,
        phone: body.phone, 
        message: body.message
    }, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        
        res.status(200).json(data)
    })
}