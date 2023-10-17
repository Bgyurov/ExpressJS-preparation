const Publication = require("../models/Publication.js")

exports.getHomePage =  (req,res)=>{
    
    res.render('home', {title: 'Home'})
}
exports.getErrorPage =  (req,res)=>{
    
    res.render('404')
}

exports.getGalleryPage = async (req,res)=>{
    let arts = await Publication.find().lean()
    res.render('gallery',{arts})
}