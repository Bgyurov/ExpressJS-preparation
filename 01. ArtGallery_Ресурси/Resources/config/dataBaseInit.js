const mongoose = require('mongoose')



async function initDatabase(){
    mongoose.set('strictQuery',false)
    //TODO : Change url when you start part with db
    await mongoose.connect('mongodb://127.0.0.1:27017/artGallery') 

    console.log('DB connected');
}

module.exports = initDatabase