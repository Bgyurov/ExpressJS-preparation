const Game = require('../models/Game')
exports.getHomePage =  (req,res)=>{
    
    res.render('home')
}
exports.getErrorPage =  (req,res)=>{
    
    res.render('404')
}

exports.getCatalogPage = async (req,res)=>{
      // TO DO
    const games = await Game.find().lean()
    res.render('catalog',{games})
}

exports.getSearchPage = async (req,res)=>{
    const {search ,platform} = req.query
    console.log(req.query)
    let games = await Game.find().lean()
    if(search){
        games = games.filter(game =>game.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(platform){
        games = games.filter(game => game.platform.toLowerCase().includes(platform.toLowerCase()))
    }
    

    res.render('search', {games,search,platform})
}