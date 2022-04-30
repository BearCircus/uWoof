require("dotenv").config();
const express = require("express");
const { mongoose } = require("./db/connectDataBase");
const app = express();
const port = 3000;
// console.log(process.env.DB_USER);
// const user = require("./Woof_route");
const user = require("./routes/users");
const pets = require("./routes/petRoute");

app.use(express.json());
app.use("/api/users", user);
app.use("/api/pets", pets);

app.get("/", (req, res) => {
  res.send("¡WOOF!");
});

app.listen(port, () => {
  console.log("Welcome to Woof");
});
