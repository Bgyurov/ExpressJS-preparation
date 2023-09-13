const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({


    //OPTIONAL....
    email: {
        type: String,
        required: true,
        match: [/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/,'Email is`n correct format']
    },
    //OPTIONAL....
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [5, 'Password should be at least 5 characters long.'],
    },
    descrptionSkills:{
        type:String,
        maxlength: [40, 'Skills description should be a maximum of 40 characters long.'],
    },
    myAds:{
        type: mongoose.Types.ObjectId,
        ref: 'Ads'
    }
})

userSchema.pre('save', function(next){
    bcrypt.hash(this.password,10)
    .then(hash => {
        this.password = hash

        next()
    })
})

userSchema.method('comparePassword',function(password){
    return bcrypt.compare(password,this.password)
})

const User = mongoose.model('User',userSchema)

module.exports = User