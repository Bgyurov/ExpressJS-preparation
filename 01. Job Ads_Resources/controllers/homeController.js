const Ad = require("../models/Ad")
const authService = require('../service/authService')
exports.getHomePage =  async(req,res)=>{
    let ads = await Ad.find().lean()
  ads = ads.slice(0,3)
    res.render('home', {ads})
}
exports.getErrorPage =  (req,res)=>{
    
    res.render('404')
}

exports.getAllAds = async (req,res)=>{
    let ads = await Ad.find().lean()
    res.render('all-ads',{ads})
}
exports.getSeacrchPage = async (req,res)=>{
    const {search} = req.query
    let ads = await Ad.find().lean()
    let searcharray = []
    
    if(search){
        const searchEmailToId = await authService.getUserbyEmail(search)
        console.log(searchEmailToId)
        if(searchEmailToId !== null){
            
            const searchId = searchEmailToId._id
          
            
            for (let index = 0; index < ads.length; index++) {
              // console.log(String(ads[index].author) ,' is equal to this ', String(searchId) )
                if( String(searchId) == String(ads[index].author)){
                  console.log('VALID')
                    searcharray.push({"headLine": ads[index].headLine, "companyName": ads[index].companyName})
                  }
                  
              }
           

        }

    }
    
   
   


    res.render('search', {searcharray,search})
}