const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

//routing
const home = require("./routes");

const app = express();
dotenv.config({
  path: path.join(__dirname, ".env"),
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", home);

module.exports = app;
