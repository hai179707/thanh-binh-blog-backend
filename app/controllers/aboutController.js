import About from "../models/AboutModel.js"


export const getAbout = (req, res) => {
    About.findOne((error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        
        res.status(200).json({
            message: 'Get about successfully!',
            data: data
        })
    })
}

export const updateAbout = (req, res) => {
    const body = req.body

    const updateAbout = {
        name: body.name || '',
        selfIntroduce: body.selfIntroduce || '',
        maxim: body.maxim || ''
    }

    About.updateOne(updateAbout, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        
        res.status(200).json({
            message: 'Update about successfully!',
            data: updateAbout
        })
    })
}