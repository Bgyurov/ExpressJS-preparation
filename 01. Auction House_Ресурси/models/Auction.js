const mongoose = require('mongoose')

const auctionShema = new mongoose.Schema({

    title:{
        type:String,
        required: true,
        minLength: [4, 'The title should be a minimum of 4 characters long']
    },
    description:{
        type:String,
        maxLength: [200,'The description should be a maximum of 200 characters long']
        
    },
    category:{
        type:String,
        required: true,
        enum:["Vehicles", "Real Estate", "Electronics", "furniture", "Other"]
    },
    imageUrl:{
        type:String,
        
    },
    price:{
        type:Number,
        required: true,
        min: [0 , 'The price cannot be negative number']
    },
    author:{
        type: mongoose.Types.ObjectId,
        ref: 'Users',
    },
    bidder: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
    }
})

const Auction = mongoose.model('Auction',auctionShema)

module.exports = Auction