const { mongoose } = require("./connectDataBase");
const { nanoid } = require("nanoid");

let petSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  animal: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  temperment: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  health: {
    type: String,
    required: true,
  },
  castrated: {
    type: Boolean,
    required: true,
  },
  vaccinated: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});
const Pet = mongoose.model("Pet", petSchema);

petSchema.statics.addPet = async (pet) => {
  pet.id = nanoid();
  let petToAdd = Pet(pet);
};
module.exports = { Pet };

async function savePetManually() {
  let newPet = {
    id: nanoid(),
    name: "Batman",
    animal: "Bat",
    age: 2,
    temperment: "calm",
    color: "black",
    size: "Small",
    breed: "idk",
    gender: "Male",
    health: "healthy",
    castrated: true,
    vaccinated: false,
    image:
      "https://image.shutterstock.com/image-photo/red-male-cat-walking-towards-600w-138599810.jpg",
    description: "Wholesome boi",
    date: "30-04-2022",
  };
  let petToSave = Pet(newPet);
  let resp = await petToSave.save();
  console.log(resp);
}
// savePetManually();

async function getPetsManually() {
  let pets = await Pet.find({}, { name: 1, animal: 1 }); //add tags you want to see
  console.log(pets);
}
// getPetsManually();
