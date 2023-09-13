const authService = require('../service/authService')
const Game = require('../models/Game')
const gameService = require('../service/GameService')
function generetePlatforms(platform) {

    const platforms = [
            {label : "PC" , isSelected : false},
            {label : "Nintendo", isSelected : false},
            {label : "PS4", isSelected : false},
            {label : "PS5", isSelected : false},
            {label : "XBOX", isSelected : false},

    ]
    const result = platforms.map(x => x.label === platform ? {...x,isSelected: true} : x)

    return result
    
}


exports.getCreatePage =  (req,res)=>{
    
    res.render('crud/create')
}

exports.postCreatePage = async (req,res)=>{
    
        const user = await authService.getUserbyUsername(req.user.username)
        const userId = user._id
        const {platform,name , genre , price,image ,description} = req.body
        try{
            let game = new Game({platform,name , genre , price,image ,description, owner: userId})
            await game.save()
        }catch(error){
            const errors = Object.keys(error.errors).map(key => error.errors[key].message)

        return res.render('crud/create',{error: errors[0]})
        }

   res.redirect('/allgames')
}


//details
exports.getDetailsPage = async (req,res)=>{
   
    const gameOverview = await Game.findById(req.params.gameId).lean()
    
    let isOwner = false
    let isBoughtBy = false
    if(req.isAuthenticated){
        const gameOwner = gameOverview.owner
        const existingUser = await authService.getUserbyUsername(req.user.username)
        const userId = existingUser._id
        const boughtList = gameOverview.boughtBy
      

        if(String(userId) == String(gameOwner)){
        
            isOwner = true
        }
        const bought = boughtList.find(item => item.equals(userId))
        if(bought){
            isBoughtBy = true
        }
       

    }

    if(!gameOverview){
        res.status(404)
      return res.redirect('/404')
    }
    

    res.render('crud/details', { gameOverview,isOwner , isBoughtBy})

}
//edit
exports.getEditPage = async(req,res)=>{
    const gameId = req.params.gameId
    const game = await gameService.getOne(gameId).lean()
    const platforms = generetePlatforms(game.platform)
    res.render('crud/edit',{game,platforms})
}
exports.postEditPage = async(req,res)=>{
    const gameId = req.params.gameId
    const {platform , name,image,stars,price,genre , description} = req.body

try {
    await gameService.update(gameId ,{platform , name,image,stars,price,genre , description} )
    
} catch (error) {
    const errors = Object.keys(error.errors).map(key => error.errors[key].message)
    return res.render(`crud/edit`,{error: errors[0]})
}
res.redirect(`/details/${gameId}`)
}

exports.getDelete = async(req,res)=>{
const gameId = req.params.gameId
await gameService.delete(gameId)

res.redirect('/allgames')
}

exports.getBuy = async(req,res)=>{
    const existingUser = await authService.getUserbyUsername(req.user.username)
    const userId = existingUser._id
    const gameId = req.params.gameId
    await gameService.buy(userId,gameId)
    console.log('inside')
    res.redirect(`/details/${req.params.gameId}`)
}