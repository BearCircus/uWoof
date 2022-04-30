const express = require("express");
const { mongoose } = require("./db/connectDataBase");
const app = express();
const port = 3000;
// const user = require("./Woof_route");

app.use(express.json());
// app.use('/api/woof',user);

app.get("/", (req, res) => {
  res.send("¡WOOF!");
});

app.listen(port, () => {
  console.log("Welcome to Woof");
});
