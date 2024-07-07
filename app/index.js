const express = require("express");
const app = express();
const Routers = require("../routers");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", Routers.User);
module.exports = app;
