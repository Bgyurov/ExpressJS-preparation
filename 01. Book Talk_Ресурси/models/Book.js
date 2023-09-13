const mongoose = require('mongoose')

const bookShema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [2,'Name is too short.Must be 2 or higher']
    },
    author: {
        type: String,
        required: true,
        minLength: [5,'Author name is too short.Must be 5 or higher']
    },
    image: {
        type: String,
        required: true,
        match: [/^https?:\/\//,'Image link doesnt start with http/https']
    },
    review: {
        type: String,
        required: true,
        minLength: [10,'Review is too short.Must be 10 or higher']

    },
    genre:{
        type: String,
        required: true,
        minLength: [3,'Genre is too short.Must be 5 or higher']

    },
    stars:{
        type: Number,
        required: true,
        min: [1,'Stars must be between 1 and 5'],
        max: [5,'Stars must be between 1 and 5']
    },
    wishingList : [{
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    }],
    owner : {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },
})

const Book = mongoose.model('Book', bookShema)

module.exports = Book