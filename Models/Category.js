const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Category = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
})

mongoose.model('categories', Category)