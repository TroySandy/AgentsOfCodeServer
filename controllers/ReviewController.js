const router = require("express").Router();
const { Review } = require("../models");

router.get("/", (req, res) => {
  res.send("Hello world.");
});

module.exports = router;
