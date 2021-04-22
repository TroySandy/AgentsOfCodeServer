const db = require("../db");
const { DataTypes } = require("sequelize");

const User = db.define("user", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    isUnique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    isUnique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
