//model ot thing
const Publication = require('../models/Publication.js')


// CRUD OPERATION FOR MODEL
exports.getOne = (publicationId) => Publication.findById(publicationId)

exports.update = (publicationId,data) => Publication.findByIdAndUpdate(publicationId,data, {runValidators: true})

exports.delete = (publicationId) => Publication.findByIdAndDelete(publicationId)

exports.shares = async (userId, publicationId) => {

    const publication = await Publication.findById(publicationId);

    publication.userShared.push(userId)

    return publication.save();
}


exports.getSharedPublications = async (userId) => {
    const allShares = await Publication.find({}).lean();
    const shares = [];

    function findUserId(publication) {

        if (publication.userShared?.some((id) => id == userId)){
            shares.push(publication);
        }

    }

    allShares.forEach(findUserId);

    return shares
}


    