const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

function VerfiyToken(req, res, next) {
 
  let token = req.cookies?.token;
  console.log("Token in cookie", token);
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
      console.log("Token", token);
    }
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (decode) {
      req.user = decode
      console.log(`Decooded Key:`, decode);
      next();
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(`Error occured ${error}`);
  }
}

module.exports = { VerfiyToken };
