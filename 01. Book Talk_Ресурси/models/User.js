const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    //OPTIONAL....
    username: {
        type: String,
        required: true,
        minLength: [4 , 'Username is too short']
    },
    //OPTIONAL....
    email: {
        type: String,
        required: true,
        minLength:[10 , 'Email is too short']
        
    },
    //OPTIONAL....
    password: {
        type: String,
        required: true,
        minLength:[3 , 'Password is too short']
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