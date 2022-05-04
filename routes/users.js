const express = require("express");
const { User } = require("../db/User");
const { checkUsername,checkEmail } = require("../middlewares/repeatedData");
const {auth} = require("../middlewares/auth");
//const { checkEmail } = require("../middlewares/repeatedData");
//const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  let {name,lastname,username,password,phone,email,city,country,zip,state,image} = req.query;
  let query = {};

  if (name) {
    query.name = new RegExp(name, "i");
  }
  if (lastname) {
    query.lastname = new RegExp(lastname, "i");
  }
  if (username) {
    query.username = new RegExp(username, "i");
  }
  if (password) {
    query.password = new RegExp(password, "i");
  }
  if (phone) {
    query.phone = new RegExp(phone, "i");
  }
  if (email) {
    query.email = new RegExp(email, "i");
  }
  if (city) {
    query.city = new RegExp(city, "i");
  }
  if (country) {
    query.country = new RegExp(country, "i");
  }
  if (zip) {
    query.zip = new RegExp(zip, "i");
  }
  if (state) {
    query.state = new RegExp(state, "i");
  }
  if (image) {
    query.image = new RegExp(image, "i");
  }

  let usuarios = await User.getUsers(query);

  res.send(usuarios);
});

router.post("/",auth,checkUsername,checkEmail, async (req, res) => {
  console.log("POST-USERS");
  let {name,lastname,username,password,phone,email,city,country,zip,state,} = req.body;

  if (name && lastname && username && password && phone && email && city && country && zip && state) {
    let newUser = {
      name,
      lastname,
      username,
      password,
      phone,
      email,
      city,
      country,
      zip,
      state,
    };
    console.log(newUser);
    let doc = await User.saveUser(newUser);
    res.status(201).send(doc);
    return;
  } else {
    res.status(400).send("Faltan datos de usuario");
    return;
  }
});

router.get("/:id", async (req, res) => {
  let user = await User.getUserId(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ error: "Id de usuario no encontrado" });
  }
});
//User.getUserId("UmG8sKmXmdW3MN0OEubn6");

router.delete("/:id", async (req, res) => {
  let doc = await User.deleteUser(req.params.id);

  if (doc) {
    res.send(doc);
    return;
  }

  res.status(404).send({ error: "El usuario no fue encontrado" });
});

router.put("/:id", async (req, res) => {
  let user = await User.getUserId(req.params.id);
  let {
    name,
    lastname,
    username,
    password,
    phone,
    email,
    city,
    country,
    zip,
    state,
  } = req.body;

  if (user) {
    user.name = name ? name : user.name;
    user.lastname = lastname ? lastname : user.lastname;
    user.username = username ? username : user.username;
    user.password = password ? password : user.password;
    user.phone = phone ? phone : user.phone;
    user.email = email ? email : user.email;
    user.city = city ? city : user.city;
    user.country = country ? country : user.country;
    user.zip = zip ? zip : user.zip;
    user.state = state ? state : user.state;

    let doc = await User.updateUser(user);
    res.send(doc);
  } else {
    res
      .status(404)
      .send({ error: "El usuario no se encontro, y no se pudo actualizar" });
  }
});

module.exports = router;
