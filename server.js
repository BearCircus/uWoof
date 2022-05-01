require("dotenv").config();
const express = require("express");
// const { mongoose } = require("./db/connectDataBase");
const app = express();
const cors = require("cors");
const port = 3000;
// console.log(process.env.DB_USER);
// const user = require("./Woof_route");
app.use(cors());
app.use(express.json());
const user = require("./routes/users");
const pets = require("./routes/petRoute");


app.use("/api/users", user);
app.use("/api/pets", pets);

app.get("/", (req, res) => {
  res.send("¡WOOF!");
});

app.listen(port, () => {
  console.log("Welcome to Woof");
});
