const authService = require('../service/authService')
const Publication = require('../models/Publication')
const publicationService  = require('../service/publicationService.js')
exports.getCreatePage =  (req,res)=>{
    
    res.render('crud/create')
}

exports.postCreatePage = async (req,res)=>{
    
        const user = await authService.getUserbyUsername(req.user.username)
        
        const userId = user._id
        const {title,paintTech , artPicture , cetificateAuth} = req.body
        try{
            let publication = new Publication({title,paintTech , artPicture , cetificateAuth, author: userId})
            await publication.save()
        }catch(error){
            const errors = Object.keys(error.errors).map(key => error.errors[key].message)

        return res.render('crud/create',{error: errors[0]})
        }

   res.redirect('/gallery')
}


//details
exports.getDetailsPage = async (req,res)=>{
   
    const art = await Publication.findById(req.params.publicationId).lean()
    const artAuthorInfo = await authService.getUserbyId(art.author)
    const authorName = artAuthorInfo.username
    let isOwner = false
    let isShare = false
    if(req.isAuthenticated){
        const existingUser = await authService.getUserbyUsername(req.user.username)
        const artOwner = art.author
        
        const userId = existingUser._id
        const userSharedList = art.userShared
        

        if(String(userId) == String(artOwner)){
        
            isOwner = true
        }
        // additional functional 
         const shared = userSharedList.find(item => item.equals(userId))
        if(shared){
            isShare = true
        }

    }

    if(!art){
      return res.redirect('/404')
    }
    

    res.render('details', { art,isOwner,isShare,authorName})

}
// addition func for add functionality
exports.getShared = async(req,res)=>{
    const existingUser = await authService.getUserbyUsername(req.user.username)
    const userId = existingUser._id
    const publicationId = req.params.publicationId
    await publicationService.shares(userId,publicationId)
    console.log('inside');

    res.redirect(`/details/${req.params.publicationId}`);
}

exports.getEditPage = async(req,res)=>{
    const publicationId = req.params.publicationId
    const art = await publicationService.getOne(publicationId).lean()
    res.render('crud/edit',{art})
}
exports.postEditPage = async(req,res)=>{
const publicationId = req.params.publicationId
const {title,paintTech , artPicture , cetificateAuth} = req.body

try {
    await publicationService.update(publicationId ,{title,paintTech , artPicture , cetificateAuth} )
    
} catch (error) {
    const errors = Object.keys(error.errors).map(key => error.errors[key].message)
    return res.render(`crud/edit`,{error: errors[0]})
}
res.redirect(`/details/${publicationId}`)
}

exports.getDelete = async(req,res)=>{
const publicationId = req.params.publicationId
await publicationService.delete(publicationId)

res.redirect('/gallery')
}