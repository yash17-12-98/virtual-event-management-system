const express = require("express");
const { login, register } = require("../controllers/auth");
const auth = express.Router();

auth.post("/login", login);

auth.post("/register", register);

module.exports = auth;
