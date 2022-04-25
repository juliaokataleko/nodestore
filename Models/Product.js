const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
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
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "categories",
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

mongoose.model('products', Product)