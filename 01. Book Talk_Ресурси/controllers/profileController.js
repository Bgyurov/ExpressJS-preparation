const authService = require('../service/authService')
const User = require('../models/User')
const bookService = require('../service/BookService')
exports.getProfilePage = async (req,res)=>{
   const user = await authService.getUserbyId(req.params.profileId)
   const email = user.email
   const books = await bookService.getWishedBooks(user._id)
   console.log(user._id)
    res.render('profile',{email,books})
}