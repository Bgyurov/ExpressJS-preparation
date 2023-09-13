//model ot thing
const Creature = require('../models/Creature')


// CRUD OPERATION FOR MODEL
exports.getMyCreatedPost = (userId) => Creature.find({ owner: userId}).lean();

exports.getOne = (creatureId) => Creature.findById(creatureId)

exports.update = (creatureId,data) => Creature.findByIdAndUpdate(creatureId,data, {runValidators: true})

exports.delete = (creatureId) => Creature.findByIdAndDelete(creatureId)

exports.votes = async (userId, creatureId) => {

    const creature = await Creature.findById(creatureId);

    creature.votes.push(userId)

    return creature.save();
}


exports.getVotedCreatures = async (userId) => {
    const allCreatures = await Creature.find({}).lean();
    const creatures = [];

    function findUserId(creature) {

        if (creature.votes?.some((id) => id == userId)){
            creatures.push(creature);
        }
        
    }

    allCreatures.forEach(findUserId);

    return creatures
} 