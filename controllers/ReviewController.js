const router = require("express").Router();
const { Review } = require("../models");
const validateJWT = require("../middleware/validate-jwt");
const { Op } = require("sequelize");

router.get("/practice", (req, res) => {
  res.send("Hey!! This is a practice route!!");
});

router.get("/", async (req, res) => {
  const { owner_id } = req.body;
  try {
    const reviewUser = await Review.findAll({
      where: {
        owner_id: owner_id,
      },
    });
    res.status(200).json(reviewUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/movie",  async (req, res) => {
  console.log("test");
  const { movie_id } = req.body;
  try {
    const reviewMovie = await Review.findAll({
      where: { movie_id: movie_id },
    });
    res.status(200).json(reviewMovie);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.post("/watched", validateJWT, async (req, res) => {
  console.log("watchlist");
  const { id } = req.body;
  try {
    const watchedMovies = await Review.findAll({
      where: {
        owner_id: req.user.id,
        [Op.or]: [{ watched: true }, { favorite: true }],
      },
    });
    res.status(200).json(watchedMovies);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.post("/similar", async (req, res) => {
  const { movie_id } = req.body;
  try {
    const reviewMovie = await Review.findAll({
      where: { movie_id: movie_id },
    });
    res.status(200).json(reviewMovie);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.post("/", validateJWT, async (req, res) => {
  const {
    review: review,
    rating: rating,
    favorite: favorite,
    watched: watched,
    movie_id: movie_id,
    owner_id: owner_id,
  } = req.body;

  if (req.user.id !== owner_id) {
    return res.status(403).json({
      message: "You cannot create an entry for another user.",
    });
  }

  console.log(review, rating, favorite, watched, movie_id, owner_id);
  try {
    const Reviews = await Review.create({
      review,
      rating,
      favorite,
      watched,
      movie_id,
      owner_id,
    });
    res.status(201).json({
      message: "Movie Review created",
      Reviews,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Failed to create entry ${err}`,
    });
  }
});

router.put("/", validateJWT, async (req, res) => {
  const { review, rating, favorite, watched, id } = req.body;
  try {
    await Review.update(
      { review, rating, favorite, watched },
      { where: { id: id }, returning: true }
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

router.delete("/", validateJWT, async (req, res) => {
  const { id } = req.body;
  try {
    const query = {
      where: {
        id: id,
      },
    };
    await Review.destroy(query);
    res.status(200).json({ message: "Review removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed Task" });
  }
});

module.exports = router;
