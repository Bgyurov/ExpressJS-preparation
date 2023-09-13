//model ot thing
const Ad = require('../models/Ad')


// CRUD OPERATION FOR MODEL
exports.getOne = (adId) => Ad.findById(adId)

exports.update = (adId,data) => Ad.findByIdAndUpdate(adId,data, {runValidators: true})

exports.delete = (adId) => Ad.findByIdAndDelete(adId)

exports.apply = async (userId, adId) => {

    const ad = await Ad.findById(adId);

    ad.usersApplied.push(userId)

    return ad.save();
}


exports.getАppliedAds = async (userId) => {
    const allAds = await Ad.find({}).lean();
    const ads = [];

    function findUserId(ad) {

        if (ad.usersApplied?.some((id) => id == userId)){
            ads.push(ad);
        }

    }

    allAds.forEach(findUserId);

    return ads
}