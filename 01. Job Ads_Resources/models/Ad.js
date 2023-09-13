const mongoose = require('mongoose')

const AdShema = new mongoose.Schema({
    headLine:{
        type:String,
        required: true,
        minlength: [4, 'Headline should be a minimum of 4 characters long.'],
    },
    location:{
        type:String,
        required:true,
        minlength: [8, 'Location should be a minimum of 8 characters long.'],
    },
    companyName:{
        type:String,
        required:true,
        minlength: [3, 'Company name should be at least 3 characters long.'],
    },
    companyDescription:{
        type:String,
        required:true,
        maxlength: [40, 'Company description should be a maximum of 40 characters long.'],
    },
    author:{
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },
    usersApplied : [{
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    }],

})

const Ad =  mongoose.model('Ad',AdShema)

module.exports = Ad