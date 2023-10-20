const mongoose = require('mongoose')


const tripShema = new mongoose.Schema({
    startPoint:{
        type:String,
        required:true,
        minLength:[4,'Start point should be at least 4 symbols']
    },
    endPoint:{
        type:String,
        required:true,
        minLength:[4,'Start point should be at least 4 symbols']
    },
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    carImage:{
        type:String,
        required:true,
        match:[/^https?:\/\//i,'Image link doesnt start with http:// or https://'],
    },
    carBrand:{
        type:String,
        required:true,
        minLength: [4, 'Car brand sould be at least 4 symbols']
    },
    seats:{
        type:Number,
        required:true,
        min:0,
        max:4,
    },
    price:{
        type:Number,
        required:true,
        min: 1,  
        max: 50, 
    },
    description:{
        type:String,
        required:true,
        minLength:[10,'Description should be at least 10 symbols']
    },
    creator:{
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },
    buddies:[{
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    }],
})

const Trip = mongoose.model('Trip',tripShema)

module.exports = Trip
