require("dotenv").config();
const { mongoose } = require("./connectDataBase");
const { nanoid } = require("nanoid");
const { getHash } = require("../utils/crypt");

let usersSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

//Funcion que se usa en los archivos de backend para obtener todos los usuarios desde la base de datos
usersSchema.statics.getUsers = async (filtro) => {
  //let usr = {_id:0, id:1, name:1, lastname:1, username:1, password:0, phone:1, email:1, city:1, country:1, zip:1, state:1, image:1};
  let props = Object.keys(filtro);
  props = props.map((prop) => ({ [prop]: filtro[prop] }));
  //console.log(props);
  let search = { $or: props };
  if (props.length == 0) search = {};
  //console.log(search);
  return await User.find(search);
};

usersSchema.statics.saveUser = async (user) => {
  //console.log("it gets to here");
  user.id = nanoid();
  user.password = await getHash(user.password);
  let userToSave = User(user);

  return await userToSave.save();
};

//User.schema.statics.saveUser();

usersSchema.statics.getUserId = async (
  id,
  simplify = false,
  profile = false
) => {
  if (simplify) {
    let project = { _id: 1, username: 1, image: 1, city: 1, state: 1 };
    return await User.findOne({ id }, project);
  }
  return await User.findOne({ id });
};

usersSchema.statics.getProfileId = async (id) => {
  let project = {
    _id: 0,
    username: 1,
    image: 1,
    state: 1,
    phone: 1,
    country: 1,
    email: 1,
    city: 1,
  };
  return await User.findOne({ id }, project);
};

usersSchema.statics.deleteUser = async (id) => {
  return await User.findOneAndDelete({ id });
};

usersSchema.statics.updateUser = async (user) => {
  return await User.findOneAndUpdate(
    { id: user.id },
    { $set: user },
    { new: true }
  );
};

const User = mongoose.model("User", usersSchema);

//función para guardar en la base los datos
async function saveUser() {
  let newUser = {
    //No puse nada, porque a lo mejor queremos hacerlo que alguna manera en especifico
    id: nanoid(),
    name: "Jessica",
    lastname: "Donley",
    username: "Jess",
    password: "ingsistemaswoof",
    phone: "3371610571",
    email: "jessica@test.com",
    city: "San Pedro Tlaquepaque",
    country: "Mexico",
    zip: "45604 ",
    state: "Jalisco",
  };
  let userToSave = User(newUser);

  let resp = await userToSave.save();
  //console.log(resp);
}

//saveUser();

//función que se traiga todos los datos de la base de datos
async function getUsers() {
  let users = await User.find(); //Con el find se puede hacer la parte del filtrado de búsqueda en la base; si se quiere buscar cierto nombre, se hace -> {name: "Raquel"}
  //Si se quiere hacer una proyección, donde se muestran ciertas cosas, y se ocultan otras, se puede no mostrar el id y mostrar el name, no se muestra con 0 y se muestre con 1
  //console.log(users);
}

//getUsers();
/*
 */
async function updatePasswordAllUsers() {
  let users = await User.find();
  users.forEach(async (usr) => {
    usr.password = await getHash(usr.password);
    User.updateUser({ id: usr.id, password: usr.password });
  });
}

//updatePasswordAllUsers();

module.exports = { User };
