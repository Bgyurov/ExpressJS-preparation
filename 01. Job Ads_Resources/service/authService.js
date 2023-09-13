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

exports.register = (email,password,descrptionSkills)=>{
    return User.create({email,password,descrptionSkills})
}
exports.login = async(email , password)=>{
    //apply methods from user Model
    //!!!
    const user = await this.getUserbyEmail(email)

    if(!user){
        throw new AppError('Email or Password is incorrect.',{user})
    }
    const isValid = await user.comparePassword(password)
    if(!isValid){
        throw new AppError('Email or Password is incorrect.')
    }
    const payload = {email: user.email}
    const token = await jwt.sign(payload,'THISISSECRETFORPROJECT', {expiresIn: '2h'})

    return token
}
