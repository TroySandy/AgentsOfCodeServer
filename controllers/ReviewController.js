const router = require("express").Router();
const { Review } = require("../models");
const validateJWT = require("../middleware/validate-jwt");

router.get("/practice", (req, res) => {
  res.send("Hey!! This is a practice route!!")
})

router.get("/", async (req, res) => {
  const {owner_id} = req.user;
  try {
    const entries = await Review.findAll({
      where : {
        owner_id: owner_id
      } 
    });
    res.status(200).json({
      entries,
      message: "here is your movie" 
    });
    
  } catch (err) {
    res.status(500).json({ error: err})
  }
}); 

router.get("/", async (req, res) => {
  try {
    const entries = await Review.findAll({
      where: {movie_id: movie_id}
    });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

router.post("/", async (req, res) => {
  const { review: review, rating: rating, favorite: favorite, watched: watched, movie_id: movie_id, owner_id: owner_id} = req.body;
  try {
    const Reviews = await Review.create({
      review,
      rating,
      favorite,
      watched,
      movie_id,
      owner_id
    });
    res.status(201).json({
      message: "Movie Review created",
      Reviews,
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to create entry ${err}`,
    });
  }
});

router.put("/", async (req, res) => {
  const { review, rating, favorite, watched, id } = req.body;
  try {
      await Review.update(
      { review,
        rating,
        favorite,
        watched },
      { where: { id: id}, returning: true }
    ).then((result) => {
      res.status(200).json({
        message: "Log successfully updated",
        updatedReview: result,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to update log: ${err}`,
    });
  }
});

router.delete("/", async (req, res) => {
  const {id} = req.body
  try {
    const query = {
      where: {
        id: id
      },
    };
    await Review.destroy(query);
    res.status(200).json({ message: "Review removed"});
  } catch (err) {
    res.status(500).json({ message: "Failed Task" });
  }
});

module.exports = router;
