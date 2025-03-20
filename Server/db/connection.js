const { MongoClient } = require("mongodb");

let db; // Store raw database instance

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect(); // Connect to MongoDB cluster
    db = client.db("toDoList"); // Manually select "toDoList" database

    console.log(`Connected to database: ${db.databaseName}`);
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};

module.exports = { connectDB, getDB };
