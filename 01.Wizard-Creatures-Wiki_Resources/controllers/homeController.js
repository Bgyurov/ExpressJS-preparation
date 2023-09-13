const Creature = require('../models/Creature')

exports.getHomePage =  (req,res)=>{
    
    res.render('home', {title: 'Home'})
}
exports.getErrorPage =  (req,res)=>{
    
    res.render('404')
}

exports.getCatalogPage = async (req,res)=>{
    let creatures = await Creature.find().lean()
    res.render('all-posts',{creatures})
}