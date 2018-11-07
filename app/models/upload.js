// use mongoose for db access
const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    url: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    tags: {
        type: [String]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Upload', uploadSchema)