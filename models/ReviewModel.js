const db = require("../db");
const { DataTypes } = require("sequelize");

const Review = db.define("review", {
  review: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  watched: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  movie_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Review;
