const mongoose = require("./connectDataBase");
const { nanoid } = require("nanoid");
const { getHash } = require("../utils/crypt");

let usersSchema = mongoose.Schema({
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
    type: String,
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
    type: int,
    required: true,
  },
  vaccinated: {
    type: int,
    required: true,
  },
});