const express = require("express");
const router = express.Router();
const controller = require("../controllers/AuthController");

router.get("/", (req, res) => {
  res.send("Welcome to the auth routes!");
});

router.get("/register", (req, res) => {
  res.send("Register page");
});

router.post("/register", (req, res) => {
  controller.registerUser(req, res);
});
router.post("/login", (req, res) => {
  controller.loginUser(req, res);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send("Logged out successfully!");
});

module.exports = router;
