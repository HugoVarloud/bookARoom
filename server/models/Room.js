const mongoose = require("mongoose")

const roomSchema = mongoose.Schema({
    name: String,
    description: String,
    capacity: Number,
    equipements: [
        {
            name: String
        },
    ],
    createdAt: Date,
    updatedAt: Date
})

module.exports = mongoose.model('Rooms', roomSchema)