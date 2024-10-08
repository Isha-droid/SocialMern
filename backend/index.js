const express = require("express");
const mongoose = require("mongoose");
const dotenv= require("dotenv")
const helmet= require("helmet")
const morgan= require("morgan")
const userRoute = require("./routes/users"); // Import userRoute module
const authRoute = require("./routes/auth"); // Import userRoute module
const postRoute = require("./routes/post"); // Import userRoute module
const messageRoute = require("./routes/message"); // Import userRoute module

const cors = require('cors');




// Middleware to use the userRoute for requests starting with '/users'

const app = express();
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("common"))

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/message", messageRoute);





const port = 5000;
dotenv.config()

// MongoDB connection URI
const mongoURI = process.env.MONGO_URI; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB 🚀");
});

app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`);
});
