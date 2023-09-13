//model ot thing
const Animal = require('../models/Animal')


// CRUD OPERATION FOR MODEL
exports.getOne = (animalId) => Animal.findById(animalId)

exports.update = (animalId,data) => Animal.findByIdAndUpdate(animalId,data, {runValidators: true})

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId)

exports.findTheThree = () => Animal.find({ }).sort({}).lean();

exports.donate = async (userId, animalId) => {

    const animal = await Animal.findById(animalId);

    animal.donations.push(userId)

    return animal.save();
}


exports.getDonatedAnimals = async (userId) => {
    const allAnimals = await Animal.find({}).lean();
    const animals = [];

    function findUserId(animal) {

        if (animal.donations?.some((id) => id == userId)){
            animals.push(animal);
        }
        
    }

    allAnimals.forEach(findUserId);

    return animals
} 
    