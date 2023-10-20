const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({


    email: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email shoud be in this format "username@domain.bg"'],
    },
   
    password: {
        type: String,
        required: true,
        minLength: [4,'Password must be at least 4 characters long.']
    },
    gender:{
        type:String,
        required: true,
        enum:['male','female']
    },
    tripHistory: [{
        type: mongoose.Types.ObjectId,
        ref: 'Trips'
    }],
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