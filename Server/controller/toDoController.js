const express = require("express");
const router = express.Router();

const hello = (req, res, next) => {
  console.log("hello");
  next();
};

module.exports = { hello };
