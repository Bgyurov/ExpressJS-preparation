const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    //OPTIONAL....
   
    //OPTIONAL....
    email: {
        type: String,
        required: true,
        minLength: [10,'Email should be at least 10 characters long. ']
        
    },
    //OPTIONAL....
    password: {
        type: String,
        required: true,
        minLength: [4,'Password should be at least 4 characters long. ']

        
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