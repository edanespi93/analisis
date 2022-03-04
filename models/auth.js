const DataTypes = require("sequelize");

const { db } = require("../db/connection");

const Auth = db.define("auth", {
  user: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_persona: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
});

module.exports = Auth;
