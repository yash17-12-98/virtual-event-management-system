const express = require("express");
const authRoute = require("./routes/auth");
const { mongoDbConnect } = require("./connection");
const app = express();

app.use(express.json());

require("dotenv").config();
const port = process.env.PORT;

try {
  mongoDbConnect("mongodb://localhost:27017/event-managment-system")
    .then(() => console.log("Mongo Db Connected"))
    .catch((err) => console.log(err));
} catch (e) {
  console.log("Error", e);
}

app.get("", (req, res) => {
  return res.status(200).send(`Hello, server calling from ${port}`);
});

app.use("/api/v1/auth", authRoute);

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});