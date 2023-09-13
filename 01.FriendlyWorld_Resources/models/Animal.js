const mongoose = require('mongoose')

const animalShema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        minLength: [2,'Name should be at least 2 characters long. ']

    },
    years: {
        type:Number,
        required: true,
        min: [1,'Years shoud be at minimum 1 year'],
        max: [100,'Years shoud be at less than 100 year'],
    },
    kind: {
        type:String,
        required: true,
        minLength: [3,'The kind should be at least 3 characters long. ']

    },
    image: {
        type:String,
        required: true,
        match:[/^https?:\/\//i,'Image link doesnt start with http:// or https://'],
    },
    need: {
        type:String,
        required: true,
        minLength: [3,'Need shoud be at least 3 symbols'],
        maxLength: [20,'Need shoud be at less than 20 symbols'],

    },
    location: {
        type:String,
        required: true,
        minLength: [5,'Location shoud be at least 5 symbols'],
        maxLength: [15,'Location shoud be at less than 15 symbols'],

    },
    description: {
        type:String,
        required: true,
        minLength: [5,'Description shoud be at least 5 symbols'],
        maxLength: [50,'Descrtiption shoud be at less than 50 symbols'],
    },
    donations: [{
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    }],
    owner : {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },
})

const Animal = mongoose.model('Animal',animalShema)

module.exports = Animal