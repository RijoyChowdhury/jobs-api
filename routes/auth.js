const express = require("express");
const { login, register } = require("../controllers/auth.controller");

const Router = express.Router();

Router.post("/register", register);
Router.post("/login", login);

module.exports = Router;
