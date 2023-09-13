const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        minLength: [1 , 'Firstname must be 1 symbol or higher']

        
    },
    lastName: {
        type: String,
        required: true,
        minLength: [1 , 'Lastname must be 1 symbol or higher']

        
    },
  
    email: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Email is not valid!']
       
    },
  
    password: {
        type: String,
        required: true,
        minLength: [5 , 'Password must be 5 symbols or higher']
        
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