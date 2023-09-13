const mongoose = require('mongoose')


const gameShema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
        minLength: [4,'Name is too short']
    },
    
    image: {
        type: String,
        required: true,
        match: [/^https?:\/\//,'Image link doesnt start with http/https']

    },
    price: {
        type: Number,
        required: true,
        min: [0,'The price must be positive number']
    },
    description: {
        type:String,
        required: true,
        minLength: [10,'Description is too short']

    },
    genre:{
        type:String,
        required: true,
        minLength: [2,'Genre is too short']

    },
    platform: {
        type: String,
        required: true,
        enum: ["PC", "Nintendo", "PS4", "PS5", "XBOX"]
       
    },
    boughtBy:[{
        type: mongoose.Types.ObjectId,
        ref: 'Users',
    }],
    owner : {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },
})


const Game = mongoose.model('Game',gameShema)

module.exports = Game