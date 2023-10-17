const User = require('../models/User')
const jwt = require('../lib/jsonwebToken')
const AppError = require('../utils/AppError')

exports.getUserbyEmail = async(email) => {
    const user = await User.findOne({email})

    return user
}
exports.getUserbyUsername = async(username) => {
    const user = await User.findOne({username})

    return user
}
exports.getUserbyId = async(id) => {
    const user = await User.findById(id)

    return user
}

exports.register = (username,password,address)=>{
    return User.create({username,password,address})
}
//TO DO : login functionality 
exports.login = async(username , password)=>{
    //apply methods from user Model
    //!!!
    const user = await this.getUserbyUsername(username)

    if(!user){
        throw new AppError('Username or Password is incorrect.',{user})
    }
    const isValid = await user.comparePassword(password)
    if(!isValid){
        throw new AppError('Username or Password is incorrect.')
    }
    const payload = {username: user.username, id: user._id}
    const token = await jwt.sign(payload,'THISISSECRETFORPROJECT', {expiresIn: '2h'})

    return token
}
