const router = require("express").Router();
const { Pet } = require("../db/Pet");

router.get("/", async (req, res) => {
  let {
    name,
    animal,
    age,
    temperment,
    color,
    size,
    breed,
    gender,
    health,
    castrated,
    vaccinated,
    image,
    description,
    date,
  } = req.query;
  let query = {};
  if (name) {
    query.name = new RegExp(name, "i");
  }
  if (animal) {
    query.animal = new RegExp(animal, "i");
  }
  if (age) {
    query.age = new RegExp(age, "i");
  }
  if (temperment) {
    query.temperment = new RegExp(temperment, "i");
  }
  if (color) {
    query.color = new RegExp(color, "i");
  }
  if (size) {
    query.size = new RegExp(size, "i");
  }
  if (breed) {
    query.breed = new RegExp(breed, "i");
  }
  if (gender) {
    query.gender = new RegExp(gender, "i");
  }
  if (health) {
    query.health = new RegExp(health, "i");
  }
  if (castrated) {
    query.castrated = new RegExp(castrated, "i");
  }
  if (vaccinated) {
    query.vaccinated = new RegExp(vaccinated, "i");
  }
  if (image) {
    query.image = new RegExp(image, "i");
  }
  if (description) {
    query.description = new RegExp(description, "i");
  }
  if (date) {
    query.date = new RegExp(date, "i");
  }
  let pets = await Pet.getPet(query);

  res.send(pets);
});
router.post("/",async (req,res)=>{
    let {
      name,
      animal,
      age,
      temperment,
      color,
      size,
      breed,
      gender,
      health,
      castrated,
      vaccinated,
      image,
      description,
      date,
    } = req.query;
})

module.exports = router;
