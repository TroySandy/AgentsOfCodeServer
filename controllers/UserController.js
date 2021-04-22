const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize/types");
const { validateJWT } = require("../middleware");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", validateJWT, (req, res) => {
  res.send("Hello world.");
});

router.get("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    User.findOne({
      where: {
        username,
      },
    })
      .then((user) => {
        //compare password
        if (bcrypt.compareSync(password, user.password)) {
          //password matches
          let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

          res.status(200).json({
            message: "User successfully logged in",
            token,
            user,
          });
        } else {
          //invalid password
          res.status(401).json({
            message: "Invalid username or password.",
          });
        }
      })
      .catch((err) => {
        //invalid username
        res.status(401).json({
          message: "Invalid username or password.",
        });
      });
  } catch (error) {
    res.status(500).json({ error });
  }

  try {
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/register", (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;

  try {
    //validation
    if (
      !password.length >= 5 ||
      !username.length >= 4 ||
      !username.match(/[!@#$_0-9]/g) ||
      !email.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
      )
    ) {
      res.status(400).json({
        message: "Data validation failed.",
      });
      return;
    }

    User.create({
      username,
      password: bcrypt.hashSync(password, 12),
      email,
      firstName,
      lastName,
    })
      .then((user) => {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });

        res.status(201).json({
          message: "User successfully created.",
          token,
          user,
        });
      })
      .catch((err) => {
        if (typeof err === UniqueConstraintError) {
          res.status(401).json({
            message: "That email or username already exists.",
          });
        }

        res.status(401).json({ message: "Something went wrong." });
      });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;