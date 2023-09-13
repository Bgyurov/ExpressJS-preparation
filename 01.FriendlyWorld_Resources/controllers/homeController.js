const Animal = require("../models/Animal")
const animalService = require('../service/animalService')
exports.getHomePage = async (req,res)=>{
    let animals = await animalService.findTheThree()
    animals =animals.slice(0,3)
    console.log(animals)
    res.render('home',{animals})
}
exports.getErrorPage =  (req,res)=>{
    
    res.render('404')
}

exports.getDashboardPage = async (req,res)=>{
    let animals = await Animal.find().lean()
    res.render('dashboard',{animals})
}
exports.getSearch = async (req,res)=>{
    const {search}  = req.query
    let animals = await Animal.find().lean()
    
    if(search){
        animals = animals.filter(animals =>animals.location.toLowerCase().includes(search.toLowerCase()))
    }
    
    
    res.render('search', {animals,search})
}