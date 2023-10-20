//model ot thing
const Trip = require('../models/Trip')


// CRUD OPERATION FOR MODEL
exports.getOne = (tripId) => Trip.findById(tripId)

exports.update = (tripId,data) => Trip.findByIdAndUpdate(tripId,data, {runValidators: true})

exports.delete = (tripId) => Trip.findByIdAndDelete(tripId)

exports.joinTrip = async (userId, tripId) => {

    const trip = await Trip.findById(tripId);

    trip.buddies.push(userId)

    return trip.save();
}


// exports.getVotedCreatures = async (userId) => {
//     const allCreatures = await Creature.find({}).lean();
//     const creatures = [];

//     function findUserId(creature) {

//         if (creature.votes?.some((id) => id == userId)){
//             creatures.push(creature);
//         }

//     }

//     allCreatures.forEach(findUserId);

//     return creatures
// }


    