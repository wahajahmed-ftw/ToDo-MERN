const express = require("express");
const router = express.Router();
var { ObjectId } = require("mongodb");
const authMiddlerware = require("../middleware/authMiddleware");
const { getDB } = require("../db/connection");

router.get("/view", authMiddlerware.VerfiyToken, async (req, res) => {
  try {
    const db = getDB(); // Get database instance
    const collection = db.collection("ToDo"); // Access "ToDo" collection

    const todos = await collection.find({ Userid: req.user.Userid }).toArray(); // Fetch documents
    console.log("Fetched Data:", todos);

    res.json(todos);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.get("/view/:id",authMiddlerware.VerfiyToken, async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("ToDo");
    const result = await collection.findOne({
      _id: new ObjectId(req.params.id),
      Userid: req.user.Userid,
    });
    res.json(result).status(200);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.post("/add",authMiddlerware.VerfiyToken, async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("ToDo");
    const result = await collection.insertOne({ ...req.body, Userid: req.user.Userid });
    res.json(result).status(200);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.delete("/delete/:id",authMiddlerware.VerfiyToken, async (req, res) => {
  try {
    const db = getDB();
    const collections = db.collection("ToDo");
    const result = await collections.deleteOne({
      _id: new ObjectId(req.params.id),
      Userid: req.user.Userid
    });
    console.log("Deleted Data:", result);
    res.json(result).status(200);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.patch("/update/:id",authMiddlerware.VerfiyToken, async (req, res) => {
  try {
    const db = getDB();
    const collections = db.collection("ToDo");
    const result = await collections.updateOne(
      {
        _id: new ObjectId(req.params.id),
        Userid: req.user.Userid
      },
      {
        $set: req.body,
      }
    );
    console.log("Updated Data:", result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

module.exports = router;
