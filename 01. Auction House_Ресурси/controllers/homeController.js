const Auction = require('../models/Auction')

exports.getHomePage =  (req,res)=>{
    
    res.render('home')
}
exports.getErrorPage =  (req,res)=>{
    
    res.render('404')
}

exports.getBrowsePage = async (req,res)=>{
    let auctions = await Auction.find().lean()
    res.render('browse',{auctions})
}