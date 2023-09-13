const authService = require('../service/authService')
const Creature = require('../models/Creature')
const CreatureService = require('../service/CreatureService')
exports.getCreatePage =  (req,res)=>{
    
    res.render('crud/create')
}

exports.postCreatePage = async (req,res)=>{
    
        const user = await authService.getUserbyEmail(req.user.email)
        console.log(req.user)
        const userId = user._id
        const {name,species , skinColor , eyeColor,image ,description} = req.body
        try{
            let creature = new Creature({name,species , skinColor , eyeColor,image ,description, owner: userId})
            await creature.save()
        }catch(error){
            const errors = Object.keys(error.errors).map(key => error.errors[key].message)

        return res.render('crud/create',{error: errors[0]})
        }

   res.redirect('/catalog')
}


//details
exports.getDetailsPage = async (req,res)=>{
   
    const creature = await Creature.findById(req.params.creatureId).lean()
    const creatureOwnerData = await authService.getUserbyId(creature.owner)
    const creatureName = creatureOwnerData.firstName + ' ' + creatureOwnerData.lastName
    
    
    let isOwner = false
    let isVoted = false
    const votedList = creature.votes
    let votedCounter = 0;
    let arr = []
    
    //we move in all list and each item set auth operations and pushh in array
   for (let index = 0; index < votedList.length; index++) {
    const user = await authService.getUserbyId(votedList[index])
    const email = user.email
    arr.push(email)
    
}
    let emailArr = arr.join(', ')
   

 



    if(req.isAuthenticated){
        const existingUser = await authService.getUserbyEmail(req.user.email)
        const creatureOwner = creature.owner 
        const userId = existingUser._id

        

        

        if(String(userId) == String(creatureOwner)){
        
            isOwner = true
        }
        // additional functional 
         const voted = votedList.find(item => item.equals(userId))
        if(voted){
            isVoted = true
        }

        
    }
    votedCounter = votedList.length

    if(!creature){
      return res.redirect('/404')
    }
    

    res.render('details', { creature,isOwner,creatureName,isVoted,votedCounter,emailArr})

}

exports.getVoted = async(req,res)=>{
    const existingUser = await authService.getUserbyEmail(req.user.email)
    const userId = existingUser._id
    const creatureId = req.params.creatureId
    await CreatureService.votes(userId,creatureId)
    console.log('inside');

    res.redirect(`/details/${req.params.creatureId}`);
}

exports.getEditPage = async(req,res)=>{
    const creatureId = req.params.creatureId
    const creature = await CreatureService.getOne(creatureId).lean()
    res.render('crud/edit',{creature})
}
exports.postEditPage = async(req,res)=>{
const creatureId = req.params.creatureId
const {name,species , skinColor , eyeColor,image ,description} = req.body

try {
    await CreatureService.update(creatureId ,{name,species , skinColor , eyeColor,image ,description} )
    
} catch (error) {
    const errors = Object.keys(error.errors).map(key => error.errors[key].message)
    return res.render(`crud/edit`,{error: errors[0]})
}
res.redirect(`/details/${creatureId}`)
}

exports.getDelete = async(req,res)=>{
const creatureId = req.params.creatureId
await CreatureService.delete(creatureId)

res.redirect('/catalog')
}