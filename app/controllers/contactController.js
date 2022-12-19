import mongoose from "mongoose"

import Contact from "../models/ContactModel.js"

export const getContact = (req, res) => {
    Contact.findOne((error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        
        res.status(200).json(data)
    })
}

export const updateContact = (req, res) => {
    const body = req.body

    const updateContact = {
        phone: body.phone,
        facebook: body.facebook,
        messenger: body.messenger,
        instagram: body.instagram,
        tiktok: body.tiktok
    }

    Contact.updateOne(updateContact, (error, data) => {
        if (error) {
            return res.status(500).json({
                status: "Internal server error",
                message: error.message
            })
        }
        
        res.status(200).json(updateContact)
    })
}