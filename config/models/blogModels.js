const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    image: {
        type: String,
        required: [true, 'image is required']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: [true, 'Userid is required'],
    },
}, { timestamps: true })

const blogModels = mongoose.model('Blog', blogSchema)

module.exports = blogModels;