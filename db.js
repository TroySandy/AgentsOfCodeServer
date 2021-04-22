const Sequelize = require("sequelize").Sequelize;

let sequelize = new Sequelize(process.env.DB_CONN_URL);

module.exports = sequelize;
