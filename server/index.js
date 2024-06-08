const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
require("./config/passport");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { PORT, MONGO_URI } = process.env;
app.use(
  cors({
    origin: [`http://localhost:${PORT}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const authRoutes = require("./routes/authRoutes");

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to DB successfully"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

app.use("/auth", authRoutes);
