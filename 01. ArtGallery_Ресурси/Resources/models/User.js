const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    //OPTIONAL....
    username: {
        type: String,
        required: true,
        minLength: [4, 'Username should be 4 symbols min']
    },
    //OPTIONAL....

    //OPTIONAL....
    password: {
        type: String,
        required: true,
        minLength: [3, 'Password should be 3 symbols min']

    },
    address: {
        type: String,
        required: true,
        minLength: [20, 'Address should be 20 symbols min']

    },
    myPublications:[{
        type: mongoose.Types.ObjectId,
        ref: 'Publications'
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