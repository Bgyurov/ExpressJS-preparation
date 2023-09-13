const mongoose = require('mongoose')

const CreatureShema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: [2, 'The name must be 2 symbols or higher']

    },
    species:{
        type: String,
        required: true,
        minLength: [3, 'The species must be 3 symbols or higher']

    },
    skinColor:{
        type: String,
        required: true,
        minLength: [3, 'The skinColor must be 3 symbols or higher']

    },
    eyeColor:{
        type: String,
        required: true,
        minLength: [3, 'The eyeColor must be 3 symbols or higher']

    },
    image:{
        type: String,
        required: true,
        match:[/^https?:\/\//i,'Image link doesnt start with http:// or https://'],
    },
    description:{
        type:String,
        required: true,
        minLength: 5,
        maxLength: 500,


    },
    votes:[{
        type:mongoose.Types.ObjectId,
        ref:'Users'
    }],
    owner:{
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    }
})

const Creature = mongoose.model('Creature',CreatureShema)

module.exports = Creature