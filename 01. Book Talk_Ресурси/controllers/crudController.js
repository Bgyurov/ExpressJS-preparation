const authService = require('../service/authService')
const Book = require('../models/Book')
const BookService = require('../service/BookService')
exports.getCreatePage =  (req,res)=>{
    
    res.render('crud/create')
}

exports.postCreatePage = async (req,res)=>{
    
        const user = await authService.getUserbyUsername(req.user.username)
        const userId = user._id
        const {title,author , genre , stars,image ,review} = req.body
        try{
            let book = new Book({title,author , genre , stars,image ,review, owner: userId})
            await book.save()
        }catch(error){
            const errors = Object.keys(error.errors).map(key => error.errors[key].message)

        return res.render('crud/create',{error: errors[0]})
        }

   res.redirect('/catalog')
}


//details
exports.getDetailsPage = async (req,res)=>{
   
    const bookReview = await Book.findById(req.params.bookId).lean()
    
    let isOwner = false
    let isWished = false
    if(req.isAuthenticated){
        const bookReviewOwner = bookReview.owner
        const existingUser = await authService.getUserbyUsername(req.user.username)
      
        const userId = existingUser._id
        const wishList = bookReview.wishingList
        

        if(String(userId) == String(bookReviewOwner)){
        
            isOwner = true
        }
         const wished = wishList.find(item => item.equals(userId))
        if(wished){
            isWished = true
        }

    }

    if(!bookReview){
      return res.redirect('/404')
    }
    

    res.render('details', { bookReview,isOwner,isWished})

}

exports.getWish = async(req,res)=>{
    const existingUser = await authService.getUserbyUsername(req.user.username)
    const userId = existingUser._id
    const bookId = req.params.bookId
    await BookService.wishes(userId,bookId)
    console.log('inside');

    res.redirect(`/details/${req.params.bookId}`);
}

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