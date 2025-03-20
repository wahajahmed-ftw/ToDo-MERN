const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/userModal");
const { getDB } = require("../db/connection");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

router.get("/", (req, res) => {
  res.send("This route is working");
});

router.post("/signup", async (req, res) => {
  try {
    const db = getDB();
    const collection = await db.collection("Users");
    const ExisitngUser = await collection.findOne({ email: req.body.email });
    if (ExisitngUser) {
      res.status(400).send("User already exist");
      return;
    }
    const result = await collection.insertOne(req.body);
    if (result.acknowledged) {
      try {
        res.status(200).send("User created successfully");
      } catch (error) {
        res.status(401).send(`Error creating token ${error}`);
      }
    }
  } catch (error) {
    res.status(401).send(`Error occured ${error}`);
  }
});

router.post("/login", async (req, res) => {
  const { name, email, password } = req.body;
  const db = getDB();
  try {
    const collection = await db.collection("Users");
    const result = await collection.findOne({
      email: email,
      password: password,
    });
    console.log("Result", result);
    if (!result) {
      res.status(400).send("User not found");
    } else {
      const token = jwt.sign(
        { name: name, email: email, Userid: result._id },
        process.env.JWT_SECRET
      );
      if (token) {
        console.log("Login Function Token", token);
        res.cookie("token", token, { httpOnly: true });
        res.status(200).send("User logged in successfully");
      }
    }
  } catch (error) {
    console.log("An error occured", error);
    res.status(400).send(`Error occured ${error}`);
  }
});

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send("User logged out successfully");
  } catch (error) {
    console.log("Error Occured", error);
    res.status(400).send("An error occured");
  }
});

module.exports = router;
