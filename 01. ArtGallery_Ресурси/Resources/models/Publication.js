const mongoose = require('mongoose')

const publicationShema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        minLength:[6,'Title shoud be 6 symbols minimum']
    },
    paintTech:{
        type:String,
        required: true,
        maxLength:[15,'Painting technique shoud be 15 symbols max']
    },
    artPicture:{
        type:String,
        required: true,
        match:[/^https?:\/\//i,'Image link doesnt start with http:// or https://'],

    },
    cetificateAuth:{
        type:String,
        required: true,
        enum:["Yes","No"]
    },
   userShared : [{
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    }],
    author : {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },
    
})

const Publication = mongoose.model('Publication', publicationShema)

module.exports = Publication