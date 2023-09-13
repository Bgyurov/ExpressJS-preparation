const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    //OPTIONAL....
    firstName: {
        type: String,
        required: true,
        minLength: [3, 'The firstName must be 3 symbols or higher']
      
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, 'The LastName must be 3 symbols or higher']

      
    },
    //OPTIONAL....
    email: {
        type: String,
        required: true,
        minLength: [10, 'The email must be 10 symbols or higher']

       
    },
    //OPTIONAL....
    password: {
        type: String,
        required: true,
        minLength: [4, 'The password must be 4 symbols or higher']

      
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