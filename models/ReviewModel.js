const db = require("../db");
const { DataTypes } = require("sequelize");

const Review = db.define("review", {
  review: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.DECIMAL,
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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Review;
