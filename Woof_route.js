const express = require("express");
//const petsArray = require('./pets.json');
const router = express.Router();

router.get('/',(req,res)=>{
    let {name, image, description, animal, age, temperment, color, size, breed, gender, health, castrated, vaccinated} = req.query;
    let petsFiltered = petsArray.slice();

    if(name){
        petsFiltered = petsFiltered.filter(pet => pet.name.toUpperCase().includes(name.toUpperCase()));
    }
    if(image){
        petsFiltered = petsFiltered.filter(pet => pet.image.toUpperCase().includes(image.toUpperCase()));
    }
    if(description){
        petsFiltered = petsFiltered.filter(pet => pet.description.toUpperCase().includes(description.toUpperCase()));
    }
    if(animal){
        petsFiltered = petsFiltered.filter(pet => pet.animal.toUpperCase().includes(animal.toUpperCase()));
    }
    if(age){
        petsFiltered = petsFiltered.filter(pet => pet.age.toUpperCase().includes(age.toUpperCase()));
    }
    if(temperment){
        petsFiltered = petsFiltered.filter(pet => pet.temperment.toUpperCase().includes(temperment.toUpperCase()));
    }
    if(color){
        petsFiltered = petsFiltered.filter(pet => pet.color.toUpperCase().includes(color.toUpperCase()));
    }
    if(size){
        petsFiltered = petsFiltered.filter(pet => pet.size.toUpperCase().includes(size.toUpperCase()));
    }
    if(breed){
        petsFiltered = petsFiltered.filter(pet => pet.breed.toUpperCase().includes(breed.toUpperCase()));
    }
    if(gender){
        petsFiltered = petsFiltered.filter(pet => pet.gender.toUpperCase().includes(gender.toUpperCase()));
    }
    if(health){
        petsFiltered = petsFiltered.filter(pet => pet.health.toUpperCase().includes(health.toUpperCase()));
    }
    if(castrated){
        petsFiltered = petsFiltered.filter(pet => pet.castrated.toUpperCase().includes(castrated.toUpperCase()));
    }
    if(vaccinated){
        petsFiltered = petsFiltered.filter(pet => pet.vaccinated.toUpperCase().includes(vaccinated.toUpperCase()));
    }

    res.send(req.query);
})

module.exports = router;