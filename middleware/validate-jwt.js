require("dotenv").config();

const jwt = require("jsonwebtoken");
const { User } = require("../models");

const validateJWT = async (req, res, next) => {
  if (req.method == "OPTIONS") {
    // console.log("hello");
    next();
  } else if (
    req.headers.authorization &&
    req.headers.authorization.includes("Bearer")
  ) {
    const { authorization } = req.headers;
    // console.log("authorization -->", authorization);
    try {
      const payload = authorization
        ? jwt.verify(
            authorization.includes("Bearer")
              ? authorization.split(" ")[1]
              : authorization,
            process.env.JWT_SECRET
          )
        : undefined;

      // console.log("payload -->", payload);
      if (payload) {
        let foundUser = await User.findOne({ where: { id: payload.id } });
        // console.log("found user -->", foundUser);
        if (foundUser) {
          // console.log("request -->". req);
          req.user = foundUser;
          next();
        } else {
          res.status(400).send({ messagfe: "Not Authorized" });
        }
      } else {
        res.status(401).send({ message: "Invalid token" });
      }
    } catch (error) {
      res.status(500).send({ message: "Error with the token" });
    }
  } else {
    res.status(403).send({ message: "Forbidden" });
  }
};

module.exports = validateJWT;
