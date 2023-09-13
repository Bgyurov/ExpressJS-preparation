//model ot thing
const Game = require('../models/Game')


// CRUD OPERATION FOR MODEL
exports.getOne = (gameId) => Game.findById(gameId)

exports.update = (gameId,data) => Game.findByIdAndUpdate(gameId,data, {runValidators: true})

exports.delete = (gameId) => Game.findByIdAndDelete(gameId)

exports.buy = async (userId) => {
    const allGames = await Game.find({}).lean();
    const games = [];

    function findUserId(game) {
        console.log(game.boughtBy?.some((id) => id == userId))
        if (game.boughtBy?.some((id) => id == userId)){
            games.push(game);
        }
        
    }

    allGames.forEach(findUserId);

    return games
} 
    