const { mongoose } = require("./connectDataBase");
const { nanoid } = require("nanoid");

let petSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  userID: {
    type: String,
    unique: false,
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

petSchema.statics.getPet = async (filter) => {
  let props = Object.keys(filter);
  props = props.map((p) => ({ [p]: filter[p] }));
  let search = { $or: props };
  if (props.length == 0) {
    search = {};
  }
  return await Pet.find(search);
};
petSchema.statics.savePet = async (pet) => {
  pet.id = nanoid();
  let petToSave = Pet(pet);

  return await petToSave.save();
};
petSchema.statics.getPetById = async (id) => {
  return await Pet.findOne({ id });
};
petSchema.statics.getPetByParams = async (query) => {
  return await Pet.find(query);
};
petSchema.statics.deletePetById = async (id) => {
  return await Pet.deleteOne({ id });
};
petSchema.statics.updatePet = async (id, params) => {
  return await Pet.findOneAndUpdate({ id }, params);
};
// async function savePetManually() {
//   let newPet = {
//     id: nanoid(),
//     name: "Odie",
//     animal: "Dog",
//     age: 2,
//     temperment: "calm",
//     color: "black",
//     size: "Small",
//     breed: "idk",
//     gender: "Male",
//     health: "healthy",
//     castrated: true,
//     vaccinated: false,
//     image:
//       "https://image.shutterstock.com/image-photo/red-male-cat-walking-towards-600w-138599810.jpg",
//     description: "Wholesome boi",
//     date: "30-04-2022",
//   };
//   let petToSave = Pet(newPet);
//   let resp = await petToSave.save();
//   console.log(resp);
// }
// savePetManually();

// async function getPetsManually() {
//   let pets = await Pet.find({}, { name: 1, animal: 1 }); //add tags you want to see
//   console.log(pets);
// }
// getPetsManually();
const Pet = mongoose.model("Pet", petSchema);
module.exports = { Pet };
