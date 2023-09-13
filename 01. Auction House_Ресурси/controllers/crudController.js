const authService = require('../service/authService')
const Auction = require('../models/Auction')
const actionService = require('../service/actionService')

exports.getPublishPage =  (req,res)=>{
    
    res.render('crud/create')
}

exports.postPublishPage = async (req,res)=>{
    
        const user = await authService.getUserbyUsername(req.user.username)
        const userId = user._id
        const {title,category , description , price,imageUrl} = req.body
        console.log(title,category , description , price,imageUrl)
        try{
            let action = new Auction({title,category , description , price,imageUrl, author: userId})
            await action.save()
        }catch(error){
            const errors = Object.keys(error.errors).map(key => error.errors[key].message)

        return res.render('crud/create',{error: errors[0]})
        }

   res.redirect('/browse')
}


//details
exports.getDetailsPage = async (req,res)=>{
   
    const auction = await Auction.findById(req.params.auctionId).lean()
    const auctionOwner = auction.author
    const ownerOfAuction = await authService.getUserbyId(auctionOwner)
    const ownerName = ownerOfAuction.firstName + ' ' + ownerOfAuction.lastName

    
    
    let isOwner = false
    let isBidded = false
    if(req.isAuthenticated){
        const existingUser = await authService.getUserbyUsername(req.user.username)
      
        const userId = existingUser._id
        
        

        if(String(userId) == String(auctionOwner)){
        
            isOwner = true
        }
        // additional functional 
        //  const wished = wishList.find(item => item.equals(userId))
        // if(wished){
        //     isWished = true
        // }

    }

    if(!auction){
      return res.redirect('/404')
    }
    

    res.render('crud/details', { auction,isOwner,isBidded,ownerName})

}
// addition func for add functionality
// exports.getWish = async(req,res)=>{
//     const existingUser = await authService.getUserbyUsername(req.user.username)
//     const userId = existingUser._id
//     const bookId = req.params.bookId
//     await BookService.wishes(userId,bookId)
//     console.log('inside');

//     res.redirect(`/details/${req.params.bookId}`);
// }

exports.getEditPage = async(req,res)=>{
    const bookId = req.params.bookId
    const bookReview = await BookService.getOne(bookId).lean()
    res.render('crud/edit',{bookReview})
}
exports.postEditPage = async(req,res)=>{
const bookId = req.params.bookId
const {title , author,genre,stars,image,review} = req.body

try {
    await BookService.update(bookId ,{title , author,genre,stars,image,review} )
    
} catch (error) {
    const errors = Object.keys(error.errors).map(key => error.errors[key].message)
    return res.render(`crud/edit`,{error: errors[0]})
}
res.redirect(`/details/${bookId}`)
}

exports.getDelete = async(req,res)=>{
const bookId = req.params.bookId
await BookService.delete(bookId)

res.redirect('/catalog')
}