const authService = require('../service/authService')
const Trip = require('../models/Trip')
const TripService = require('../service/TripService')
exports.getCreatePage =  (req,res)=>{
    
    res.render('crud/trip-create')
}

exports.postCreatePage = async (req,res)=>{
    
        const user = await authService.getUserbyEmail(req.user.email)
        const userId = user._id
        const {startPoint,endPoint , date , time,carImage ,carBrand,seats,price,description} = req.body
        
        try{
            let trip = new Trip({startPoint,endPoint , date , time,carImage ,carBrand,seats,price,description, creator: userId})
            await trip.save()
        }catch(error){
            const errors = Object.keys(error.errors).map(key => error.errors[key].message)

        return res.render('crud/trip-create',{error: errors[0]})
        }

   res.redirect('/trips')
}


//details
exports.getDetailsPage = async (req,res)=>{
   
    const trip = await Trip.findById(req.params.tripId).lean()
    
    let isOwner = false
    let isJoined = false
    let seatsLeft = Number(trip.seats) - Number(trip.buddies.length)
    let OwnerTrip = await authService.getUserbyId(trip.creator)
    let OwnerEmail = OwnerTrip.email
    let buddiesArray = []
    const buddies = trip.buddies
    if(req.isAuthenticated){
        const tripOwner = trip.creator
        const existingUser = await authService.getUserbyEmail(req.user.email)
      
        const userId = existingUser._id
        

        if(String(userId) == String(tripOwner)){
        
            isOwner = true
        }
        // additional functional 
         const joined = buddies.find(item => item.equals(userId))
        if(joined){
            isJoined = true
           
        }

    }

    if(!trip){
      return res.redirect('/404')
    }
    buddies.forEach(async e =>{
        let user = await authService.getUserbyId(e)
        let userEmail = user.email
        buddiesArray.push(userEmail)
    });

    buddiesArray.join(', ')

    

    res.render('crud/trip-details', { trip,OwnerEmail,buddiesArray,isOwner,isJoined,seatsLeft})

}
// addition func for add functionality
exports.getJoin = async(req,res)=>{
    const existingUser = await authService.getUserbyEmail(req.user.email)
    const userId = existingUser._id
    const tripId = req.params.tripId
    await TripService.joinTrip(userId,tripId)
    console.log('inside');

    res.redirect(`/details/${req.params.tripId}`);
}

exports.getEditPage = async(req,res)=>{
    const tripId = req.params.tripId
    const trip = await TripService.getOne(tripId).lean()
    res.render('crud/trip-edit',{trip})
}
exports.postEditPage = async(req,res)=>{
const tripId = req.params.tripId
const {startPoint,endPoint , date , time,carImage ,carBrand,seats,price,description} = req.body

try {
    await TripService.update(tripId ,{startPoint,endPoint , date , time,carImage ,carBrand,seats,price,description} )
    
} catch (error) {
    const errors = Object.keys(error.errors).map(key => error.errors[key].message)
    return res.render(`crud/trip-edit`,{error: errors[0]})
}
res.redirect(`/details/${tripId}`)
}

exports.getDelete = async(req,res)=>{
const tripId = req.params.tripId
await TripService.delete(tripId)

res.redirect('/trips')
}