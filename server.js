require("dotenv").config();
const express = require("express");
// const { mongoose } = require("./db/connectDataBase");
const app = express();
const cors = require("cors");
const port = 3000;
// console.log(process.env.DB_USER);

app.use(cors());
app.use(express.json());
const loginRoute = require("./routes/login")
const user = require("./routes/users");
const pets = require("./routes/petRoute");
const chat = require("./routes/chat-route");

app.use('/chat',express.static(__dirname + '/public/Chat'));

app.use("/api/register", user);
app.use("/api/login", loginRoute);
app.use("/api/pets", pets);
app.use("/api/chat", chat);

app.get("/", (req, res) => {
  res.send("¡WOOF!");
});

app.listen(port, () => {
  console.log("Welcome to Woof");
});
