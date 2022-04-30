const mongoose = require("./connectDataBase");
const { nanoid } = require("nanoid");

let petSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  animal: {
    type: String,
    required: true,
  },
  age: {
    type: int,
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
    type: int,
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
});
const Pet = mongoose.model("Pet", petSchema);

petSchema.statics.addPet = async (pet) => {
  pet.id = nanoid();
  let petToAdd = Pet(pet);
};
module.exports={Pet};

async function savePetManually(){
  let newPet={
    id:nanoid(),
    animal:"Cat",
    age:7,
    temperment:"calm",
    color:orange,
    size:"Big",
    breed:"idk",
    gender:0,
    health:"healthy",
    castrated:true,
    vaccinated:false,
    image:"https://image.shutterstock.com/image-photo/red-male-cat-walking-towards-600w-138599810.jpg",
    description:"Wholesome boi"
  }
  let petToSave=Pet(newPet);
  let resp=await petToSave.save();
  console.log(resp);
}
savePetManually();
