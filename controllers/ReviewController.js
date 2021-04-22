const router = require("express").Router();
const { Review } = require("../models");

/*
=======================
  Get All Reviews
=======================
*/

router.get("/", async (req, res) => {
  try {
    const entries = await Review.findAll({
      where : {
        owner_id: owner_id
      }
    });
    res.send(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err})
  }
}); 

/*
=======================
  Get One Review
=======================
*/
router.get("/findmovie/:id", async (req, res) => {


  try {
    const entries = await Review.findAll({
      where: {movie_id: movie_id}
    });
    res.send(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

module.exports = router;
