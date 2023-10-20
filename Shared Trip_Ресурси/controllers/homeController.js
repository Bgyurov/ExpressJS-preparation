const Trip = require('../models/Trip')
const authService = require('../service/authService')
exports.getHomePage =  (req,res)=>{
    
    res.render('home', {title: 'Home'})
}
exports.getErrorPage =  (req,res)=>{
    
    res.render('404')
}

exports.getTripsPage = async (req,res)=>{
    let trips = await Trip.find().lean()
    res.render('shared-trips',{trips})
}

exports.getProfilePage = async (req,res)=>{
    let profileId = req.params.profileId
    let userInfo = await authService.getUserbyId(profileId)
    let tripsCreatedByUser = await Trip.find({creator: profileId}).lean()
  
    let tripsCount = tripsCreatedByUser.length
    let isMale = true
    if(userInfo.gender == 'female'){
        isMale = false
    }

    
    
    res.render('auth/profile',{isMale,tripsCount,tripsCreatedByUser})
}