const express = require("express");
const formidableMiddleware = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.connect("mongodb://localhost/my_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();

const User = require("./models/User");
app.use(cors());
app.use(formidableMiddleware());

/* MIDDLEWARE */
const userDoesntExist = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.fields.username });
    if (!user) {
      next();
    } else {
      res.json({ message: `Sorry, user ${req.fields.username} exists in DB` });
    }
  } catch (err) {
    res.json({ message: "An error occurred!", error: err });
  }
};
/*  */

app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json({
        username: data.username,
      });
    } else {
      res.json({
        message: "No user found!",
      });
    }
  } catch (e) {
    res.status(400).json(e);
  }
});

app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: "An error occurred!", error: err });
  }
});

app.post("/register", userDoesntExist, async (req, res) => {
  try {
    const newUser = new User({
      username: req.fields.username,
      password: req.fields.password,
    });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.json({ message: "An error occurred!", error: err });
  }
});

app.listen(8000, () => {
  console.log("Server is up!");
});
