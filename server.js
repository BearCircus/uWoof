require("dotenv").config();
const express = require("express");
const axios = require("axios");
// const { mongoose } = require("./db/connectDataBase");
const app = express();
const cors = require("cors");
const port = 3000;
// console.log(process.env.DB_USER);

// app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public"));
// app.use(
//   "/register",
//   express.static(
//     __dirname + "/public/Register/RegisterUser/bootstrap-wizard-master"
//   )
// );
// app.use(
//   "/reganimal",
//   express.static(
//     __dirname + "/public/Register/RegisterAnimal/bootstrap-wizard-master"
//   )
// );
// app.use("/profile", express.static(__dirname + "/public//Profile"));
// app.use("/post", express.static(__dirname + "/public/Post/PostJessica"));
// app.use("/chat", express.static(__dirname + "/public/Chat"));
app.use("/register",express.static(__dirname+'/public/Register/RegisterUser/bootstrap-wizard-master'));
// app.use("/reganimal",express.static(__dirname+'/public/Register/RegisterAnimal/bootstrap-wizard-master'));

app.use(cors());
app.use(express.json());
const loginRoute = require("./routes/login");
const user = require("./routes/users");
const pets = require("./routes/petRoute");
const chatRoute = require("./routes/chat-route");
const favoriteRoute = require("./routes/Favorite-route")

app.use("/api/user", user);
app.use("/api/login", loginRoute);
app.use("/api/pets", pets);
app.use("/api/chat", chatRoute);
app.use('/api/favorites',favoriteRoute);

// app.get("/", (req, res) => {
//   res.send("¡WOOF!");
// });

app.listen(port, () => {
  console.log("Welcome to Woof");
});
