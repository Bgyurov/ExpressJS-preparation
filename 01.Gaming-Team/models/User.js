const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        minLength: [5,'Username is too short']
    },
   
    email: {
        type: String,
        required: true,
        minLength: [10,'Email is too short']
    },
    
    password: {
        type: String,
        required: true,
        minLength: [4,'Password is too short']
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