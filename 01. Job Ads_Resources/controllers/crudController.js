const authService = require('../service/authService')
const Ad = require('../models/Ad')
const AdService = require('../service/AdService')
exports.getCreatePage =  (req,res)=>{
    
    res.render('crud/create')
}

exports.postCreatePage = async (req,res)=>{
    
        const user = await authService.getUserbyEmail(req.user.email)
        const userId = user._id
        console.log(userId)
        const {headLine,location , companyName , companyDescription} = req.body
        try{
            let ad = new Ad({headLine,location , companyName , companyDescription, author: userId})
            await ad.save()
        }catch(error){
            const errors = Object.keys(error.errors).map(key => error.errors[key].message)

        return res.render('crud/create',{error: errors[0]})
        }

   res.redirect('/all-ads')
}


//details
exports.getDetailsPage = async (req,res)=>{
   
    const ads = await Ad.findById(req.params.adId).lean()
    
    let isOwner = false
    let isApplied = false
    const adOwner = ads.author
    const owner = await authService.getUserbyId(adOwner)
    const ownerEmail = owner.email
    const details = []
    
    if(req.isAuthenticated){
        
        const existingUser = await authService.getUserbyEmail(req.user.email)
        const userId = existingUser._id
        const appliedList = ads.usersApplied
        for (const userapplied of appliedList) {
            const user = await authService.getUserbyId(userapplied)
            details.push({"email": user.email,"skills": user.descrptionSkills})
        }

        if(String(userId) == String(adOwner)){
            
            isOwner = true
        }
        // additional functional 
         const applied = appliedList.find(item => item.equals(userId))
         if(applied){
            isApplied = true
        }
        
     
    }

    if(!ads){
      return res.redirect('/404')
    }
   

    res.render('details', { ads,isOwner,isApplied,ownerEmail,details})

}
// addition func for add functionality
exports.getApply = async(req,res)=>{
    const existingUser = await authService.getUserbyEmail(req.user.email)
    const userId = existingUser._id
    const adId = req.params.adId
    await AdService.apply(userId,adId)
    console.log('inside');

    res.redirect(`/details/${req.params.adId}`);
}

exports.getEditPage = async(req,res)=>{
    const adId = req.params.adId
    const adInfo = await AdService.getOne(adId).lean()
    res.render('crud/edit',{adInfo})
}
exports.postEditPage = async(req,res)=>{
    const adId = req.params.adId
const {headLine,location , companyName , companyDescription} = req.body
console.log(headLine,location , companyName , companyDescription)
try {
    await AdService.update(adId ,{headLine,location , companyName , companyDescription} )
    
} catch (error) {
    const errors = Object.keys(error.errors).map(key => error.errors[key].message)
    return res.render(`crud/edit`,{error: errors[0]})
}
res.redirect(`/details/${adId}`)
}

exports.getDelete = async(req,res)=>{
const adId = req.params.adId
await AdService.delete(adId)

res.redirect('/all-ads')
}