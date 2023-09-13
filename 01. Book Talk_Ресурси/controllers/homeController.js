const Book = require("../models/Book")



exports.getHomePage =  (req,res)=>{
    
    res.render('home')
}
exports.getErrorPage =  (req,res)=>{
    
    res.render('404')
}

exports.getCatalogPage = async (req,res)=>{
    let bookReviews = await Book.find().lean()
    res.render('catalog',{bookReviews})
}