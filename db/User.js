const {mongoose} = require("./connectDataBase");
const {nanoid} = require("nanoid");
const { getHash } = require("../utils/crypt");

let usersSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: tr},

    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    zip:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    }});