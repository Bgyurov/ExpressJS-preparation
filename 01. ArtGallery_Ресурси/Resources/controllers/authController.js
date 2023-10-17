const router = require('express').Router()

const authService = require('../service/authService')
const User = require('../models/User.js')

router.get('/login', (req,res)=>{
    res.render('auth/login')
})

router.post('/login', async (req,res)=>{
    const {username , password} = req.body

    try{
        const token = await authService.login(username,password)
        res.cookie('mycookie', token, {httpOnly: true})
    }catch(error){
        console.log(error.message);
       return res.render('auth/login' , {error: error.message})
    }
    res.redirect('/')
})




router.get('/register', (req,res)=>{
    res.render('auth/register')
})

router.post('/register', async (req, res,next)=>{
    const {username,address , password , repass} = req.body

    if(password !== repass){
        //throw new errror
        
        return res.render('auth/register',{error: 'Password Missmatch'})
    }

    //check for existinguser

    const existingUser = await authService.getUserbyUsername(username)
    // console.log(`Existing user - ${existingUser.username}` + ' '+ 'Email from form ' + email)
   if(existingUser){
    console.log('user exist')
    return res.render('auth/register',{error: 'User already exist'})
   }


 

    try {
        const user = await authService.register(username , password, address)
        const token = await authService.login(username,password)
        res.cookie('mycookie', token, {httpOnly: true})
    } catch (error) {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message)

        return res.render('auth/register',{error: errors[0]})
    }

    res.redirect('/')
})

router.get('/logout',(req,res)=>{

    res.clearCookie('mycookie')
    res.redirect('/')
  })
  


module.exports = router