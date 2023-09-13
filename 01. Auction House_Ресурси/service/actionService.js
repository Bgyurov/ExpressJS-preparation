//model ot thing
const Action = require('../models/Auction')


// CRUD OPERATION FOR MODEL
exports.getOne = (auctionId) => Action.findById(auctionId)

exports.update = (auctionId,data) => Action.findByIdAndUpdate(auctionId,data, {runValidators: true})

exports.delete = (auctionId) => Action.findByIdAndDelete(auctionId)


    