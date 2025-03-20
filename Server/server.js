const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./db/connection.js");
const ToDo = require("./routes/toDoRoutes.js");
const auth = require("./routes/auth.js");
const cors = require("cors");
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
app.use("/tasks", ToDo);
app.use('/auth', auth);


// Connect to DB and start the server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
  });
});
