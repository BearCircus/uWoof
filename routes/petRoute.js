const router = require("express").Router();
const { Pet } = require("../db/Pet");
const { User } = require("../db/User");

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
router.get("/:id", async (req, res) => {
  let pet = await Pet.getPetById(req.params.id);
  if (pet) {
    res.status(200).send(pet);
  } else {
    res.status(404).send({ error: "Id not found" });
  }
});
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
  } = req.query;
  let queries = pets.slice();
  if (name) {
    queries = queries.filter((p) =>
      p.name.toUpperCase().includes(name.toUpperCase())
    );
  }
  if (animal) {
    queries = queries.filter((p) =>
      p.animal.toUpperCase().includes(animal.toUpperCase())
    );
  }
  if (age) {
    console.log(age);
    queries = queries.filter((p) => p.age == age);
  }
  if (temperment) {
    queries = queries.filter((p) =>
      p.temperment.toUpperCase().includes(temperment.toUpperCase())
    );
  }
  if (color) {
    queries = queries.filter((p) =>
      p.color.toUpperCase().includes(color.toUpperCase())
    );
  }
  if (size) {
    queries = queries.filter((p) =>
      p.size.toUpperCase().includes(size.toUpperCase())
    );
  }
  if (breed) {
    queries = queries.filter((p) =>
      p.breed.toUpperCase().includes(breed.toUpperCase())
    );
  }
  if (gender) {
    queries = queries.filter((p) =>
      p.gender.toUpperCase().includes(gender.toUpperCase())
    );
  }
  if (health) {
    queries = queries.filter((p) =>
      p.health.toUpperCase().includes(health.toUpperCase())
    );
  }
  if (castrated) {
    queries = queries.filter((p) => p.castrated.includes(castrated));
  }
  if (vaccinated) {
    queries = queries.filter((p) => p.vaccinated.includes(vaccinated));
  }

  let pets = await Pet.getPetByParams(queries);

  res.send(pets);
});
router.post("/:id", async (req, res) => {
  let userID = await User.getUserId(req.params.id);
  //todo add something in case id null
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
  } = req.body;
  let newPet = {
    userID: userID.id,
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
  };
  let doc = await Pet.savePet(newPet);
  res.status(201).send(doc);
});
router.delete("/:id", async (req, res) => {
  let doc = await Pet.deletePetById(req.params.id);
  if (doc) {
    res.status(200).send(doc);
    return;
  }
  res.status(404).send({ error: "Pet not found" });
});

router.put("/:id", async (req, res) => {
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
  } = req.body;
  let newObj = {
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
  };
  for (const key in newObj) {
    if (newObj[key] == undefined) {
      delete newObj[key];
    }
  }
  // console.table(newObj);
  let val = Pet.findById(req.params.id);
  if (!val) {
    res.status(404).send({ error: "Pet not found" });
  } else {
    let pet = Pet.updatePet(req.params.id, newObj);
    res.status(200).send({ modified: newObj });
  }
});

//todo get usando id de la mascota
//todo get de las mascotas posteadas por cierto usaurio

module.exports = router;
