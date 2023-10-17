const Publication = require("../models/Publication.js")
const User = require("../models/User.js")
const authService = require('../service/authService.js')
exports.getProfilePage = async (req,res)=>{
    const user = await User.findById(req.user.id).lean()
    console.log(user)
    //find publicatins Shared By This User
    const publicationsSharedByUser = await Publication.find({usersShared: req.user.id}).lean()
    //find publicatins Created By This User
    const publicationsByUser = await Publication.find({author: req.user.id}).lean()

    let shared = publicationsSharedByUser.map(h => h.title)
    
    let publicated = publicationsByUser.map(h => h.title)
    console.log(publicated)

    let isShared = false
    let isPublicated = false

    if(shared.length > 0){
        isShared = true
    }

    if(publicated.length > 0){
        isPublicated = true
    }
    shared = shared.join(', ')
    publicated = publicated.join(', ')


    res.render('auth/profile', {user, shared, publicated, isShared, isPublicated})

}