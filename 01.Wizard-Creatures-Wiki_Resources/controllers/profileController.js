const Creature = require('../models/Creature')
const authService = require('../service/authService')
const creatureService = require('../service/CreatureService')
exports.getProfilePage = async (req,res)=>{
   
const profileId = req.params.profileId
 const mycreatures =  await creatureService.getMyCreatedPost(profileId)
 const owner = await authService.getUserbyId(profileId)
   
    res.render('auth/my-posts',{mycreatures,owner})
}