const authService = require('../service/authService')
const Animal = require('../models/Animal')
const animalService = require('../service/animalService')
exports.getCreatePage =  (req,res)=>{
    
    res.render('crud/create')
}

exports.postCreatePage = async (req,res)=>{
    
        const user = await authService.getUserbyEmail(req.user.email)
        const userId = user._id
        const {name,years , kind , image,need ,location,description} = req.body
        try{
            let animal = new Animal({name,years , kind , image,need ,location,description, owner: userId})
            await animal.save()
        }catch(error){
            const errors = Object.keys(error.errors).map(key => error.errors[key].message)

        return res.render('crud/create',{error: errors[0]})
        }

   res.redirect('/dashboard')
}


//details
exports.getDetailsPage = async (req,res)=>{
   
    const animal = await Animal.findById(req.params.animalId).lean()
    
    let isOwner = false
    let isDonated = false
    if(req.isAuthenticated){
        const animalOwner = animal.owner
        const existingUser = await authService.getUserbyEmail(req.user.email)
      
        const userId = existingUser._id
        const donationList = animal.donations
        console.log(existingUser._id)
        console.log(animalOwner)
        


        if(String(userId) == String(animalOwner)){
        
            isOwner = true
        }
        // additional functional 
         const donated = donationList.find(item => item.equals(userId))
        if(donated){
            isDonated = true
        }

    }

    if(!animal){
        res.status(404)
      return res.redirect('/404')
    }
    
    console.log(isOwner)
    res.render('details', { animal,isOwner,isDonated})

}
// addition func for add functionality
exports.getDonate = async(req,res)=>{
    const existingUser = await authService.getUserbyEmail(req.user.email)
    const userId = existingUser._id
    const animalId = req.params.animalId
    await animalService.donate(userId,animalId)
    console.log('inside');

    res.redirect(`/details/${req.params.animalId}`);
}

exports.getEditPage = async(req,res)=>{
    const animalId = req.params.animalId
    const animal = await animalService.getOne(animalId).lean()
    res.render('crud/edit',{animal})
}
exports.postEditPage = async(req,res)=>{
const animalId = req.params.animalId
const {name,years , kind , image,need ,location,description} = req.body

try {
    await animalService.update(animalId ,{name,years , kind , image,need ,location,description} )
    
} catch (error) {
    const errors = Object.keys(error.errors).map(key => error.errors[key].message)
    return res.render(`crud/edit`,{error: errors[0]})
}
res.redirect(`/details/${animalId}`)
}

exports.getDelete = async(req,res)=>{
const animalId = req.params.animalId
await animalService.delete(animalId)

res.redirect('/dashboard')
}