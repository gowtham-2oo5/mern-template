// const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");

const registerUser = async (req, res) => {
  try {
    const data = req.body;
    data.password = bcrypt.hashSync(data.password, 10);
    const user = new UserModel(data);
    await user.save();
    res.status(201).send(user);
    // console.log(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const loginUser = async (req, res) => {
  UserModel.findOne({ username: req.body.username }).then((user) => {
    //No user found
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Could not find the user.",
      });
    }

    //password checking
    const enteredPass = req.body.password;
    const storedPass = user.password;
    if (bcrypt.compareSync(enteredPass, storedPass)) {
      return res.status(401).send({
        success: false,
        message: "Incorrect password",
      });
    }

    //token generation
    const payload = {
      user: user,
    };

    const token = jwt.sign(payload, "Random string", { expiresIn: "1d" });

    res.cookie("token", token, { httpOnly: true });

    return res.status(200).send({
      message: "Logged in successfully!",
      token: token,
    });
  });
};

module.exports = {
  registerUser,
  loginUser,
};
